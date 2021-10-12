import Menu from "../components/topmenu";
import Smallfooter from "../components/smallfooter";
import React, { useState } from "react";
import Head from "next/head";
import { Form, FormGroup, Label, Input, Container, Row, Col, Button, Alert } from 'reactstrap';
import { data, readyException } from "jquery";
import { useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'
import GetServerSideProps from 'next';
import { api } from '../services/api';
import { getAPIClient } from "../services/axios";


function createQuestion() {
    const [pront, setPront] = useState({
            NOME_PACIENTE: '',
            DT_NASC: '',
            IDADE: '',
            TRIMESTRE : '',
            CEP: ''
    });
    
    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setPront({ ...pront, [e.target.name]: e.target.value });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 'MQtoken': token } = parseCookies();

        function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('logradouro').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";


                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };






    // function puxaCep(cep){
    //     const res = await fetch('http://localhost:8080/CreateProntuario/cadastroProntuario', {
    //         method: 'POST',
    //         body: JSON.stringify(pront),
    //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    //     });

    // }
    const sendQuest = async e => {

        setResponse({ formSave: true });

        try {
            const res = await fetch('http://localhost:8080/CreateProntuario/cadastroProntuario', {
                method: 'POST',
                body: JSON.stringify(pront),
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
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: "Erro: Falha ao cadastrar questão!"
            });
        }

    };


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
                    .form{
                        margin-top:10% !important;
                        margin-bottom:10% !important;
                    }
                    #observacao{
                        height:120px; 
                    }
                    .btn{
                        text-decoration: none;
                        text-transform: uppercase;
                        font-size: 11px;
                        font-weight: bold;
                        padding: 10px 15px;
                        overflow: hidden;
                        border: 2px solid #fffc00;
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
                      background-color: #fffc00;
                      z-index: -1;     
                      transition: 0.7s ease;
                    }
                    .btnAnimado{
                        color:#000 ;
                       
                    }.btnAnimado:before{
                      content:'';
                      width: 0;
                      height: 100%;
                      color:#000 !important;
                    }.btnAnimado:hover:before{
                        width: 100%;
                        color:#000 !important;
                    }
                    hr{
                        border: 3px solid !important;
                        width: 100%;
                    }
                    .divConteudo{
                        margin-top: 80px;
                    }
                    }
                    `}
                </style>
            <Container className="divConteudo">

                <h2 className="display-4 ml-4">Cadastro de Paciente</h2>
                <hr />
                <Form className="form" onSubmit={handleSubmit(sendQuest)} noValidate>
                    
                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}

                    <h4>Dados do Profissional</h4>
                    <hr />
                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NOME_DOC">Nome:</Label>
                                <Input type="text" name="NOME_DOC" id="NOME_DOC" placeholder="Doutor(a) responsável:" {...register("NOME_DOC", { required: 'Insira um nome' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="crp">CRP:</Label>
                                <Input type="text" name="crp" id="crp" {...register("CRP", { required: 'Insira uma Data' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="especialidade">Especialidade:</Label>
                                <Input type="select" name="especialidade" id="especialidade" onChange={onChangeInput}>
                                    <option>Selecione uma especialidade</option>
                                    <option>Psicopedagogia</option>
                                    
                                </Input>                            
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <br/>
                    <h4>Dados do responsável</h4>
                    <hr />
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="NOME_RESPONSAVEL">Nome:</Label>
                                <Input type="text" name="NOME_RESPONSAVEL" id="NOME_RESPONSAVEL" placeholder="Nome Completo:" {...register("NOME_RESPONSAVEL", { required: 'Insira o nome do responsável' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="DT_NASC_RESPONSAVEL">Data de Nascimento:</Label>
                                <Input type="date" name="DT_NASC" id="DT_NASC" {...register("DT_NASC", { required: 'Insira uma Data' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="rg">RG:</Label>
                                    <Input type="text" name="rg" id="rg" placeholder="RG:" {...register("rg")} onChange={onChangeInput} />
                                
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="CPF">CPF:</Label>
                                <Input type="text" name="CPF" id="CPF" placeholder="CPF:" {...register("CPF", { required: 'Insira o nome do responsável' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="Telefone">Telefone para contato:</Label>
                                <Input type="text" name="Telefone" id="Telefone" placeholder="(xx) xxxx-xxxx" {...register("Telefone")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="Email">Email:</Label>
                                <Input type="email" name="Email" id="Email" placeholder="Email:" {...register("Email")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="cep">CEP:</Label>
                                <Input type="text" name="cep" id="cep" value="" placeholder="CEP:" {...register("cep")} onChange={onChangeInput} onBlur={pesquisacep(pront.CEP)}  />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <Label for="uf">UF:</Label>
                            <Input type="text" name="uf" id="uf" placeholder="UF:" {...register("uf")} onChange={onChangeInput} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <Label for="logradouro">Logradouro:</Label>
                            <Input type="text" name="logradouro" id="logradouro" placeholder="Logradouro:" {...register("logradouro")} onChange={onChangeInput} />
                        </Col>

                        <Col className="col-md-3">
                            <Label for="complemento">Complemento:</Label>
                            <Input type="text" name="complemento" id="complemento" placeholder="Complemento:" {...register("complemento")} onChange={onChangeInput} />
                        </Col>

                        <Col className="col-md-3">
                            <Label for="bairro">Bairro:</Label>
                            <Input type="text" name="bairro" id="bairro" placeholder="Bairro:" {...register("bairro")} onChange={onChangeInput} />
                        </Col>

                        <Col className="col-md-3">
                            <Label for="cidade">Cidade:</Label>
                            <Input type="text" name="cidade" id="cidade" placeholder="Cidade:" {...register("cidade")} onChange={onChangeInput} />
                            
                        </Col>
                    </Row>
                    <br/>
                    <h4>Dados do paciente</h4>
                    <hr />
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="NOME_PACIENTE">Nome:</Label>
                                <Input type="text" name="NOME_PACIENTE" id="NOME_PACIENTE" placeholder="Nome Completo:" {...register("NOME_PACIENTE", { required: 'Insira o nome do responsável' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="DT_NASC_PACIENTE">Data de Nascimento:</Label>
                                <Input type="date" name="DT_NASC_PACIENTE" id="DT_NASC_PACIENTE" {...register("DT_NASC_PACIENTE", { required: 'Insira uma Data' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="rg">RG:</Label>
                                    <Input type="text" name="rg" id="rg" placeholder="RG:" {...register("rg")} onChange={onChangeInput} />
                                
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="CPF">CPF:</Label>
                                <Input type="text" name="CPF" id="CPF" placeholder="CPF:" {...register("CPF", { required: 'Insira o nome do responsável' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="Telefone">Telefone para contato:</Label>
                                <Input type="text" name="Telefone" id="Telefone" placeholder="(xx) xxxx-xxxx" {...register("Telefone")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="Email">Email:</Label>
                                <Input type="email" name="Email" id="Email" placeholder="Email:" {...register("Email")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="cep">CEP:</Label>
                                <Input type="text" name="cep" id="cep" placeholder="CEP:" {...register("cep")} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <Label for="uf">UF:</Label>
                            <Input type="text" name="uf" id="uf" placeholder="UF:" {...register("uf")} onChange={onChangeInput} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-3">
                            <Label for="logradouro">Logradouro:</Label>
                            <Input type="text" name="logradouro" id="logradouro" placeholder="Logradouro:" {...register("logradouro")} onChange={onChangeInput} />
                        </Col>

                        <Col className="col-md-3">
                            <Label for="complemento">Complemento:</Label>
                            <Input type="text" name="complemento" id="complemento" placeholder="Complemento:" {...register("complemento")} onChange={onChangeInput} />
                        </Col>

                        <Col className="col-md-3">
                            <Label for="bairro">Bairro:</Label>
                            <Input type="text" name="bairro" id="bairro" placeholder="Bairro:" {...register("bairro")} onChange={onChangeInput} />
                        </Col>

                        <Col className="col-md-3">
                            <Label for="cidade">Cidade:</Label>
                            <Input type="text" name="cidade" id="cidade" placeholder="Cidade:" {...register("cidade")} onChange={onChangeInput} />
                            
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Smallfooter />
        </div>
    );
};

export default createQuestion;

// export async function getServerSideProps(ctx) {
//     const APIClient = getAPIClient(ctx)
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