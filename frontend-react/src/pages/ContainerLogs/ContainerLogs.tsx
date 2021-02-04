import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './ContainerLogs.module.css';
// import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Container } from '../../models/Models';

// import Grid from '@material-ui/core/Grid';
// import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import DeleteIcon from '@material-ui/icons/Delete';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import { makeStyles } from '@material-ui/core/styles';

// import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import { WebSocketContext } from '../../WebSocket';

import Grid from '@material-ui/core/Grid';

import { v4 as uuidv4 } from 'uuid';



interface IContainerLogsProps {
    containers: Container[],
    loading: boolean,
    // fetchContainers: Function,
    // removeContainers: Function,

    containersDataTest: Container[],

    match: any,
    params: any,
    id: string,

    containerLogs: any
}

const ContainerLogs = (props: IContainerLogsProps) => {
    const ws = useContext(WebSocketContext);

    const updateLogs = () => {
        console.log(`ContainerLogs.tsx - updateLogs()`);
        ws.updateLogs(props.match.params.id);
    }
    // const [log, setLog] = useState("");

    useEffect(() => {
        // window.addEventListener('mousemove', () => {});
        const interval = setInterval(() => updateLogs(), 50000);

        // returned function will be called on component unmount 
        return () => {
            clearInterval(interval)
            //   window.removeEventListener('mousemove', () => {})
        }
    }, [])

    console.log("<> ContainerLogs page");
    console.log(props.containers);
    console.log(props.match.params.id);
    // console.log(props.containers[props.match.params.id]);
    console.log("containerLogs:");
    console.log(props.containerLogs);

    const id = props.match.params.id;
    console.log(`id: ${id}`);
    // console.log(props.containers);
    // console.log(props.containers[id]);

    return (
        <div className={css.ContainerLogs}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Containers Logs</h1>
                {/* <button onClick={updateLogs}>Refresh</button> */}
                <p>Container ID: {id}</p>
                {/* {props.containerLogs && <p>{props.containerLogs}</p>} */}
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
        containers: state.containers.containers,
        containerLogs: state.containers.containerLogs
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        // fetchContainers: () =>
        //     dispatch(actions.fetchContainers()),
        // removeContainers: (selectedContainers) =>
        //     dispatch(actions.removeContainers(selectedContainers))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ContainerLogs));
