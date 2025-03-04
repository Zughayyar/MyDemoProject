
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/main.module.css'
import { useState } from "react";
import { useAuth } from './useAuth.jsx';
import {Alert, Button, Form, Input} from "antd";
import { memo } from 'react';
import axios from "axios";


const Register = () => {
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = (values) => {
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        }

        axios.post('http://localhost:8000/api/users', payload, {withCredentials: true})
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
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                <h1>Register</h1>
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
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
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

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input confirm password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Register
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

export default memo(Register)