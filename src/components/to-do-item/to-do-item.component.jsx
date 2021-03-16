import React from "react";

import "./to-do-item.styles.scss";

const ToDoItem = ({ todoItem, handleDelete, handleCheck }) => {
  return (
    <div className="to-do-item">
      <h3
        style={{
          textDecoration: todoItem.checked ? "line-through" : "",
        }}
      >
        {todoItem.name}
      </h3>
      <div className="buttons">
        <button className="ready-btn" onClick={() => handleCheck(todoItem)}>
          {todoItem.checked ? "Uncheck" : "Check"}
          <span class="material-icons">
            {todoItem.checked ? "clear" : "check"}
          </span>
        </button>
        <button className="delete-btn" onClick={() => handleDelete(todoItem)}>
          Delete
          <span class="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
