import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image'
import Router from 'next//router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Badge
} from 'reactstrap';
import { destroyCookie } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';
import { dadosProntName } from "../services/funcContextUser";
import {dadosPaciente} from '../services/funcContextUser';

const MenuResponsavel = (props) => {


    const { user } = useContext(AuthContext);
    
    
    const [paciente, setPaciente] = useState({
        nomePaciente: ''
    })
 
    const email = user.email

    useEffect(() => {
        
            dadosPaciente(email).then(response => {  
                try{
                    setPaciente({
                        nomePaciente: response[0].NOME_PACIENTE
                    })
                }catch{
                    setPaciente({
                        nomePaciente: ''
                    })
                }
            })
        
    }, [])
    
    function visualizarGrafico(name){
        const nome = {
            "name": `${name}`
        }
        
          dadosProntName(nome)
          setTimeout(() => {
            Router.push('/Demo')
          }, 1100);
        
    }


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    function Logout() {
        destroyCookie({}, 'MQtoken')
        destroyCookie({}, 'email_user')
        destroyCookie({}, 'tri_3')
        destroyCookie({}, 'tri_2')
        destroyCookie({}, 'tri_1')
        Router.push('/login')
    }

    return (
        <div>
            <style>
                {`.menu-custom{
                    background-color:#fffc00;
                }
                .textcolor{
                    color:#000 !important;
                    text-decoration: none !important;
                }
                .bkdrop DropdownItem:hover{
                    color:#c0c0c0;
                }
                `}
            </style>
            <Navbar className="menu-custom" dark expand="md" fixed="top">
                <Container>
                    <NavbarBrand href="/">
                        <Image
                            src="/Logo Preta.png"
                            alt="Picture of the author"
                            width={90}
                            height={40}
                        />
                    </NavbarBrand>

                    <div className="sidebar-sticky"></div>

                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="#" onClick={() => {visualizarGrafico(paciente.nomePaciente)}} className="textcolor">Acompanhar Progresso</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav>
                            <NavItem>
                                <NavLink onClick={Logout}><Image src="/logout.png" alt="Picture of the author" width={20} height={20} /></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>

            </Navbar>
        </div>
    );
}

export default MenuResponsavel;

