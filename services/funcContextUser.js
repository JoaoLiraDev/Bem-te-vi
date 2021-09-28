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