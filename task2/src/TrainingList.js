import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';

import AddTraining from './AddTraining';


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

  //add new training
    addTraining(training) {
      fetch('https://customerrest.herokuapp.com/api/trainings/',
      {   method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(training)
      })
      .then(res => this.loadTrainings())
      .catch(err => console.error(err))
    }


  // delete a training
  onDelClick = (idLink) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick:() => {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${idLink}`, {method: 'DELETE'})
          .then(res => this.loadTrainings())
          .catch(err => console.error(err))

          toast.success("Delete succeed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          }
        },
        {
          label: 'No',
          onClick: () => alert('Cancelled')
        }
      ]
    })
  }

  render() {
    return(
    <div className="App-body">
    <div className="row">
      <AddTraining addTraining={this.addTraining} loadTrainings={this.loadTrainings} />
      </div>
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
              //console.log(n.customer)
              if (n.customer != null) {
              return n.customer.lastname+', '+n.customer.firstname
              } else return (n.customer)
            }
          },
          {
            id: 'button',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
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
