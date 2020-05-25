import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditTask = (props) => {

    const { id } = useParams();
    const [item, setItem] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetch(`${props.baseURI}/${id}`)
        .then((res) => { return res.json(); })
        .then((response) => { setItem(response); })
        .catch(error => console.error('Unable to get task.', error));
    }, [id, props.baseURI]);

    const onTaskDescriptionChange = (event) => {
        const newDesc = event.target.value;
        const newItem = {...item};
        newItem.taskDescription = newDesc;
        setItem(newItem);
    }

    const submitClickHandler = (event) => {
        event.preventDefault();        
        props.onTaskEdit(item);
        history.push('/');        
    }

    const cancelClickHandler = () => {
        history.goBack();
    }

    return (
        <>
            <h1>Edit Task</h1>
            <form onSubmit={submitClickHandler}>
                <p>
                    <label>
                        Description:                         
                    </label>
                    <input 
                        type="text" 
                        name="description" 
                        style={{marginLeft:'10px'}} 
                        autoComplete="off"
                        value={item.taskDescription || ''}
                        onChange={(event) => onTaskDescriptionChange(event)}
                    />
                </p>
                <p>
                    <input 
                        type="submit" 
                        value="Save"                         
                    />
                    <input 
                        type="button" 
                        value="Cancel" 
                        style={{marginLeft:'10px'}} 
                        onClick={cancelClickHandler} 
                    />
                </p>
            </form>
        </>
    )
}

export default EditTask