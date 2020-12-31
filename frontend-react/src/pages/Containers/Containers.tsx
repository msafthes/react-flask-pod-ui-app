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
import { makeStyles } from '@material-ui/core/styles';


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

    const isSelected = isSelectedAny();

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
                    return <Grid item container className={css.Content} key={container.containerId}>
                        <Checkbox color="primary" onClick={handleCheckboxChange} id={container.containerId} checked={selectedContainers[container.containerId]} />
                        <Grid className={css.ContainerId}>{container.containerId}</Grid>
                        <Grid className={css.Image}>{container.image}</Grid>
                        <Grid className={css.Command}>{container.command}</Grid>
                        <Grid className={css.Created}>{container.created}</Grid>
                        <Grid className={css.Ports}>{container.ports}</Grid>
                        <Grid className={css.Names}>{container.names}</Grid>
                        <Grid className={css.Status}>{container.status}</Grid>
                    </Grid>

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
                <p>Showing information about Containers based on the `podman ps` command</p>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button disabled={!isSelected} color="secondary" startIcon={<DeleteIcon />} onClick={() => handleSelectedContainersOperation(selectedContainers)}>Remove</Button>
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
