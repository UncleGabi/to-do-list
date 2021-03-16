import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./components/header/header.component";
import ToDoItems from "./components/to-do-items/to-do-items.component";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/UncleGabi/to-do-list/todoItems",
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      id: 1,
      todoItem: "",
      todoItems: [],
    };
  }

  async componentDidMount() {
    const res = await api.get("/");
    this.setState({ todoItems: res.data });
  }

  async componentWillUnmount() {
    const { todoItems } = this.state;

    api.post("/", { todoItems: todoItems });
  }

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ todoItem: value });
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleAdd = async () => {
    const { id, todoItem, todoItems } = this.state;
    const newItem = { id, name: todoItem, checked: false };

    todoItem.length
      ? this.setState({ todoItems: [...todoItems, newItem] })
      : this.setState({ todoItems: [...todoItems] });

    this.setState({ id: id + 1 });
    this.setState({ todoItem: "" });

    const res = await api.post("/", { todoItems: [...todoItems, newItem] });
    console.log(res);
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleDelete = async (itemId) => {
    const { todoItems } = this.state;
    const filteredItems = todoItems.filter((item) => item.id !== itemId);

    this.setState({ todoItems: filteredItems });
    const res = await api.post("/", { todoItems: filteredItems });
    console.log(res);
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleCheck = (todoItem) => {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(todoItem);
    const currentItem = todoItems[index];

    currentItem.checked = !currentItem.checked;
    this.setState({ todoItems: todoItems });
    console.log(this.state);
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header
            handleChange={this.handleChange}
            handleAdd={this.handleAdd}
            inputValue={this.state.todoItem}
          />
          <div className="to-do-container">
            <ToDoItems
              todoItems={this.state.todoItems}
              handleDelete={this.handleDelete}
              handleCheck={this.handleCheck}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
