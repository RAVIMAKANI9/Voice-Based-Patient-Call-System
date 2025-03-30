import React from "react";
import { List, Badge, Typography } from "antd";
import BottomNavigation from "../components/BottomNavigation";


const { Title } = Typography;

const alerts = [
  { id: 1, text: "Bradford is waiting for over 10 minutes", type: "error" },
  { id: 2, text: "Helen responded successfully", type: "success" },
];

const AdminAlerts = () => {
  return (
      <div className="alerts-container">
          <Title level={2} style={{ textAlign: "center" }}>Admin Alerts</Title>
          <List
              dataSource={alerts}
              renderItem={(item) => (
                  <List.Item>
                      <Badge status={item.type} text={item.text} />
                  </List.Item>
              )}
          />
          <BottomNavigation /> 
      </div>
  );
};

export default AdminAlerts;
