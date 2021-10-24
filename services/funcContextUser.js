import { data } from 'jquery';
import { parseCookies, setCookie } from 'nookies';
import { returnStrings } from '../pages/countFunc';
export async function dadosUser() {

    const { MQtoken } = parseCookies()

    try {
        const res = await fetch('http://localhost:8080/Usuarios/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
        });

        const response = await res.json();

        return response

    } catch (err) {

    }


}

export async function dadosPront(id_pront) {

    const { MQtoken } = parseCookies()

    try {
        
        const res = await fetch(`http://localhost:8080/CreateProntuario/prontuarios/${id_pront}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` }
        });
        var data_return = await res.json();
        
        const response = data_return.Query_result
        setCookie(null, 'pront', JSON.stringify(response[0]), {
            maxAge: 60 * 60 * 24,
            path: '/'
          });
        // localStorage.setItem("pront",JSON.stringify(response[0]));
       

    } catch (err) {

    }


}

export async function dadosPaciente(email) {

    const { MQtoken } = parseCookies()

    const body = {
        email: email
        }

    try {
        
        const resp = await fetch('http://localhost:8080/CreateProntuario/paciente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` },
            body: JSON.stringify(body)
        }); 

        var data_return = await resp.json();

        return data_return.Query_result

    } catch (err) {

    }


}


export async function dadosProntName(name) {

    const { MQtoken } = parseCookies()

    try {
        
        const res = await fetch(`http://localhost:8080/CreateProntuario/prontuarios/paciente`, {
            method: 'POST',
            body: JSON.stringify(name),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${MQtoken}` },
        });
        var data_return = await res.json();
        
        const obj = data_return.Query_result

        try{
            let qtd_Desenvolvidos = returnStrings(JSON.stringify(obj[0])).quantidade_desenvolvidos;
            let qtd_NAO_Desenvolvidos = returnStrings(JSON.stringify(obj[0])).quantidade_nao_desenvolvidos;
            let qtd_em_desenvolvimento = returnStrings(JSON.stringify(obj[0])).quantidade_em_desenvolvimento;
            let qtd_nao_avaliado = returnStrings(JSON.stringify(obj[0])).quantidade_nao_avaliado;
            
            const data = [
                { country: 'Desenvolvido', area: qtd_Desenvolvidos },
                { country: 'Em Desenvolviento', area: qtd_em_desenvolvimento },
                { country: 'Não Desenvolvido', area: qtd_NAO_Desenvolvidos },
                { country: 'Não Avaliado', area: qtd_nao_avaliado },
            ];
            setCookie(null, 'tri_1', JSON.stringify(data), {
                maxAge: 60 * 60 * 24,
                path: '/'
              });
            // localStorage.setItem("1_tri",JSON.stringify(data));
            
        }catch(err){
            console.log(err)
            const data = [
                { country: 'Desenvolvido', area: 0 },
                { country: 'Em Desenvolviento', area: 0 },
                { country: 'Não Desenvolvido', area: 0 },
                { country: 'Não Avaliado', area: 0 },
            ];
            setCookie(null, 'tri_1', JSON.stringify(data), {
                maxAge: 60 * 60 * 24,
                path: '/'
              });
            // localStorage.setItem("1_tri",JSON.stringify(data));
        }
        

        try{
            let qtd_Desenvolvidos = returnStrings(JSON.stringify(obj[1])).quantidade_desenvolvidos;
            let qtd_NAO_Desenvolvidos = returnStrings(JSON.stringify(obj[1])).quantidade_nao_desenvolvidos;
            let qtd_em_desenvolvimento = returnStrings(JSON.stringify(obj[1])).quantidade_em_desenvolvimento;
            let qtd_nao_avaliado = returnStrings(JSON.stringify(obj[1])).quantidade_nao_avaliado;
            
            const data_2_tri = [
                { country: 'Desenvolvido', area: qtd_Desenvolvidos },
                { country: 'Em Desenvolviento', area: qtd_em_desenvolvimento },
                { country: 'Não Desenvolvido', area: qtd_NAO_Desenvolvidos },
                { country: 'Não Avaliado', area: qtd_nao_avaliado },
            ];
            setCookie(null, 'tri_2', JSON.stringify(data_2_tri), {
                maxAge: 60 * 60 * 24,
                path: '/'
              });  
            // localStorage.setItem("2_tri",JSON.stringify(data_2_tri));
            
        }catch(err){
            const data_2_tri = [
                { country: 'Desenvolvido', area: 0 },
                { country: 'Em Desenvolviento', area: 0 },
                { country: 'Não Desenvolvido', area: 0 },
                { country: 'Não Avaliado', area: 0 },
            ];
            setCookie(null, 'tri_2', JSON.stringify(data_2_tri), {
                maxAge: 60 * 60 * 24,
                path: '/'
              });
            // localStorage.setItem("2_tri",JSON.stringify(data_2_tri));
        }
        try{
            let qtd_Desenvolvidos = returnStrings(JSON.stringify(obj[2])).quantidade_desenvolvidos;
            let qtd_NAO_Desenvolvidos = returnStrings(JSON.stringify(obj[2])).quantidade_nao_desenvolvidos;
            let qtd_em_desenvolvimento = returnStrings(JSON.stringify(obj[2])).quantidade_em_desenvolvimento;
            let qtd_nao_avaliado = returnStrings(JSON.stringify(obj[2])).quantidade_nao_avaliado;
            
            const data_3_tri = [
                { country: 'Desenvolvido', area: qtd_Desenvolvidos },
                { country: 'Em Desenvolviento', area: qtd_em_desenvolvimento },
                { country: 'Não Desenvolvido', area: qtd_NAO_Desenvolvidos },
                { country: 'Não Avaliado', area: qtd_nao_avaliado },
            ];
            setCookie(null, 'tri_3', JSON.stringify(data_3_tri), {
                maxAge: 60 * 60 * 24,
                path: '/'
              });
            // localStorage.setItem("3_tri",JSON.stringify(data_3_tri));
            
        }catch(err){
            const data_3_tri = [
                { country: 'Desenvolvido', area: 0 },
                { country: 'Em Desenvolviento', area: 0 },
                { country: 'Não Desenvolvido', area: 0 },
                { country: 'Não Avaliado', area: 0 },
            ];
            setCookie(null, 'tri_3', JSON.stringify(data_3_tri), {
                maxAge: 60 * 60 * 24,
                path: '/'
              });
            // localStorage.setItem("3_tri",JSON.stringify(data_3_tri));
        }
        
        

    } catch (err) {

    }

}