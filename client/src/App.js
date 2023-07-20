import "./App.css";

import io from "socket.io-client";
import { CreateRoomForm } from "./Components/CreateRoomForm";
import { Card, Col, Row } from "antd";
import { Chat } from "./Components/Chat-Component/Chat";
import { useState } from "react";

const socket = io.connect(process.env.REACT_APP_API);

export function App() {
  const [data, setData] = useState(null);
  return (
    <div className="App">
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Card style={{ maxWidth: 650, alignItems: "center" }}>
            {data ? (
              <Chat socket={socket} data={data} />
            ) : (
              <CreateRoomForm socket={socket} setData={setData} />
            )}
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
