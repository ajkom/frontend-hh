import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddCustomer from './AddCustomer';


class CustomerList extends Component {
  state = { customers: []};

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content,
      });
  });
  }

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
        ]}





        filterable
        className="-highlight" >
      </ReactTable>



    </div>
);

  }



}

export default CustomerList;
