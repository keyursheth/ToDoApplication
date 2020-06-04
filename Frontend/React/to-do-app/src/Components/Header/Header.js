import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

const Header = () => {
    return(
        <Navbar>
            <Navbar.Brand href="/" className="headerNav">
                To-Do Application
            </Navbar.Brand>                        
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <b>Keyur Sheth</b>
                </Navbar.Text>
            </Navbar.Collapse>                       
        </Navbar>
    )
}

export default Header