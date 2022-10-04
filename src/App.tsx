import React, { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

type FormEvent = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const cookie = new Cookies();
  const allCookies = cookie.getAll();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTask !== "") {
      addTask(newTask);
      // console.log(Object.entries(allCookies));
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
    cookie.set(name, { name, done: false });
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
            {allTasks.length &&
              allTasks.map((e: ITask, i: number) => {
                return (
                  <div className="card card-body mt-3" key={i}>
                    <div className="">
                      <h3
                        style={{
                          textDecoration: e.done ? "line-through" : "",
                        }}
                      >
                        {e.name}
                      </h3>
                    </div>
                    <div>
                      {e.done ? (
                        <button
                          onClick={(ev) => handleComplete(i)}
                          className="btn btn-outline-success mt-3"
                        >
                          ✓ Complete
                        </button>
                      ) : (
                        <button
                          onClick={(ev) => handleComplete(i)}
                          className="btn btn-outline-danger mt-3"
                        >
                          ✗ Incomplete
                        </button>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => removeTask(i)}
                        className="btn btn-outline-danger mt-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div>
            {Object.entries(allCookies).forEach(([key, value]) => {
              console.log(value);
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
