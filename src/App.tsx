import React, { useState } from "react";
import Swal from "sweetalert2";
import { TbTrash } from "react-icons/tb";

type FormEvent = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [allTasks, setAllTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTask !== "") {
      addTask(newTask);
    } else {
      Swal.fire({
        background: "#191919",
        color: "#D1D1D1",
        icon: "error",
        title: "¡You have to write something!",
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      });
    }
  };

  const addTask = (name: string): void => {
    // cookie.set(name, { name, done: false }, { path: "/" });
    const taskToAdd: ITask[] = [...allTasks, { name, done: false }];
    setAllTasks(taskToAdd);
    setNewTask("");
  };

  const handleComplete = (i: number): void => {
    const newAllTasks: ITask[] = [...allTasks];
    newAllTasks[i].done = !allTasks[i].done;
    setAllTasks(newAllTasks);
  };

  const removeTask = (i: number): void => {
    const newAllTasks: ITask[] = [...allTasks];
    newAllTasks.splice(i, 1);
    setAllTasks(newAllTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="col">
                <h3 className="offset-md-4">Add a Task</h3>
                <input
                  type="text"
                  className="form-control"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  autoFocus
                />
                <button
                  style={{ width: "100%" }}
                  className="btn btn-outline-success mt-3"
                >
                  SAVE
                </button>
              </form>
            </div>
          </div>

          <div>
            {allTasks.map((e: ITask, i: number) => {
              return (
                <div className="card card-body mt-3" key={i}>
                  <div className="p-2">
                    <h3
                      style={{
                        textDecoration: e.done ? "line-through" : "",
                      }}
                    >
                      {e.name}
                    </h3>
                  </div>
                  <div className="d-flex justify-content-between p-2">
                    {e.done ? (
                      <button
                        onClick={(ev) => handleComplete(i)}
                        className="btn btn-outline-success"
                      >
                        ✓ Complete
                      </button>
                    ) : (
                      <button
                        onClick={(ev) => handleComplete(i)}
                        className="btn btn-outline-danger "
                      >
                        ✗ Incomplete
                      </button>
                    )}
                    <button
                      onClick={() => removeTask(i)}
                      className="btn btn-outline-danger"
                    >
                      <TbTrash size="25px" />
                    </button>
                  </div>
                  <div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
