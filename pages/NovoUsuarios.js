import Menu from "../components/topmenu";
import Smallfooter from "../components/smallfooter";
import React, { useState } from "react";
import Head from "next/head";
import { Form, FormGroup, Label, Input, Container, Row, Col, Button, Alert } from 'reactstrap';
import { data, readyException } from "jquery";
import { useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'
import GetServerSideProps from 'next';
import { api } from '../services/api';
import { getAPIClient } from "../services/axios";


function cadastraPaciente() {

    const [cadastro, setCadastro] = useState({
        nome: "",
        senha: "",
        email: "",
        fist_name: "",
        last_name: "",
        especialidade: "",
        dt_nasc: ""
    });

    console.log(cadastro)

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


            if (responseEnv.mensagem == "Usuário já cadastrado" || responseEnv.err) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.mensagem,
                });

                setTimeout(() => {
                    setResponse({
                        formSave: false,
                        type: '',
                        message: '',
                    });
                }, 2500);

            } else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.mensagem,
                });

                setTimeout(() => {
                    setResponse({
                        formSave: false,
                        type: '',
                        message: '',
                    });
                }, 2500);

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
                    BTV
                </title>
            </Head>
            <Menu />

            <style>
                {`
                    .form{
                        margin-top:10% !important;
                        margin-bottom:10% !important;
                    }
                    #observacao{
                        height:120px; 
                    }
                    .btn{
                        text-decoration: none;
                        text-transform: uppercase;
                        font-size: 11px;
                        font-weight: bold;
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
                    hr{
                        border: 3px solid !important;
                        width: 100%;
                    }
                    .divConteudo{
                        margin-top: 80px;
                    }
                    }
                    `}
            </style>
            <Container className="divConteudo">

                <h2 className="display-4 ml-4">Novo Usuário</h2>
                <hr />

                {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
                <Form className="form" onSubmit={handleSubmit(cadastraUser)} noValidate>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="fist_name">Primeiro Nome:</Label>
                                <Input type="text" name="fist_name" id="fist_name" {...register("fist_name", { required: 'Insira seu primeiro nome' })} placeholder="Primeiro Nome:" onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="last_name">Sobrenome Nome:</Label>
                                <Input type="text" name="last_name" id="last_name" {...register("last_name", { required: 'Insira seu sobrenome' })} placeholder="Sobrenome:" onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="email">E-mail:</Label>
                        <Input type="email" name="email" id="email" {...register("email", { required: 'Insira um e-mail.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Insira um e-mail válido', } })} placeholder="Email:" onChange={onChangeInput} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="nome">Nickname:</Label>
                                <Input type="text" name="nome" id="nome" {...register("nome", { required: 'Insira um nickname' })} placeholder="Nickname:" onChange={onChangeInput} />
                            </FormGroup>

                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="dt_nasc">Data de Nascimento:</Label>
                                <Input type="date" name="dt_nasc" id="dt_nasc" {...register("dt_nasc", { required: 'Insira uma data de nascimento' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="especialidade">Tipo Usuário:</Label>
                                <Input type="select" name="especialidade" id="especialidade"  onChange={onChangeInput}>
                                    <option>Selecione um tipo de perfil</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Funcionario">Funcionário</option>
                                    <option value="Responsavel">Responsável</option>
                                    
                                </Input>    
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
                        <Col className="col-md-6 offset-5">
                            <button type="submit" className="btn btnAnimado" id="btnCadastrar" >Cadastrar</button>
                        </Col>
                    </Row>
                </Form>

            </Container>
        </div>
    );
};

export default cadastraPaciente;

export async function getServerSideProps(ctx) {
    const { MQtoken } = parseCookies(ctx)

    if (!MQtoken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}