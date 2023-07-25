import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";

export const SendMessage = ({ form, onSubmit }) => {
  return (
    <Form
      name="send-message"
      layout="vertical"
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={onSubmit}
    >
      <Form.Item extra="You can send your message">
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
              <Input placeholder="message..." autoFocus />
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
