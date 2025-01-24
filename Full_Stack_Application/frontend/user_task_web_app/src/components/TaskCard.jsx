import React from "react";
import { useDrag } from "react-dnd";
import styles from "../styles/TaskPages/Taskcard.module.css";

const TaskCard = ({ task, deleteTask }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { task },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTask(task._id);
        }
    };

    return (
        <div className={`${styles.taskCard} ${isDragging ? styles.dragging : ""}`} ref={drag}>
            <h3>TaskName : {task.name}</h3>
            <p><b>Description :</b> {task.description}</p>
            <button className={styles.deleteBtn} onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};


export default TaskCard;
