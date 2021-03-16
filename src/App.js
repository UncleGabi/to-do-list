import React, { Component } from "react";
import axios from "axios";
import uuid from "react-uuid";

import "./App.css";

import Header from "./components/header/header.component";
import ToDoItems from "./components/to-do-items/to-do-items.component";

const api = axios.create({
  baseURL: "https://my-json-server.typicode.com/UncleGabi/to-do-list/todoItems",
  // baseURL: "http://localhost:3003/todoItems",
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      id: uuid(),
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

    api.post("/", { todoItems });
  }

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ todoItem: value });
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleAdd = async () => {
    const { todoItem, todoItems } = this.state;
    const newItem = { id: uuid(), name: todoItem, checked: false };

    todoItem.length
      ? this.setState({ todoItems: [...todoItems, newItem] })
      : this.setState({ todoItems: [...todoItems] });

    this.setState({ todoItem: "" });

    await api.post("/", newItem);
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleDelete = async (todoItem) => {
    const { todoItems } = this.state;
    const filteredItems = todoItems.filter((item) => item.id !== todoItem.id);

    this.setState({ todoItems: filteredItems });

    api
      .delete(`/${todoItem.id}`)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // console.log(this.state);
  };

  /* ------------------------------------------------------------------------------------------------------------------- */

  handleCheck = async (todoItem) => {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(todoItem);
    const currentItem = todoItems[index];

    currentItem.checked = !currentItem.checked;
    this.setState({ todoItems: todoItems });

    const res = await api.put(`/${todoItem.id}`, {
      ...todoItem,
    });
    console.log(res.data);
    return res.data;
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
