
import React from "react";
import { Card, Row, Col, Statistic, Calendar, List, Button, Typography, Space } from "antd";
import { UserOutlined, TeamOutlined, BellOutlined, ExclamationCircleOutlined, MessageOutlined, ClockCircleOutlined, BellFilled, BarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation"; 
import "./Dashboard.css"; 

const { Title, Text } = Typography;

const Dashboard = () => {
    const today = new Date();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const recentAlerts = [
        { id: 1, name: "Patient X", room: "109", description: "Chest pain urgent check-up", time: "2:43 PM", date: "16.03.2025" },
        { id: 2, name: "Patient Y", room: "183", description: "Medication reminder", time: "08:35 AM", date: "16.03.2025" },
    ];
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
                    <span style={{ fontSize: '2em' }}>👤</span> Hello, Admin
                </Title>
                <Button
                    icon={<BarChartOutlined />}
                    style={{ marginLeft: '20px' }}
                    onClick={() => navigate('/statistics')}
                />
            </div>

            <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col span={8}><Card><Statistic title="Total Nurses" value={60} prefix={<TeamOutlined />} /></Card></Col>
                <Col span={8}><Card><Statistic title="Total Patients" value={220} prefix={<UserOutlined />} /></Card></Col>
                <Col span={8}><Card><Statistic title="Alerts Today" value={recentAlerts.length} prefix={<BellOutlined />} /></Card></Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title={`Today: ${formattedDate}`}>
                        <Text strong>{"Click a date to see past alerts"}</Text>
                        <Calendar fullscreen={false} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Recent Alerts">
                        <List
                            dataSource={recentAlerts}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space direction="vertical" size="small">
                                        <Text strong>
                                            <ExclamationCircleOutlined /> ID: {item.id} | Name: {item.name} | Room: {item.room}
                                        </Text>
                                        <Text>
                                            <MessageOutlined style={{ marginRight: 8 }} /> {item.description}
                                        </Text>
                                        <Text type="secondary">
                                            <ClockCircleOutlined /> {item.time} | {item.date}
                                        </Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                        <Button type="primary" icon={<BellFilled />} style={{ marginTop: 20, width: '100%' }} onClick={() => navigate('/alerts')}>View All Alerts</Button>
                    </Card>
                </Col>
            </Row>

            <BottomNavigation /> 
        </div>
    );
};

export default Dashboard;