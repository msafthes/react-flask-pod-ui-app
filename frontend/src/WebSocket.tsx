import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions/index';

// Creating a Context to be accessible from anywhere in the application
// This is used for two-way communication between frontend and backend to fetch and periodically
// update the container logs information
const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    const updateLogs = (id, username) => {
        const payload = {
            id: id,
            username: username
        }
        socket.emit("event://update-logs", payload);
    }

    if (!socket) {
        socket = io.connect(WS_BASE)

        socket.on("event://get-logs", (msg) => {
            const containerLogs = msg;
            dispatch(actions.updateContainerLogs(containerLogs));
        })

        ws = {
            socket: socket,
            updateLogs
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}