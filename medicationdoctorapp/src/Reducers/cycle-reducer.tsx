import {NewCycleAction} from '../Actions/submit-meds';
import {Cycle} from '../types';

// cycle_id -- date_start -- date_stop -- medication_id -- doctor_id
// Todo: hash the reducers O(1)

const initialState: Cycle[] = [
    {
        cycle_id: 0, 
        date_start: new Date(2020, 3, 20), 
        date_stop: new Date(2020,4,26), 
        medication_id: "Aspirin", 
        doctor_id: "0874"
    }, 
    {
        cycle_id: 1, 
        date_start: new Date(2019, 11, 11), 
        date_stop: new Date(2020,1,5), 
        medication_id: "Panodil", 
        doctor_id: "0874"
    },
    {
        cycle_id: 2, 
        date_start: new Date(2019, 10, 20), 
        date_stop: new Date(2020,1,21), 
        medication_id: "Aspirin", 
        doctor_id: "0874"
    }, 
    {
        cycle_id: 3, 
        date_start: new Date(2019, 11, 11), 
        date_stop: new Date(2020,1,5), 
        medication_id: "Panodil", 
        doctor_id: "0874"
    }
];


// Todo: have multiple action types
export default (state=initialState, action : NewCycleAction) : Cycle[] => {
    let state_copy : Cycle[] = [...state];

    let index = -1;

    switch(action.type) {
        case "NEW_CYCLE":
            state_copy.push(action.cycle);
            break;
        case "EDIT_CYCLE":
            // watch out that cycle id changes when edited cycle is created
            for(let i = 0; i<state_copy.length; i++) 
                if(state_copy[i].cycle_id === action.lastCycleID) 
                    index = i;
            if(index === -1) 
                console.log("ERROR 1");
            
            state_copy[index].date_stop = new Date();
            state_copy.push(action.cycle);
            break;
        case "STOP_CYCLE":
            for(let i = 0; i<state_copy.length; i++) 
                if(state_copy[i].cycle_id === action.lastCycleID) 
                    index = i;
            if(index === -1) 
                console.log("ERROR 1");

            state_copy[index].date_stop = new Date();
        default: break;

    }

    return(state_copy);
}