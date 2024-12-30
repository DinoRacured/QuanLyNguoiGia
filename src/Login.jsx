import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, notification, Form, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Auth.css';
import logo from './assets/logo.png';
import pic from './assets/pic2.png';
const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    const userList = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = userList.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );
    if (foundUser) {
      localStorage.setItem('loggedIn', 'true');
      notification.success({
        message: 'Đăng Nhập Thành Công',
        description: 'Chào mừng trở lại!',
        duration: 3,
        style: {
          backgroundColor: '#52c41a',
          color: 'white',
        },
      });
      onLogin();
      navigate('/dashboard');
    } else {
      notification.error({
        message: 'Đăng Nhập Thất Bại',
        description: 'Tên đăng nhập hoặc mật khẩu không đúng!',
        duration: 3,
        style: {
          backgroundColor: '#f5222d',
          color: 'white',
        },
      });
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}>
        <Title level={2} className="login-title">
          Đăng Nhập
        </Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Hãy điền tên đăng nhập!' }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên đăng nhập"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Hãy điền mật khẩu!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}>
              Đăng nhập
            </Button>
          </div>
          <div style={{ position: 'relative', right: '-130px' }}>
            <Button
              type="link"
              onClick={() => navigate('/register')}
              style={{ marginTop: '10px' }}>
              Đăng ký
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
