import { Card, Form } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SendMessage } from "./Messages-Component/SendMessage";
import { ShowMessages } from "./Messages-Component/ShowMessages";
import { useScrollToBottom } from "react-scroll-to-bottom";

const onFinish =
  (data, socket, setMessageData, form, messageInput) => (values) => {
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
    messageInput.current.focus();
    messageInput.current.active();
  };

export const Chat = ({ data, socket }) => {
  const [form] = Form.useForm();
  const messageInput = useRef(null);

  const [messageData, setMessageData] = useState([]);
  const [welcomeText, setWelcomeText] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageData([...messageData, data]);
    });
  }, [socket, messageData]);

  useEffect(() => {
    socket.on("join_welcome", (JoinData) => {
      setWelcomeText(JoinData);
    });
    socket.on("disconnected_users", (disconnectedData) => {
      setWelcomeText(() => disconnectedData);
    });
  }, [socket]);

  return (
    <Card
      style={{ maxWidth: 650, alignItems: "center" }}
      title={
        <div className="title">
          <span>Live Chat</span>
          <span className="dot"></span>
        </div>
      }
      bordered={false}
    >
      <div className="chat-body">
        <ShowMessages
          welcomeText={welcomeText}
          messageData={messageData}
          currentUser={data.username}
        />
      </div>

      <SendMessage
        form={form}
        messageInput={messageInput}
        submitSendMessage={onFinish(
          data,
          socket,
          setMessageData,
          form,
          messageInput
        )}
      />
    </Card>
  );
};
