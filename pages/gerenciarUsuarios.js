import React, { useState } from "react";
import Menu from "../components/topmenu";
import Smallfooter from "../components/smallfooter";
import Head from "next/head";
import { Form, FormGroup, Label, Input, Container, Row, Col, Button, Alert } from 'reactstrap';
import { data, readyException } from "jquery";
import { useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'
import GetServerSideProps from 'next';
import { api } from '../services/api';
import { getAPIClient } from "../services/axios";
import Router from 'next//router';
import { dadosProntName } from "../services/funcContextUser";


function Paciente(props) {
  
    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const { 'MQtoken': token } = parseCookies();
    async function sendReset(id){

        setResponse({ formSave: true });

        try {
            const res = await fetch(`http://localhost:8080/Usuarios/resetarSenha/${id}`, {
                method: 'PUT',
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
                alert(responseEnv.senhaNova);
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
                message: err
            });
        }

    };

    const [busca, setBusca] = useState({
        search:null
    })
    function searchSpace(event){
        let keyword = event.target.value;
        setBusca({search:keyword})
      }
    
    const dados = props.data_return.user
    const cardsUsuarios = dados.filter((user)=>{
        if(busca.search == null)
            return user
        else if(user.USERNAME.toLowerCase().includes(busca.search.toLowerCase()) || user.EMAIL.toLowerCase().includes(busca.search.toLowerCase())){
            return user
        }
      }).map((user) =><div className="zoom" key={user.ID_USERS}>                              
            <div className="bordinha" >
            <Container>
                <Row>
                    <Col key={user.ID_USERS} className="col-md-1">
                        <label>
                            <h5><strong>ID:</strong></h5> {user.ID_USERS} 
                        </label>
                    </Col>
                    <Col key={user.USERNAME} className="col-md-2">
                        <label>
                            <h5><strong>Username:</strong></h5> {user.USERNAME}
                        </label>
                    </Col>
                    <Col key={user.EMAIL} className="col-md-3">
                        <label>
                        <h5><strong>Email:</strong></h5> {user.EMAIL}
                        </label>
                    </Col>
                    <Col key={user.SUBS_TYPE} className="col-md-3">
                        <label>
                        <h5><strong>Tipo Usuário:</strong></h5> {user.SUBS_TYPE}
                        </label>
                    </Col>
                    <Col key={user.NOME_PACIENTE} className="col-md-3">
                        <label>
                        <button type="button" onClick={() => {sendReset(user.ID_USERS)}} className="btn btnAnimado" id="btnCriar" >Resetar senha</button>
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
                        border-top-style: solid;
                        border-bottom-style: solid;
                        border-left-style: solid;
                        border-right-style: solid;
                        border-color: #000;
                        border-radius: 10px 10px 10px 10px;
                        padding-top: 6px;
                        padding-right: 6px;
                        padding-left: 6px;
                        padding-bottom: 6px;
                        max-width: 100%;
                        
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
                <br/>
            <Row>
                    
                    <Col className="col-md-1">
                        <FormGroup>
                            <Label for="username">Username:</Label>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-3">
                        <FormGroup>
                            <Input className="form-control mr-sm-2" type="text" name="username" id="username" onChange={(e)=> searchSpace(e)} />
                        </FormGroup>
                    </Col>
                    <Col className="col-md-1">
                        <FormGroup>
                            <Label for="email">Email:</Label>
                        </FormGroup>
                    </Col>
                    <Col className="col-md-3">
                        <FormGroup>
                            <Input className="form-control mr-sm-2" type="text" name="email" id="email" onChange={(e)=> searchSpace(e)} />
                        </FormGroup>
                    </Col>
                    
                </Row>
                <hr/>
                {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
                <br/>
                <br/>
                  {cardsUsuarios}
            </Container>
            
            <Smallfooter />
        </div>
    );
};

export default Paciente;


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
    
    const res = await fetch('http://localhost:8080/Usuarios/usuarios', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
    });
    var data_return = await res.json();
    
    return {
        props: { data_return }
    };
}