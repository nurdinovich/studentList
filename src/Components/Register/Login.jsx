import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';

import classes from './Register.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const onLogin = async (values) => {
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={classes.loginContainer}>
      <h2>Добро пожаловать</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onLogin}
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
        <Form.Item>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
        {authError && <Alert message={authError} type="error" />}
        <Form.Item>
          <Button type="primary" htmlType="submit">Войти</Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => navigate('/register')}>Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;