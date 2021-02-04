import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Containers.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Container } from '../../models/Models';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';



interface IContainersProps {
    containers: Container[],
    loading: boolean,
    fetchContainers: Function,
    removeContainers: Function,

    containersDataTest: Container[]
}

const Containers = (props: IContainersProps) => {
    const { fetchContainers, removeContainers, containers } = props;

    const defaultSelectedContainers = {};

    for (const [key, value] of Object.entries(containers)) {
        defaultSelectedContainers[value.containerId] = false
    }

    const [selectedContainers, setSelectedContainers] = useState<any>({ ...defaultSelectedContainers });

    // const [selectedContainer, setSelectedContainer] = useState<String>(null);

    let allTrue = true;
    for (const [key, value] of Object.entries(selectedContainers)) {
        if (value === false) {
            allTrue = false;
            break;
        }
    }

    console.log(`OUTSIDE functions allTrue: ${allTrue}`);

    useEffect(() => {
        fetchContainers();
    }, [fetchContainers]);

    console.log(selectedContainers);

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...selectedContainers };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                // TEMP getting container ID for logs
                // if (value === true) {
                //     console.log(`getting ID for logs: ${id}`);
                //     setSelectedContainer(id);
                // }
                old[key] = !old[key];
            }
        }

        setSelectedContainers(old);
        console.log(selectedContainers);
    };

    const handleSelectedContainersOperation = selectedContainers => {
        console.log("triggered handleSelectedContainersOperation(), selectedContainers:");
        console.log(selectedContainers);
        const containerIds = [];
        for (const [key, value] of Object.entries(selectedContainers)) {
            if (value === true) {
                containerIds.push(key);
            }
        }
        console.log("containerIds:");
        console.log(containerIds);
        console.log("DE-selecting containers:");
        const updated = { ...selectedContainers };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedContainers(updated);
        console.log(selectedContainers);

        removeContainers(containerIds);
    };

    const selectAll = () => {
        console.log("selectAll(), selectedContainers:");
        console.log(selectedContainers);

        let allTrue = true;
        for (const [key, value] of Object.entries(selectedContainers)) {
            if (value === false) {
                allTrue = false;
                break;
            }
        }

        const updated = { ...selectedContainers };
        for (const [key, value] of Object.entries(updated)) {
            if (allTrue) {
                updated[key] = false
            } else {
                updated[key] = true
            }
        }

        setSelectedContainers(updated);
        console.log(selectedContainers);
    };

    const isSelectedAny = () => {
        console.log("isSelectedAny(), selectedContainers:");
        console.log(selectedContainers);

        for (const [key, value] of Object.entries(selectedContainers)) {
            if (value === true) {
                console.log("TRUE - selected container found");
                return true
            }
        }

        console.log("FALSE - no selected container found");
        return false;
    };

    const isSelectedOne = () => {
        console.log("isSelectedOne(), selectedContainers:");
        console.log(selectedContainers);

        let count = 0;

        for (const [key, value] of Object.entries(selectedContainers)) {
            if (value === true) {
                // console.log(`TRUE - selected container found, total: ${count}`);
                count++;
            }
        }

        // console.log(`final selected count: ${count}`);
        return count === 1;
    };

    const isSelected = isSelectedAny();
    const isSelectedSingle = isSelectedOne();

    // console.log(`selectedContainer: ${selectedContainer}`);

    const containersTitleClasses = [css.Content, css.Heading];
    const useStyles = makeStyles({
        buttonGroup: {
            alignSelf: "flex-start"
        }
    });
    const classes = useStyles();

    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <Grid container direction="column">
            {(containers && containers.length) ?
                (containers.map((container, i) => {
                    return <React.Fragment>
                        <Grid item container className={css.Content} key={container.containerId}>
                            <Checkbox color="primary" onClick={handleCheckboxChange} id={container.containerId} checked={selectedContainers[container.containerId]} />
                            <Grid className={css.ContainerId}>{container.containerId}</Grid>
                            <Grid className={css.Image}>{container.image}</Grid>
                            <Grid className={css.Command}>{container.command}</Grid>
                            <Grid className={css.Created}>{container.created}</Grid>
                            <Grid className={css.Ports}>{container.ports}</Grid>
                            <Grid className={css.Names}>{container.names}</Grid>
                            <Grid className={css.Status}>{container.status}</Grid>
                        </Grid>
                        <Link to={`/containers/${container.containerId}`} style={{ textDecoration: 'none', marginLeft: '2.5%' }}>
                            <Button
                                color="secondary"
                                startIcon={<PageviewIcon />}
                                onClick={() => console.log(`oops ID: ${container.containerId}`)}>
                                Logs
                            </Button>
                        </Link>
                    </React.Fragment>

                }))
                :
                ''
            }
        </Grid>
    }

    return (
        <div className={css.Containers}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Containers</h1>
                <p>Showing information about Containers and offering various operations with them</p>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button disabled={!isSelected}
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleSelectedContainersOperation(selectedContainers)}>
                        Remove
                    </Button>



                </ButtonGroup>

                <div className={css.Info}>
                    <div className={containersTitleClasses.join(' ')}>
                        <Checkbox color="primary" onClick={selectAll} checked={allTrue} />
                        <div className={css.ContainerId}>Container ID</div>
                        <div className={css.Image}>Image</div>
                        <div className={css.Command}>Command</div>
                        <div className={css.Created}>Created</div>
                        <div className={css.Ports}>Ports</div>
                        <div className={css.Names}>Names</div>
                        <div className={css.Status}>Status</div>
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        containers: state.containers.containers,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchContainers: () =>
            dispatch(actions.fetchContainers()),
        removeContainers: (selectedContainers) =>
            dispatch(actions.removeContainers(selectedContainers))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Containers);
