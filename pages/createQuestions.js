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


function createQuestion() {
    const [quest, setQuest] = useState({
        ano: '',
        trimestre: '',
        materia: '',
        autor: '',
        conteudo: '',
        descricao: ''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setQuest({ ...quest, [e.target.name]: e.target.value });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 'MQtoken': token } = parseCookies();
    const sendQuest = async e => {

        setResponse({ formSave: true });

        try {
            const res = await fetch('http://localhost:8080/CreateQuest/cadastroQuest', {
                method: 'POST',
                body: JSON.stringify(quest),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });

            const responseEnv = await res.json();


            if (responseEnv.error) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.mensagem
                });
            } else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.mensagem
                });
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: "Erro: Falha ao cadastrar questão!"
            });
        }

    };


    return (
        <div>
            <Head>
                <title>
                    MyQuestions
                </title>
            </Head>
            <Menu />

            <Container>
                <style>
                    {`
                    .form{
                        margin-top:15% !important;
                        margin-bottom:10% !important;
                    }
                    #descricao{
                        height:200px; 
                    }
                    .btn{
                        text-decoration: none;
                        text-transform: uppercase;
                        font-size: 11px;
                        font-weight: bold;
                        margin: 0 15px;
                        padding: 10px 15px;
                        overflow: hidden;
                        border: 2px solid #E96C64;
                        position: relative;
                        
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
                      color:#fff ;

                    }.btnAnimado:hover:before{
                        width: 100%;
                        color:#fff ;
                    }
                    `}
                </style>


                <Form className="form" onSubmit={handleSubmit(sendQuest)} noValidate>
                    {errors.ano && <Alert color="danger">{errors.ano.message}</Alert>}
                    {errors.trimestre && <Alert color="danger">{errors.trimestre.message}</Alert>}
                    {errors.materia && <Alert color="danger">{errors.materia.message}</Alert>}
                    {errors.autor && <Alert color="danger">{errors.autor.message}</Alert>}
                    {errors.conteudo && <Alert color="danger">{errors.conteudo.message}</Alert>}
                    {errors.descricao && <Alert color="danger">{errors.descricao.message}</Alert>}

                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Input type="select" name="ano" id="ano" {...register("ano", { required: 'Selecione uma opção' })} onChange={onChangeInput}>
                                    <option>Selecione um ano</option>
                                    <option>1ºAno</option>
                                    <option>2ºAno</option>
                                    <option>3ºAno</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Input type="select" name="trimestre" id="trimestre" {...register("trimestre", { required: 'Selecione uma opção' })} onChange={onChangeInput}>
                                    <option>Selecione um Trimestre</option>
                                    <option>1° Trimestre</option>
                                    <option>2° Trimestre</option>
                                    <option>3° Trimestre</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Input type="select" name="materia" id="materia" {...register("materia", { required: 'Selecione uma matéria' })} onChange={onChangeInput}>
                                    <option>Selecione uma Materia</option>
                                    <option>Lingua Portuguesa e Literatura</option>
                                    <option>Matemática</option>
                                    <option>História</option>
                                    <option>Geografia</option>
                                    <option>Física</option>
                                    <option>Quimíca</option>
                                    <option>Biologia</option>
                                    <option>Filosofia</option>
                                    <option>Sociologia</option>
                                    <option>Inglês Técnico</option>
                                    <option>Educação Física</option>
                                    <option>Banco de Dados</option>
                                    <option>Linguagem de Programação</option>
                                    <option>Programação de Aplicativos</option>
                                    <option>Projetos de T.I</option>
                                    <option>METC</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="autor">Autor:</Label>
                        <Input type="text" name="autor" id="autor" placeholder="Nome Autor:" {...register("autor", { required: 'Insira um autor' })} onChange={onChangeInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="conteudo">Conteúdo:</Label>
                        <Input type="text" name="conteudo" id="conteudo" placeholder="Conteúdo da Questão:" {...register("conteudo", { required: 'Insira o conteúdo' })} onChange={onChangeInput} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="descricao">Descrição:</Label>
                        <Input type="textarea" name="descricao" id="descricao" placeholder="Escreva a questão aqui..." {...register("descricao", { required: 'Insira uma questão' })} onChange={onChangeInput} />

                    </FormGroup>
                    <Row>
                        <Col className="col-md-4 ">
                            {response.formSave ? <button type="submit" className="btn btnAnimado" id="btnCriar" >Enviando...</button> : <button type="submit" className="btn btnAnimado" id="btnCriar" >Cadastrar Questão</button>}
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Smallfooter />
        </div>
    );
};

export default createQuestion;

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