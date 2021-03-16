import React from "react";

import "./to-do-items.styles.scss";

import ToDoItem from "../to-do-item/to-do-item.component";

const ToDoItems = ({ todoItems, handleDelete, handleCheck }) => {
  return (
    <div className="to-do-items">
      {todoItems.map((item) => (
        <ToDoItem
          key={item.id}
          todoItem={item}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
        />
      ))}
    </div>
  );
};

export default ToDoItems;
