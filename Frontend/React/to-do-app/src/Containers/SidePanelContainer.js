import React from 'react'

import Lists from '../Components/SidePanel/Lists';
import Filters from '../Components/SidePanel/Filters';
import DeleteCompleteTasks from '../Components/SidePanel/DeleteCompleteTasks'

const SidePanelContainer = ({statusFilterDispatch}) => {
    return(
        <>
            <Filters statusFilterDispatch={statusFilterDispatch} />                    
            <Lists /> 
            <DeleteCompleteTasks />        
        </>
    )
}

export default SidePanelContainer