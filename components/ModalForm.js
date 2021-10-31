import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Row, Col, Label, Input, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import Router from 'next//router';
import { AuthContext } from '../contexts/AuthContext';

function ModalForm(props){

    const { user } = useContext(AuthContext);
    var type_user = user.tipo_user
    var btn;
    if(type_user == 'Administrador' || type_user == 'Funcionario'){
        btn = <img src="/add.svg" alt="add" width={37} height={37} className="zoom" id="add"/>
    }else{
        btn = <div></div>
    }
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  
  const [agendamento, setAgendamento] = useState({
    title: "",
    startDate: "",
    endDate: "",
    location: "Room 1"
});
const [response, setResponse] = useState({
    formSave: false,
    type: '',
    message: ''
});

const { 'MQtoken': token } = parseCookies();
    const sendAgendamento = async e => {

        setResponse({ formSave: true });

        try {
            const res = await fetch('http://localhost:8080/CreateProntuario/agendamentos', {
                method: 'POST',
                body: JSON.stringify(agendamento),
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

                setTimeout(() => {
                    Router.reload()
                }, 2500);
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: "Erro: Falha ao realizar agendamento!"
            });
        }

    };


    const { register, handleSubmit, formState: { errors } } = useForm();


    const onChangeInput = e => setAgendamento({ ...agendamento, [e.target.name]: e.target.value });

  return (
    <div>
        

        {/* <img src="/add.svg" alt="add" width={37} height={37} className="zoom" id="add" onClick={toggle}/>  */}
        <div onClick={toggle}>{btn}</div>
      <Modal isOpen={modal} toggle={toggle} className="NovoAgendamento">
      {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
        {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
        <ModalHeader toggle={toggle}>Novo Agendamento</ModalHeader>
        <Form onSubmit={handleSubmit(sendAgendamento)} noValidate>
        <ModalBody>
            
                <Row>
                    <Col className="col-md-10">
                        <Label for="title">Nome do Assistido:</Label>
                        <Input className="form-control mr-sm-2" type="text" name="title" id="title"{...register("title", { required: 'Insira um nome.'})} placeholder="Nome Paciente:" onChange={onChangeInput} />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-10">
                        <Label for="startDate">Inicio:</Label>
                        <Input className="form-control mr-sm-2" type="datetime-local" name="startDate" id="startDate"{...register("startDate", { required: 'Insira uma data e hora inicial.'})} onChange={onChangeInput} />
                    </Col>
                </Row>
                <Row>
                    <Col className="col-md-10">
                        <Label for="endDate">Fim:</Label>
                        <Input className="form-control mr-sm-2" type="datetime-local" name="endDate" id="endDate"{...register("endDate", { required: 'Insira uma data e hora final.'})} onChange={onChangeInput} />
                    </Col>
                </Row>
            
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Novo Agendamento</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalForm;