import React from "react";
import { Button, Form, Input } from "antd";

const onFinish = (socket, setData) => async (values) => {
  setData(values);
  await socket.emit("join_room", values);
};

export const CreateRoomForm = ({ socket, setData }) => (
  <Form
    name="createRoom"
    layout="vertical"
    style={{ maxWidth: 600 }}
    onFinish={onFinish(socket, setData)}
  >
    <Form.Item
      label="Username"
      name="username"
      type="text"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Room"
      name="room"
      type="text"
      rules={[{ required: true, message: "Please input your room!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Join Chat!
      </Button>
    </Form.Item>
  </Form>
);
