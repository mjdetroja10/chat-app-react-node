import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

export const SendMessage = ({ form, submitSendMessage }) => {
  return (
    <Form
      name="send-message"
      layout="vertical"
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={submitSendMessage}
    >
      <Form.Item extra="Yoy can send your message">
        <Row>
          <Col span={20}>
            <Form.Item
              name="message"
              type="text"
              rules={[
                {
                  required: true,
                  message: "Message can't be empty!",
                },
              ]}
            >
              <Input placeholder="message..." />
            </Form.Item>
          </Col>
          <Col span={2} style={{ marginLeft: "10px" }}>
            <Button type="primary" htmlType="submit" ghost>
              <SendOutlined />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
