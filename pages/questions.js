import Menu from '../components/topmenu';
import Carocel from '../components/carousel';
import Footer from '../components/footer';
import React, { useState } from 'react';
import Head from 'next/head';
import FadeIn from 'react-fade-in';

import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    Collapse,
    CardBody,
    Card,
    Table,
    Alert
} from 'reactstrap';
import { parseCookies } from 'nookies';
import Router from 'next//router';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

function webQuestions({ data_return }) {

    const { 'MQtoken': token } = parseCookies();

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const apagarQuest = async (id_quest) => {
        console.log(id_quest)

        try {
            const res = await fetch("http://localhost:8080/CreateQuest/delete_quest/" + id_quest, {
                method: 'DELETE',
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
                message: "Erro: Falha ao deletar questão!"
            });
        }

        setTimeout(() => {
            Router.reload()
        }, 2500);
    };

    function Adicionar() {
        Router.push('/createQuestions')
    };

    const dados = data_return.Query_result;
    const questoes = dados.map((Query_result) =>
        <div className="zoom">
            <div id="titulo">

                <Row>
                    <Col className="col-md-3">
                        <label key={Query_result.SERIE} className="title">
                            Série: {Query_result.SERIE}
                        </label>
                    </Col>
                    <Col className="col-md-3">
                        <label key={Query_result.TRIMESTRE} className="title">
                            {Query_result.TRIMESTRE}
                        </label>
                    </Col>
                    <Col className="col-md-3">
                        <label key={Query_result.DISCIPLINA} className="title">
                            Disciplina: {Query_result.DISCIPLINA}
                        </label>
                    </Col>
                    <Col className="col-md-2">
                        <label key={Query_result.AUTOR} className="title">
                            Autor: {Query_result.AUTOR}
                        </label>
                    </Col>
                    <Col className="col-md-1">
                        <img
                            src="/edit.svg"
                            alt="Editar"
                            width={25}
                            height={25}
                            className="zoom"
                            id="Editar"
                            onClick={() => editar(Query_result.ID_QUEST)}
                        />
                        <img
                            src="/trash.svg"
                            alt="lixeira"
                            width={27}
                            height={27}
                            className="zoom"
                            id="lixeira"
                            onClick={() => apagarQuest(Query_result.ID_QUEST)}
                        />
                    </Col>
                </Row>
            </div>
            <div className="bordinha">
                <Row>
                    <Col className="col-sm-12">
                        <br />
                        <h5 key={Query_result.CONTEUDO} className="disciplina">{Query_result.CONTEUDO}</h5>
                        <br />
                        <pre key={Query_result.DESCRICAO}>{Query_result.DESCRICAO}</pre>
                    </Col>
                </Row>
            </div>
            <br />
        </div>
    );


    return (
        <div>
            <Head>
                <title>
                    MyQuestions
                </title>
            </Head>
            <FadeIn>
                <Menu />
                <style>
                    {`
                    .zoom {
                        transition: transform .2s;
                        }
        
                    .zoom:hover {
                        transform: scale(1.05);
                        }
        
                    .bordinha{
                        border-bottom-style: solid;
                        border-left-style: solid;
                        border-right-style: solid;
                        border-color: rgba(233, 109, 100, 0.9);
                        border-radius: 0px 0px 10px 10px;
                        
                        }
                        
                    pre{
                        margin-left: 5px;
                        }
                    #titulo{
                        background-color: rgba(233, 109, 100, 0.9);
                        text-align: center;
                        border-radius: 10px 10px 0px 0px;
                        }
                    h5.disciplina{
                        text-align: center;
                        }
                    .main{
                        margin-top:100px !important;
                        }
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
                    #btnAdicionar{
                        float: right;
                    }
                    #myTable{
                        margin-top: 20px;
                    }
                    #badgeConteudo{
                        width: 100%;
                        height: 20px;
                        background-color: #000;
                        color: white;
                    }
                    label.title {
                        font-weight: bold;
                        }
                    `}
                </style>
                <Container className="main">
                    <br />
                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
                    <Row>
                        <Col className="col-md-12">
                            <button type="submit" className="btn btnAnimado" id="btnAdicionar" onClick={Adicionar}>Adicionar</button>
                        </Col>
                    </Row>
                    <br />
                    {questoes}
                </Container>
            </FadeIn>
            <Footer />
        </div>
    );


}
export default webQuestions;

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

    const res = await fetch('http://localhost:8080/CreateQuest/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
    });
    const data_return = await res.json();

    return {
        props: { data_return }
    };
}