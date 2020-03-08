import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let url = 'http://localhost:3000/check';
// The data we are going to send in our request
let data = {
	"seasonNo":"1",
	"episodeNo":"1",
	"deal":"yes"
}
class App extends Component {
  state = {
    todos: []
  };
 
  componentDidMount() {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data })
      console.log(this.state.todos)
    })
    .catch(console.log)
  }
  render() {

    return (
       <div className="container">
        <div className="col-xs-12">
        <h1>My Todos</h1>
        {this.state.todos.map((todo) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{todo.company_id}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
              {todo.company_name} 
              </h6>
            </div>
          </div>
        ))}
        </div>
       </div>
    );
  }
}

export default App;
