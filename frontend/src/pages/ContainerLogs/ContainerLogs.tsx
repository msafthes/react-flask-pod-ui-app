import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppState } from '../../store';

import { withRouter } from 'react-router-dom';
import { WebSocketContext } from '../../WebSocket';
import { LazyLog } from 'react-lazylog';
import { Connection } from '../../models/Models';

import css from './ContainerLogs.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';


interface IContainerLogsProps {
    containerLogs: any,
    loading: boolean,
    match: any,
    params: any,
    id: string,
    activeConnection: Connection
}

const ContainerLogs = (props: IContainerLogsProps) => {
    const { activeConnection } = props;

    // getting the WebSocket context to use for fetching and updating container logs
    const ws = useContext(WebSocketContext);
    const updateLogs = () => {
        ws.updateLogs(props.match.params.id, activeConnection.username);
    }

    useEffect(() => {
        const interval = setInterval(() => updateLogs(), 5000);
        // this returned function will be called on component unmount, clearing the interval
        return () => {
            clearInterval(interval)
        }
    }, [])

    const id = props.match.params.id;
    const containerLogs = props.containerLogs;

    let content = <div className={css.Wrapper}><LoadingIndicator /></div>;

    if (containerLogs && containerLogs[id]) {
        content = <LazyLog enableSearch extraLines={1} text={containerLogs[id].logs} caseInsensitive />
    }

    return (
        <div className={css.ContainerLogs}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Containers Logs</h1>
                <p>Container ID: {id}</p>
                <div className={css.LogViewer}>
                    {content}
                </div>
            </div>
        </div>
    );
};

// Redux Store variables
const mapStateToProps = (state: AppState) => {
    return {
        containerLogs: state.containers.containerLogs,
        activeConnection: state.connections.activeConnection
    };
};

// Redux Store actions
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        // nothing needed yet
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ContainerLogs));
