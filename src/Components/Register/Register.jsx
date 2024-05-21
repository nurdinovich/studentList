import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';

import classes from './Register.module.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const handleRegister = async (values) => {
    const result = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={classes.registerContainer}>
      <h2>Регистрация</h2>
      <Form
        name="register"
        onFinish={handleRegister}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
        >
          <Input placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input.Password placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        {authError && <Alert message={authError} type="error" />}
        <Form.Item>
          <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;