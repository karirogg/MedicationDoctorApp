import React, {ChangeEvent} from 'react';
import {Dose, Cycle} from '../types';
import '../CSS/AddWindow.css';
import NewDose from './NewDose';

import {IAppState} from '../store';
import {addCycle, editCycle} from '../Actions/submit-meds'; 
import {connect, ConnectedProps} from 'react-redux';

import {newCycleID, newDoseID} from '../Actions/new-id';

import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {isIS} from '@material-ui/core/locale';

const datePickerTheme = createMuiTheme({
    palette: {
      primary: { main: '#1976d2' },
    },
  }, isIS);

interface IState {
    name : string;
    currentDoses : Dose[];
    selectedStartDate : Date;
    selectedStopDate? : Date;
}

const mapDispatchToProps = {
    addCycle,
    newCycleID,
    newDoseID,
    editCycle
};

const mapStateToProps = (store: IAppState) => {
    return {
        cycle_id: store.IDs.cycle_id,
        dose_id: store.IDs.dose_id,
        doses: store.doses,
        cycles: store.cycles
    }
} 

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & {
    closeAddWindow : () => void;
    openEditWindow : (i : number) => void;
    currentCycleID : number;
}

class AddWindow extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);

        console.log("SOTO");
        if(this.props.currentCycleID === -1) {
            this.state = {
                name:"",
                currentDoses:[{
                    dose_id: this.props.dose_id, 
                    cycle_id: this.props.cycle_id, 
                    amount: 500, 
                    unit: "mg", 
                    hour: "09", 
                    minute: "00", 
                    nth_day: 1
                }],
                selectedStartDate: new Date(),
                selectedStopDate: new Date()
            };
        } else {
            let relevantDoses : Dose[] = this.props.doses.filter((dose : Dose) => (dose.cycle_id === this.props.currentCycleID));
            let currentCycle : Cycle = this.props.cycles.filter((cycle : Cycle) => cycle.cycle_id === this.props.currentCycleID)[0];

            this.state = {
                name: currentCycle.medication_id,
                currentDoses: relevantDoses,
                selectedStartDate: currentCycle.date_start,
                selectedStopDate: currentCycle.date_stop
            };
        }


    }

    formatTime = (num: number) => {
        if(String(num).length === 1) return("0" + String(num));
        return(""+num);
    }
    hr_up = (i : number) => {
        let hr = parseInt(this.state.currentDoses[i].hour);
        if(this.state.currentDoses[i].hour === "") hr = 0;
        hr++;
        if(hr > 23) hr = 0;
        var state_copy = {...this.state};
        state_copy.currentDoses[i].hour = this.formatTime(hr);
        this.setState(state_copy);
    }
    hr_down = (i : number) => {
        let hr = parseInt(this.state.currentDoses[i].hour);
        if(this.state.currentDoses[i].hour === "") hr = 0;
        hr--;
        if(hr < 0) hr = 23;
        var state_copy = {...this.state};
        state_copy.currentDoses[i].hour = this.formatTime(hr);
        this.setState(state_copy);
    }
    min_up = (i : number) => {
        let hr = parseInt(this.state.currentDoses[i].hour);
        let min = parseInt(this.state.currentDoses[i].minute);
        if(this.state.currentDoses[i].minute === "") min = 0;
        if(this.state.currentDoses[i].hour === "") hr = 0;

        min += 30;
        if(min >= 60) {
            min = 0;
            hr++;
            if(hr > 23) hr = 0;
        }
        var state_copy = {...this.state};
        state_copy.currentDoses[i].minute = this.formatTime(min);
        state_copy.currentDoses[i].hour = this.formatTime(hr);
        this.setState(state_copy);
    }
    min_down = (i : number) => {
        let hr = parseInt(this.state.currentDoses[i].hour);
        let min = parseInt(this.state.currentDoses[i].minute);
        if(this.state.currentDoses[i].hour === "") hr = 0;
        if(this.state.currentDoses[i].minute === "") min = 0;

        min -= 30;
        if(min < 0) {
            min = 30;
            hr--;
            if(hr < 0) hr = 23;
        }
        var state_copy = {...this.state};
        state_copy.currentDoses[i].minute = this.formatTime(min);
        state_copy.currentDoses[i].hour = this.formatTime(hr);
        this.setState(state_copy);
    }

    edit_minute = (value : string, i : number) => {
        let state_copy = {...this.state};
        state_copy.currentDoses[i].minute = value;
        this.setState(state_copy);
    }
    edit_hour = (value : string, i : number) => {
        let state_copy = {...this.state};
        state_copy.currentDoses[i].hour = value;
        this.setState(state_copy);
    }
    edit_name = (event : ChangeEvent<HTMLInputElement>) => {
        if(this.props.currentCycleID === -1) {
            let state_copy = {...this.state};
            const element = event.target as HTMLInputElement;
            state_copy.name = element.value;
            this.setState(state_copy);
        }
    }
    edit_amount = (value : number, i : number) => {
        let state_copy = {...this.state};
        state_copy.currentDoses[i].amount = value;
        this.setState(state_copy);
    }

    addDose = () => {
        this.props.newDoseID();
        var last = this.state.currentDoses[this.state.currentDoses.length-1];
        this.setState({
            name: this.state.name,
            currentDoses: [...this.state.currentDoses, {dose_id:this.props.dose_id, cycle_id: this.props.cycle_id, amount: (last) ? last.amount : 75, unit: "mg", hour:"09", minute:"00", nth_day:1}]});
    }

    removeElementAtIndex = (i : number) => {
        let state_copy = {...this.state};
        state_copy.currentDoses.splice(i, 1);
        this.setState(state_copy);
    }

    submitCycle = () => {
        this.props.newCycleID();
        this.props.closeAddWindow();
        if(this.props.currentCycleID === -1) {
            this.props.addCycle(
                {
                    cycle_id: this.props.cycle_id,
                    date_start: this.state.selectedStartDate,
                    date_stop: this.state.selectedStopDate,
                    medication_id: this.state.name,
                    doctor_id: "0874"
                },
                this.state.currentDoses
            );
        } else {
            // make sure that every dose of the new cycle has corresponding cycle id
            // when edited the cycle_id is still the same so an edit to that must be made
            let newDoses = [...this.state.currentDoses];
            for(let i = 0; i<newDoses.length; i++) {
                newDoses[i].cycle_id = this.props.cycle_id;
            }

            this.props.editCycle(
                {
                    cycle_id: this.props.cycle_id,
                    date_start: this.state.selectedStartDate,
                    date_stop: this.state.selectedStopDate,
                    medication_id: this.state.name,
                    doctor_id: "0874"
                },
                this.state.currentDoses,
                this.props.currentCycleID
            );
            this.props.openEditWindow(this.props.cycle_id);
        }
    }

    backgroundClick = () => {
        if(this.props.currentCycleID === -1) {
            this.props.closeAddWindow();
        } else {
            this.props.openEditWindow(this.props.currentCycleID);
        }
    }

    render() {

        return(<div>
            <div className="dim-background" onClick={this.backgroundClick} />
            <div className="add-window">
            <div className='header'>{(this.props.currentCycleID === -1) ? "Ný lyfjameðferð" : "Breyta meðferð"}</div>
                <input type="text" className="name-input" onChange={this.edit_name} placeholder="Nafn lyfs" value={this.state.name} />
                
                {this.state.currentDoses.map((dose, i) => {
                    return(<NewDose key={i} id={i} dose={dose} hr_up={this.hr_up} hr_down={this.hr_down} min_up={this.min_up} min_down={this.min_down} edit_minute={this.edit_minute} edit_hour={this.edit_hour} edit_amount={this.edit_amount} removeElementAtIndex={this.removeElementAtIndex} />);
                })}
                <div className="button-holder">
                    <button className="add-dose" onClick={this.addDose}>Nýr skammtur</button>
                    <button className="save" type="submit" onClick={this.submitCycle}>Vista</button>
                </div>
            </div>
        </div>)
    }
}

export default connector(AddWindow)