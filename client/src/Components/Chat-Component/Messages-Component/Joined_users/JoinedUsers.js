import PropsType from 'prop-types'
import React from 'react'

import 'style/joinedusers.css'

import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'

const DragUsersList = ({ joinedUsers, setUsers, users }) => {
    return (
        <React.Fragment>
            {users.length <= 2 && (
                <CaretDownOutlined
                    className="plus-icon"
                    onClick={() => {
                        setUsers(joinedUsers)
                    }}
                />
            )}
            {users.length > 2 && (
                <CaretUpOutlined
                    className="plus-icon"
                    onClick={() => {
                        setUsers(joinedUsers.slice(0, 2))
                    }}
                />
            )}
        </React.Fragment>
    )
}

export const JoinedUsers = ({ joinedUsersList }) => {
    if (!joinedUsersList || joinedUsersList.length === 0) return null
    
    const [users, setUsers] = React.useState(
        joinedUsersList.length === 1 ? joinedUsersList.slice(0, 1) : joinedUsersList.slice(0, 2)
    )

    return (
        <React.Fragment>
            <div className="welcome-text">
                {users.map((joinedUser) => (
                    <React.Fragment key={joinedUser.id}>
                        <p className="online-users">
                            <span className="dot">{`${joinedUser.username} is online`}</span>
                        </p>
                    </React.Fragment>
                ))}
            </div>
            {joinedUsersList.length > 2 && (
                <DragUsersList joinedUsers={joinedUsersList} setUsers={setUsers} users={users} />
            )}
        </React.Fragment>
    )
}

JoinedUsers.propTypes = {
    joinedUsersList: PropsType.arrayOf(
        PropsType.shape({
            username: PropsType.string,
            id: PropsType.string,
        })
    ),
}

DragUsersList.propTypes = {
    joinedUsers: PropsType.arrayOf(
        PropsType.shape({
            username: PropsType.string,
            id: PropsType.string,
        })
    ),
    setUsers: PropsType.func,
    users: PropsType.arrayOf(
        PropsType.shape({
            username: PropsType.string,
            id: PropsType.string,
        })
    ),
}
