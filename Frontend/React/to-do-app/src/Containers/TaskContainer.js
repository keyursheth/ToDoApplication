import React, { useState } from 'react'

import TasksList from '../Components/Tasks/TasksList'
import AddTask from '../Components/Tasks/AddTask'

const TaskContainer = () => {

    const [isComplete, setIsComplete] = useState(true);
    
    const baseURI = 'https://localhost:44347/api/tasks';
    
    const onComplete = (isSuccess) => {
        if (isSuccess) {
            setIsComplete(!isComplete);
        }
    }

    return (
        <>
            <TasksList baseURI={baseURI} />
            <AddTask baseURI={baseURI} onComplete={onComplete} />
        </>                     
    )        
}

export default TaskContainer