// let obj = `{"ID_PRONT_PSICOPEDAGOGIA":3,"NOME_PACIENTE":"Joao","DT_NASC":"2003-02-24T03:00:00.000Z","IDADE":18,"TRIMESTRE":"1° Trimestre","PERCEP_VISUAL_SENSORIAL":"Desenvolvido","FORMAS_GEOMETRICAS":"Desenvolvido","CORES_PRIMARIAS":"Não Desenvolvido","RELACAO_OBJ_FIGURAS":"Não Desenvolvido","SEGURA_LAPIS":"Não Avaliado","SEGURA_GIZ":"Em desenvolvimento","CONCENTRACAO":"Em desenvolvimento","LENTIDAO":"Em desenvolvimento","CANSAR_FACIL":"Desenvolvido","ORDENS":"Não Desenvolvido","COMUNICACAO":"Em desenvolvimento","SENTIMENTOS":"Desenvolvido","COERENCIA_ORDEM":"Não Desenvolvido","OBJ_FINALIDADE":"Não Desenvolvido","PREFERENCIA":"Não Desenvolvido","NUMEROS_1":"Não Avaliado","NUMEROS_2":"Não Desenvolvido","NUMEROS_3":"Em desenvolvimento","CONTAR_NUM_LETRAS":"Desenvolvido","NUM_QUANT":"Não Desenvolvido","RELACIONA_CONJUNTOS":"Não Desenvolvido","RELACIONA_SEQUENCIA":"Desenvolvido","RECONHECER_NUM":"Desenvolvido","EXPRESSAO_ORAL_ESCRITA":"Não Desenvolvido","VOCABULARIO":"Não Desenvolvido","RELACAO_ESCRITA_FALA":"Não Desenvolvido","PRONUNCIA_PALAVRAS":"Não Desenvolvido","RECUSA_FALA":"Desenvolvido","RECONHECER_FIGURA":"Não Desenvolvido","VERBALIZA":"Desenvolvido","DIZ_NOME_PROP":"Não Desenvolvido","DIZ_NOME_PESSOA_CONHECIDAS":"Em desenvolvimento","NOMEIA_DESENHO":"Não Desenvolvido","LIVROS_REVISTAS":"Não Desenvolvido","DIS_VOGAIS":"Desenvolvido","DIS_ALFABETO":"Não Desenvolvido","RESPONSAVEL":"Lira","OBSERVACAO":"Deu Certo!","DT_CREATE":"2021-10-03T23:53:04.000Z","data_formatada":"2003-02-24"}`

export function returnStrings(json){
  let qtdNd = 0; //--> quantidade de não desenvolvidos
  let qtdD = 0; //--> quantidade de desenvolvidos
  let qtdNv = 0; //--> quantidade de Não Avaliado
  let qtdEd = 0; //--> quantidade de Em desenvolvimento
  //Não Avaliado
  //Em desenvolvimento

  let objChange = json;
  let objChangeNV = json;

  while(objChangeNV.indexOf('Não Avaliado') !== -1){
    qtdNv++
    try{
      objChangeNV = objChangeNV.replace('Não Avaliado', '');
    }catch(e){
      break;
    }
  }

  
  while(objChangeNV.indexOf('Em desenvolvimento') !== -1){
    qtdEd++
    try{
      objChangeNV = objChangeNV.replace('Em desenvolvimento', '');
    }catch(e){
      break;
    }
  }
  
  while(objChange.indexOf('Não Desenvolvido') !== -1){
    qtdNd++
    try{
      objChange = objChange.replace('Não Desenvolvido', '');
    }catch(e){
      break;
    }
  }

  while(objChange.indexOf('Desenvolvido') !== -1){
    qtdD++
    try{
      objChange = objChange.replace('Desenvolvido', '');
    }catch(e){
      break;
    }
  }


  return {
    quantidade_desenvolvidos: qtdD,
    quantidade_nao_desenvolvidos: qtdNd,
    quantidade_nao_avaliado: qtdNv,
    quantidade_em_desenvolvimento: qtdEd

  }
}




// console.log(`quantidade de desenvolvidos: ${returnStrings(obj).quantidade_desenvolvidos}`);
// console.log(`quantidade de não desenvolvidos: ${returnStrings(obj).quantidade_nao_desenvolvidos}`);
// console.log(`quantidade de não avaliados: ${returnStrings(obj).quantidade_nao_avaliado}`);
// console.log(`quantidade de em desenvolvimento: ${returnStrings(obj).quantidade_em_desenvolvimento}`);
// //---> oooou, se preferir
// let qtd_Desenvolvidos = returnStrings(obj).quantidade_desenvolvidos;
// let qtd_NAO_Desenvolvidos = returnStrings(obj).quantidade_nao_desenvolvidos;

// console.log(`qtd_Desenvolvidos: ${qtd_Desenvolvidos}`);
// console.log(`qtd_NAO_Desenvolvidos: ${qtd_NAO_Desenvolvidos}`);
