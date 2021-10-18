import Menu from "../components/topmenu";
import Smallfooter from "../components/smallfooter";
import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { Form, FormGroup, Label, Input, Container, Row, Col, Button, Alert } from 'reactstrap';
import { data, readyException } from "jquery";
import { useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'
import GetServerSideProps from 'next';
import { api } from '../services/api';
import { getAPIClient } from "../services/axios";
import { dadosPront } from "../services/funcContextUser";
import { AuthContext } from '../contexts/AuthContext';
import Router from 'next//router';

function editaPront(props) {
  
    const { user } = useContext(AuthContext);
    var type_user = user.tipo_user
    var btn;
    if(type_user == 'Administrador'){
        btn = <button type="button" onClick={habilitarEdicao} className="btn btnAnimado" id="btnCadastrar" >Habilitar Edição</button>
    }else{
        btn = <div></div>
    }
    
    
    const [pront, setPront] = useState({
            NOME_PACIENTE: props.prontuario.NOME_PACIENTE,
            DT_NASC: props.prontuario.data_formatada,
            IDADE: props.prontuario.IDADE,
            TRIMESTRE : props.prontuario.TRIMESTRE,
            PERCEP_VISUAL_SENSORIAL: props.prontuario.PERCEP_VISUAL_SENSORIAL,
            FORMAS_GEOMETRICAS: props.prontuario.FORMAS_GEOMETRICAS, 
            CORES_PRIMARIAS: props.prontuario.CORES_PRIMARIAS, 
            RELACAO_OBJ_FIGURAS: props.prontuario.RELACAO_OBJ_FIGURAS,
            SEGURA_LAPIS: props.prontuario.SEGURA_LAPIS,
            SEGURA_GIZ: props.prontuario.SEGURA_GIZ,
            CONCENTRACAO: props.prontuario.CONCENTRACAO,
            LENTIDAO: props.prontuario.LENTIDAO, 
            CANSAR_FACIL: props.prontuario.CANSAR_FACIL, 
            ORDENS: props.prontuario.ORDENS,
            COMUNICACAO: props.prontuario.COMUNICACAO,
            SENTIMENTOS: props.prontuario.SENTIMENTOS,
            COERENCIA_ORDEM: props.prontuario.COERENCIA_ORDEM,
            OBJ_FINALIDADE: props.prontuario.OBJ_FINALIDADE,
            PREFERENCIA: props.prontuario.PREFERENCIA,
            NUMEROS_1: props.prontuario.NUMEROS_1,
            NUMEROS_2: props.prontuario.NUMEROS_2,
            NUMEROS_3: props.prontuario.NUMEROS_3,
            CONTAR_NUM_LETRAS: props.prontuario.CONTAR_NUM_LETRAS,
            NUM_QUANT: props.prontuario.NUM_QUANT,
            RELACIONA_CONJUNTOS: props.prontuario.RELACIONA_CONJUNTOS,
            RELACIONA_SEQUENCIA: props.prontuario.RELACIONA_SEQUENCIA,
            RECONHECER_NUM: props.prontuario.RECONHECER_NUM,
            EXPRESSAO_ORAL_ESCRITA: props.prontuario.EXPRESSAO_ORAL_ESCRITA,
            VOCABULARIO: props.prontuario.VOCABULARIO,
            RELACAO_ESCRITA_FALA: props.prontuario.RELACAO_ESCRITA_FALA,
            PRONUNCIA_PALAVRAS: props.prontuario.PRONUNCIA_PALAVRAS,
            RECUSA_FALA: props.prontuario.RECUSA_FALA,
            RECONHECER_FIGURA: props.prontuario.RECONHECER_FIGURA,
            VERBALIZA: props.prontuario.VERBALIZA,
            DIZ_NOME_PROP: props.prontuario.DIZ_NOME_PROP,
            DIZ_NOME_PESSOA_CONHECIDAS: props.prontuario.DIZ_NOME_PESSOA_CONHECIDAS,
            NOMEIA_DESENHO: props.prontuario.NOMEIA_DESENHO,
            LIVROS_REVISTAS: props.prontuario.LIVROS_REVISTAS,
            DIS_VOGAIS: props.prontuario.DIS_VOGAIS,
            DIS_ALFABETO: props.prontuario.DIS_ALFABETO,
            RESPONSAVEL: props.prontuario.RESPONSAVEL,
            OBSERVACAO: props.prontuario.OBSERVACAO
    });

        
    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const [stateDisable, setStateDisable] = useState(true)
    const habilitarEdicao = () => setStateDisable(!stateDisable) 

    const onChangeInput = e => setPront({ ...pront, [e.target.name]: e.target.value });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { 'MQtoken': token } = parseCookies();
    async function sendQuest(id) {
       
        setResponse({ formSave: true });

        try {
            const res = await fetch(`http://localhost:8080/CreateProntuario/atualizaProntuario/${id}`, {
                method: 'PATCH',
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
                setTimeout(() => {
                    setResponse({
                        formSave: false,
                        type: '',
                        message: ''
                    });
                    Router.push('/historicoProntuarios')
                }, 2000);
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

            <Container>
                <style>
                    {`
                    .form{
                        margin-top:15% !important;
                        margin-bottom:10% !important;
                    }
                    #observacao{
                        height:120px; 
                    }
                    .block:disabled{
                        cursor: no-drop;
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
                    }
                    `}
                </style>


                <Form className="form" onSubmit={handleSubmit(sendQuest)} noValidate>
                    {/* {errors.ano && <Alert color="danger">{errors.ano.message}</Alert>}
                    {errors.trimestre && <Alert color="danger">{errors.trimestre.message}</Alert>}
                    {errors.materia && <Alert color="danger">{errors.materia.message}</Alert>}
                    {errors.autor && <Alert color="danger">{errors.autor.message}</Alert>}
                    {errors.conteudo && <Alert color="danger">{errors.conteudo.message}</Alert>}
                    {errors.descricao && <Alert color="danger">{errors.descricao.message}</Alert>} */}

                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}
                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NOME_PACIENTE">Nome:</Label>
                                <Input type="text" name="NOME_PACIENTE" id="NOME_PACIENTE" placeholder="Nome Completo:" disabled={stateDisable} value={pront.NOME_PACIENTE} {...register("NOME_PACIENTE", { required: 'Insira um nome' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="DT_NASC">Data de Nascimento:</Label>
                                <Input type="date" name="DT_NASC" id="DT_NASC" disabled={stateDisable} value={pront.DT_NASC} {...register("DT_NASC", { required: 'Insira uma Data' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-2">
                            <FormGroup>
                                <Label for="idade">Idade:</Label>
                                <Input type="number" name="IDADE" id="IDADE" placeholder="Idade:" disabled={stateDisable} value={pront.IDADE} {...register("IDADE", { required: 'Insira o conteúdo' })} onChange={onChangeInput} />
                            </FormGroup>
                        </Col>
                        <Col className="col-md-3">
                            <FormGroup>
                                <Label for="trimestre">Trimestre:</Label>
                                <Input type="select" disabled={stateDisable} name="TRIMESTRE" id="TRIMESTRE" disabled={stateDisable} value={pront.TRIMESTRE} {...register("TRIMESTRE", { required: 'Selecione uma opção' })} onChange={onChangeInput}>
                                    <option>Selecione um Trimestre</option>
                                    <option>1° Trimestre</option>
                                    <option>2° Trimestre</option>
                                    <option>3° Trimestre</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br/>
                    <h5>Aspectos terapêuticos: Cognitivos, Afetivos, Psicomotores, Linguísticos e de Comportamentos:</h5>
                    <hr style={{border: "2px solid !important", width: "100%", margintop: "70px"}}/>
                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="PERCEP_VISUAL_SENSORIAL">Percepções visuais e sensoriais:</Label>
                                <Input type="select" disabled={stateDisable} name="PERCEP_VISUAL_SENSORIAL" id="PERCEP_VISUAL_SENSORIAL" value={pront.PERCEP_VISUAL_SENSORIAL} disabled={stateDisable} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="FORMAS_GEOMETRICAS">Identifica e nomeia as formas geométricas:</Label>
                                <Input type="select" disabled={stateDisable} name="FORMAS_GEOMETRICAS" id="FORMAS_GEOMETRICAS" value={pront.FORMAS_GEOMETRICAS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="CORES_PRIMARIAS">Nomeia as cores primarias:</Label>
                                <Input type="select" disabled={stateDisable} name="CORES_PRIMARIAS" id="CORES_PRIMARIAS" value={pront.CORES_PRIMARIAS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RELACAO_OBJ_FIGURAS">Relaciona objetos e figuras por tamanho:</Label>
                                <Input type="select" disabled={stateDisable} name="RELACAO_OBJ_FIGURAS" id="RELACAO_OBJ_FIGURAS" value={pront.RELACAO_OBJ_FIGURAS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="SEGURA_LAPIS">Segura adequadamente o lápis:</Label>
                                <Input type="select" disabled={stateDisable} name="SEGURA_LAPIS" id="SEGURA_LAPIS" value={pront.SEGURA_LAPIS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="SEGURA_GIZ">Segura adequadamente o giz de cera:</Label>
                                <Input type="select" disabled={stateDisable} name="SEGURA_GIZ" id="SEGURA_GIZ" value={pront.SEGURA_GIZ} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="CONCENTRACAO">Tem concentração satisfatória:</Label>
                                <Input type="select" disabled={stateDisable} name="CONCENTRACAO" id="CONCENTRACAO" value={pront.CONCENTRACAO} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="LENTIDAO">Apresenta lentidão na realização das atividades:</Label>
                                <Input type="select" disabled={stateDisable} name="LENTIDAO" id="LENTIDAO" value={pront.LENTIDAO} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="CANSAR_FACIL">Cansa-se com facilidade:</Label>
                                <Input type="select" disabled={stateDisable} name="CANSAR_FACIL" id="CANSAR_FACIL" value={pront.CANSAR_FACIL} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="ORDENS">As ordens precisam ser repetidas várias vezes:</Label>
                                <Input type="select" disabled={stateDisable} name="ORDENS" id="ORDENS" value={pront.ORDENS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="COMUNICACAO">Usa a comunicação verbal de forma clara:</Label>
                                <Input type="select" disabled={stateDisable} name="COMUNICACAO" id="COMUNICACAO" value={pront.COMUNICACAO} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="SENTIMENTOS">Sabe expressar seus sentimentos:</Label>
                                <Input type="select" disabled={stateDisable} name="SENTIMENTOS" id="SENTIMENTOS" value={pront.SENTIMENTOS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="COERENCIA_ORDEM">Verbaliza fatos ocorridos fora do contexto escolar com coerência e ordem:</Label>
                                <Input type="select" disabled={stateDisable} name="COERENCIA_ORDEM" id="COERENCIA_ORDEM" value={pront.COERENCIA_ORDEM} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="OBJ_FINALIDADE">Do significado aos seus objetivos e os usa de acordo com sua finalidade:</Label>
                                <Input type="select" disabled={stateDisable} name="OBJ_FINALIDADE" id="OBJ_FINALIDADE" value={pront.OBJ_FINALIDADE} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="PREFERENCIA" style={{marginBottom: "30px"}}>Apresenta algum tipo de preferência manual:</Label>
                                <Input type="select" disabled={stateDisable} name="PREFERENCIA" id="PREFERENCIA" value={pront.PREFERENCIA}  onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <br/>
                    <h5>Matemática:</h5>
                    <hr style={{border: "2px solid !important", width: "100%", margintop: "70px"}}/>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NUMEROS_1">Reconhece os números de 1 a 5:</Label>
                                <Input type="select" disabled={stateDisable} name="NUMEROS_1" id="NUMEROS_1" value={pront.NUMEROS_1} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NUMEROS_2">Reconhece os números de 6 a 10:</Label>
                                <Input type="select" disabled={stateDisable} name="NUMEROS_2" id="NUMEROS_2" value={pront.NUMEROS_2} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NUMEROS_3">Faz contagem de objetos de 1 a 10:</Label>
                                <Input type="select" disabled={stateDisable} name="NUMEROS_3" id="NUMEROS_3" value={pront.NUMEROS_3} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="CONTAR_NUM_LETRAS">Conta o número de letras do seu nome e objetos:</Label>
                                <Input type="select" disabled={stateDisable} name="CONTAR_NUM_LETRAS" id="CONTAR_NUM_LETRAS" value={pront.CONTAR_NUM_LETRAS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NUM_QUANT">Associa número e quantidade:</Label>
                                <Input type="select" disabled={stateDisable} name="NUM_QUANT" id="NUM_QUANT" value={pront.NUM_QUANT} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RELACIONA_CONJUNTOS">Relaciona nos conjuntos muito e pouco:</Label>
                                <Input type="select" disabled={stateDisable} name="RELACIONA_CONJUNTOS" id="RELACIONA_CONJUNTOS" value={pront.RELACIONA_CONJUNTOS}  onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RELACIONA_SEQUENCIA">Relaciona os numerais na sequência correta:</Label>
                                <Input type="select" disabled={stateDisable} name="RELACIONA_SEQUENCIA" id="RELACIONA_SEQUENCIA" value={pront.RELACIONA_SEQUENCIA} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RECONHECER_NUM">Reconhecer os numerais fora de ordem:</Label>
                                <Input type="select" disabled={stateDisable} name="RECONHECER_NUM" id="RECONHECER_NUM" value={pront.RECONHECER_NUM} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="EXPRESSAO_ORAL_ESCRITA">Expressão oral e escrita:</Label>
                                <Input type="select" disabled={stateDisable} name="EXPRESSAO_ORAL_ESCRITA" id="EXPRESSAO_ORAL_ESCRITA" value={pront.EXPRESSAO_ORAL_ESCRITA}  onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="VOCABULARIO">O vocabulário:</Label>
                                <Input type="select" disabled={stateDisable} name="VOCABULARIO" id="VOCABULARIO" value={pront.VOCABULARIO} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RELACAO_ESCRITA_FALA">Percebe a relação entre a escrita e fala:</Label>
                                <Input type="select" disabled={stateDisable} name="RELACAO_ESCRITA_FALA" id="RELACAO_ESCRITA_FALA" value={pront.RELACAO_ESCRITA_FALA} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="PRONUNCIA_PALAVRAS">Pronuncia corretamente as palavras:</Label>
                                <Input type="select" disabled={stateDisable} name="PRONUNCIA_PALAVRAS" id="PRONUNCIA_PALAVRAS" value={pront.PRONUNCIA_PALAVRAS}  onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RECUSA_FALA">Recusa-se a falar:</Label>
                                <Input type="select" disabled={stateDisable} name="RECUSA_FALA" id="RECUSA_FALA" value={pront.RECUSA_FALA} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="RECONHECER_FIGURA">Reconhece e aponta figura:</Label>
                                <Input type="select" disabled={stateDisable} name="RECONHECER_FIGURA" id="RECONHECER_FIGURA" value={pront.RECONHECER_FIGURA} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="VERBALIZA">Verbaliza com a intenção de querer falar algo:</Label>
                                <Input type="select" disabled={stateDisable} name="VERBALIZA" id="VERBALIZA" value={pront.VERBALIZA}  onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="DIZ_NOME_PROP">Diz o próprio nome:</Label>
                                <Input type="select" disabled={stateDisable} name="DIZ_NOME_PROP" id="DIZ_NOME_PROP" value={pront.DIZ_NOME_PROP} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="DIZ_NOME_PESSOA_CONHECIDAS">Diz o nome de pessoas conhecidas:</Label>
                                <Input type="select" disabled={stateDisable} name="DIZ_NOME_PESSOA_CONHECIDAS" id="DIZ_NOME_PESSOA_CONHECIDAS" value={pront.DIZ_NOME_PESSOA_CONHECIDAS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="NOMEIA_DESENHO">Nomeia seus próprios desenhos:</Label>
                                <Input type="select" disabled={stateDisable} name="NOMEIA_DESENHO" id="NOMEIA_DESENHO" value={pront.NOMEIA_DESENHO}  onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="LIVROS_REVISTAS">Folheia livros e revistas:</Label>
                                <Input type="select" disabled={stateDisable} name="LIVROS_REVISTAS" id="LIVROS_REVISTAS" value={pront.LIVROS_REVISTAS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="DIS_VOGAIS">Discrimina vogais:</Label>
                                <Input type="select" disabled={stateDisable} name="DIS_VOGAIS" id="DIS_VOGAIS" value={pront.DIS_VOGAIS} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col className="col-md-4">
                            <FormGroup>
                                <Label for="DIS_ALFABETO">Discrimina o restante do alfabeto:</Label>
                                <Input type="select" disabled={stateDisable} name="DIS_ALFABETO" id="DIS_ALFABETO" value={pront.DIS_ALFABETO} onChange={onChangeInput}>
                                    <option>Selecione uma opção</option>
                                    <option>Desenvolvido</option>
                                    <option>Não Desenvolvido</option>
                                    <option>Em desenvolvimento</option>
                                    <option>Não Avaliado</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="RESPONSAVEL">Responsável:</Label>
                        <Input type="text" name="RESPONSAVEL" id="RESPONSAVEL" disabled={stateDisable} value={pront.RESPONSAVEL} placeholder="Responsável:" {...register("RESPONSAVEL", { required: 'Insira uma questão' })} onChange={onChangeInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="OBSERVACAO">Observação:</Label>
                        <Input type="textarea" name="OBSERVACAO" id="OBSERVACAO" disabled={stateDisable} value={pront.OBSERVACAO} placeholder="Escreva as observações..." {...register("OBSERVACAO", { required: 'Insira uma questão' })} onChange={onChangeInput} />
                    </FormGroup>
                    <Row>
                        <Col className="col-md-4 ">
                            {response.formSave ? <button type="button" className="btn btnAnimado" id="btnCriar" >Enviando...</button> : <button type="button" disabled={stateDisable} onClick={() => sendQuest(props.prontuario.ID_PRONT_PSICOPEDAGOGIA)} className="btn btnAnimado block" id="btnCriar" >Editar Prontuário</button>}
                        </Col>
                        <Col className="col-md-4 ">
                            {/* <button type="button" onClick={habilitarEdicao} className="btn btnAnimado" id="btnCadastrar" >Habilitar Edição</button> */}
                            <div onClick={habilitarEdicao}>{btn}</div>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Smallfooter />
        </div>
    );
};

export default editaPront;

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
    const { pront } = parseCookies(ctx);
    var prontuario = JSON.parse(pront)

    return {
        props: {prontuario}
    }
}