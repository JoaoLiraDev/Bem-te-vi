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
import InputMask from 'react-input-mask';

function cadastraPaciente() {
    const [paciente, setPaciente] = useState({    
        NOME_RESPONSAVEL: "",
        DT_NASC_RESPONSAVEL: "",
        RG_RESPONSAVEL: "",
        CPF_RESPONSAVEL: "",
        TEL_RESPONSAVEL: "",
        EMAIL_RESPONSAVEL: "",
        LOGRADOURO: "",
        BAIRRO: "",
        NOME_PACIENTE: "",
        DT_NASC_PACIENTE: "",
        RG_PACIENTE: "",
        CPF_PACIENTE: "",
        TEL_PACIENTE: "",
        EMAIL_PACIENTE: "",
    });
    console.log(paciente)
    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setPaciente({ ...paciente, [e.target.name]: e.target.value });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 'MQtoken': token } = parseCookies();

     async function sendQuest(){

        setResponse({ formSave: true });

        try {
            const res = await fetch('http://localhost:8080/Usuarios/cadastroPaciente', {
                method: 'POST',
                body: JSON.stringify(paciente),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });

            const responseEnv = await res.json();


            if (responseEnv.error) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.mensagem
                });
                setTimeout(() => {
                    setResponse({
                        formSave: false,
                        type: '',
                        message: ''
                    });
                }, 1500);
            } else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.mensagem
                });
                setTimeout(() => {
                    setResponse({
                        formSave: false,
                        type: '',
                        message: ''
                    });
                }, 1500);
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: "Erro: Falha ao cadastrar paciente!"
            });
        }

    };


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

                <h2 className="display-4 ml-4">Cadastro de Paciente</h2>
                <hr />
                <Form className="form" onSubmit={handleSubmit(sendQuest)} noValidate>
                    
                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}

                    
                    <h4>Dados do responsável</h4>
                    <hr />
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="NOME_RESPONSAVEL">Nome:</Label>
                                <Input type="text" name="NOME_RESPONSAVEL" id="NOME_RESPONSAVEL" placeholder="Nome Completo:" {...register("NOME_RESPONSAVEL", { required: 'Insira o nome do responsável' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="DT_NASC_RESPONSAVEL">Data de Nascimento:</Label>
                                <Input type="date" name="DT_NASC_RESPONSAVEL" id="DT_NASC_RESPONSAVEL" {...register("DT_NASC_RESPONSAVEL", { required: 'Insira uma Data' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="RG_RESPONSAVEL">RG:</Label>
                                    <InputMask mask="99.999.999-9" className="form-control"  name="RG_RESPONSAVEL" id="RG_RESPONSAVEL" placeholder="RG:" {...register("RG_RESPONSAVEL")} onChange={onChangeInput}/>
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="CPF_RESPONSAVEL">CPF:</Label>
                                <InputMask mask="999.999.999-99" className="form-control"  name="CPF_RESPONSAVEL" id="CPF_RESPONSAVEL" placeholder="CPF:" {...register("CPF_RESPONSAVEL", { required: 'Insira o nome do responsável' })} onChange={onChangeInput}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="TEL_RESPONSAVEL">Telefone para contato:</Label>
                                <InputMask mask="(99)99999-9999"  className="form-control" name="TEL_RESPONSAVEL" id="TEL_RESPONSAVEL" placeholder="Celular:" {...register("TEL_RESPONSAVEL")} onChange={onChangeInput}  />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="EMAIL_RESPONSAVEL">Email:</Label>
                                <Input type="email" name="EMAIL_RESPONSAVEL" id="EMAIL_RESPONSAVEL" placeholder="Email:" {...register("EMAIL_RESPONSAVEL")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="LOGRADOURO">Endereço:</Label>
                                <Input type="text" name="LOGRADOURO" id="LOGRADOURO" placeholder="Logradouro:" {...register("LOGRADOURO")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <Label for="bairro">BAIRRO:</Label>
                            <Input type="text" name="BAIRRO" id="BAIRRO" placeholder="Bairro:" {...register("BAIRRO")} onChange={onChangeInput} />
                        </Col>
                    </Row>
                    
                    <br/>
                    <h4>Dados do assistido</h4>
                    <hr />
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="NOME_PACIENTE">Nome:</Label>
                                <Input type="text" name="NOME_PACIENTE" id="NOME_PACIENTE" placeholder="Nome Completo:" {...register("NOME_PACIENTE", { required: 'Insira o nome do responsável' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="DT_NASC_PACIENTE">Data de Nascimento:</Label>
                                <Input type="date" name="DT_NASC_PACIENTE" id="DT_NASC_PACIENTE" {...register("DT_NASC_PACIENTE", { required: 'Insira uma Data' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="RG_PACIENTE">RG:</Label>
                                    <InputMask mask="99.999.999-9" className="form-control"  name="RG_PACIENTE" id="RG_PACIENTE" placeholder="RG:" {...register("RG_PACIENTE")} onChange={onChangeInput}/>
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="CPF_PACIENTE">CPF:</Label>
                                <InputMask mask="999.999.999-99" className="form-control"  name="CPF_PACIENTE" id="CPF_PACIENTE" placeholder="CPF:" {...register("CPF_PACIENTE")} onChange={onChangeInput}  />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="TEL_PACIENTE">Telefone para contato:</Label>
                                <InputMask mask="(99)99999-9999"  className="form-control" name="TEL_PACIENTE" id="TEL_PACIENTE" placeholder="Celular:" {...register("TEL_PACIENTE")} onChange={onChangeInput}  />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="EMAIL_PACIENTE">Email:</Label>
                                <Input type="email" name="EMAIL_PACIENTE" id="EMAIL_PACIENTE" placeholder="Email:" {...register("EMAIL_PACIENTE")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-4 ">
                        <button type="button" onClick={() => {sendQuest()}} className="btn btnAnimado" id="btnCriar" >Cadastrar Paciente</button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Smallfooter />
        </div>
    );
};

export default cadastraPaciente;

export async function getServerSideProps(ctx) {
    const APIClient = getAPIClient(ctx)
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