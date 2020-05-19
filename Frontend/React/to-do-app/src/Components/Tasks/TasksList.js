import React, { useState, useEffect } from 'react';

const TasksList = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todoItems, setToDoItems] = useState([]);

    useEffect(() => {        
        fetch('https://localhost:44347/api/tasks')
            .then((res) => {
                return res.json();
            })
            .then((result) => {                
                setIsLoaded(true);
                setToDoItems(result);
            }, 
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, []);

    if(error) {
        return <div>Error: {error.message}</div>
    }
    else if(!isLoaded) {
        return <div>Loading...</div>
    }
    else {
        const itemsList = todoItems.map((item) => {
            return <li key={item.taskId}>{item.taskDescription}</li>
        });        

        return (
            <div>
                <h1>Tasks List</h1>
                <ul>
                    {itemsList}
                </ul>
            </div>
        );
    }    
}

export default TasksList