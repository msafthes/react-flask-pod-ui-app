import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppState } from '../../store';

import { withRouter } from 'react-router-dom';
import { WebSocketContext } from '../../WebSocket';
import { LazyLog } from 'react-lazylog';
import { v4 as uuidv4 } from 'uuid';

import css from './ContainerLogs.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';


interface IContainerLogsProps {
    containerLogs: any,
    loading: boolean,
    match: any,
    params: any,
    id: string,
}

const ContainerLogs = (props: IContainerLogsProps) => {
    const ws = useContext(WebSocketContext);

    const updateLogs = () => {
        console.log(">>> updateLogs()");
        ws.updateLogs(props.match.params.id);
    }

    useEffect(() => {
        const interval = setInterval(() => updateLogs(), 5000);
        // returned function will be called on component unmount 
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

const mapStateToProps = (state: AppState) => {
    return {
        containerLogs: state.containers.containerLogs
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        //
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ContainerLogs));
