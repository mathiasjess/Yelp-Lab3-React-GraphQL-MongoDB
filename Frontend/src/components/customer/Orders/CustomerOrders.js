import React from 'react'
import axios from 'axios'
import './CustomerOrders.css'
import { connect } from 'react-redux'
import { addToCart, addItem, removeItem, removecart } from '../../../actions/cartActions'
import { Link } from 'react-router-dom';
import '../../restaurantOwner/Paginate.css' 
import {flowRight as compose} from 'lodash';
import { graphql} from 'react-apollo';
import { placeOrder} from '../../../mutations/customerMutation/placeOrderMutation'
import { restaurantDetails } from '../../../queries/restaurantQueries/restaurantHomePageQueries'


class CustomerOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            restaurantId: '',
            customerID: '',
            completeOrderFlag: false,
            takeOutValue : '',
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0

        }
        this.addtoCart = this.handleAddToCart.bind(this)
        this.handleAddquantity = this.handleAddquantity.bind(this)
        this.handleremovequantity = this.handleremovequantity.bind(this)
        this.handleTakeOutChange = this.handleTakeOutChange.bind(this)
        this.completeOrder = this.completeOrder.bind(this)
        this.CancelOrder = this.CancelOrder.bind(this)
    }
    componentDidMount() {
        // this.setState({
        //     restaurantId: this.props.match.params.id,
        //     customerID: this.props.user.id,

        // })
        this.receivedData()
    }
    handleAddToCart(itemID, dishName, price) {
        let Orderdata = {
            itemID: itemID,
            dishName: dishName,
            price: price

        }
        console.log(Orderdata)
        this.props.addToCart(Orderdata)
    }

    handleAddquantity(itemID) {
        this.props.addItem(itemID)
    }

    handleremovequantity(itemID) {
        this.props.removeItem(itemID)
    }
    handleTakeOutChange(event){
        event.preventDefault();
        this.setState({
            takeOutValue : event.target.value
        }) 
    }
    completeOrder(restaurantId) {
        console.log("Take Out value", this.state.takeOutValue)
        this.props.placeOrder({
            variables : {
                customerID: localStorage.getItem('id'),
                customerName : this.props.user.firstName + ' ' + this.props.user.lastName,
                restaurantId: this.props.match.params.id,
                totalPrice: this.props.cartItems.total,
                deliveryOption: this.state.takeOutValue,
                delivery_status: 'Order Recieved',
                deliveryFilter: 'New Order',
                orderDetails : this.props.cartItems.addedItems
            }

        }).then(response =>{
            console.log("Response status", response.data.placeOrder)
            console.log("Response status", response.data.placeOrder.message)
            console.log("Response status", response.data.placeOrder.status)
            if(response.data.placeOrder.status === "200")
            {   
                alert(response.data.placeOrder.message)
                this.props.removecart()
                this.props.history.push(`/customerorderhistory`)
                // window.location.reload()
            }
            else{
                alert(response.data.placeOrder.message)
                this.props.removecart()
                this.props.history.push(`/customerhomepage/${localStorage.getItem('id')}`)
            }
            
        })
    }
    receivedData() {
        var data = this.props.restaurantDetails;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
            data.restaurantDetails.map(menu => {
               <div class="card1">
                    <div class="container-order-menu">
                        <p style={{textAlign:'left'}}><b> Dish Name: </b>{menu.dishName}</p>
                        <p style={{textAlign:'left'}}><b>Price: </b>{menu.price}</p>
                        <button class="btn btn-primary" value={menu._id} onClick={() => this.handleAddToCart(menu._id, menu.dishName, menu.price)}>Add to Cart</button>
                    </div>
                </div>
             })
    }
    }

    CancelOrder(restaurantID) {
        this.props.removecart()
        this.props.history.push(`/restauranthomepage/${this.props.match.params.id}`)
    }

    render() {
        let addedItems = null
        if (this.props.cartItems.addedItems) {
            addedItems = (
                this.props.cartItems.addedItems.map((item,i) => {
                    return (
                        <tr key={i}>
                            <td>{item.dishName}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td><button class="btn btn-primary" onClick={() => this.handleAddquantity(item.itemID)}><span class="glyphicon glyphicon-plus"></span></button></td>
                            <td><button class="btn btn-primary" onClick={() => this.handleremovequantity(item.itemID)}><span class="glyphicon glyphicon-minus"></span></button></td>
                        </tr>
                    )
                })
            )
        }


        return (
            <div class="table">
                <div class="tr-items">

                    <div class="td-items1">
                    </div>
                    <div class="td-items2">
                    <button class = "btn btn-primary" onClick={()=>{this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)}}> Go Back to Restaurant Page</button>
                        <h2>Order Food from our Menu</h2>
                        <div class="flex-display-items">
                        {this.receivedData()}
                        </div>
                    </div>
                    <div class="td-items3">
                        {this.props.cartItems.addedItems ?
                            <div>
                                <h2> Order Details</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Dish Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Add</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addedItems}
                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <th colSpan="5">Total : {this.props.cartItems.total ? this.props.cartItems.total : null}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <form>
                                <label>Select Takeout Option</label>
                                    <select onChange={this.handleTakeOutChange}>
                                    <option> Select a value</option>
                                    <option value = "pickup">Pick Up</option>
                                    <option value = "delivery">Delivery</option>
                                    </select>
                                </form>
                                <button class="btn btn-danger" onClick={() => this.completeOrder(this.props.match.params.id)}>Complete Order</button>
                                <button class="btn btn-danger" onClick={() => this.CancelOrder(this.props.match.params.id)}>Cancel Order</button>
                                {this.state.completeOrderFlag && <div>

                                </div>}
                            </div> : null}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    cartItems: state.cartReducer,
});

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (data) => dispatch(addToCart(data)),
        addItem: (id) => dispatch(addItem(id)),
        removeItem: (id) => dispatch(removeItem(id)),
        removecart: () => dispatch(removecart())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(
    graphql(restaurantDetails,{
        options: () => {
            return {
                variables: {
                    _id: this.props.match.params.id
                }
            }
        }
    }),
    graphql(placeOrder, { name: "placeOrder" })
)(CustomerOrders));