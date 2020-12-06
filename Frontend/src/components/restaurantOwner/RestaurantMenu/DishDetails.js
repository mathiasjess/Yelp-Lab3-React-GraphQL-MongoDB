import React from 'react'
import { connect } from 'react-redux';
import '../RestaurantHomePage.css';
import { Link } from 'react-router-dom'
import { imagepath } from '../../../config/imagepath';
import { graphql } from 'react-apollo';
import { restaurantDetails } from '../../../queries/restaurantQueries/restaurantHomePageQueries'

class DishDetails extends React.Component {
    render() {
        console.log("Dish details", this.props.location.state.detail)
        return (
            <div class="biz-site-expanded-grid-content-column">
                <div>
                    {localStorage.getItem('role') === 'restaurant' && <div class="main-link">
                        <Link to="/displaymenu"><span class="glyphicon glyphicon-arrow-left" />Return to Main Menu</Link>
                    </div>}
                    {localStorage.getItem('role') === 'customer' && <div class="main-link">
                        <Link to="#" onClick={() => { this.props.history.push(`/customerorder/${this.props.user._id}`) }}><span class="glyphicon glyphicon-arrow-left" />Return to Restaurant Profile</Link>
                    </div>}
                    <h2 style={{ textAlign: 'center' }}> Dish Details</h2>
                    <div class="card-order">
                        <h5>{this.props.location.state.detail.dishName}</h5>
                        <h6>Category: {this.props.location.state.detail.dishCategory}</h6>
                                <p style={{ lineHeight: '3rem' }}><b>Description: </b>{this.props.location.state.detail.dishDescription}</p>
                                <p style={{ lineHeight: '3rem' }}><b>Ingredients:</b> {this.props.location.state.detail.dishIngredients}</p>
                                <p style={{ lineHeight: '3rem' }}><b>Price:</b> ${this.props.location.state.detail.price}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DishDetails;