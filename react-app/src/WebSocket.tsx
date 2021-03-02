import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions/index';


const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    const updateLogs = (id) => {
        console.log("Websocket.tsx updateLogs() => socket.emit event://update-logs");
        const payload = {
            id: id
        }
        socket.emit("event://update-logs", payload);
    }

    if (!socket) {
        socket = io.connect(WS_BASE)

        socket.on("event://get-logs", (msg) => {
            console.log("Websocket.tsx socket.on event://get-logs");
            console.log("response:");
            console.log(msg);
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