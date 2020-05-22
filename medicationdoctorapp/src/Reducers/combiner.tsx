import {combineReducers} from 'redux';
import CycleReducer from './cycle-reducer';
import DoseReducer from './dose-reducer';
import IDReducer from './id-reducer';


const allReducers = combineReducers({
    cycles: CycleReducer,
    doses: DoseReducer,
    IDs: IDReducer
})

export default allReducers;