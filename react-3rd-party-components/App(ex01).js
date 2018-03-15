import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', date: '', todos: []}
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    const newTodo =  {description: this.state.description, date: this.state.date};
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }
  
  render() {
    
      const columns = [{
          Header: 'Date',
          accessor: 'date'
      }, {
          Header: 'Description',
          accessor: 'description',
      }]
      
      
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <div>
          <form onSubmit={this.addTodo}>
            Description:<br/>
            <input type="text" name="description" onChange={this.inputChanged} value={this.state.description}/><br/>
             Date:<br/>
            <input type="text" name="date" onChange={this.inputChanged} value={this.state.date}/>
            <input type="submit" value="Add"/>
          </form>
        </div>
        <div>

        
        <ReactTable data={this.state.todos}
            columns={columns} sortable='true'
        defaultPageSize='10' />
        
        
        </div>          
      </div>    
    );
  }
}

export default App;