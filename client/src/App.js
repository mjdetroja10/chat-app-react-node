import './style/global.css'

import { Chat, CreateRoom } from 'Components'
import { socketConnect } from 'Infrasctrure/Socket-Connect/SocketConnect'
import { useEffect, useState } from 'react'

const { socket, error } = socketConnect()

export function App() {
    const [data, setData] = useState(null)
    const [socketError, setsocketError] = useState(null)

    useEffect(() => {
        socket.on('connect', () => setsocketError(null))

        socket.on('connect_error', (err) => setsocketError(`error duo to  ${err?.message || 'network error'}`))
    }, [socketError])

    return (
        <div className="App">
            {data ? (
                <Chat socket={socket} data={data} />
            ) : (
                <CreateRoom socket={socket} setData={setData} socketError={socketError || error} />
            )}
        </div>
    )
}
