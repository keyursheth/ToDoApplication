import React, { useRef } from 'react'

function AddTask() {

    const newTaskValue = useRef('');

    const addTaskhandler = () => {
        console.log(newTaskValue.current.value);        
    }

    return(
        <div>
            <input type="text" ref={newTaskValue} />             
            <input type="button" value="Add Task" style={{marginLeft:'10px'}} onClick={addTaskhandler} />
        </div>
    )
}

export default AddTask