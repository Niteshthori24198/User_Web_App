import React, { useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import TaskCard from "../components/TaskCard";
import { getTotalTaskCount } from "../utils/handlestorage";
import useMyReducer from "../hooks/useMyReducer";
import { initialCreateTaskState, createTaskFormReducer } from "../utils/reducers";
import { fetchTasks, addNewTask, updateTask, deleteTasks } from "../services/task.service";

import { MouseTransition, MultiBackend, TouchTransition } from 'dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import styles from "../styles/TaskPages/Taskpage.module.css"



const HTML5toTouch = {
    backends: [
        {
            id: 'html5',
            backend: HTML5Backend,
            transition: MouseTransition,
        },
        {
            id: 'touch',
            backend: TouchBackend,
            options: { enableMouseEvents: true },
            transition: TouchTransition,
        },
    ],
};


const TaskPage = () => {
    const [tasks, setTasks] = useState({
        pending: [],
        completed: [],
        done: [],
    });

    const [state, dispatch] = useMyReducer(createTaskFormReducer, initialCreateTaskState);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(2);
    const [totalTasks, setTotalTasks] = useState(0);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const [success, res] = await fetchTasks(searchTerm, currentPage, tasksPerPage);
            if (success) {
                const groupedTasks = {
                    pending: [],
                    completed: [],
                    done: [],
                };
                res.data.task.forEach((task) => {
                    groupedTasks[task.status].push(task);
                });
                setTasks(groupedTasks);
                setTotalTasks(getTotalTaskCount("totalTaskCount"));
            } else {
                setError(res.data.msg);
            }
        };
        fetchData();
    }, [currentPage, tasksPerPage, searchTerm]);

    const addTask = async () => {
        if (!state.name || !state.description) {
            alert("Task name and description are required.");
            return;
        }

        const [success, res] = await addNewTask({ ...state, status: "pending" });
        if (success) {
            setTasks((prevTasks) => ({
                ...prevTasks,
                pending: [...prevTasks.pending, res.data.task],
            }));
            dispatch({ type: 'clear' });
            setMessage(res.data.msg);
        } else {
            setError(res.data.msg);
        }
    };

    const moveTask = async (task, newColumn) => {
        const [success, res] = await updateTask(task._id, { status: newColumn });
        if (success) {
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                for (const column in updatedTasks) {
                    updatedTasks[column] = updatedTasks[column].filter(
                        (t) => t._id !== task._id
                    );
                }
                updatedTasks[newColumn].push({ ...task, status: newColumn });
                return updatedTasks;
            });
        } else {
            setError(res.data.msg);
        }
    };

    const deleteTask = async (taskId) => {
        const [success, res] = await deleteTasks(taskId);
        if (success) {
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                for (const column in updatedTasks) {
                    updatedTasks[column] = updatedTasks[column].filter(
                        (task) => task._id !== taskId
                    );
                }
                return updatedTasks;
            });
        } else {
            setError(res.data.msg);
        }
    };

    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    let hasMoreTasks = totalTasks > currentPage * tasksPerPage;

    return (
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div className={styles.taskManagement}>
                <h1>Task Management Dashboard 💖</h1>

                <div className={styles.searchTask}>
                    <input
                        type="text"
                        placeholder="Search tasks"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.addTask}>
                    <h2>Add New Task</h2>
                    {error && <p style={{ color: 'red', fontSize: '16px' }} className={styles.error}>{error}</p>}
                    {message && <p style={{ color: 'green', fontSize: '16px' }} className={styles.message}>{message}</p>}
                    <input
                        type="text"
                        placeholder="Task name"
                        value={state.name}
                        onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
                    />
                    <textarea
                        placeholder="Task description"
                        value={state.description}
                        onChange={(e) => dispatch({ type: 'description', payload: e.target.value })}
                    ></textarea>
                    <button onClick={addTask}>Add Task</button>
                </div>

                <div className={styles.columns}>
                    {Object.keys(tasks).map((column) => (
                        <Column
                            key={column}
                            name={column}
                            tasks={tasks[column]}
                            moveTask={moveTask}
                            deleteTask={deleteTask}
                        />
                    ))}
                </div>

                <div className={styles.pagination}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={!hasMoreTasks}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>

                <div className={styles.limitSection}>
                    <label>Tasks per page: </label>
                    <select
                        value={tasksPerPage}
                        onChange={(e) => setTasksPerPage(Number(e.target.value))}
                    >
                       
                        <option value={5}>5</option>
                        <option value={7}>7</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>
        </DndProvider>
    );
};


const Column = ({ name, tasks, moveTask, deleteTask }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "TASK",
        drop: (item) => moveTask(item.task, name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (

        <div className={`${styles.column} ${isOver ? styles.over : ""}`} ref={drop}>
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
            ))}
        </div>
    );
};



export default TaskPage;
