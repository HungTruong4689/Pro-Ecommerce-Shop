import React, {useEffect} from 'react';
import {Link, useParams, useSearchParams, useNavigate} from 'react-router-dom';
import {Row, Col,ListGroup, Image,Form,Button,Card} from 'react-bootstrap';
import {addToCart, removeFromCart} from '../actions/cartActions';
import Message from '../components/Message';
import { useDispatch,useSelector } from 'react-redux';


const CartScreen = () => {
    let params = useParams();
    const [searchParams] = useSearchParams();
    const productId = params.id;
    const qty = searchParams.get('qty');
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const history = useNavigate();
    console.log('cartItems',cartItems);
    
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
            //history('/cart');
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler = (id)=>{
        console.log('remove: ',id)
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = ()=>{
        history('/login?redirect=shipping');
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length ===0 ? (<Message>Your cart is empty <Link to="/">Go Back</Link></Message>) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item =>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map((x) => 
                                            (<option key= { x+ 1} value={x+1}>{x+1}</option>
                                        ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type="button" variant="light"
                                        onClick={()=>removeFromCartHandler(item.product)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <h2>Subtotal ({cartItems.reduce((acc,item)=> acc+Number(item.qty),0)}) items</h2>
                    ${cartItems.reduce((acc,item)=> acc+Number(item.qty*item.price),0).toFixed(2)}
                </ListGroup>
                <ListGroup.Item>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length ===0}
                    onClick={checkoutHandler}>
                        Proceed to Checkout
                    </Button>
                </ListGroup.Item>
            </Card>
            </Col>                               
        </Row>
    );
};

export default CartScreen;