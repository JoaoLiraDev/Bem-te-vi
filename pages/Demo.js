import { React, useState } from 'react';
import Menu from "../components/topmenu";
import Smallfooter from "../components/smallfooter";
import Head from "next/head";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import { dadosProntName } from '../services/funcContextUser';
import { parseCookies } from 'nookies';


export default function graficoPaciente(props) {
  console.log(props)

  const data = props.trim_1

  const data_2_tri = props.trim_2

  const data_3_tri = props.trim_3

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="fundo">
      <Head>
        <title>
          BTV
        </title>
      </Head>
      <Menu />
      <style>
        {`
              .fundo{
                background-color: rgba(184, 184, 180, 0.3);
              }
              .mainJ{
                  margin-top:75px;
                  
                }
                
              `}
      </style>
      <div className="mainJ"></div>
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              1° Trimestre
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              2° Trimestre
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              3° Trimestre
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Paper>
              <Chart
                data={props.trim_1}
              >

                <PieSeries
                  valueField="area"
                  argumentField="country"
                />
                <Title
                  text="Evolução Paciente"
                />
                <Legend />
                <EventTracker />
                <Tooltip />
              </Chart>
            </Paper>
          </TabPane>
          <TabPane tabId="2">
            <Paper>
              <Chart
                data={props.trim_2}
              >
                <Title
                  text="Evolução Paciente"
                />
                <Legend />
                <PieSeries
                  valueField="area"
                  argumentField="country"
                />
                <EventTracker />
                <Tooltip />
              </Chart>
            </Paper>
          </TabPane>
          <TabPane tabId="3">
            <Paper>
              <Chart
                data={props.trim_3}
              >
                <Title
                  text="Evolução Paciente"
                />
                <Legend />
                <PieSeries
                  valueField="area"
                  argumentField="country"
                />
                <EventTracker />
                <Tooltip />
              </Chart>
            </Paper>
          </TabPane>
        </TabContent>
      </Container>
      <br />
      <br />
      <br />

      <br />
      <br />
      <br />

      <br />
      <br />
      <Smallfooter class="fixed-bottom" />
    </div>
  );
}



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
  const { tri_1 } = parseCookies(ctx);
  var trim_1 = JSON.parse(tri_1)
  const { tri_2 } = parseCookies(ctx);
  var trim_2 = JSON.parse(tri_2)
  const { tri_3 } = parseCookies(ctx);
  var trim_3 = JSON.parse(tri_3)

  return {
    props: { trim_1, trim_2, trim_3 }
  }
}

