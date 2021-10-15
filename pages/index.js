import React, { useState , useEffect, useContext } from 'react';
import Menu from '../components/topmenu';
import { render } from "react-dom";
import Smallfooter from "../components/smallfooter";
import Head from 'next/head';
import GetServerSideProps from 'next';
import { Alert, Button, Container, Jumbotron, Label, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { api } from '../services/api';
import { parseCookies } from 'nookies'
import { getAPIClient } from '../services/axios';
import Paper from '@material-ui/core/Paper';
import Router from 'next//router';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';

import ModalForm from '../components/ModalForm'
import ModalEdit from '../components/ModalEdit';
import { AuthContext } from '../contexts/AuthContext';


function HomePage(obj) {
  const { user } = useContext(AuthContext);
  var type_user = user.tipo_user
  var btn;
  if(type_user == 'Administrador'){
      btn = <img src="/delete.svg" alt="lixeira" width={37} height={37} className="zoom" id="lixeira" onClick={toggle}/>
  }else{
      btn = <div></div>
  }
  



  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  var dataAtual = ano + '-' + mes + '-' + dia;
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dados_bd = obj.obj
  const [state, setDate] = useState({
    data: dados_bd,
    currentDate: dataAtual,
  });
  const currentDateChange = (currentDate) => { setDate({ data: dados_bd, currentDate: currentDate }); };
  
  const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: ''
});

const { 'MQtoken': token } = parseCookies();

async function excluirAgendamento(id){
  try {
      const res = await fetch("http://localhost:8080/CreateProntuario/delete_agendamento/" + id, {
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
  }, 1500);
};

  const datasFormatadas = obj.obj_2
 
  const agendamentos = datasFormatadas.map((obj_2) => <div className="zoom bordinha"> 
    <Row>
      <Col key={obj_2.title} className="col-md-5">
        <Label>Nome: </Label><br/>
        <Label>{obj_2.title}</Label>
      </Col>
      <Col key={obj_2.startDate} className="col-md-6">
        <Label>Data Agendada: </Label><br/>
        <Label>{obj_2.startDate}</Label>
      </Col>
      <img
      src="/trash.svg"
      alt="lixeira"
      width={27}
      height={27}
      className="zoom"
      id="lixeira"
      onClick={() => {excluirAgendamento(obj_2.id)}}
        />
    </Row>
  </div>
  );



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
                border-top-style: solid;
                margin-top: 5px;
                border-color: rgba(233, 109, 100, 0.9);
                border-radius: 10px 10px 10px 10px;
                padding-top: 6px;
                padding-right: 6px;
                padding-left: 6px;
                padding-bottom: 6px;
                max-width: 100%;
                
                }
              .main{
                  margin:0 !important;
              }
              .mainJ{
                  margin-top:100px;
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
                background-color: #E96C64;
                z-index: -1;     
                transition: 0.7s ease;
              }
              .btnAnimado{
                  color:#E96C64 ;
                  
              }.btnAnimado:before{
                content:'';
                width: 0;
                height: 100%;
                color:#fff !important;
              }.btnAnimado:hover:before{
                  width: 100%;
                  color:#fff !important;
                
              }
                #imgpos {
                position: absolute;
                left: 60%;
                top: 15%
                } 
                .text{
                text-decoration: none;
                text-transform: uppercase;
                font-size: 11px;
                font-weight: bold;
                left: 60%;
                top: 15%
                }
                .descr-top{
                  background-color: rgba(184, 184, 180, 0.3);
                  margin-top: 2rem !important;
                }
                .form_meio{
                  margin-left:25rem !important; 
                }
                h2{
                  font-weight: bold !important;
                }
                hr{
                    border: 3px solid !important;
                    width: 700px;
                    margin-top: 70px;
                }
                .containerFlex{
                    display: flex;
                    margin-top: 50px;
                }
              `}
          </style>
          
          
          <Jumbotron className="descr-top">
              <h1 className="display-4 ml-4">Bem-vindos à plataforma Bem-Te-Vi!</h1>
             
              <hr />
              <Container>
              <Row>
                <Col className="col-md-10"></Col>
                <Col className="col-md-1">
                  <ModalForm/>
                </Col>
                <Col className="col-md-1">
                {/* <img src="/delete.svg" alt="lixeira" width={37} height={37} className="zoom" id="lixeira" onClick={toggle}/>  */}
                <div onClick={toggle}>{btn}</div>
                  <Modal isOpen={modal} toggle={toggle} className="NovoAgendamento">
                    <ModalHeader toggle={toggle}>Cancelar Agendamento</ModalHeader>
                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
                        <ModalBody>
                            {agendamentos}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>Cancelar</Button>
                        </ModalFooter>
                  </Modal>
                </Col>

                
              </Row>
              </Container>
              <br/>
              <Paper>
              <Scheduler
                data={state.data}
                height={1090}
                locale={"PT-br"}
              >
                <ViewState
                  currentDate={state.currentDate}
                  onCurrentDateChange={currentDateChange}
                />
                <WeekView
                  startDayHour={7.50}
                  endDayHour={17}
                />
                
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip
                  showCloseButton
                  
                />
                
              </Scheduler>
            </Paper>
              
          </Jumbotron>

          <Smallfooter />
      </div>
  );
};

export default HomePage;

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
    
    const res = await fetch('http://localhost:8080/CreateProntuario/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
    });
    var data_return = await res.json();
    
    const res_data = await fetch('http://localhost:8080/CreateProntuario/allFormatado', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
    });
    var data_return_2 = await res_data.json();
    
    const obj = data_return.Query_result
    const obj_2 = data_return_2.Query_result
    console.log(obj)
    return {
        props: { obj, obj_2 }
    };
}