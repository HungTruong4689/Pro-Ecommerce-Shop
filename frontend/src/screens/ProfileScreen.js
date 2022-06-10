import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Row,Col, Button, Form, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constant/userConstants';
import {LinkContainer } from 'react-router-bootstrap';
import { listMyOrders } from '../actions/orderActions';
const ProfileScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');
    // const [searchParams] = useSearchParams();

    
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
    const {userInfo} = userLogin;


    const orderListMy = useSelector(state => state.orderListMy);
    const {loading:loadingOrders,error: errorOrder,orders} = orderListMy
    const history = useNavigate();
    useEffect(()=>{
        console.log(user.name);
        if(!userInfo){
            history('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[dispatch,history,userInfo,user,success])
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== confirmpassword){
            setMessage('Password do not match')
        }else{
            console.log("Updating ...")
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email':email,
                'password':password
            }))
        }
        
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    required
                    type='name'
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                    type='email'
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    
                    type='password'
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    
                    type='password'
                    placeholder="Confirm Password"
                    value={confirmpassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (<Loader />):(
                    errorOrder ? (<Message variant='danger'>{errorOrder}</Message>) :(
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order =>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt : (<i className="fa fa-times" style={{color: "red"}}></i>)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                )}
            </Col>

        </Row>
    );
};

export default ProfileScreen;