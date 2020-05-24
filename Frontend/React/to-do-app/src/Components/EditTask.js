import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditTask = (props) => {

    const { id } = useParams();
    const [item, setItem] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetch(`https://localhost:44347/api/tasks/${id}`)
        .then((res) => { return res.json(); })
        .then((response) => { setItem(response); })
        .catch(error => console.error('Unable to get task.', error));
    }, [id]);

    const updateTaskDescriptionHandler = (event) => {
        const newDesc = event.target.value;
        const newItem = {...item};
        newItem.taskDescription = newDesc;
        setItem(newItem);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleCancel = () => {
        history.goBack();
    }

    return (
        <>
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Description:                         
                    </label>
                    <input 
                        type="text" 
                        name="description" 
                        style={{marginLeft:'10px'}} 
                        value={item.taskDescription || ''}
                        onChange={(event) => updateTaskDescriptionHandler(event)}
                    />
                </p>
                <p>
                    <input 
                        type="submit" 
                        value="Save" 
                        onClick={() => props.onTaskUpdate(item.taskId, item)}
                    />
                    <input 
                        type="button" 
                        value="Cancel" 
                        style={{marginLeft:'10px'}} 
                        onClick={handleCancel} 
                    />
                </p>
            </form>
        </>
    )
}

export default EditTask