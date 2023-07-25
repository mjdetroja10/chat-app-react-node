import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "antd";
import { SendMessage } from "./Messages-Component/SendMessage";
import { ShowMessages } from "./Messages-Component/ShowMessages";

const Title = ({ title }) => (
  <div className="title">
    <span>{title}</span>
    <span className="dot"></span>
  </div>
);

const onFinish = (data, socket, setMessageData, form) => (values) => {
  let currentTime =
    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();

  let id = Math.floor(Math.random() * Date.now());

  let sendMessage = {
    ...data,
    ...values,
    time: currentTime,
    id,
  };

  setMessageData((prev) => [...prev, sendMessage]);

  socket.emit("send-message", sendMessage);
  form.resetFields();
};

export const Chat = ({ socket, data }) => {
  const [form] = Form.useForm();

  const [messageList, setMessageList] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [socket, messageList]);

  useEffect(() => {
    socket.on("join_welcome", (JoinData) => {
      setJoinedUsers(JoinData);
    });

    socket.on("disconnected_users", (disconnectedData) => {
      setJoinedUsers(disconnectedData);
    });
  }, [socket, setJoinedUsers]);

  return (
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Card className="outer-card">
          <Card
            className="inner-card"
            title={<Title title="Live chat" />}
            bordered={false}
          >
            <div className="chat-body">
              <ShowMessages
                joinedUsers={joinedUsers}
                messageList={messageList}
                currentUser={data.username}
              />
            </div>

            <SendMessage
              form={form}
              onSubmit={onFinish(data, socket, setMessageList, form)}
            />
          </Card>
        </Card>
      </Col>
      <Col span={8}></Col>
    </Row>
  );
};
