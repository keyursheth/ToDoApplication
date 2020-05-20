import React, { Component } from 'react'
import TasksList from './TasksList'
import AddTask from './AddTask'

class TaskContainer extends Component {

    render() {
        return(
            <div>
                <TasksList />
                <AddTask />
            </div>
        )
    }

}

export default TaskContainer