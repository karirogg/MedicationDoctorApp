import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import CycleReducer from './Reducers/cycle-reducer';
import DoseReducer from './Reducers/dose-reducer';

import {Cycle, Dose} from './types';
import IDReducer from './Reducers/id-reducer';

export interface IAppState {
    cycles : Cycle[],
    doses : Dose[],
    IDs : {
        cycle_id : number,
        dose_id : number
    }
}

const rootReducer = combineReducers<IAppState>({
    cycles: CycleReducer,
    doses: DoseReducer,
    IDs: IDReducer 
});

export default function configureStore(): Store<IAppState, any> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}