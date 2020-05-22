import React, {Component, ChangeEvent} from 'react';
import '../CSS/NewDose.css';
import {Dose} from '../types';
import deleteIcon from '../Images/DeleteIcon.svg';

interface IProps {
    id : number;
    dose : Dose;
    hr_up : (i : number) => void;
    hr_down : (i : number) => void;
    min_up : (i : number) => void;
    min_down : (i : number) => void;
    edit_minute : (value : string, i : number) => void;
    edit_hour : (value : string, i : number) => void;
    edit_amount : (value : number, i : number) => void;
    removeElementAtIndex : (i : number) => void;
}

class NewDose extends Component<IProps> {
    hourEdited = (event : ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        if(newValue.length <= 2) {
            this.props.edit_hour(newValue.replace(/[^0-9]+/g, ""), this.props.id);
        } 
    }
    minuteEdited = (event : ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;
        if(newValue.length <= 2) {
            this.props.edit_minute(newValue.replace(/[^0-9]+/g, ""), this.props.id);
        }
    }
    amountEdited = (event : ChangeEvent<HTMLSelectElement>) => {
        this.props.edit_amount(parseInt(event.target.value), this.props.id);
    }

    render() {
        const availableAmounts = [75, 150, 500];
        const unit = "mg";

        return(<div className="new-dose">
        <div className="select-amount">
            <select ref="amount" value={this.props.dose.amount} onChange={this.amountEdited}>
                {availableAmounts.map((amount, i) => {
                    return (<option key={i} value={amount}>{amount + unit}</option>);
                })}
            </select>
        </div>
        <div className="time-picker">
            <div className="hour">
                <div className="hr-up" onClick={() => {this.props.hr_up(this.props.id)}} />
                <input type="text" className="hr" onChange={this.hourEdited.bind(this)} value={this.props.dose.hour} max="99" />
                <div className="hr-down" onClick={() => {this.props.hr_down(this.props.id)}} />
            </div>
            <div className="separator">:</div>
            <div className="minute">
                <div className="min-up" onClick={() => {this.props.min_up(this.props.id)}}/>
                <input type="text" className="min" onChange={this.minuteEdited.bind(this)} value={this.props.dose.minute} max="99" />
                <div className="min-down" onClick={() => {this.props.min_down(this.props.id)}} />
            </div>
        </div>
        <div className="remove-element" onClick={() => (this.props.removeElementAtIndex(this.props.id))}><img src={deleteIcon} height="15" width="15" alt="Delete icon" /></div>
    </div>);
    }
}

export default NewDose;