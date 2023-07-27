import io from 'socket.io-client'

export const socketConnect = () => {
    try {
        // eslint-disable-next-line no-undef
        const socket = io.connect(process.env.REACT_APP_API)

        return { socket }
    } catch (error) {
        return {
            error: error?.message || 'Network error',
        }
    }
}
