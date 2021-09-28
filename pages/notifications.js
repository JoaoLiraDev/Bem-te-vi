import Menu from '../components/topmenu';
import Smallfooter from '../components/smallfooter';
import React, { useState } from 'react';
import Footer from '../components/footer';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardGroup, Button, Container, Jumbotron, Col, Row, CustomInput } from 'reactstrap';
import { parseCookies } from 'nookies';
import Calendar from 'react-calendar';


const Config_notifications = (props) => {
  const [date, setDate] = useState(new Date());
  const {
    buttonLabel,
    className
  } = props;
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
              .calendar_meio{
                margin-left: 15rem !important; 
              }
              .reminder{
                margin-left: 40rem !important;
              }

              ul {list-style-type: none;}
              body {font-family: Verdana, sans-serif;}

              .calendar {
                border-radius: 5px 5px 5px 5px;
              }
              .display{
                display: flex !important;
              }
              
            `}
      </style>
      <Jumbotron className="descr-top">
        <h1 className="display-4 ml-4">Lembretes</h1>
        <hr />
        <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="Turn on the notifications" />

        <Container className="display">
          <div>
            <Calendar className="calendar"
              onChange={setDate}
              value={date}
            />
          </div>

          <div>
            <Row>
              <Col className="col-md-4">
                <Card>
                  <CardTitle tag="h5">Lembrete</CardTitle>
                  <CardBody>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Dia 24/06</CardSubtitle>
                    <CardText>Avaliação Mensal</CardText>
                    <button className="btn btnAnimado">Ignorar</button><br />
                    <button className="btn btnAnimado">Lembrar de novo...</button>
                  </CardBody>
                </Card>
              </Col>
              <Col className="col-md-4">
                <Card>
                  <CardTitle tag="h5">Lembrete</CardTitle>
                  <CardBody>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Dia 25/06</CardSubtitle>
                    <CardText>Avaliação Mensal</CardText>
                    <button className="btn btnAnimado">Ignorar</button><br />
                    <button className="btn btnAnimado">Lembrar de novo...</button>
                  </CardBody>
                </Card>
              </Col>
              <Col className="col-md-4">
                <Card>
                  <CardTitle tag="h5">Lembrete</CardTitle>
                  <CardBody>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Dia 26/06</CardSubtitle>
                    <CardText>Avaliação Trimestral</CardText>
                    <button className="btn btnAnimado">Ignorar</button><br />
                    <button className="btn btnAnimado">Lembrar de novo...</button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </Jumbotron>
      <Footer />
    </div>
  );
};

export default Config_notifications;

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