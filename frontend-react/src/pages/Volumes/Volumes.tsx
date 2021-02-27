import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Volumes.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Volume } from '../../models/Models';

import { isAllTrue, handleSelectAll, extractIds, isSelectedAny } from '../../helpers/helpers';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
// import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuVolumes from '../../components/MaterialCustomized/MenuVolumes';
import Tooltip from '@material-ui/core/Tooltip';


interface IVolumesProps {
    volumes: Volume[],
    loading: boolean,
    fetchVolumes: Function,
    createVolume: Function,
    removeVolumes: Function,

    volumesDataTest: Volume[]
}

const Volumes = (props: IVolumesProps) => {
    const { fetchVolumes, createVolume, removeVolumes, volumes } = props;
    const defaultSelectedVolumes = {};

    for (const [key, value] of Object.entries(volumes)) {
        defaultSelectedVolumes[value.Name] = false
    }

    const [selectedVolumes, setSelectedVolumes] = useState<any>({ ...defaultSelectedVolumes });
    const [openCreateVolumeModal, setOpenCreateVolumeModal] = useState(false);
    const [createVolumeName, setCreateVolumeName] = useState("");

    const allTrue = isAllTrue(selectedVolumes);

    useEffect(() => {
        fetchVolumes();
    }, [fetchVolumes]);

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...selectedVolumes };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                old[key] = !old[key];
            }
        }

        setSelectedVolumes(old);
    };

    const handleCreateVolumeOpen = () => {
        setOpenCreateVolumeModal(true);
    };

    const handleCreateVolumeClose = () => {
        setOpenCreateVolumeModal(false);
    };

    const onChangeCreateVolume = (e) => {
        setCreateVolumeName(e.target.value);
    };

    const handleVolumeCreate = () => {
        setOpenCreateVolumeModal(false);
        if (createVolumeName.length == 0) {
            console.log("empty volume create name");
            return;
        }
        createVolume(createVolumeName);
        setCreateVolumeName('');
    };

    const handleVolumeOperation = (selectedVolumes, mode: string) => {
        console.log(`triggered handleVolumeOperation(), mode: ${mode}`);
        const volumesNames = extractIds(selectedVolumes);

        switch (mode.toLowerCase()) {
            case "remove":
                removeVolumes(volumesNames);
                break;
            default: console.log("Unknown operation!");
        }

        const updated = { ...selectedVolumes };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedVolumes(updated);
    };

    const selectAll = () => {
        const updated = handleSelectAll(selectedVolumes);
        setSelectedVolumes(updated);
    };

    const isSelected = isSelectedAny(selectedVolumes);

    const volumesTitleClasses = [css.Content, css.Heading];

    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <Grid container direction="column">
            {(volumes && volumes.length) ?
                (volumes.map((volume, i) => {
                    return <React.Fragment key={volume.Name}>

                        <Accordion>

                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                            >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox
                                        color="primary"
                                        onClick={handleCheckboxChange}
                                        id={volume.Name}
                                        checked={selectedVolumes[volume.Name]} />}
                                    // label="Select"
                                    label=""
                                />
                                <Grid item container className={css.Content}>
                                    <Tooltip title={volume.Name}>
                                        <Grid className={css.Name}>{volume.Name}</Grid>
                                    </Tooltip>
                                    <Tooltip title={volume.Driver}>
                                        <Grid className={css.Driver}>{volume.Driver}</Grid>
                                    </Tooltip>
                                    <Tooltip title={volume.Mountpoint}>
                                        <Grid className={css.Mountpoint}>{volume.Mountpoint}</Grid>
                                    </Tooltip>

                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<MenuVolumes
                                            volumeName={volume.Name}
                                            volumeOperation={handleVolumeOperation}
                                        />}
                                        // label="Select"
                                        label=""
                                    />
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    There are no additional data to display yet.
                                </Typography>
                            </AccordionDetails>

                        </Accordion>

                    </React.Fragment>
                    // <Grid item container className={css.Content} key={volume.Name}>
                    // </Grid>
                }))
                :
                ''
            }
        </Grid>
    }

    return (
        <div className={css.Volumes}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Volumes</h1>
                <p>Showing information about Volumes based on the `podman volume inspect` command</p>
                <Grid container className={css.Content}>
                    <Grid item className={css.Buttons}>
                        <Button
                            disabled={!isSelected}
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleVolumeOperation(selectedVolumes, "remove")}>
                            Remove Selected
                        </Button>
                    </Grid>

                    <Grid item className={css.Buttons}>
                        <Button variant="outlined" color="primary" onClick={handleCreateVolumeOpen}>
                            Create
                        </Button>
                        <Dialog open={openCreateVolumeModal} onClose={handleCreateVolumeClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Create</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the name of volume you want to create"
                            </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Volume Create"
                                    type="text"
                                    fullWidth
                                    onChange={onChangeCreateVolume}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleVolumeCreate} color="primary">
                                    Create
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>

                </Grid>


                <div className={css.Info}>
                    <div className={volumesTitleClasses.join(' ')}>
                        <Checkbox color="primary" onClick={selectAll} checked={allTrue} />
                        <div className={css.Name}>Name</div>
                        <div className={css.Driver}>Driver</div>
                        <div className={css.Mountpoint}>Mountpoint</div>
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        volumes: state.volumes.volumes,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchVolumes: () =>
            dispatch(actions.fetchVolumes()),
        createVolume: (name) =>
            dispatch(actions.createVolume(name)),
        removeVolumes: (selectedVolumes: string[]) =>
            dispatch(actions.removeVolumes(selectedVolumes)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Volumes);
