import React from 'react'
import { Link } from 'react-router-dom';
import '../../restaurantOwner/UpdateRestaurantProfile.css'
import Moment from 'react-moment';

class CustomerOrderDetails extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let getorder = this.props.location.state.orderDetails
        console.log("Order details", getorder)
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div class="biz-info-section">
                    <div class="biz-info-row">
                        <div>
                        <div class = "main-link">
                        <Link to ='/customerorderhistory'><span class="glyphicon glyphicon-arrow-left"/>Return to Main Orders Page</Link>
                        </div>    
                        <h2> Orders</h2>
                                   return <div class="card-order">
                                            <h5>Order Details</h5>
                                        <div class="order-footer">
                                            <p><b>Date: </b><Moment>{getorder.Date}</Moment> </p>
                                            <p><b>Total Price:</b> ${getorder.totalPrice}</p>
                                        </div>
                                        <div>
                                            <h5> Order details</h5>
                                            {getorder.orderDetails.length > 0 ? getorder.orderDetails.map(function (orderlist, j) {
                                                return (
                                                    <div class="order-footer" key={j}>
                                                        <p>{orderlist.dishName}</p>
                                                        <p>{orderlist.price}</p>
                                                        <p>{orderlist.quantity}</p>
                                                    </div>
                                                );
                                            }) : null}
                                        </div>
                                        <div class="order-footer">
                                            <p><b>Delivery Option: </b>{getorder.deliveryOption}</p>
                                            <p><b>Status:  </b>{getorder.delivery_status}</p>
                                            <p><b>Order Type:</b> {getorder.deliveryFilter}</p>
                                        </div>
                                    </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CustomerOrderDetails;