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


function historicoProntuario() {
 
    
    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setPront({ ...pront, [e.target.name]: e.target.value });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 'MQtoken': token } = parseCookies();
    

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
                        border-color: #000;
                        border-radius: 0px 0px 10px 10px;
                        
                        }
                        
                    pre{
                        margin-left: 5px;
                        }
                    #titulo{
                        background-color: #000;
                        text-align: center;
                        color: white;
                        border-radius: 10px 10px 0px 0px;
                        }
                    h3.disciplina{
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
                    hr{
                        border: 3px solid !important;
                        width: 100%;
                    }
                    `}
                </style>
            <Container className="main">
                  <div className="zoom">
                    
                        <div id="titulo">

                            <Row>
                                <Col className="col-md-11">
                                    
                                </Col>
                                
                                <Col className="col-md-1">
                                    <img
                                        src="/edit_white.png"
                                        alt="Editar"
                                        width={25}
                                        height={25}
                                        className="zoom"
                                        id="Editar"
                                        style={{marginRight: "10px"}}
                                    />
                                    <img
                                        src="/delete_white.png"
                                        alt="lixeira"
                                        width={27}
                                        height={27}
                                        className="zoom"
                                        id="lixeira"
                                    />
                                </Col>
                            </Row>
                        </div>
                    <div className="bordinha">
                    <Container>
                        <Row>
                            <Col className="col-sm-12">
                                <br />
                                <h3 className="disciplina">Psicopedagogia - Prontuário</h3>
                                <hr/>
                            </Col>
                        </Row>
                            <br />
                        <Row>
                            <Col className="col-md-3">
                                <label>
                                    <h5><strong>Responsável:</strong></h5> Willian A.
                                </label>
                            </Col>
                            <Col className="col-md-3">
                                <label>
                                   <h5><strong>Nome Paciente:</strong></h5> João Lira
                                </label>
                            </Col>
                            <Col className="col-md-3">
                                <label>
                                    <h5><strong>Trimestre:</strong></h5> 1° Trimestre 
                                </label>
                            </Col>
                            <Col className="col-md-3">
                                <label>
                                    <h5><strong>Data de Nascimento:</strong></h5> 24/02/2003 
                                </label>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                        <Col className="col-md-12">
                            <label>
                                <h5><strong>Observações:</strong></h5><br/>Lorem ipsum pulvinar donec vestibulum congue dolor commodo nisl, curabitur felis eleifend accumsan et fermentum commodo maecenas, placerat ultricies placerat aliquet viverra sagittis odio.
                            </label>
                        </Col>
                        </Row>
                    </Container> 
                    </div>
                    <br />
                </div>
            </Container>
            <Smallfooter />
        </div>
    );
};

export default historicoProntuario;