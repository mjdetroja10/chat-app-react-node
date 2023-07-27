import './style/global.css'

import { Chat, CreateRoom } from 'Components'
import { socketConnect } from 'Infrasctrure/Socket-Connect/SocketConnect'
import { useEffect, useState } from 'react'

const { socket, error } = socketConnect()

export function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [socketError, setsocketError] = useState(null)

    useEffect(() => {
        socket.on('connect', () => setsocketError(null))

        socket.on('connect_error', (err) => {
            setsocketError(`error duo to  ${err?.message || 'network error'}`)
            setCurrentUser(null)
        })
    }, [socketError])

    useEffect(() => {
        socket.on('current-user', (user) => {
            setCurrentUser(user)
        })
    }, [currentUser, socket])

    return (
        <div className="App">
            {currentUser ? (
                <Chat socket={socket} currentUser={currentUser} />
            ) : (
                <CreateRoom socket={socket} socketError={socketError || error} />
            )}
        </div>
    )
}
