import 'normalize.css'
import { Suspense, lazy } from 'react';
import styles from './styles/main.module.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Register from './components/user/Register.jsx';

const Login = lazy(() => import("./components/user/Login.jsx"));
const Dashboard = lazy(() => import("./views/DashBoard.jsx"));

const App = () => {
    return (
        <div className={styles.container}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App