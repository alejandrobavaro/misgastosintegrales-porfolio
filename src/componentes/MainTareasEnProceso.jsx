import React, { useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import "../assets/scss/_03-Componentes/_MainTareasEnProceso.scss";

const colorOptions = [
  { label: "Rojo", value: "#FF5733" },
  { label: "Verde", value: "#28A745" },
  { label: "Azul", value: "#007BFF" },
  { label: "Amarillo", value: "#FFC107" },
  { label: "Gris", value: "#6C757D" },
];

const initialTasks = {
  todo: [
    {
      title: "Tarea 1",
      // description: "Descripción 1",
      color: "#FF5733",
      // date: "2024-08-12",
      // priority: "medium",
      // assignedTo: "Nombre 1",
    },
  ],
  doing: [
    {
      title: "Tarea 2",
      // description: "Descripción 2",
      color: "#28A745",
      // date: "2024-08-12",
      // priority: "high",
      // assignedTo: "Nombre 2",
    },
  ],
  done: [
    {
      title: "Tarea 3",
      // description: "Descripción 3",
      color: "#007BFF",
      // date: "2024-08-12",
      // priority: "low",
      // assignedTo: "Nombre 3",
    },
  ],
  blocked: [
    {
      title: "Tarea 4",
      // description: "Descripción 4",
      color: "#FFC107",
      // date: "2024-08-12",
      // priority: "medium",
      // assignedTo: "Nombre 4",
    },
  ],
};

const columns = ["todo", "doing", "done", "blocked"];

function MainTareasEnProceso() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    // description: "",
    color: "#333",
    date: "",
    priority: "medium",
    assignedTo: "",
  });
  const [editTaskDetails, setEditTaskDetails] = useState({ task: null, column: null });

  const handleTaskChange = (e, task, column) => {
    const { name, value } = e.target;
    setTasks((prevTasks) => ({
      ...prevTasks,
      [column]: prevTasks[column].map((t) =>
        t === task ? { ...t, [name]: value } : t
      ),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(newTask).every((field) => field.trim() !== "")) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, newTask],
      }));
      setNewTask({
        title: "",
        description: "",
        color: "#333",
        date: "",
        priority: "medium",
        assignedTo: "",
      });
    }
  };

  const moveTask = (task, fromColumn, direction) => {
    const currentIndex = columns.indexOf(fromColumn);
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < columns.length) {
      const newColumn = columns[newIndex];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };
        newTasks[fromColumn] = prevTasks[fromColumn].filter((t) => t !== task);
        newTasks[newColumn] = [...prevTasks[newColumn], task];
        return newTasks;
      });
    }
  };



  const handleTaskDelete = (task, column) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[column] = updatedTasks[column].filter((t) => t !== task);
      return updatedTasks;
    });
  };

  return (
    <div className="mainTareasEnProceso">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Título"
            required
          />
        </div>
        <div className="form-group">
          <label className="textoDescripcion">Descripción</label>
          <textarea 
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Descripción"
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <div className="color-options">
            {colorOptions.map((option) => (
              <div
                key={option.value}
                className={`color-option ${newTask.color === option.value ? "selected" : ""}`}
                style={{ backgroundColor: option.value }}
                onClick={() => setNewTask({ ...newTask, color: option.value })}
              >
                {newTask.color === option.value && <FaCheck className="color-check" />}
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Prioridad</label>
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div className="form-group">
          <label>Asignado a</label>
          <input
            type="text"
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleInputChange}
            placeholder="Asignado a"
          />
        </div>
        <button type="submit" className="add-task-button">
          Agregar
        </button>
      </form>

      <div className="task-columns">
        {columns.map((status) => (
          <div key={status} className="task-column">
            <h2>{status.toUpperCase()}</h2>
            <div className="task-list">
              {tasks[status].length > 0 ? (
                <div className="task-list-container">
                  {tasks[status].map((task, index) => (
                    <div
                      key={index}
                      className="task-item"
                      style={{ backgroundColor: task.color }}
                    >
                      {editTaskDetails.task === task && editTaskDetails.column === status ? (
                        <div className="task-edit">
                          <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={(e) => handleTaskChange(e, task, status)}
                          />
                          <textarea
                            name="description"
                            value={task.description}
                            onChange={(e) => handleTaskChange(e, task, status)}
                          />
                          <input
                            type="date"
                            name="date"
                            value={task.date}
                            onChange={(e) => handleTaskChange(e, task, status)}
                          />
                          <select
                            name="priority"
                            value={task.priority}
                            onChange={(e) => handleTaskChange(e, task, status)}
                          >
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                          </select>
                          <input
                            type="text"
                            name="assignedTo"
                            value={task.assignedTo}
                            onChange={(e) => handleTaskChange(e, task, status)}
                          />
                          <div className="color-options">
                            {colorOptions.map((option) => (
                              <div
                                key={option.value}
                                className={`color-option ${task.color === option.value ? "selected" : ""}`}
                                style={{ backgroundColor: option.value }}
                                onClick={() =>
                                  handleTaskChange(
                                    { target: { name: "color", value: option.value } },
                                    task,
                                    status
                                  )
                                }
                              >
                                {task.color === option.value && <FaCheck className="color-check" />}
                              </div>
                            ))}
                          </div>
                          <button className="save-button" onClick={saveChanges}>
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="task-content">
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <small>{task.date}</small>
                          <div className="task-meta">
                            <span>Prioridad: {task.priority}</span>
                            <span>Asignado a: {task.assignedTo}</span>
                          </div>
           
                          <div className="task-item-actions">
  <button
    onClick={() => moveTask(task, status, -1)}
    className="move-task-button"
    disabled={status === columns[0]}
    aria-label="Mover tarea a la izquierda"
  >
    <BsArrowLeft />
  </button>
  
  <button
    onClick={() => handleTaskDelete(task, status)}
    className="delete-task-button"
    aria-label="Eliminar tarea"
  >
    <FaTrash />
  </button>
  
  <button
    onClick={() => moveTask(task, status, 1)}
    className="move-task-button"
    disabled={status === columns[columns.length - 1]}
    aria-label="Mover tarea a la derecha"
  >
    <BsArrowRight />
  </button>
</div>



                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay tareas</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainTareasEnProceso;
