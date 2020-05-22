import {NewIDAction} from '../Actions/new-id';

interface IDCounter {
    cycle_id : number,
    dose_id : number
}

const initialState : IDCounter = {
    cycle_id: 4,
    dose_id: 6
}

export default (state=initialState, action : NewIDAction) => {
    let state_copy = {...state};

    switch(action.type) {
        case "UP_CYCLE_ID":
            state_copy.cycle_id++;
            break;
        case "UP_DOSE_ID":
            state_copy.dose_id++;
            break;
        default: break;
    }

    return state_copy;
}