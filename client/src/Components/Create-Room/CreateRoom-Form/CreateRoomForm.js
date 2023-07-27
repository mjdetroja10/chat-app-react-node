import { Button, Form, Input } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const onFinish = (socket) => async (values) => await socket.emit('join_room', values)

export const CreateRoomForm = ({ socket, socketError }) => (
    <Form name="createRoom" layout="vertical" onFinish={onFinish(socket)}>
        <Form.Item
            label="Username"
            name="username"
            type="text"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input autoFocus />
        </Form.Item>
        <Form.Item
            label="Room"
            name="room"
            type="text"
            rules={[{ required: true, message: 'Please input your room!' }]}
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
)

CreateRoomForm.propTypes = {
    socket: PropTypes.object,
    setData: PropTypes.func,
    socketError: PropTypes.string,
}
