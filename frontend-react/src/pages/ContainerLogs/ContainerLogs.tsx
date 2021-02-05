import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AppState } from '../../store';

import css from './ContainerLogs.module.css';

import { withRouter } from 'react-router-dom';

import { WebSocketContext } from '../../WebSocket';

import Grid from '@material-ui/core/Grid';

import { v4 as uuidv4 } from 'uuid';


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
        ws.updateLogs(props.match.params.id);
    }

    useEffect(() => {
        const interval = setInterval(() => updateLogs(), 50000);
        // returned function will be called on component unmount 
        return () => {
            clearInterval(interval)
        }
    }, [])

    const id = props.match.params.id;

    return (
        <div className={css.ContainerLogs}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Containers Logs</h1>
                <p>Container ID: {id}</p>
                <Grid container direction="column">
                    {(props.containerLogs && props.containerLogs.map((log) => {
                        return <Grid className={css.ContainerLog} key={uuidv4()}>{log}</Grid>
                    }))}
                </Grid>
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
