import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch } from 'react-redux';
// import { updateChatLog } from './store/actions/index';
import * as actions from './store/actions/index';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
    let socket;
    let ws;

    const dispatch = useDispatch();

    const updateLogs = (id) => {
        console.log("Frontend Websocket.tsx updateLogs()");
        const payload = {
            id: id
        }
        socket.emit("event://send-message", payload);
        // socket.emit("event://send-message", JSON.stringify(payload));
        // dispatch(actions.updateContainerLog(payload));
    }

    if (!socket) {
        socket = io.connect(WS_BASE)

        socket.on("event://get-message", (msg) => {
            console.log("Frontend Websocket.tsx socket.on event://get-message");
            console.log("response:");
            console.log(msg);
            console.log(msg["logs"]);
            // const containerLogs = JSON.parse(msg).logs;
            const containerLogs = msg.logs;
            console.log("GOT containerLogs:");
            console.log(containerLogs);

            // let test = msg.logs;
            // test = test.split('\n')
            // console.log("test:");
            // console.log(test);

            // const payload = JSON.parse(msg);
            // dispatch(actions.updateContainerLogs(containerLogs));

            // dispatch(actions.updateContainerLogs(test));
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