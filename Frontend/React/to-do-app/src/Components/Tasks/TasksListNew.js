import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TasksListNew = (props) => {

    const [editTaskId, setEditTaskId] = useState(0);
    const [editTaskText, setEditTaskText] = useState('');

    const taskTextChangeHandler = (event) => {  
        setEditTaskText(event.target.value);
    }

    const taskData = {
        "taskDescription": "",
        "isComplete": "",
        "reminderDatetime": ""
    }
    
    const setTaskData = (item) => {
        taskData.taskDescription = item.taskDescription;
        taskData.isComplete = item.isComplete;
        taskData.reminderDatetime = item.reminderDatetime
    }

    const taskUpdateHandler = (item) => {   
        setTaskData(item);
        setEditTaskId(0); 
        props.onTaskUpdate(item.taskId, taskData) 
    }

    const taskCompleteHandler = (item) => {   
        item.isComplete = !item.isComplete;
        taskUpdateHandler(item);
    }

    const taskSaveHandler = (item) => {
        item.taskDescription = editTaskText;
        taskUpdateHandler(item);
    }

    return (
        <div>
            <h1>Tasks List</h1>
            <ul style={{listStyleType:'none'}}>
                {
                    props.todoItems.map((item) => {

                        // const completeValue = 'mark ' + 
                        //     (item.isComplete === false ? 'complete' : 'in-complete');
                        
                        const taskCompleteStyle = (item.isComplete === false ? '' : 'line-through');

                        // const editClickHandler = (taskId) => {
                        //     setEditTaskText(item.taskDescription);
                        //     setEditTaskId(taskId);
                        // }

                        let taskDetails = (
                            <span
                                style={{textDecoration:taskCompleteStyle}}>
                                    {item.taskDescription}
                            </span>
                        );

                        if (item.taskId === editTaskId) {
                            taskDetails = (
                                <>
                                    <input 
                                        type="text"
                                        value={editTaskText}
                                        onChange={(event) => taskTextChangeHandler(event)}
                                    />
                                    <input 
                                        type="button" 
                                        value="save" 
                                        style={{marginLeft:'10px'}}
                                        onClick={() => taskSaveHandler(item)}
                                    />
                                </>
                            )
                        }

                        const editTaskPath = `/taskedit/${item.taskId}`;
                        
                        return (
                            <li key={item.taskId}>    
                                <input 
                                    type="checkbox" 
                                    checked={item.isComplete} 
                                    onChange={() => taskCompleteHandler(item) }
                                /> 
                                {taskDetails}
                                {(item.taskId !== editTaskId && item.isComplete === false) ?
                                    <Link to={editTaskPath}>
                                        <input 
                                            type="button" 
                                            value="edit" 
                                            style={{marginLeft:'10px'}} 
                                            // onClick={() => editClickHandler(item.taskId)}
                                        /> 
                                    </Link>
                                    : null
                                }
                                <input 
                                    type="button" 
                                    value="delete" 
                                    style={{marginLeft:'10px'}} 
                                    onClick={() => { props.onTaskDelete(item.taskId) }}
                                />
                                {/* <input 
                                    type="button" 
                                    value={completeValue} 
                                    style={{marginLeft:'10px'}}
                                    onClick={() => taskCompleteHandler(item) } 
                                /> */}
                            </li>
                        )}
                    )
                }
            </ul>
        </div>
    );
}

export default TasksListNew