import Menu from "../components/topmenu";
import Smallfooter from "../components/smallfooter";
import React, { useState } from "react";
import Head from "next/head";
import { Form, FormGroup, Label, Input, Container, Row, Col, Button, Alert } from 'reactstrap';
import { data, readyException } from "jquery";
import { useForm } from 'react-hook-form'
import { setCookie, parseCookies } from 'nookies'
import GetServerSideProps from 'next';
import { api } from '../services/api';
import { getAPIClient } from "../services/axios";
import Router from 'next//router';
import { dadosPront } from "../services/funcContextUser";

function historicoProntuario(obj) {

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setPront({ ...pront, [e.target.name]: e.target.value });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 'MQtoken': token } = parseCookies();

    function visualizarPront(id) {

        dadosPront(id)

        Router.push('/editarProntuario')
    }
    const [busca, setBusca] = useState({
        search:null
    })
    function searchSpace(event){
        let keyword = event.target.value;
        setBusca({search:keyword})
      }
    

    const dados = obj.obj
    const cardsProntuarios = dados.filter((obj)=>{
        if(busca.search == null)
            return obj
        else if(obj.RESPONSAVEL.toLowerCase().includes(busca.search.toLowerCase()) || obj.NOME_PACIENTE.toLowerCase().includes(busca.search.toLowerCase())){
            return obj
        }
      }).map((obj) => <div className="zoom" key={obj.ID_PRONT_PSICOPEDAGOGIA}>
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
                        style={{ marginRight: "10px" }}
                        onClick={() => { visualizarPront(obj.ID_PRONT_PSICOPEDAGOGIA) }}
                    />
                    {/* <img
                                src="/delete_white.png"
                                alt="lixeira"
                                width={27}
                                height={27}
                                className="zoom"
                                id="lixeira"
                            /> */}
                </Col>
            </Row>
        </div>
        
        <div className="bordinha">
            <Container>
                <Row>
                    <Col className="col-sm-12">
                        <br />
                        <h3 className="disciplina">Psicopedagogia - Prontu??rio-{obj.ID_PRONT_PSICOPEDAGOGIA}</h3>
                        <hr />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col key={obj.RESPONSAVEL} className="col-md-3">
                        <label>
                            <h5><strong>Respons??vel:</strong></h5> {obj.RESPONSAVEL}
                        </label>
                    </Col>
                    <Col key={obj.NOME_PACIENTE} className="col-md-3">
                        <label>
                            <h5><strong>Nome Assistido:</strong></h5> {obj.NOME_PACIENTE}
                        </label>
                    </Col>
                    <Col key={obj.TRIMESTRE} className="col-md-3">
                        <label>
                            <h5><strong>Trimestre:</strong></h5> {obj.TRIMESTRE}
                        </label>
                    </Col>
                    <Col key={obj.DT_NASC} className="col-md-3">
                        <label>
                            <h5><strong>Data de Nascimento:</strong></h5> {obj.DT_NASC}
                        </label>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col key={obj.OBSERVACAO} className="col-md-12">
                        <label>
                            <h5><strong>Observa????es:</strong></h5><br /> {obj.OBSERVACAO}
                        </label>
                    </Col>
                </Row>
            </Container>
        </div>
        <br />
    </div>

    )
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
                <h6>Filtros:</h6>
                <br />
                <Row>

                    <Col className="col-md-1">
                        <FormGroup>
                            <Label for="username">Respons??vel:</Label>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-3">
                        <FormGroup>
                            <Input className="form-control mr-sm-2" type="text" name="username" id="username" onChange={(e) => searchSpace(e)} />
                        </FormGroup>
                    </Col>
                    
                    <Col className="col-md-1">
                        <FormGroup>
                            <Label for="username">Assistido:</Label>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-3">
                        <FormGroup>
                            <Input className="form-control mr-sm-2" type="text" name="assistido" id="assistido" onChange={(e) => searchSpace(e)} />
                        </FormGroup>
                    </Col>
                </Row>
                <hr />
                <br />
                <br />
                {cardsProntuarios}
            </Container>

        </div>
    );
};

export default historicoProntuario;


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

    const res = await fetch('http://localhost:8080/CreateProntuario/prontuarios', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
    });
    var data_return = await res.json();

    const obj = data_return.Query_result

    return {
        props: { obj }
    };
}