import React, { useState } from 'react';
import Image from 'next/image'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <style>
                {`.menu-custom{
                    background-color:#322153;
                }
                `}
            </style>
            <Navbar className="menu-custom" dark expand="md">
                <Container>
                    <NavbarBrand href="/">
                        <Image
                            src="/logo-fieb.png"
                            alt="Picture of the author"
                            width={164}
                            height={58}
                        />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Image src="/magnifying-glass.png" alt="Picture of the author" width={36} height={36} />
                                <NavLink href="/">Pesquisar</NavLink>
                            </NavItem>
                            <NavItem>
                                <Image src="/question-mark.png" alt="Picture of the author" width={36} height={36} />
                                <NavLink href="/">Suas Questões</NavLink>
                            </NavItem>
                            <NavItem>
                                <Image src="/add.png" alt="Picture of the author" width={37} height={36} />
                                <NavLink href="/">Criar</NavLink>
                            </NavItem>
                            <NavItem>
                                <Image src="/down-arrow.png" alt="Picture of the author" width={37} height={36} />
                                <NavLink href="/">Download app</NavLink>
                            </NavItem>
                            <NavItem>
                                <Image src="/settings.png" alt="Picture of the author" width={35} height={35} />
                                <NavLink href="/">Configurações</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default Menu;