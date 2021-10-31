import { React, useState, useContext } from 'react';
import Menu from "../components/topmenu";
import MenuResponsavel from '../components/topmenuResp';
import Smallfooter from "../components/smallfooter";
import Head from "next/head";
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
  Tooltip,
} from '../node_modules/@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import { dadosProntName } from '../services/funcContextUser';
import { parseCookies } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';


export default function graficoPaciente(props) {

  const { user } = useContext(AuthContext);
  
  
  var type_user = user.tipo_user
  var topMenuCondicional;
  if(type_user == 'Administrador' || type_user == 'Funcionario'){
      topMenuCondicional = <Menu />
  }else{
      topMenuCondicional = <MenuResponsavel/>
  }
 
  const data = JSON.parse(props.tri_1)

  const data_2_tri = JSON.parse(props.tri_2)

  const data_3_tri = JSON.parse(props.tri_3)

  // const data = [{"country":"Desenvolvido","area":10},{"country":"Em Desenvolviento","area":6},{"country":"Não Desenvolvido","area":18},{"country":"Não Avaliado","area":2}]
  // const data_2_tri = [{"country":"Desenvolvido","area":15},{"country":"Em Desenvolviento","area":9},{"country":"Não Desenvolvido","area":12},{"country":"Não Avaliado","area":0}]

  // const data_3_tri = [{"country":"Desenvolvido","area":19},{"country":"Em Desenvolviento","area":3},{"country":"Não Desenvolvido","area":8},{"country":"Não Avaliado","area":5}]

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
      {topMenuCondicional}
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
                data={data}
              >

                <PieSeries
                  valueField="area"
                  argumentField="country"
                />
                <Title
                  text="Evolução do Assistido"
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
                data={data_2_tri}
              >

                <PieSeries
                  valueField="area"
                  argumentField="country"
                />
                <Title
                  text="Evolução do Assistido"
                />
                <Legend />
                <EventTracker />
                <Tooltip />
              </Chart>
            </Paper>

          </TabPane>
          <TabPane tabId="3">
            <Paper>
              <Chart
                data={data_3_tri}
              >
                <Title
                  text="Evolução do Assistido"
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
  console.log(tri_1)
  
  const { tri_2 } = parseCookies(ctx);
  console.log(tri_2)
  
  const { tri_3 } = parseCookies(ctx);
  console.log(tri_3)
  

  return {
    props: { tri_1, tri_2, tri_3 }
  }
}

