import React from "react";
import { Button, Form, Input } from "antd";

const onFinish = (socket, setData) => async (values) => {
  setData(values);
  console.log(socket, "socket");
  await socket.emit("join_room", values);
};

export const CreateRoomForm = ({ socket, setData, socketError }) => (
  <Form
    name="createRoom"
    layout="vertical"
    onFinish={onFinish(socket, setData)}
  >
    <Form.Item
      label="Username"
      name="username"
      type="text"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input autoFocus />
    </Form.Item>

    <Form.Item
      label="Room"
      name="room"
      type="text"
      rules={[{ required: true, message: "Please input your room!" }]}
      tooltip="You should have to add same room as your partner!"
    >
      <Input />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" disabled={socketError}>
        Join Chat!
      </Button>
    </Form.Item>
  </Form>
);
