import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import '../Orders/orderhistory.css'
import moment from 'moment'
import default_image from '../../../images/customer_default_pic.png'
import '../Paginate.css'
import { graphql } from 'react-apollo';
import { restaurantDetails } from '../../../queries/restaurantQueries/restaurantHomePageQueries'


class RestaurantOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            // orderDetails: [],
            handlePickupFlag: false,
            handleDeliveredFlag: false,
            originalorderSummary: [],
            originalorderDetails: [],
            handleFilterFlag : true
        }
        this.handleFilters = this.handleFilters.bind(this)
        this.handleAllOrders = this.handleAllOrders.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
    }
    updateOrderSummary(data){
        this.setState({
            orderSummary : data,
            originalorderSummary : data
        })
    }
    receivedData() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
            // this.updateOrderSummary(data.restaurantDetails[0].orders)
            console.log("Orders data", data)
            return data.restaurantDetails[0].orders.map(summary => {
                return <div>
                    <div class="card-order">
                        <div class="order-header">
                            <img class="photo-box" src={default_image} alt="Avatar" />
                            < Link to={{
                                pathname: '/restaurantviewofcustomer',
                                aboutProps:
                                {
                                    id: summary.customerID,
                                }
                            }}>
                                <h5>{summary.customerName}</h5></Link>
                        </div>
                        <div class="order-footer">
                            <p><b>Date:</b>{moment(parseInt(summary.orderDate)).format("DD-MM-YYYY h:mm:ss")}</p>
                            <p><b>Total Price:</b> {summary.totalPrice}</p>
                        </div>
                        <div class="order-footer">
                            <p><b>Delivery Option:</b> {summary.deliveryOption}</p>
                            <p><b>Status:</b> {summary.delivery_status}</p>
                            <p><b>Order Type:</b> {summary.deliveryFilter}</p>
                            <button class="btn btn-primary" onClick={() => this.updateOrder(summary._id, summary)}>Update Order Status</button>
                        </div>
                    </div>
                </div>
            })
        }  
    }

    receivedFilteredData(){
        return this.state.orderSummary.map(summary => {
            return <div>
                <div class="card-order">
                    <div class="order-header">
                        <img class="photo-box" src={default_image} alt="Avatar" />
                        < Link to={{
                            pathname: '/restaurantviewofcustomer',
                            aboutProps:
                            {
                                id: summary.customerID,
                            }
                        }}>
                            <h5>{summary.customerName}</h5></Link>
                    </div>
                    <div class="order-footer">
                        <p><b>Date:</b> {moment(parseInt(summary.orderDate)).format("DD-MM-YYYY h:mm:ss")}</p>
                        <p><b>Total Price:</b> {summary.totalPrice}</p>
                    </div>
                    <div class="order-footer">
                        <p><b>Delivery Option:</b> {summary.deliveryOption}</p>
                        <p><b>Status:</b> {summary.delivery_status}</p>
                        <p><b>Order Type:</b> {summary.deliveryFilter}</p>
                        <button class="btn btn-primary" onClick={() => this.updateOrder(summary._id, summary)}>Update Order Status</button>
                    </div>
                </div>
            </div>
        })
    }

    async handleFilters(deliveryFilter) {
        await this.setState({
            handleFilterFlag: false,
            orderSummary: this.props.data.restaurantDetails[0].orders.filter((summary) => {
                return summary.deliveryFilter === deliveryFilter
            })

        });
        console.log("Filtered Order Summary", this.state.orderSummary)
        this.receivedFilteredData();
    }

    async handleAllOrders(data) {
        await this.setState({
            handleFilterFlag: true,
            orderSummary: data
        })
        this.receivedData();

    }
    updateOrder = (orderID, data) => {
        this.props.history.replace({
            pathname: `/updateorder/${orderID}`,
            state: {
                detail: data
            }
        });
    }
    render() {
        console.log("orders", this.state.orderSummary)
        return (
            <div class="table">
                <div class="tr-items1">
                    <div class="td-items1">
                        <ul>
                            <li><button class="no-show" onClick={() => { this.handleAllOrders() }}>All orders</button></li>
                        </ul>
                        <ul>
                            <h4 class="Filter-headings">Filters</h4>
                            <li><button class="no-show" onClick={() => this.handleFilters('New Order')}>New Order</button></li>
                            <li><button class="no-show" onClick={() => this.handleFilters('Delivered')}>Delivered</button></li>
                            <li> <button class="no-show" onClick={() => this.handleFilters('Cancelled Order')}>Cancelled Order</button></li>
                        </ul>
                    </div>
                    <div class="td-items2">
                        <h2> Orders</h2>
                        {this.state.handleFilterFlag ? this.receivedData(): this.receivedFilteredData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(restaurantDetails, {
    options: () => {
        return {
            variables: {
                _id: localStorage.getItem('id')
            }
        }
    }
})(RestaurantOrderHistory);