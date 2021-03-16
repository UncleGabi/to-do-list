import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";

import "./header.styles.scss";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { handleChange, handleAdd, inputValue } = this.props;

    return (
      <div className="header">
        <h1>ToDo List</h1>
        <div className="form-input-div">
          <FormInput
            handleChange={handleChange}
            value={inputValue}
            label="Add ToDo..."
          />
          <button onClick={handleAdd}>
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
