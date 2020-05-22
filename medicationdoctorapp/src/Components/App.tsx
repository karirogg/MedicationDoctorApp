import React from 'react';
import '../CSS/App.css';
import MedsTable from './MedsTable';
import AddWindow from './AddWindow';
import EditWindow from './EditWindow';

interface IProps {

}

interface IState {
    addWindowOpen : boolean;
    editWindowOpen : boolean;
    viewedCycleID : number;
}

class App extends React.Component<IProps, IState> {
    state = {
        addWindowOpen: false,
        editWindowOpen: false,
        viewedCycleID: -1
    };

    closeAddWindow = () => {
        this.setState({
            addWindowOpen: false,
            editWindowOpen: this.state.editWindowOpen,
            viewedCycleID: -1
        });
    }
    openAddWindow = (i : number) => {
        this.setState({
            addWindowOpen: true,
            editWindowOpen: false,
            viewedCycleID: i
        });
    }

    closeEditWindow = () => {
        this.setState({
            addWindowOpen: this.state.addWindowOpen,
            editWindowOpen: false,
            viewedCycleID: -1
        });
    }
    openEditWindow = (i : number) => {
        this.setState({
            addWindowOpen: false,
            editWindowOpen: true,
            viewedCycleID: i
        });
    } 

    render() {
        return(
            <div className="App">
                <div className="header"><p>Kári Rögnvaldsson - kt. 2305013510</p></div>
                <button className="add-meds-btn" onClick={() => this.openAddWindow(-1)}>Ný lota</button>
                <MedsTable openEditWindow={this.openEditWindow} />
                {this.state.editWindowOpen ? <EditWindow openAddWindow={this.openAddWindow} closeEditWindow={this.closeEditWindow} currentCycleID={this.state.viewedCycleID} /> : null}
                {this.state.addWindowOpen ? <AddWindow openEditWindow={this.openEditWindow} closeAddWindow={this.closeAddWindow} currentCycleID={this.state.viewedCycleID} /> : null}
            </div>
            );
    }
}

export default App;
