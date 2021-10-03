import Menu from '../components/topmenu';

import Footer from '../components/footer';
import React, { useEffect } from 'react';
import Head from 'next/head';
import GetServerSideProps from 'next';
import { Button, Container, Jumbotron, Col, Row, Image } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { api } from '../services/api';
import { parseCookies } from 'nookies'
import { getAPIClient } from '../services/axios';
import { ScheduleComponent } from '@syncfusion/ej2-react-schedule';

function HomePage() {
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
                    background-color: #fff;
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
                      margin-top: 100px;
                      margin-bottom: 50px;
                  }
                `}
            </style>

            <Jumbotron className="descr-top">
                <h1 className="display-4 ml-4">Bem-vindos à plataforma Bem-Te-Vi!</h1>
                <hr />
                <Container className="containerFlex">
                  <ScheduleComponent></ScheduleComponent>
                </Container>
            </Jumbotron>

            <Footer />
        </div>
    );
};

export default HomePage;

// export async function getServerSideProps(ctx) {

//     const { MQtoken } = parseCookies(ctx)

//     if (!MQtoken) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             }
//         }
//     }
//     return {
//         props: {}
//     }
// }