import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TrainingList extends Component {
  state = { trainings: []};

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData.content,
      });
      console.log(this.state.trainings)
  });
  }

  render() {
    return(
    <div className="App-body">
      <ReactTable data={this.state.trainings}
        columns={[
          {
            Header: 'Date',
            accessor: 'date'

          },
          {
            Header: 'Duration',
            accessor: 'duration'
          },
          {
            Header: 'Activity',
            accessor: 'activity'
          },
        /*  {
            id: 'customerName',
            Header: 'Customer',
            accessor: d => d.links[0].href
          }*/
        ]}





        filterable
        className="-highlight" >
      </ReactTable>



    </div>
);

  }



}

export default TrainingList;
