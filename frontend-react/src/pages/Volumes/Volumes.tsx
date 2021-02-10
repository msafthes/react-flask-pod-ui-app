import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Volumes.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Volume } from '../../models/Models';

import { isAllTrue, handleSelectAll } from '../../helpers/helpers';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import DeleteIcon from '@material-ui/icons/Delete';
// import { makeStyles } from '@material-ui/core/styles';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuVolumes from '../../components/MaterialCustomized/MenuVolumes';
import Tooltip from '@material-ui/core/Tooltip';


interface IVolumesProps {
    volumes: Volume[],
    loading: boolean,
    fetchVolumes: Function,
    removeVolumes: Function,

    volumesDataTest: Volume[]
}

const Volumes = (props: IVolumesProps) => {
    const { fetchVolumes, removeVolumes, volumes } = props;
    const defaultSelectedVolumes = {};

    for (const [key, value] of Object.entries(volumes)) {
        defaultSelectedVolumes[value.Name] = false
    }

    const [selectedVolumes, setSelectedVolumes] = useState<any>({ ...defaultSelectedVolumes });

    const allTrue = isAllTrue(selectedVolumes);
    console.log(`OUTSIDE functions allTrue: ${allTrue}`);

    useEffect(() => {
        fetchVolumes();
    }, [fetchVolumes]);

    console.log(selectedVolumes);

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...selectedVolumes };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                old[key] = !old[key];
            }
        }

        setSelectedVolumes(old);
        console.log(selectedVolumes);
    };

    const selectAll = () => {
        const updated = handleSelectAll(setSelectedVolumes);
        setSelectedVolumes(updated);
        console.log(selectedVolumes);
    };

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
                                        // removeItem={handleRemoveVolumes}
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Volumes);
