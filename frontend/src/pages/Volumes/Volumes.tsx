import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Volumes.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import MenuVolumes from '../../components/MaterialCustomized/MenuVolumes';

import { Volume } from '../../models/Models';
import { isAllTrue, handleSelectAll, extractIds, isSelectedAny } from '../../helpers/helpers';
import { useViewport } from '../../Viewport';

// Material UI
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import { Alert, AlertTitle } from '@material-ui/lab';


interface IVolumesProps {
    volumes: Volume[],
    loading: boolean,
    errorVolumes: string,
    fetchVolumes: Function,
    createVolume: Function,
    removeVolumes: Function,

    volumesDataTest: Volume[]
}

const Volumes = (props: IVolumesProps) => {
    const { fetchVolumes, createVolume, removeVolumes, volumes, errorVolumes, loading } = props;
    const { tabletLandscape, desktop } = useViewport();

    // used for selected volumes initialization
    const defaultSelectedVolumes = {};

    // by default no volumes are selected
    for (const [key, value] of Object.entries(volumes)) {
        defaultSelectedVolumes[value.Name] = false
    }

    // local state
    const [selectedVolumes, setSelectedVolumes] = useState<any>({ ...defaultSelectedVolumes });
    const [openCreateVolumeModal, setOpenCreateVolumeModal] = useState(false);
    const [createVolumeName, setCreateVolumeName] = useState("");
    const [showBackendError, setShowBackendError] = useState<boolean>(false);

    // tracks if all volumes are selected in which case the main select checkbox becomes checked
    const allTrue = isAllTrue(selectedVolumes);

    // fetch information about volumes
    useEffect(() => {
        fetchVolumes();
    }, [fetchVolumes]);

    // checks if there is an error from backend
    useEffect(() => {
        setShowBackendError(errorVolumes.length > 0);
    }, [errorVolumes]);

    // whenever volumes data updates, add them to the selected volumes state, false by default
    useEffect(() => {
        const newSelected = {};
        for (const [key, value] of Object.entries(volumes)) {
            newSelected[value.Name] = false
        }
        setSelectedVolumes({ ...newSelected });
    }, [volumes]);

    // handles select volume checkbox event
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

    // the following 4 functions handle the "create volume" functionality, opening and closing the modal,
    // changing its name value as user types and triggers the appropriate Redux action to actually create the volume.
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
            return;
        }
        createVolume(createVolumeName);
        setCreateVolumeName('');
    };

    // handles various volume operations triggered from the ACTIONS button for a specific volume (not using the select feature)
    const handleVolumeOperation = (selectedVolumes, mode: string) => {
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

    // marks all volumes as selected
    const selectAll = () => {
        const updated = handleSelectAll(selectedVolumes);
        setSelectedVolumes(updated);
    };

    // if there is a selected volume, the operations that require selection become available
    const isSelected = isSelectedAny(selectedVolumes);

    const volumesTitleClasses = [css.Content, css.Heading];

    // stores the main content - information about volumes
    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (volumes) {
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
                                        onChange={handleCheckboxChange}
                                        id={volume.Name}
                                        checked={selectedVolumes[volume.Name] || false}
                                    />}
                                    label=""
                                />
                                <Grid item container className={css.Content}>
                                    <Tooltip title={volume.Name}>
                                        <Grid className={css.Name}>{volume.Name}</Grid>
                                    </Tooltip>
                                    {(desktop || tabletLandscape) &&
                                        <Tooltip title={volume.Driver}>
                                            <Grid className={css.Driver}>{volume.Driver}</Grid>
                                        </Tooltip>
                                    }
                                    {desktop &&
                                        <Tooltip title={volume.Mountpoint}>
                                            <Grid className={css.Mountpoint}>{volume.Mountpoint}</Grid>
                                        </Tooltip>
                                    }

                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<MenuVolumes
                                            volumeName={volume.Name}
                                            volumeOperation={handleVolumeOperation}
                                        />}
                                        label=""
                                    />
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Grid container direction="column">
                                    <Grid container direction="row">
                                        <Grid item className={css.DetailTitle}>Mountpoint:</Grid>
                                        <Grid item className={css.Mountpoint}>{volume.Mountpoint}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item className={css.DetailTitle}>Driver:</Grid>
                                        <Grid item className={css.Driver}>{volume.Driver}</Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </React.Fragment>
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
                <Grid container className={css.Buttons}>
                    <Grid item className={css.Button}>
                        <Button
                            disabled={!isSelected}
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleVolumeOperation(selectedVolumes, "remove")}>
                            Remove Selected
                        </Button>
                    </Grid>

                    <Grid item className={css.Button}>
                        <Button variant="outlined" color="primary" onClick={handleCreateVolumeOpen}>
                            Create
                        </Button>
                        <Dialog open={openCreateVolumeModal} onClose={handleCreateVolumeClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Create</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the name of volume you want to create
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

                    {loading && <LoadingIndicator />}

                </Grid>

                {showBackendError &&
                    <Alert severity="error" onClose={() => { setShowBackendError(!showBackendError) }}>
                        <AlertTitle><strong>Backend Error</strong></AlertTitle>
                        {errorVolumes.length > 0 &&
                            <p className={css.Error}>{errorVolumes}</p>
                        }
                    </Alert>
                }

                <div className={css.Info}>
                    <div className={volumesTitleClasses.join(' ')}>
                        <Checkbox color="primary" onChange={selectAll} checked={allTrue || false} />
                        <div className={css.Name}>Name</div>
                        {(desktop || tabletLandscape) &&
                            <div className={css.Driver}>Driver</div>
                        }
                        {desktop &&
                            <div className={css.Mountpoint}>Mountpoint</div>
                        }
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
};

// Redux Store variables
const mapStateToProps = (state: AppState) => {
    return {
        volumes: state.volumes.volumes,
        loading: state.volumes.loading,
        errorVolumes: state.volumes.error,
    };
};

// Redux Store actions
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
