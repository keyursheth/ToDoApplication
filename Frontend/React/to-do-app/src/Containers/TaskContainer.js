import React from 'react'

import TasksList from '../Components/Tasks/TasksList'
import TaskAdd from '../Components/Tasks/TaskAdd'

const TaskContainer = (
{
    todoList, 
    onTaskChange, 
    onTaskComplete, 
    onTaskSave, 
    onTaskAdd,
    showCompleted,
    showPending
}) => 
{
    return (
        <>
            <TasksList 
                todoList={todoList} 
                onTaskChange={onTaskChange} 
                onTaskComplete={onTaskComplete}
                onTaskSave={onTaskSave}
                showCompleted={showCompleted}
                showPending={showPending}
            />    
            <TaskAdd onTaskAdd={onTaskAdd} />        
        </>                     
    )        
}

export default TaskContainer