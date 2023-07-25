import { Alert, Card, Space, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import { CreateRoomForm } from './CreateRoom-Form/CreateRoomForm'

const { Title } = Typography

export const CreateRoom = (props) => {
    const { socket, setData, socketError } = props

    return (
        <Space className="create-room-wrapper">
            <Card className="create-room-card">
                {socketError && <Alert message={socketError} type="error" showIcon closable />}
                <Title level={3}>Join chat now!</Title>
                <CreateRoomForm socket={socket} setData={setData} socketError={socketError} />
            </Card>
        </Space>
    )
}

CreateRoom.propTypes = {
    socket: PropTypes.object,
    setData: PropTypes.func,
    socketError: PropTypes.string,
}
