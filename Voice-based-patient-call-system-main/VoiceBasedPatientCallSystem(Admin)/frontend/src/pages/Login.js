import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

const { Title, Text } = Typography;

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

  const onFinish = () => {
    setAuth(true);
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    api.info('Get authentication from department.');
  };

  return (
    <div className="login-container">
      {contextHolder} 
      <Card className="login-card">
        <Title level={2} className="login-title">Access Records</Title>
        <Text className="login-subtitle"><b>Admin</b></Text>
        <div className="admin-icon">👤</div> 
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Admin Unique ID" name="email" rules={[{ required: true, message: "Enter your Admin Unique ID" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter your password" }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="login-button">Continue</Button>
        </Form>
        <Text className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</Text>
      </Card>
    </div>
  );
};

export default Login;
