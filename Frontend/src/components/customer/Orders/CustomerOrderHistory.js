import React from 'react'
import './CustomerOrders.css'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import moment from 'moment';
import { customerOrderHistory } from '../../../actions/customerOtherDetailsAction'
import ReactPaginate from 'react-paginate';
import '../../restaurantOwner/Paginate.css' 
import { graphql} from 'react-apollo';
import { fetchCustomerOrderSummary } from '../../../queries/customerQueries/fetchCustomerOrderQueries'


class CustomerOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderSummary: [],
            handlePickupFlag: false,
            handleDeliveredFlag: false,
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0,
            handleFilterflag : true
        }
        this.orderdetails = this.orderdetails.bind(this)
        this.handlePickUp = this.handlePickUp.bind(this)
        this.handleDelivered = this.handleDelivered.bind(this)
        this.handleFilters = this.handleFilters.bind(this)
        this.handleAllOrders = this.handleAllOrders.bind(this)
        this.handleorderofevents = this.handleorderofevents.bind(this)
    }

    receivedData(){
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
            this.state.handleFilterflag = true
            return data.fetchCustomerOrderSummary.map(order => {
                return order.orders.map(item => {
                    return <div class="card-order">
                    <h4>Restaurant: {order.restaurantName}</h4>
                    <h6> Order Id:{item._id}</h6>
                    <div class="order-footer">
                        <p><b>Date: </b>{moment(parseInt(item.orderDate)).format("DD-MM-YYYY h:mm:ss")}</p>
                        <p><b>Total Price:</b> {item.totalPrice}</p>
                    </div>
                    <div class="order-footer">
                        <p><b>Delivery Option:</b> {item.deliveryOption}</p>
                        <p><b>Status:</b> {item.delivery_status}</p>
                        <p><b>Order Type: </b> {item.deliveryFilter}</p>
                        <button class="btn btn-primary" onClick={() => this.orderdetails(item._id, item)}>View Details</button>
                    </div>
                </div>
                })

            })
        }
    }

    receivedFilteredData(){
        console.log("Filtered output", this.state.orderSummary)
        return this.state.orderSummary.map(order => {
                return <div class="card-order">
                <h4>Restaurant: {order.restaurantName}</h4>
                <h6> Order Id:{order._id}</h6>
                <div class="order-footer">
                    <p><b>Date: </b>{moment(parseInt(order.orderDate)).format("DD-MM-YYYY h:mm:ss")}</p>
                    <p><b>Total Price:</b> {order.totalPrice}</p>
                </div>
                <div class="order-footer">
                    <p><b>Delivery Option:</b> {order.deliveryOption}</p>
                    <p><b>Status:</b> {order.delivery_status}</p>
                    <p><b>Order Type: </b> {order.deliveryFilter}</p>
                    <button class="btn btn-primary" onClick={() => this.orderdetails(order._id)}>View Details</button>
                </div>
            </div>

        })
    }


    convertOrderSummary(){
        let OrderHistoryresult = []
        let individualOrder = {}
        this.props.data.fetchCustomerOrderSummary.map(order => {
            order.orders.map(item => {
                individualOrder = {
                    restaurantName: order.restaurantName,
                    orderID: item._id,
                    totalPrice: item.totalPrice,
                    deliveryOption: item.deliveryOption,
                    delivery_status: item.delivery_status,
                    deliveryFilter: item.deliveryFilter,
                    orderDetails: item.orderDetails,
                    orderDate: item.orderDate
                }
                OrderHistoryresult.push(individualOrder)
                individualOrder = {}
            })
            console.log("Refactored",OrderHistoryresult)
            this.setState({
                orderSummary : OrderHistoryresult
            })
        })
    }
    orderdetails(orderID, item) {
        this.props.history.replace({
            pathname: `/customerorderdetails/${orderID}`,
            state: {
                orderDetails: item
            }
        });
    }
    async handlePickUp() {
        await this.convertOrderSummary();
        this.setState({
            handleFilterflag : false,
            handlePickupFlag: true,
            handleDeliveredFlag: false,
        })
        await this.setState({
            orderSummary: this.state.orderSummary.filter((summary) => {
                return summary.orders.deliveryOption === 'pickup'
            })

        }, ()=>{
            console.log("pickup", this.state.orderSummary)
        });
        this.receivedFilteredData();
    }
    async handleDelivered() {
        this.convertOrderSummary();
        this.setState({
            handleFilterflag : false,
            handleDeliveredFlag: true,
            handlePickupFlag: false
        })
        await this.setState({
            orderSummary: this.state.orderSummary.filter((summary) => {
                return summary.orders.deliveryOption === 'delivery'
            })

        });
        this.receivedFilteredData();
    }
    async handleFilters(deliveryOption, deliveryStatus) {
        this.convertOrderSummary();
        await this.setState({
            handleFilterflag : false,
            orderSummary: this.state.orderSummary.filter((summary) => {
                return summary.orders.deliveryOption === deliveryOption && summary.orders.delivery_status === deliveryStatus
            })

        });
        this.receivedFilteredData();
    }   

    async handleAllOrders() {
     await this.setState({
            handleFilterflag : true,
            handleDeliveredFlag: false,
            handlePickupFlag: false,
        })
        this.receivedData();
    }
    async handleorderofevents(order){
        this.convertOrderSummary();
        let x = null
        let y = null
        let sortedOrders = null
        if(order === "asc"){
                sortedOrders = await this.state.orderSummary.sort((a,b)=>{
                x = new Date(moment(parseInt(a.orders.orderDate)).slice(0,10))
                y = new Date(moment(parseInt(b.orders.orderDate)).slice(0,10))
                return(x-y)
            })
        }
        else{
                sortedOrders = await this.state.orderSummary.sort((a,b)=>{
                x = new Date(moment(parseInt(a.orders.orderDate)).slice(0,10))
                y = new Date(moment(parseInt(b.orders.orderDate)).slice(0,10))
                return(y-x)
            })  
        }
        await this.setState({
            handleFilterflag : false,
            orderSummary : sortedOrders
        })
        this.receivedFilteredData();
    } 
    render() {
        let filters = null
        if (this.state.handlePickupFlag) {
            filters = (
                <ul>
                    <h4> Pick Up Filters</h4>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('pickup', 'Order Recieved')}>Order Recieved</button></li>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('pickup', 'Preparing')}>Preparing</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('pickup', 'PickUp Ready')}>PickUp Ready</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('pickup', 'Picked Up')}>Picked</button></li>

                </ul>
            );
        }
        else if (this.state.handleDeliveredFlag) {
            filters = (
                <ul>
                    <h4> Delivery Filters</h4>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('delivery', 'Order Recieved')}>Order Recieved</button></li>
                    <li><button class="no-button-show" onClick={() => this.handleFilters('delivery', 'Preparing')}>Preparing</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('delivery', 'On the way')}>On the Way</button></li>
                    <li> <button class="no-button-show" onClick={() => this.handleFilters('delivery', 'Delivered')}>Delivered</button></li>
                </ul>
            )
        }
        return (
            <div class="table">
                <div class="tr-items1">
                    <div class="td-items1">
                        <ul>
                            <li><button class="no-button-show" onClick={() => { this.handleAllOrders() }}><span class="glyphicon glyphicon-th-list" />All orders</button></li>
                        </ul>
                        <h3 style={{ textAlign: 'center' }}> Filters</h3>
                        <ul>
                            <li> <button class="no-button-show" onClick={() => { this.handlePickUp() }}>Pickup</button></li>
                            <li> <button class="no-button-show" onClick={() => { this.handleDelivered() }}>Delivered</button></li>
                        </ul>
                        {filters}
                    </div>
                    <div class="td-items2">
                    <div>
                        <h2> Orders</h2>
                        <Link to ="#" onClick={()=>this.handleorderofevents("asc")}><span class = "glyphicon glyphicon-arrow-up"> Ascending</span></Link>
                        <Link to ="#" onClick={()=>this.handleorderofevents("desc")}><span class = "glyphicon glyphicon-arrow-down"> Descending</span></Link>
                        </div>
                        {this.state.handleFilterflag ? this.receivedData(): this.receivedFilteredData()}
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     user: state.customerReducer,
//     orderhistory: state.customerOtherDetailsReducer
// });

// function mapDispatchToProps(dispatch) {
//     return {
//         customerOrderHistory: (data) => dispatch(customerOrderHistory(data))
//     }(connect(mapStateToProps, mapDispatchToProps)
// }
export default withRouter(graphql(fetchCustomerOrderSummary, {
    options: () => {
        return {
            variables: {
                customerID: localStorage.getItem('id')
            }
        }
    }
})(CustomerOrderHistory));