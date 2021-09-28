import React from 'react';

import { Container, Jumbotron, Row, Col } from 'reactstrap';

const Smallfooter = () => {
    return (
        <Jumbotron fluid className="rodape" >
            <style>
                {`.rodape{
                    background-color: #000;
                    color: #fff;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    margin-bottom: 0rem !important;
                    
                }`}
            </style>
            
            <Container className="text-center">
                <h7>© 2021 Copyright</h7>
            </Container>
        </Jumbotron>
    );
};

export default Smallfooter;