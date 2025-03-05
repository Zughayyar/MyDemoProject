import styles from '../../styles/main.module.css'
import {Alert, Button, Form, Input} from "antd";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth.jsx';
import { useState } from "react";
import { memo } from 'react';

const Login = () => {
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        }

        axios.post('http://localhost:8000/api/users/login', payload, {withCredentials: true})
            .then(response => {
                setErrors(null)
                login(response.data.user)
                navigate('/dashboard')
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || 'An error occurred';
                setErrors(errorMessage);
                console.log(error);
            })
    }


    return (
        <div className={styles.loginPageContainer}>
            <div className={styles.loginFormContainer}>
                <div className={styles.linksContainer}>
                    <Link to="/login" className={location.pathname === "/login" ? styles.disabledLink : ""}>Login</Link>
                    <Link to="/register" className={location.pathname === "/register" ? styles.disabledLink : ""}>Register</Link>
                </div>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.errorContainer}>
                    {errors && <Alert description={errors} type="error" />} 
                </div>
                
            </div>
        </div>
    )
}

export default memo(Login);