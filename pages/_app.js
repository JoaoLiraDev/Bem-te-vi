import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Calendar.css';
import '../node_modules/@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp