import React, { useState } from "react";
import ChangeTodoModal from "./changeTodoModal";

function TodosTable(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoValue, setTodoValue] = useState('');
  const [idToChange, setIdToChange] = useState('');

  const handleShow = (id) => {
    let elem = document.getElementById(id).querySelector('.todoName').innerText;
    setTodoValue(elem);
    setIdToChange(id);
    setModalIsOpen(true)
  }

  return (
    <>
    <table className="table mb-4">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Todo item</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((todosVal, index) => {
          return (
            <tr key={index} id={index}>
              <th scope="row">{index + 1}</th>
              <td className="todoName">{todosVal}</td>
              <td>
                <button
                  name="delete-btn"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    props.onSelect(index);
                  }}
                  className="btn btn-danger fixit"
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={(e) => {
                    props.disableClick(index);
                  }}
                  className="btn btn-warning changeLabel"
                >
                  Complete
                </button>
              </td>
              <td>
                <button
                  onClick={(e) => {handleShow(index)}}
                  className="btn btn-info changeLabel"
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <ChangeTodoModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} sendValueToEdit={todoValue} sendIdToEdit={idToChange} getTodoValue={props.getTodoValue}/>
  </>
  );
}

export default TodosTable;
