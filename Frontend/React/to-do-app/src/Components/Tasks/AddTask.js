import React, { useRef } from 'react'

const AddTask = (props) => {

    const taskText = useRef('');
    const { onComplete, baseURI } = {...props};

    const addTaskClick = () => {
        const newTaskText = taskText.current.value;
        if (newTaskText !== '') {
            taskText.current.value = '';
            
            const item = {
                "listId": 1,
                "taskDescription": newTaskText
            };
            
            fetch(baseURI, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then((response) => {
                if (response.status === 201) {
                    onComplete(true);
                }
            })
            .catch(error => {console.error('Unable to add item.', error); onComplete(false);});
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