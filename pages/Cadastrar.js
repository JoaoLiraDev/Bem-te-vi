import React, { useContext, useState } from 'react';
import Image from 'next/image'
import Head from 'next/head';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    FormGroup,
    Input,
    Form,
    Button,
    Row,
    Col,
    Label,
    Alert
} from 'reactstrap';
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next//router';



function Cadastrar() {

    const [cadastro, setCadastro] = useState({
        nome: "",
        senha: "",
        email: "",
        fist_name: "",
        last_name: "",
        especialidade: "-",
        dt_nasc: ""
    });


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setCadastro({ ...cadastro, [e.target.name]: e.target.value });

    const cadastraUser = async e => {


        setResponse({ formSave: true });

        try {
            const res = await fetch('http://localhost:8080/Usuarios/cadastro', {
                method: 'POST',
                body: JSON.stringify(cadastro),
                headers: { 'Content-Type': 'application/json' }
            });

            const responseEnv = await res.json();
            console.log(responseEnv)

            if (responseEnv.mensagem == "Usuário já cadastrado" || responseEnv.err) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.mensagem,
                });

            } else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.mensagem,
                });

                setTimeout(() => {
                    Router.push('/login')
                }, 2000);

            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: "Erro: Falha ao realizar login!",
            });
        }
    }
    return (
        <div>
            <Head>
                <title>
                    MyQuestions
                </title>
            </Head>

            <style>
                {`.menu-custom{
                    background-color:#000;
                }
                .imgLogin{
                    margin-top:80px;
                    
                }
                .divMain1{
                    display: inline;    
                    width:45%;
                    float:left;
                    margin-top:100px;
                }
                .divMain2{
                    display: inline;
                    width:55%;
                    float:right;
                    
                    padding-left: 145px;
                }
                .btn{
                    text-decoration: none;
                    text-transform: uppercase;
                    font-size: 11px;
                    font-weight: bold;
                    margin: 0 15px 0 140px;
                    padding: 10px 15px;
                    overflow: hidden;
                    border: 2px solid #E96C64;
                    position: relative;
                    color: #000 !important;
                    
                }
                .btn:before{
                  content: '';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 100%;
                  height: 100%;
                  color:#E96C64 ;
                  background-color: #E96C64;
                  
                  z-index: -1;
                  
                  transition: 0.7s ease;
                }
                .btnAnimado{
                    
                    
                }.btnAnimado:before{
                  content:'';
                    width: 0;
                  height: 100%;
                  color:#000 !important;

                }.btnAnimado:hover:before{
                    width: 100%;
                    color:#000 !important;
                }
                
                #btnCadastrar{
                    width: 150px;
                }
                
                .alert-hidden {
                    opacity: 0;
                    transition: all 250ms linear 2s;
                  }
                  .top{
                    display: flex;
                    flex-direction: column;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                  }
                  
                
                `}
            </style>


            <Navbar className="menu-custom" dark expand="md" fixed="top">
                <Container className="top">

                    <Image
                        src="/shortLogo.png"
                        alt="Picture of the author"
                        width={188}
                        height={55}

                    />

                </Container>
            </Navbar>
            <div className="imgLogin">
                <Row>
                    <Col className="col-md-1"></Col>
                    <Col className="col-md-10">
                        {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                        {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}

                        {errors.email && <Alert color="danger">{errors.email.message}</Alert>}
                        {errors.senha && <Alert color="danger">{errors.senha.message}</Alert>}
                        {errors.firstName && <Alert color="danger">{errors.firstName.message}</Alert>}
                        {errors.SobreNome && <Alert color="danger">{errors.SobreNome.message}</Alert>}
                        {errors.Nickname && <Alert color="danger">{errors.Nickname.message}</Alert>}
                        {errors.dt_nasc && <Alert color="danger">{errors.dt_nasc.message}</Alert>}

                    </Col>
                    <Col className="col-md-1"></Col>
                </Row>

                <div className="divMain2">
                    <Image src="/Tasks.svg" alt="Tasks" width={600} height={600} />
                </div>


                <Container className="divMain1">


                    <Form className="form" onSubmit={handleSubmit(cadastraUser)} noValidate>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="autor">Primeiro Nome:</Label>
                                    <Input type="text" name="firstName" id="firstName" {...register("firstName", { required: 'Insira seu primeiro nome' })} placeholder="Primeiro Nome:" onChange={onChangeInput} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="autor">Sobrenome Nome:</Label>
                                    <Input type="text" name="SobreNome" id="SobreNome" {...register("SobreNome", { required: 'Insira seu sobrenome' })} placeholder="Sobrenome:" onChange={onChangeInput} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="autor">E-mail:</Label>
                            <Input type="email" name="email" id="email" {...register("email", { required: 'Insira um e-mail.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Insira um e-mail válido', } })} placeholder="Email:" onChange={onChangeInput} />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="autor">Nickname:</Label>
                                    <Input type="text" name="Nickname" id="Nickname" {...register("Nickname", { required: 'Insira um nickname' })} placeholder="Nickname:" onChange={onChangeInput} />
                                </FormGroup>

                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="autor">Data de Nascimento:</Label>
                                    <Input type="date" name="dt_nasc" id="dt_nasc" {...register("dt_nasc", { required: 'Insira uma data de nascimento' })} onChange={onChangeInput} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="autor">Senha:</Label>
                                    <Input type="password" name="senha" id="senha" placeholder="Senha:" {...register("senha", { required: 'Insira uma senha' })} placeholder="Password:" onChange={onChangeInput} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-1"></Col>
                            <Col className="col-md-1"></Col>
                            <Col className="col-md-6 ">
                                <button type="submit" className="btn btnAnimado" id="btnCadastrar" >Cadastrar-se</button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </div >
    );

};
export default Cadastrar;
