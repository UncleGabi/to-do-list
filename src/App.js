import React, { Component } from "react";

import "./App.css";

import Header from "./components/header/header.component";
import ToDoItem from "./components/to-do-item/to-do-item.component";
import ToDoItems from "./components/to-do-items/to-do-items.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      id: 1,
      todoItem: "",
      todoItems: [],
    };
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ todoItem: value });
  };

  handleClick = () => {
    const { id, todoItem, todoItems } = this.state;
    const newItem = { id, name: todoItem, checked: false };

    todoItem.length
      ? this.setState({ todoItems: [...todoItems, newItem] }) //do nothing;
      : this.setState({ todoItems: [...todoItems] });

    this.setState({ id: id + 1 });
    this.setState({ todoItem: "" });
  };

  handleDelete = (itemId) => {
    const { todoItems } = this.state;
    const filteredItems = todoItems.filter((item) => item.id !== itemId);

    this.setState({ todoItems: filteredItems });
  };

  handleCheck = (todoItem) => {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(todoItem);
    const currentItem = todoItems[index];

    currentItem.checked = !currentItem.checked;
    this.setState({ todoItems: todoItems });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            inputValue={this.state.todoItem}
          />
          <div className="to-do-container">
            <ToDoItems
              todoItems={this.state.todoItems}
              handleDelete={this.handleDelete}
              handleCheck={this.handleCheck}
              enabled={this.state.enabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
