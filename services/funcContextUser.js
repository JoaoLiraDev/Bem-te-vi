import { parseCookies } from 'nookies';

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
        localStorage.setItem("pront",JSON.stringify(response[0]));
       

    } catch (err) {

    }


}