import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

const EditTask = (props) => {

    const { id } = useParams();
    const [item, setItem] = useState({});
    const [isCancelorSaved, setIsCancelorSaved] = useState(false); 

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
        
        fetch(`${props.baseURI}/${item.taskId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })
          .then((response) => {               
               if (response.status === 200) {
                   setIsCancelorSaved(true);
               }
            })
          .catch(error => {
              console.error('Unable to update item.', error); 
              setIsCancelorSaved(false);
            });
    }

    if (isCancelorSaved) {
        return <Redirect to="/" />
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
                        onClick={() => { setIsCancelorSaved(true) }} 
                    />
                </p>
            </form>
        </>
    )
}

export default EditTask