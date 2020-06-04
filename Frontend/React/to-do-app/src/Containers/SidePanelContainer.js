import React from 'react'

import Lists from '../Components/SidePanel/Lists';
import Filters from '../Components/SidePanel/Filters';
import DeleteCompleteTasks from '../Components/SidePanel/DeleteCompleteTasks'

const SidePanelContainer = () => {
    return(
        <>
            <Filters />                    
            <Lists /> 
            <DeleteCompleteTasks />        
        </>
    )
}

export default SidePanelContainer