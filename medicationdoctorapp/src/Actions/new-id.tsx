import {Dispatch} from 'redux';

export interface NewIDAction {
    type : string
}

export const newCycleID = () => {
    return (dispatch : Dispatch) => dispatch<NewIDAction>({
        type: "UP_CYCLE_ID"
    });
}

export const newDoseID = () => {
    return (dispatch : Dispatch) => dispatch<NewIDAction>({
        type: "UP_DOSE_ID"
    });
}
