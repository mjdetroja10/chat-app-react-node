import { Card, Col, Form, Row, Typography } from 'antd'
import PropsType from 'prop-types'
import React, { useEffect, useState } from 'react'

import { SendMessage } from './Messages-Component/SendMessage'
import { ShowMessages } from './Messages-Component/ShowMessages'

const { Title: Text } = Typography

const Title = ({ title, username = '' }) => (
    <div className="title">
        <Text level={3} className="header-text">
            {title}
        </Text>
        <span className="username">
            <Text level={5} type="danger" className="name">
                {username}
            </Text>
        </span>
    </div>
)

const onFinish =
    (currentUser, socket, setMessageData, form) =>
    ({ message }) => {
        if (message) {
            let currentTime = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()

            let id = Math.floor(Math.random() * Date.now())

            let sendMessage = {
                ...currentUser,
                message,
                time: currentTime,
                userId: currentUser.id,
                id,
            }

            setMessageData((prev) => [...prev, sendMessage])

            socket.emit('send-message', sendMessage)
            form.resetFields()
        }
    }

export const Chat = ({ socket, currentUser }) => {
    const [form] = Form.useForm()

    const [messageList, setMessageList] = useState([])
    const [joinedUsers, setJoinedUsers] = useState([])
    const [userTyping, setUserTyping] = useState(null)

    useEffect(() => {
        socket.on('receive-message', (data) => {
            setMessageList([...messageList, data])
        })
    }, [socket, messageList])

    useEffect(() => {
        socket.on('join_welcome', (JoinData) => {
            setJoinedUsers(JoinData)
        })

        socket.on('disconnected_users', (disconnectedData) => {
            setJoinedUsers(disconnectedData)
        })
    }, [socket, setJoinedUsers])

    useEffect(() => {
        socket.on('user-typing-list', (user) => {
            setUserTyping(user)
        })
    }, [socket, userTyping])

    return (
        <Row>
            <Col span={24}>
                <Card className="outer-card">
                    <Card
                        className="inner-card"
                        title={<Title title="Live chat" username={currentUser.username} />}
                        bordered={false}
                    >
                        <div className="chat-body">
                            <ShowMessages
                                joinedUsers={joinedUsers}
                                messageList={messageList}
                                activeId={currentUser.id}
                            />
                        </div>

                        {userTyping && <p className="user-typing">{`${userTyping.username} is typing...`}</p>}
                        <SendMessage
                            form={form}
                            onSubmit={onFinish(currentUser, socket, setMessageList, form)}
                            currentUser={currentUser}
                            socket={socket}
                        />
                    </Card>
                </Card>
            </Col>
        </Row>
    )
}

Chat.propTypes = {
    socket: PropsType.object,
    currentUser: PropsType.shape({
        username: PropsType.string,
        room: PropsType.string,
        id: PropsType.string,
    }),
}

Title.propTypes = {
    title: PropsType.string,
    username: PropsType.string,
}
