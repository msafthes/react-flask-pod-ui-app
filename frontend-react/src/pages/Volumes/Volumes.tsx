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
                    return <Grid item container className={css.Content} key={volume.Name}>
                        <Checkbox color="primary" onClick={handleCheckboxChange} id={volume.Name} checked={selectedVolumes[volume.Name]} />
                        <Grid className={css.Name}>{volume.Name}</Grid>
                        <Grid className={css.Driver}>{volume.Driver}</Grid>
                        <Grid className={css.Mountpoint}>{volume.Mountpoint}</Grid>
                    </Grid>

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
