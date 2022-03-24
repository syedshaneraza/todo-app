import "./App.css";
import React, { useState } from "react";
import TodosTable from "./todosTable";

function App() {
  const [inputList, setInputList] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [disableTodos, setDisableTodos] = useState([])

  const todoEvent = (event) => {
    setInputList(event.target.value);
  };

  const changeValue = (abc, id) => {
    // Todos[id] = abc;
    let valueAtIndex = Todos[id];
    valueAtIndex = abc;
    Todos[id] = valueAtIndex;
    setTodos([...Todos]);
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    if (inputList === '')
    {
      alert("Please Fill The Required Field");
    }
    else
    {
      setTodos([...Todos, inputList]);
      setInputList("");
    }
  };

  const checkTodosLength = () => {
    if (Todos.length === 0 || Todos.length === null) return false;
    return true;
  };

  const deleteTodos = (id) => {
    Todos.splice(id, 1);
    setTodos([...Todos]);
  };

  const disableTodo = (id) => {
    setDisableTodos([...disableTodos, id]);
    let modify,disableNow;
    modify = document.getElementById(id);
    if (modify.querySelector('.changeLabel').innerHTML === 'Incomplete')
    {
      modify.querySelector('.changeLabel').innerHTML = "Complete";
      modify.querySelector('.fixit').disabled = false;
    }
    else if (modify.querySelector('.changeLabel').innerHTML === 'Complete')
    {
      disableNow = document.getElementById(id);
      disableNow.classList.add('disabled');
      disableNow.querySelector('.fixit').disabled = true;
      disableNow.querySelector('.changeLabel').innerHTML = "Incomplete";
    }
  };

  const editTodo = (id) => {
    let todoToEdit = document.getElementById(id);
    todoToEdit.querySelector('.todoName').setAttribute("contenteditable", "true")
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h3 className="text-center my-3 pb-3">ToDo App</h3>
                <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                        type="text"
                        value={inputList}
                        className="form-control"
                        placeholder="Enter a task"
                        onChange={todoEvent}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      onClick={handleClick}
                      type="submit"
                      className="btn btn-primary"
                    >
                      +
                    </button>
                  </div>
                </form>
                {checkTodosLength() && (
                  <TodosTable
                    data={Todos}
                    disableClick={disableTodo}
                    onSelect={deleteTodos}
                    makeEditable={editTodo}
                    getTodoValue={changeValue}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
