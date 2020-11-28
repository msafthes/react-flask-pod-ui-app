import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Images.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Image } from '../../models/Models';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';


interface IImagesProps {
    images: Image[],
    loading: boolean,
    fetchImages: Function,

    imagesDataTest: Image[]
}

const Images = (props: IImagesProps) => {
    const { fetchImages, images } = props;

    const [localImages, setLocalImages] = useState<any>({});

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    useEffect(() => {
        for (const [key, value] of Object.entries(images)) {
            localImages[value.id] = false
        }
    }, []);

    console.log(localImages);

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...localImages };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                old[key] = !old[key];
                setLocalImages(old);
            }
        }
    };

    const imagesTitleClasses = [css.Content, css.Heading];
    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <Grid container direction="column">
            {images && images.length && images.map((image, i) => {
                return <Grid item container className={css.Content} key={image.id}>
                    <Checkbox color="primary" onClick={handleCheckboxChange} id={image.id} />
                    <Grid className={css.Repository}>{image.repository}</Grid>
                    <Grid className={css.Tag}>{image.tag}</Grid>
                    <Grid className={css.Id}>{image.id}</Grid>
                    <Grid className={css.Created}>{image.created}</Grid>
                    <Grid className={css.Size}>{image.size}</Grid>
                </Grid>

            })}
        </Grid>
    }

    return (
        <div className={css.Images}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Images</h1>
                <p>Showing information about images based on the `podman images` command</p>
                <div className={css.Info}>
                    <div className={imagesTitleClasses.join(' ')}>
                        <Checkbox color="primary" />
                        <div className={css.Repository}>Repository</div>
                        <div className={css.Tag}>Tag</div>
                        <div className={css.Id}>ID</div>
                        <div className={css.Created}>Created</div>
                        <div className={css.Size}>Size</div>
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        images: state.images.images,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchImages: () =>
            dispatch(actions.fetchImages()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Images);
