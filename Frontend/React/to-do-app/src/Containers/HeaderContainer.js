import React from 'react';
import Header from '../Components/Header/Header';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const HeaderContainer = () => {
    return(        
        <Row className="headerRow">
          <Col>
            <Header />
          </Col>
        </Row>
    )
}

export default HeaderContainer