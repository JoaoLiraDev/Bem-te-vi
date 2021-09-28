import Menu from '../components/topmenu';
import Footer from '../components/footer';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';
import FadeIn from 'react-fade-in';
import ReactPaginate from "react-paginate";
import { parseCookies } from 'nookies'
import { api } from '../services/api'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    FormGroup,
    Input,
    Badge
} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

function webSearch({ data_return }) {


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
                            Trimestre: {Query_result.TRIMESTRE}
                        </label>
                    </Col>
                    <Col className="col-md-3">
                        <label key={Query_result.DISCIPLINA} className="title">
                            Disciplina: {Query_result.DISCIPLINA}
                        </label>
                    </Col>
                    <Col className="col-md-3">
                        <label key={Query_result.AUTOR} className="title">
                            Autor: {Query_result.AUTOR}
                        </label>
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
                #btnPesquisar{
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
                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Input type="select" name="serie" id="serie">
                                    <option>Selecione um ano</option>
                                    <option>1ºAno</option>
                                    <option>2ºAno</option>
                                    <option>3ºAno</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Input type="select" name="trimestre" id="trimestre">
                                    <option>Selecione um Trimestre</option>
                                    <option>1° Trimestre</option>
                                    <option>2° Trimestre</option>
                                    <option>3° Trimestre</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Input type="select" name="materia" id="materia">
                                    <option>Selecione uma Matéria</option>
                                    <option>Lingua Portuguesa e Literatura</option>
                                    <option>Matematica</option>
                                    <option>História</option>
                                    <option>Geografia</option>
                                    <option>Fisica</option>
                                    <option>Quimíca</option>
                                    <option>Biologia</option>
                                    <option>Filosofia</option>
                                    <option>Sociologia</option>
                                    <option>Inglês Técnico</option>
                                    <option>Educação Fisica</option>
                                    <option>Banco de Dados</option>
                                    <option>Linguagem de Programação</option>
                                    <option>Programação de Aplicativos</option>
                                    <option>Projetos de T.I</option>
                                    <option>METC</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-12 ">
                            <button type="submit" className="btn btnAnimado" id="btnPesquisar">Pesquisar</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-sm-12">
                            <Badge id="badgeConteudo">Conteúdo</Badge>
                        </Col>
                    </Row>
                    <br />
                    <div className="App">
                        {questoes}
                    </div>
                    <br />
                    <br />

                </Container>
                <Footer />
            </FadeIn>
        </div>
    );
};


export default webSearch;

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
    const res = await fetch('http://localhost:8080/CreateQuest/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
    });
    const data_return = await res.json();

    return {
        props: { data_return }
    };
}