import { Alert, Card, Typography } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import { CreateRoomForm } from './CreateRoom-Form/CreateRoomForm'

const { Title } = Typography

export const CreateRoom = (props) => {
    const { socket, socketError } = props

    return (
        <div className="create-room-wrapper">
            <Card className="create-room-card">
                {socketError && <Alert message={socketError} type="error" showIcon closable />}
                <Title level={3}>Join chat now!</Title>
                <CreateRoomForm socket={socket} socketError={socketError} />
            </Card>
        </div>
    )
}

CreateRoom.propTypes = {
    socket: PropTypes.object,
    socketError: PropTypes.string,
}
