import {Dose} from '../types';
import {NewCycleAction} from '../Actions/submit-meds';

// dose_id -- cycle_id -- dose -- unit -- time -- nth_day

const initialState: Dose[] = [
    {
        dose_id: 0,
        cycle_id: 0,
        amount: 500,
        unit: "mg",
        hour: "09",
        minute: "00",
        nth_day: 1
    }, 
    {
        dose_id: 1,
        cycle_id: 0,
        amount: 150,
        unit: "mg",
        hour: "15",
        minute: "00",
        nth_day: 1
    },
    {
        dose_id: 2,
        cycle_id: 1,
        amount: 75,
        unit: "mg",
        hour: "12",
        minute: "00",
        nth_day: 1
    },
    {
        dose_id: 3,
        cycle_id: 0,
        amount: 500,
        unit: "mg",
        hour: "18",
        minute: "30",
        nth_day: 1
    }, 
    {
        dose_id: 4,
        cycle_id: 2,
        amount: 150,
        unit: "mg",
        hour: "15",
        minute: "00",
        nth_day: 1
    },
    {
        dose_id: 5,
        cycle_id: 2,
        amount: 75,
        unit: "mg",
        hour: "12",
        minute: "00",
        nth_day: 1
    }
];

export default (state=initialState, action : NewCycleAction) => {
    let state_copy : Dose[] = [...state];

    switch(action.type) {
        case "NEW_CYCLE":
            action.doses.map((dose : Dose) => (state_copy.push(dose)));
            break;
        case "EDIT_CYCLE": 
            action.doses.map((dose : Dose) => (state_copy.push(dose)));
            break;
        default: break;
    }

    return(state_copy);
}