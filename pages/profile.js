import Menu from '../components/topmenu';
import Smallfooter from '../components/smallfooter';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Footer from '../components/footer';
import { parseCookies } from 'nookies'
import {
  Button,
  ButtonGroup,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Toast,
  ToastBody,
  ToastHeader,
  Media,
  Card
} from 'reactstrap';


function Config_profile(props) {

  const { user } = useContext(AuthContext);

  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      <Menu />
      <style>
        {`
              .main{
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
                background-color: #fff;
                margin-top: 2rem !important;
              }
              .form_meio{
                margin-left:25rem !important; 
              }
              #profile{
                border-radius: 50% !important;
                margin-right: 1rem !important;
              }
            `}
      </style>

      <div>
        <Jumbotron fluid className="descr-top">
          <Container className="text-center">
            <img src="profile.png" width="256px" height="256px" alt="img profile" />
            <h1 className="display-3">Perfil</h1>
            <p className="lead">{user.username}</p>
            <p className="lead">{user.email}</p>
          </Container>
          <Container className="form_meio">
            <h4 className="display-4">Editar</h4>
            <hr />
            <Form>
              <Row>
                <Col className="col-md-6">
                  <FormGroup controlId="formGroupEmail">
                    <Label>Endereço de E-mail</Label>
                    <Input type="email" placeholder="Enter email" defaultValue={user.email} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-md-6">
                  <FormGroup controlId="formGroupPassword">
                    <Label>Senha</Label>
                    <Input type="password" placeholder="Password" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-md-6">
                  <FormGroup controlId="formGroupPassword">
                    <Label>Confirme a Senha</Label>
                    <Input type="password" placeholder="Password" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <button className="btn btnAnimado">Salvar</button>
                <button className="btn btnAnimado">Confirmar E-mail</button>
              </Row>
            </Form>
          </Container>
          <br />
          <Jumbotron fluid className="descr-top">
            <Container className="form_meio">
              <h3>Mais</h3>
              <hr />
              <Form>
                <Row>
                  <Col sm="4">
                    <Card body>
                      <Media>
                        <Media left top href="#">
                          <img
                            src="/iconMale.jpeg"
                            alt="Profile pic"
                            width={64}
                            height={64}
                            id="profile"
                          />
                        </Media>
                        <Media body>
                          <Media heading>
                            Nome de usuário
                          </Media>
                          Email@example.com.br
                        </Media>
                      </Media>
                      <FormGroup check>
                        <Label check className="ml-3">
                          <Input type="checkbox" /> Check me out
                        </Label>
                      </FormGroup>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm="4">
                    <Card body>
                      <Media>
                        <Media left top href="#">
                          <img
                            src="/iconFemale.jpeg"
                            alt="Profile pic"
                            width={64}
                            height={64}
                            id="profile"
                          />
                        </Media>
                        <Media body>
                          <Media heading>
                            Nome de usuário
                          </Media>
                          Email@example.com.br
                        </Media>
                      </Media>
                      <FormGroup check>
                        <Label check className="ml-3">
                          <Input type="checkbox" /> Check me out
                        </Label>
                      </FormGroup>
                    </Card>
                  </Col>
                </Row>
                <br />
                <Row>
                  <button className="btn btnAnimado">Adicionar Conta</button>
                  <button className="btn btnAnimado" onClick={toggle}>Excluir Conta</button>
                  <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Excluir Conta</ModalHeader>
                    <ModalBody>
                      Você tem certeza de que deseja excluir esta conta?
                      Em alguns dias será expirado e você não terá mais acesso!
                    </ModalBody>
                    <ModalFooter>
                      <button className="btn" onClick={toggle}>Sim, tenho certeza</button>{' '}
                      <button className="btn" onClick={toggle}>Não, botão errado...</button>
                    </ModalFooter>
                  </Modal>
                </Row>
              </Form>
            </Container>
          </Jumbotron>
        </Jumbotron>
      </div>
      <Footer />
    </div >
  );
};
export default Config_profile;


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