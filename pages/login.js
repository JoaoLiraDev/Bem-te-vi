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
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next//router';



function Login() {

    const [login, setLogin] = useState({
        email: "",
        senha: ""
    });

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onChangeInput = e => setLogin({ ...login, [e.target.name]: e.target.value });

    const { user, singIn } = useContext(AuthContext)
    async function sendLogin(login) {
        await singIn(login)
        console.log(user)
    }

    function Cadastrar() {
        Router.push('/Cadastrar')
    }

    return (
        <div>
             <Head>
                <title>
                    BTV
                </title>
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
                    margin-top:100px;
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
                {errors.email && <Alert color="danger">{errors.email.message}</Alert>}
                {errors.senha && <Alert color="danger">{errors.senha.message}</Alert>}

                <div className="divMain1">
                    <Image src="/Nova-Logo-Bem-te-vi.png" alt="ImagemLogin" width={739} height={627} />

                    <Image src="/Logo Preta.png" alt="ImagemLogin" width={150} height={80} />

                </div>

                <div className="divMain2">
                    <Form onSubmit={handleSubmit(sendLogin)} noValidate>
                        <Row>
                            <Col className="col-md-10">
                                <Label for="email">Email:</Label>
                                <Input className="form-control mr-sm-2" type="text" name="email" id="email"{...register("email", { required: 'Insira um e-mail.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Insira um e-mail válido', } })} placeholder="Email:" onChange={onChangeInput} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-10">
                                <Label for="senha">Password:</Label>
                                <Input className="form-control mr-sm-2" type="password" name="senha" id="senha" {...register("senha", { required: 'Insira uma senha' })} placeholder="Password:" onChange={onChangeInput} />
                            </Col>
                        </Row>
                        <br />
                        <button type="submit" className="btn btnAnimado" id="btnLogin" >Login</button>
                        <div className="separator">ou faça seu cadastro agora.</div>
                    </Form>
                    <Row>
                        <Col className="col-md-10">
                            <button type="submit" onClick={Cadastrar} className="btn btnAnimado" id="btnCadastrar" >Cadastrar-se</button>
                        </Col>

                    </Row>

                </div>


            </Container>
        </div>
    </div>
</div>  
    );

};
export default Login;
