import React from 'react';

const TasksList = (props) => {

    return (
        <div>
            <h1>Tasks List</h1>
            <ul>
                {
                    props.todoItems.map((item) => {

                        const completeValue = 'mark ' + 
                            (item.isComplete === false ? 'complete' : 'in-complete');

                        const taskData = {
                            "taskDescription": item.taskDescription,
                            "isComplete": !item.isComplete,
                            "reminderDatetime": item.reminderDatetime
                        }

                        const taskCompleteStyle = (item.isComplete === false ? '' : 'line-through');

                        const editClickHandler = (taskId) => {

                        }
                        
                        return (
                            <li key={item.taskId}>
                                <span
                                    id={"spanTask" + item.taskId} 
                                    style={{textDecoration:taskCompleteStyle, display:''}}>
                                        {item.taskDescription}
                                </span> 
                                {/* <input 
                                    id={"txtTaskText" + item.taskId} 
                                    type="text"
                                    value={item.taskDescription}
                                    style={{display:'none'}}
                                /> */}
                                <input 
                                    type="button" 
                                    value="edit" 
                                    style={{marginLeft:'10px'}} 
                                    onClick={() => editClickHandler(item.taskId)}
                                />
                                <input 
                                    type="button" 
                                    value="delete" 
                                    style={{marginLeft:'10px'}} 
                                    onClick={() => { props.onTaskDelete(item.taskId) }}
                                />
                                <input 
                                    type="button" 
                                    value={completeValue} 
                                    style={{marginLeft:'10px'}}
                                    onClick={() => { props.onTaskUpdate(item.taskId, taskData) }} 
                                />
                            </li>
                        )}
                    )
                }
            </ul>
        </div>
    );
}

export default TasksList