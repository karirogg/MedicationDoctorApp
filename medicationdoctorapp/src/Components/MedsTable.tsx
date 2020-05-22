import React from 'react';
import {connect} from 'react-redux';
import {Cycle, Dose} from '../types';
import {IAppState} from '../store';

import '../CSS/MedsTable.css';

import {summarizeAmounts, summarizeDoses, formatDate} from '../help-functions';

interface IProps {
    cycles: Cycle[];
    doses: Dose[];
    openEditWindow : (i : number) => void;
}

class MedsTable extends React.Component<IProps> {
    render() {
        // Filter cycles that active i.e. are relevant today
        const activeCycles = this.props.cycles.filter((cycle) => {
            if(cycle.date_stop) {
                var newEnd = new Date(cycle.date_stop.getTime());
                newEnd.setDate(newEnd.getDate()+1);
                const today = new Date();

                return today >= cycle.date_start && today < newEnd;
            } else {
                return true;
            }
        });

        return(
            <table className="medication-info">
                <thead>
                    <tr>
                        <th>Nafn</th>
                        <th>Magn</th>
                        <th>Skammtar</th>
                        <th>Upphaf lotu</th>
                    </tr>
                </thead>
                <tbody>
                    {activeCycles.map((cycle, i) => {
                        // Get doses matching with with current cycle id
                        const matchingDoses = this.props.doses.filter((dose) => {
                            return (dose.cycle_id === cycle.cycle_id);
                        });
                        return(<tr onClick={() => this.props.openEditWindow(cycle.cycle_id)} key={i}>
                            <td>{cycle.medication_id}</td>
                            <td>{summarizeAmounts(matchingDoses)}</td>
                            <td>{summarizeDoses(matchingDoses)}</td>
                            <td>{formatDate(cycle.date_start)}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (store: IAppState) => {
    return {
        cycles: store.cycles,
        doses: store.doses
    }
} 

export default connect(mapStateToProps)(MedsTable);