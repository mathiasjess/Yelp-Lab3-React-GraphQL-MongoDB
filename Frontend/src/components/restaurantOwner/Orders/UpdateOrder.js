import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../UpdateRestaurantProfile.css'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import { imagepath } from '../../../config/imagepath';
import { rooturl } from '../../../config/settings';
import {updateOrderStatus} from '../../../mutations/restaurantMutations/updateOrderMutation'
import { graphql } from 'react-apollo';

class UpdateOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            orderDetails: [],
            optionValue: '',
        }
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.updateOrderStatuses= this.updateOrderStatuses.bind(this)
        this.cancelOrder = this.cancelOrder.bind(this)
    }

    handleCategoryChange(event) {
        event.preventDefault();
        this.setState({
            optionValue: event.target.value
        })
    }
    updateOrderStatuses(event) {
        event.preventDefault();
        console.log("Delivery Filter", this.props.location.state.detail.deliveryFilter)

        let deliveryFilter = null;
        if(this.state.optionValue === "Picked Up" || this.state.optionValue === "Delivered"){
            deliveryFilter = "Delivered"
        }
        else{
            deliveryFilter = this.props.location.state.detail.deliveryFilter
        }
        console.log("Delivery Filter", deliveryFilter)
        this.props.updateOrderStatus({
            variables : {
            orderID: this.props.location.state.detail._id,
            delivery_status: this.state.optionValue,
            deliveryFilter : deliveryFilter
        }
    }).then(response=>{
        console.log("Response status", response.data.updateOrderStatus)
        console.log("Response status", response.data.updateOrderStatus.message)
        console.log("Response status", response.data.updateOrderStatus.status)
        if(response.data.updateOrderStatus.status === "200")
        {   
            alert("Updated Order Status")
            this.props.history.push('/orders')
        }
        else{
            alert("Something went wrong. Could not cancel order")
        }
    })

    }
    cancelOrder(event) {
        event.preventDefault();
        this.props.updateOrderStatus({
            variables : {
            orderID: this.props.location.state.detail._id,
            delivery_status: 'Cancelled Order',
            deliveryFilter: 'Cancelled Order'
        }
    }).then(response=>{
        console.log("Response status", response.data.updateOrderStatus)
        console.log("Response status", response.data.updateOrderStatus.message)
        console.log("Response status", response.data.updateOrderStatus.status)
        if(response.data.updateOrderStatus.status === "200")
        {   
            alert("Updated Order Status")
            this.props.history.push('/orders')
        }
        else{
            alert("Something went wrong. Could not cancel order")
        }
    })
    }

    render() {
        console.log("Details", this.props.location.state.detail.orderDetails)
        let status = null;
        if (this.props.location.state.detail.deliveryOption === 'pickup') {
            status = (<select onChange={this.handleCategoryChange} >
                <option value={this.props.location.state.detail.delivery_status}>{this.props.location.state.detail.delivery_status}</option>
                <option value="Order Recieved">Order Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="Pick Up Ready">Pick Up Ready</option>
                <option value="Picked Up">Picked Up</option>
            </select>)
        }
        else if (this.props.location.state.detail.deliveryOption === 'delivery') {
            status = (<select onChange={this.handleCategoryChange} >
                <option value={this.props.location.state.detail.delivery_status}>{this.props.location.state.detail.delivery_status}</option>
                <option value="Order Recieved">Order Recieved</option>
                <option value="Preparing">Preparing</option>
                <option value="On the Way">On the Way</option>
                <option value="Delivered">Delivered</option>
            </select>)
        }
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div class="biz-info-section">
                    <div class="biz-info-row">
                        <div>
                        <div class = "main-link">
                        <Link to ='/orders'><span class="glyphicon glyphicon-arrow-left"/>Return to Main Orders Page</Link>
                        </div>    
                        <h2> Orders</h2>
                            <div class="card-order">
                                <Link to={{
                                    pathname: '/restaurantviewofcustomer',
                                    aboutProps:
                                    {
                                        id: this.props.location.state.detail.customerID,
                                    }
                                }}>
                                    <h5>{this.props.location.state.detail.firstName} {this.props.location.state.detail.lastName}</h5></Link>
                                <div class="order-footer">
                                    <p><b>Date: </b><Moment>{this.props.location.state.detail.Date}</Moment> </p>
                                    <p><b>Total Price:</b> ${this.props.location.state.detail.totalPrice}</p>
                                </div>
                                <div>
                                    <h5> Order details</h5>
                                    {this.props.location.state.detail.orderDetails && this.props.location.state.detail.orderDetails.map(function (order, j) {
                                        return (
                                            <div class="order-footer" key={j}>
                                                <p>{order.dishName}</p>
                                                <p>{order.price}</p>
                                                <p>{order.quantity}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div class="order-footer">
                                    <p><b>Delivery Option: </b>{this.props.location.state.detail.deliveryOption}</p>
                                    <p><b>Status:  </b>{this.props.location.state.detail.delivery_status}</p>
                                    <p><b>Order Type:</b> {this.props.location.state.detail.deliveryFilter}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div class="biz-info-row">
                        <h2>Update Order Status</h2>
                            <ul>
                                <li class="BusinessName"><label for="cars">Choose a category:</label></li>
                                <li>
                                <div class="order-update">
                                    {status}
                                    <button class="btn btn-primary" onClick={this.updateOrderStatuses}>Update Order Status</button>
                                    <button class="btn btn-danger" onClick={this.cancelOrder}>Cancel Order</button>
                                </div>
                                </li>
                            </ul>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default graphql(updateOrderStatus, {name : "updateOrderStatus"})(UpdateOrder);