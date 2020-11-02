import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Images.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Image } from '../../models/Models';


interface IImagesProps {
    images: Image[],
    loading: boolean,
    fetchImages: Function
}

const Images = (props: IImagesProps) => {
    const { fetchImages, images } = props;

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);


    const imagesTitleClasses = [css.Content, css.Heading];
    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <div>
            {images && images.length && images.map((image, i) => {
                return <div className={css.Content} key={image.id}>
                    <div className={css.Repository}>{image.repository}</div>
                    <div className={css.Tag}>{image.tag}</div>
                    <div className={css.Id}>{image.id}</div>
                    <div className={css.Created}>{image.created}</div>
                    <div className={css.Size}>{image.size}</div>
                </div>
            })}
        </div>
    }

    return (
        <div className={css.Images}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Images</h1>
                <p>Showing information about images based on the `podman images` command</p>
                <div className={css.Info}>
                    <div className={imagesTitleClasses.join(' ')}>
                        <div className={css.Repository}>Repository</div>
                        <div className={css.Tag}> Tag</div>
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
