import PropsType from 'prop-types'
import { useMemo } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import { JoinedUsers } from './Joined_users/JoinedUsers'

import 'style/show-message.css'

export const ShowMessages = (props) => {
    const { joinedUsers, messageList, activeId = '' } = props

    const joinedUsersList = useMemo(
        () => (joinedUsers.length > 1 ? joinedUsers.filter((user) => user.id !== activeId) : []),
        [joinedUsers]
    )

    return (
        <ScrollToBottom className="message-container scrollbar">
            <div className="welcome-text-wrapper">
                <JoinedUsers joinedUsersList={joinedUsersList} activeId={activeId} />

                {(messageList || messageList.length > 0) &&
                    messageList.map((user) => {
                        return (
                            <div className="message-wrap" id={user.userId === activeId ? 'you' : 'other'} key={user.id}>
                                <div className="message-box">
                                    <div className="message-content">
                                        <p className="user-message">{user?.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{user?.time}</p>
                                        <p id="author">{user.userId === activeId ? 'me' : user.username}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </ScrollToBottom>
    )
}

ShowMessages.propTypes = {
    joinedUsers: PropsType.arrayOf(
        PropsType.shape({
            username: PropsType.string,
            id: PropsType.string,
        })
    ),
    messageList: PropsType.arrayOf(
        PropsType.shape({
            id: PropsType.number,
            message: PropsType.string,
            room: PropsType.string,
            time: PropsType.string,
            username: PropsType.string,
            userId: PropsType.string,
        })
    ),
    activeId: PropsType.string,
}
