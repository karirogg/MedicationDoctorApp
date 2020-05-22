import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Cycle, Dose} from '../types';
import {IAppState} from '../store';

import {summarizeAmounts, summarizeDoses, formatDate} from '../help-functions';

import {stopCycle} from '../Actions/submit-meds'; 

import '../CSS/EditWindow.css';

const mapDispatchToProps = {
    stopCycle
};

const mapStateToProps = (store: IAppState) => {
    return {
        doses: store.doses,
        cycles: store.cycles
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & {
    currentCycleID : number;
    closeEditWindow : () => void;
    openAddWindow : (i : number) => void;
    cycles : Cycle[];
    doses : Dose[];
}

class EditWindow extends React.Component<IProps> {
    editCycle = () => {
        this.props.openAddWindow(this.props.currentCycleID);
    }

    stopCycle = () => {
        this.props.stopCycle(this.props.currentCycleID);
    }

    render() {
        console.log(this.props.currentCycleID);
        let currentCycle = this.props.cycles.filter((cycle) => cycle.cycle_id === this.props.currentCycleID)[0];
        let currentCycleDoses = this.props.doses.filter((dose) => dose.cycle_id === currentCycle.cycle_id);
        let pastCycles = this.props.cycles.filter((cycles) => 
            cycles.cycle_id !== this.props.currentCycleID && cycles.medication_id === currentCycle.medication_id
        );

        pastCycles.sort((a,b) => {
            if(a.date_start < b.date_start) return 1;
            else return -1;
        })

        return(<div>
            <div className="dim-background" onClick={this.props.closeEditWindow} />
            <div className="edit-window">
                <div className="top">{currentCycle.medication_id}</div>
                <div className="current-cycle">
                    <div className="current-cycle-info">
                        <p className="title">Núverandi meðferð:</p>
                        <p>{summarizeAmounts(currentCycleDoses)}</p>
                        <p>{summarizeDoses(currentCycleDoses)}</p>
                        <p>Hófst: {formatDate(currentCycle.date_start)}</p>
                        <p>Læknir: {currentCycle.doctor_id}</p>
                    </div>
                    <button className="stop-cycle-btn" onClick={this.stopCycle}>Stöðva</button>
                    <button className="change-cycle-btn" onClick={this.editCycle}>Breyta</button>
                </div>
                <div className="past-cycles">
                    <p className="title">Fyrri meðferðir:</p>
                    {pastCycles.length > 0 ?
                    <div className="table-holder">
                        <table className="past-cycle-table">
                            <thead>
                                <tr>
                                    <th>Magn</th>
                                    <th>Tímar</th>
                                    <th>Tímabil</th>
                                    <th>Læknir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastCycles.map((cycle) => {
                                    let thisCycleDoses = this.props.doses.filter((dose) => 
                                        dose.cycle_id === cycle.cycle_id
                                    );

                                    thisCycleDoses.sort((a,b) => {
                                        if(parseInt(a.hour) > parseInt(b.hour) || parseInt(a.minute) > parseInt(b.minute)) return 1;
                                        return -1;
                                    })
                                    return(
                                    <tr>
                                        <td>{summarizeAmounts(thisCycleDoses)}</td>
                                        <td>{summarizeDoses(thisCycleDoses)}</td>
                                        <td>{formatDate(cycle.date_start) + " - " + ((cycle.date_stop !== undefined) ? formatDate(cycle.date_stop) : "")}</td>
                                        <td>Sæmundur Rögnvaldsson</td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table> 
                    </div> : <p>Engar fyrri meðferðir</p>}
                </div>
                <button className="new-cycle-btn">Ný lota</button>
            </div>
        </div>)
    }
}

export default connector(EditWindow);