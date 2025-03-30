import React from "react";
import { Card ,  Typography} from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import BottomNavigation from "../components/BottomNavigation";
import "./Statistics.css";

const { Title } = Typography;

const data = [
  { date: "Monday", value: 100 },
  { date: "Tuesday", value: 90 },
  { date: "Wednesday", value: 80 },
  { date: "Thursday", value: 120 },
  { date: "Friday", value: 140 },
  { date: "Saturday", value: 110 },
  { date: "Sunday", value: 95 },
];

const Statistics = () => {
  return (
      <div className="statistics-container">
          <Title level={2} style={{ textAlign: "center" }}>Response Time Statistics</Title>
          <Card title="Response Time Statistics">
              <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 5, fill: "#8884d8" }} />
                  </LineChart>
              </ResponsiveContainer>
          </Card>
          <BottomNavigation /> 
      </div>
  );
};

export default Statistics;