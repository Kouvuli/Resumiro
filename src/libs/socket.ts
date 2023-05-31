import { io, Socket } from 'socket.io-client'

const socket: Socket = io('https://socket-io-server.onrender.com')

export default socket
