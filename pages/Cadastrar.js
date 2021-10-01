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
                <title>BTV</title>
            </Head>

            <div className="full" style={{ backgroundImage: "url('/ENTRAR.png')" }}>
                <style>
                    {`
                    @media only screen and (max-width: 600px){
                        .divMain1{
                            margin-right: 100px;
                        }
                    }
                    .menu-custom{
                        background-color:#000;
                    }
                    .divImage{
                        margin-top:50px;
                    }
                    .btn{
                        text-decoration: none;
                        text-transform: uppercase;
                        font-size: 11px;
                        font-weight: bold;
                        margin: 0 15px 0 140px;
                        padding: 10px 15px;
                        overflow: hidden;
                        border: 2px solid #fffc00;
                        position: relative;
                        z-index: 2; 
                        
                        
                    }
                    .btn:before{
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    height: 100%;
                    background-color: #fffc00;
                    z-index: -1;     
                    transition: 0.7s ease;
                    }
                    .btnAnimado{
                        color:#000 ;
                        
                    }.btnAnimado:before{
                    content:'';
                    width: 0;
                    height: 100%;
                    color:#000 !important;
                    }.btnAnimado:hover:before{
                        width: 100%;
                        color:#000 !important;
                    
                    }

                    #btnLogin{
                        width: 120px;
                        
                    }
                    #btnCadastrar{
                        width: 120px;
                    }
                    .divMain1{
                        display: inline;    
                        width:50%;
                        float:left;
                    }
                    .divMain2{
                        display: inline;
                        width:50%;
                        float:right;
                        margin-top:100px;
                        padding-left: 145px;
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
                    .separator{
                        font-size: 14px;
                        color: #a8a8b3;
                        margin: 32px 0;
                        display: flex;
                        align-items: center;
                    }
                    .separator:before{
                        content: '';
                        flex: 1;
                        height: 1px;
                        background: #a8a8b3;
                        margin-right: 16px;
                        }
                        .separator:after{
                        content: '';
                        flex: 1;
                        height: 1px;
                        background: #a8a8b3;
                        margin-left: 16px;
                        }
                        @-webkit-keyframes fadeIn {
                            0% {
                                opacity: 0;
                            transform:translateY(-10px) 
                        }
                            100% {
                                opacity: 1;
                                transform:translateY(0)
                        }
                    }
                        @-moz-keyframes fadeIn {
                            0% {
                                opacity: 0;
                        }
                            100% {
                                opacity: 1;
                        }
                    }
                        @-o-keyframes fadeIn {
                            0% {
                                opacity: 0;
                        }
                            100% {
                                opacity: 1;
                        }
                    }
                        @keyframes fadeIn {
                            0% {
                                opacity: 0;
                        }
                            100% {
                                opacity: 1;
                        }
                    }
                        .fadeIn {
                            -webkit-animation: fadeIn 0.6s ease-in-out;
                            -moz-animation: fadeIn 0.6s ease-in-out;
                            -o-animation: fadeIn 0.6s ease-in-out;
                            animation: fadeIn 0.6s ease-in-out;
                        }
                        #telaLogin{
                            top: 0px;
                            left: 0px;
                            height: 100%;
                            border-radius: 0px 0px 0px 7px;
                            opacity: 1;
                            margin: 0px;
                            padding: 0px;
                            width: 100%;
                            background-size:auto;
                        }
                        .full{
                            position: fixed;
                            min-width: 100%;
                            min-height: 100%;
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                        }

                    `}
                </style>

                <div className="fadeIn divImage">
                    <Container>
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
                
                        <div className="divMain1">
                            <Image src="/Nova-Logo-Bem-te-vi.png" alt="ImagemLogin" width={739} height={627} />

                            <Image src="/Logo Preta.png" alt="ImagemLogin" width={150} height={80} />

                        </div>


                        <div className="divMain2">


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
                                    <Col className="col-md-6 ">
                                        <button type="submit" className="btn btnAnimado" id="btnCadastrar" >Cadastrar-se</button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    // </div>
    );

};
export default Cadastrar;
