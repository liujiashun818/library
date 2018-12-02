import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './root';
import store from '../store/createStore';
import routeConfig from '../store/routeConfig';

const MOUNT_NODE = document.getElementById('root');

const render = (app) =>{
    ReactDOM.render(
        <AppContainer warnings={false}>
            {app}
        </AppContainer>,MOUNT_NODE
    );
}

render(<Root store={store} routeConfig={routeConfig} history={history}/>)