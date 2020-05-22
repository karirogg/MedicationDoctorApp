import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './Components/App';
//import * as serviceWorker from './Utilities/serviceWorker';
import {Provider} from 'react-redux';
import {Store} from 'redux';

import configureStore, {IAppState} from './store';

interface IProps {
  store: Store<IAppState>;
}

const Root: React.SFC<IProps> = props => {
    return(
        <Provider store={props.store}>
            <App />
        </Provider>
    );
};

const store = configureStore();
//store.dispatch(action());

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
