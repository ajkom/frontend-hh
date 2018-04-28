import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TrainingList extends Component {
  state = { trainings: []};

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData,
      });
  });
  }

  render() {
    return(
    <div className="App-body">
      <ReactTable data={this.state.trainings}
        columns={[
          {
            Header: 'Activity',
            accessor: 'activity'
          },
          {
            Header: 'Duration',
            accessor: 'duration'
          },
          {
            id: 'trainingDate',
            Header: 'Date',
            accessor: d => {
              let x = new Date(d.date)
              let dd = x.getDate();
              let mm = x.getMonth() +1;
              let yyyy= x.getFullYear();
              let date = (new Date(yyyy, mm, dd)).toISOString().split('T')[0]
              return date
            }
          },
          {
            id: 'customerName',
            Header: 'Customer',
            accessor: n => {
              if (n.customer != null) {
              return n.customer.lastname+', '+n.customer.firstname
              } else return (n.customer)
            }
          }
        ]}

        filterable
        className="-highlight" >
      </ReactTable>



    </div>
);

  }



}

export default TrainingList;
