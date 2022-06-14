import React, { useState } from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    let history = useNavigate();
    const location = useLocation()
    //console.log(location)
    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            history(`/?keyword=${keyword}&page=1`)
        }else{
            history(history(location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline="true">
            <Row>
                <Col md={8}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value) }
                className ='mr-sm-2 ml-sm-5'
            >
                    
            </Form.Control>
            </Col>
            <Col>
            <Button 
                    type='submit'
                    variant='outline-success'
                    className='p-2'
                >
                    Submit
                </Button>
                </Col>
            </Row>
        </Form >
    );
};

export default SearchBox;