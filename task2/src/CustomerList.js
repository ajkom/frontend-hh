import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';


import AddCustomer from './AddCustomer';


class CustomerList extends Component {
  state = { customers: []};

  componentDidMount() {
    this.loadCustomers();
  }

// load customers from API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content,
      });
  });
  }

//add new customer
  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  //
  showTrainings = (idLink) => {
    alert("button pressed but no idea yet")
  }

// delete a customer
onDelClick = (idLink) => {
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure you want to delete?',
    buttons: [
      {
        label: 'Yes',
        onClick:() => {
          fetch(idLink, {method: 'DELETE'})
        .then(res => this.loadCustomers())
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
      <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
      </div>
      <ReactTable data={this.state.customers}
        columns={[
          {
            Header: 'First name',
            accessor: 'firstname'
          },
          {
            Header: 'Last name',
            accessor: 'lastname'
          },
          {
            Header: 'Street Address',
            accessor: 'streetaddress'
          },
          {
            Header: 'Post code',
            accessor: 'postcode'
          },
          {
            Header: 'City',
            accessor: 'city'
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Phone number',
            accessor: 'phone'
          },
          {
            Header: 'Trainings',
            id: 'button',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[2].href',
            Cell: ({value}) => (<button className="btn btn-default btn-link"
            onClick={()=>{this.showTrainings(value)}}>Show</button>)
          },
          {
            id: 'button',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
          }
        ]}





        filterable
        className="-highlight" >
      </ReactTable>
      <ToastContainer autoClose={2000}/>



    </div>
);

  }



}

export default CustomerList;
