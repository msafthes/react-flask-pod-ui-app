import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Containers.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Container } from '../../models/Models';


interface IContainersProps {
    containers: Container[],
    loading: boolean,
    fetchContainers: Function,

    containersDataTest: Container[]
}

const Containers = (props: IContainersProps) => {
    const { fetchContainers, containers } = props;

    useEffect(() => {
        fetchContainers();
    }, [fetchContainers]);

    // const containers = props.containersDataTest

    const containersTitleClasses = [css.Content, css.Heading];
    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <div>
            {containers && containers.length && containers.map((container, i) => {
                return <div className={css.Content} key={container.containerId}>
                    <div className={css.ContainerId}>{container.containerId}</div>
                    <div className={css.Image}>{container.image}</div>
                    <div className={css.Command}>{container.command}</div>
                    <div className={css.Created}>{container.created}</div>
                    <div className={css.Ports}>{container.ports}</div>
                    <div className={css.Names}>{container.names}</div>
                </div>
            })}
        </div>
    }

    return (
        <div className={css.Containers}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Containers</h1>
                <p>Showing information about Containers based on the `podman ps` command</p>
                <div className={css.Info}>
                    <div className={containersTitleClasses.join(' ')}>
                        <div className={css.ContainerId}>Container ID</div>
                        <div className={css.Image}>Image</div>
                        <div className={css.Command}>Command</div>
                        <div className={css.Created}>Created</div>
                        <div className={css.Ports}>Ports</div>
                        <div className={css.Names}>Names</div>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Containers);
