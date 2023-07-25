import { Popover } from 'antd'
import PropsType from 'prop-types'
import React from 'react'

import 'style/joinedusers.css'

import { PlusCircleOutlined } from '@ant-design/icons'

const JoinedUsersListBody = ({ data, currentUser }) => {
    return data.map((joinedUser) => (
        <React.Fragment key={joinedUser.id}>
            <p>{`${joinedUser.username !== currentUser ? `${joinedUser.username} is joined the chat!` : ''}`}</p>
        </React.Fragment>
    ))
}

const PopUpComponent = ({ joinedUsers, currentUser }) => {
    return (
        <Popover
            placement="rightBottom"
            title={'All Joined user'}
            content={
                <div className="popup-content scrollbar">
                    <JoinedUsersListBody data={joinedUsers} currentUser={currentUser} />
                </div>
            }
            trigger="click"
        >
            <PlusCircleOutlined className="plus-icon" />
        </Popover>
    )
}

export const JoinedUsers = ({ joinedUsers, currentUser }) => {
    if (!joinedUsers || joinedUsers.length === 0) return null

    return (
        <div className="welcome-text">
            {
                <JoinedUsersListBody
                    data={joinedUsers.length > 3 ? joinedUsers.slice(0, 3) : joinedUsers}
                    currentUser={currentUser}
                />
            }
            {joinedUsers.length > 3 && <PopUpComponent joinedUsers={joinedUsers} currentUser={currentUser} />}
        </div>
    )
}

PopUpComponent.propTypes = {
    joinedUsers: PropsType.arrayOf(
        PropsType.shape({
            username: PropsType.string,
            id: PropsType.string,
        })
    ),
    currentUser: PropsType.string,
}

JoinedUsers.propTypes = {
    joinedUsers: PropsType.arrayOf(
        PropsType.shape({
            username: PropsType.string,
            id: PropsType.string,
        })
    ),
    currentUser: PropsType.string,
}
