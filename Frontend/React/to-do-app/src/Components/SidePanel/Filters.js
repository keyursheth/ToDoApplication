import React, {useState} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import StatusConstants from '../../Constants/StatusConstants';

import './SidePanel.css';

const Filters = ({statusFilterDispatch}) => {

    const [activeState, setActiveState] = useState(StatusConstants.All);

    const filterClickHandler = (type) => {

        switch (type) {
            case StatusConstants.All:
                setActiveState(StatusConstants.All);
                statusFilterDispatch({type: StatusConstants.All});       
                break;
            case StatusConstants.Completed:
                setActiveState(StatusConstants.Completed);
                statusFilterDispatch({type: StatusConstants.Completed});
                break;
            case StatusConstants.Pending:
                setActiveState(StatusConstants.Pending);
                statusFilterDispatch({type: StatusConstants.Pending});
                break;
            default:
                break;
        }        
    }

    return(
        <ListGroup style={{margin:'15px 0px', width: '100%'}}>
            <ListGroup.Item 
                action 
                active={activeState === StatusConstants.All}
                onClick={() => filterClickHandler(StatusConstants.All)}>
                    All Tasks
            </ListGroup.Item>
            <ListGroup.Item 
                action 
                active={activeState === StatusConstants.Completed}
                onClick={() => filterClickHandler(StatusConstants.Completed)}>
                    Completed Tasks
            </ListGroup.Item>
            <ListGroup.Item 
                action 
                active={activeState === StatusConstants.Pending}
                onClick={() => filterClickHandler(StatusConstants.Pending)}>
                    Pending Tasks
            </ListGroup.Item>                        
        </ListGroup>
    )
}

export default Filters