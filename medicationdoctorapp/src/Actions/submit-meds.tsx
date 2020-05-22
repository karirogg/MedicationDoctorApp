import {Cycle, Dose} from '../types';
import {Dispatch} from 'redux';

export interface NewCycleAction {
    type : string;
    cycle : Cycle;
    doses : Dose[];
    lastCycleID : number
}

export const addCycle = (cycle : Cycle, doses: Dose[]) => {
    return (dispatch : Dispatch) => dispatch<NewCycleAction>({
        type: "NEW_CYCLE",
        cycle: cycle,
        doses: doses,
        lastCycleID: -1
    });
}

export const editCycle = (cycle : Cycle, doses : Dose[], lastCycleID : number) => {
    return (dispatch : Dispatch) => dispatch<NewCycleAction>({
        type: "EDIT_CYCLE",
        cycle: cycle,
        doses: doses,
        lastCycleID: lastCycleID
    });
}

export const stopCycle = (cycle_id : number) => {
    return (dispatch : Dispatch) => dispatch<NewCycleAction>({
        type: "STOP_CYCLE",
        cycle: {
            cycle_id: -1,
            date_start: new Date(),
            date_stop: undefined,
            medication_id: "",
            doctor_id: ""
        },
        doses: [],
        lastCycleID: cycle_id
    })
}