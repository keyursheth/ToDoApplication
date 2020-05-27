import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom';

import TasksList from '../Components/Tasks/TasksList'
import AddTask from '../Components/Tasks/AddTask'
import EditTask from '../Components/Tasks/EditTask';

const TaskContainer = () => {

    const [isComplete, setIsComplete] = useState(true);
    
    const baseURI = 'https://localhost:44347/api/tasks';
    
    const onComplete = (isSuccess) => {
        if (isSuccess) {
            setIsComplete(!isComplete);
        }
    }

    return (
        <Switch>            
            <Route path='/taskedit/:id'>
                <EditTask baseURI={baseURI} />
            </Route>
            <Route path='/'>
                <TasksList baseURI={baseURI} onComplete={onComplete} isReloadList={isComplete} />
                <AddTask baseURI={baseURI} onComplete={onComplete} />
            </Route>
        </Switch>                
    )        
}

export default TaskContainer