import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, notification, Form, Typography } from 'antd';
import './Auth.css';

const { Title } = Typography;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (values) => {
    const { username, password } = values; // Lấy giá trị username và password từ values
    const userList = JSON.parse(localStorage.getItem('users')) || [];
    userList.push({ username, password });
    localStorage.setItem('users', JSON.stringify(userList));
    notification.success({
      message: 'Đăng ký thành công',
      description: 'Bạn có thể đăng nhập ngay bây giờ',
      duration: 3,
      style: {
        backgroundColor: '#52c41a',
        color: 'white',
      },
    });
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="Header">
        <div className="HeaderTitle">
          <h1>Đề Tài Quản Lý Viện Dưỡng Lão</h1>
        </div>
        <div className="HeaderContent">
          <h3>Thực hiện bởi</h3>
          <ul>
            <li>Lưu Nguyễn Duy Anh</li>
            <li>Nguyễn Trường Huy</li> 
          </ul>
        </div>
      </div>
      <Form
        name="register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleRegister}>
        {' '}
        {/* Truyền hàm handleRegister vào onFinish */}
        <Title level={2} className="login-title">
          Đăng Ký
        </Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Hãy điền tên đăng nhập!' }]}>
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Hãy điền mật khẩu!' }]}>
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Đăng ký
          </Button>
          <div style={{ position: 'relative', right: '-110px' }}>
            <Button
              type="link"
              onClick={() => navigate('/login')}
              style={{ marginTop: '10px' }}>
              Đăng Nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
