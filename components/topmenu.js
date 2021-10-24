import React, { useState, useContext } from 'react';
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

const Menu = (props) => {
    
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

    const { user } = useContext(AuthContext);
    var type_user = user.tipo_user
    var btn;
    if(type_user == 'Administrador'){
        btn = <UncontrolledDropdown nav inNavbar> 
                <DropdownToggle nav caret className="textcolor" >Gerenciar</DropdownToggle>
                    <DropdownMenu right>
                            <DropdownItem>
                            <NavItem>
                                    <NavLink href="/NovoUsuarios" className="textcolor">Novo Usuários</NavLink>
                            </NavItem>
                        </DropdownItem>

                        <DropdownItem>
                            <NavItem>
                                <NavLink href="/gerenciarUsuarios" className="textcolor">Resetar Senha</NavLink>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
            </UncontrolledDropdown>
    }else{
        btn = <div></div>
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
                    color:#000;
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
                                <NavLink href="/historicoProntuarios" className="textcolor">Prontuários</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/formularios" className="textcolor">Novo Prontuário</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/paciente" className="textcolor">Assistido</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/cadastraPaciente" className="textcolor">Cadastrar Assistido</NavLink>

                            </NavItem>
                            <NavItem>
                                {/* <NavLink href="/cadastraPaciente" className="textcolor">Cadastrar Paciente</NavLink> */}
                                {btn}
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

export default Menu;