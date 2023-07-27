import { Button, Col, Form, Input, Row } from 'antd'
import 'style/send-message.css'
import PropsType from 'prop-types'

import { SendOutlined } from '@ant-design/icons'

const handelTypingEvent = (socket, currentUser) => (e) => {
    if (e.keyCode === 8) socket.emit('user-typing', currentUser)
    else socket.emit('user-typing', currentUser)
}

export const SendMessage = ({ form, onSubmit, currentUser, socket }) => {
    return (
        <Form name="send-message" layout="vertical" form={form} onFinish={onSubmit}>
            <Form.Item extra="You can send your message">
                <Row className="send-message-wrapper">
                    <Col className="input-wrap">
                        <Form.Item name="message" type="text">
                            <Input
                                className="send-message-input"
                                placeholder="Type your message..."
                                onKeyUp={handelTypingEvent(socket, currentUser)}
                                autoFocus
                            />
                        </Form.Item>
                    </Col>
                    <Col className="button-wrap">
                        <Button htmlType="submit" ghost shape="circle" className="send-message-button">
                            <SendOutlined className="send-icon" />
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}

SendMessage.propTypes = {
    socket: PropsType.object,
    form: PropsType.object,
    onSubmit: PropsType.func,
    currentUser: PropsType.shape({ username: PropsType.string, id: PropsType.string, room: PropsType.string }),
}
