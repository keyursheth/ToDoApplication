import React, { useRef } from 'react'

const AddTask = (props) => {

    const taskText = useRef('');

    const addTaskClick = () => {
        const newTaskText = taskText.current.value;
        if (newTaskText !== '') {
            taskText.current.value = '';
            props.onTaskAdd(newTaskText);
        }        
    }

    return(
        <div>
            <input 
                type="text" 
                ref={taskText} 
            />             
            <input 
                type="button" 
                value="Add Task" 
                style={{marginLeft:'10px'}} 
                onClick={() => addTaskClick()} 
            />
        </div>
    )
}

export default AddTask