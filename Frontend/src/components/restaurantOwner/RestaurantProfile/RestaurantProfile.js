import React from 'react'
import '../RestaurantHomePage.css'
import '../reviews/reviews.css'
import restaurantprofileImage from '../../../images/restaurantprofileImage.png'
import default_image from '../../../images/customer_default_pic.png'
import {restaurantLogin} from '../../../actions/restaurantAction'
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Moment from 'react-moment';
import { graphql} from 'react-apollo';
import { restaurantDetails } from '../../../queries/restaurantQueries/restaurantHomePageQueries'



class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showFullProfileFlag: true,
            showEditDishesFlag: false,
            itemID: '',
        }
    } 

    displayRestaurantDetails() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
            const mapStyles = {
                width: '45rem',
                height: '30rem',
            };
            this.props.restaurantLogin(data.restaurantDetails[0])
            return data.restaurantDetails.map(restaurant => {
                return (
                    <div>
                        <div> Restaurant Home Page</div>
                        <div class="centeredRight" >
                            <div class="header">
                             <img  class="card-img-top-profile"  src={restaurantprofileImage} />
                                <div class="maps">
                                <Map
                                google={this.props.google}
                                zoom={10}
                                style={mapStyles}
                                initialCenter={{ lat: this.props.user.latitude, lng: this.props.user.longitude }}
                            >
                                <Marker position={{ lat: this.props.user.latitude, lng: this.props.user.longitude }} />
                            </Map>
                                </div>
                            </div>
                            <h2 class="restaurantName">{restaurant.restaurantName}</h2>
                            <div class="restaurantdetails">
                                <h5> {restaurant.location}</h5>
                                <h5> {restaurant.city},{restaurant.state}</h5>
                                <h5> {restaurant.zipcode}</h5>
                                <h5>Ph No: {restaurant.contact}</h5>
                            </div>
                            <div class="restaurantdescription">
                                <p>{restaurant.description}</p>
                                <p>{restaurant.timings}</p>
                            </div>
                            <h4> Services</h4>
                            <div class="services">
                                <h5>{restaurant.curbPickup ? <span class="glyphicon glyphicon-ok">Curbside Pickup     </span> : <span class="glyphicon glyphicon-remove">Curbside Pickup</span>}</h5>
                                <h5>{restaurant.yelpDelivery ? <span class="glyphicon glyphicon-ok">Yelp Delivery      </span> : <span class="glyphicon glyphicon-remove">Yelp Delivery</span>}</h5>
                                <h5>{restaurant.dineIn ? <span class="glyphicon glyphicon-ok">Dine In                  </span> : <span class="glyphicon glyphicon-remove">Dine In</span>}</h5>
                            </div>
                            <div style={{ width: "70%" }}>
                                <h2>Reviews</h2>
                                {restaurant.reviews.map((review, i) => {
                                    return <div class="Reviews" key={i}>
                                        <h4>Rating: {review.ratings}/5</h4>
                                        <div class="review-header">
                                            <img class="photo-box" src={default_image} alt="Avatar" />
                                            <Link to={{
                                                pathname: '/restaurantviewofcustomer',
                                                aboutProps: { id: review.customerID }
                                            }}><h5>{review.customerName}</h5></Link>
                                        </div>
                                        <h6>Date: <Moment>{review.reviewDate}</Moment></h6>
                                        <h6>Comments:{review.comments}</h6>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div>
            {this.displayRestaurantDetails()}
            </div>
        )
    }

}



function mapDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return {
        restaurantLogin : (data) => dispatch(restaurantLogin(data))
    }
}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

export default (GoogleApiWrapper({
    apiKey: 'AIzaSyCiheh-O9omWKbtCfWf-S539GT82IK8aNQ'
})(connect(mapStateToProps,mapDispatchToProps)(graphql(restaurantDetails, {
    options: () => {
        return {
            variables: {
                _id: localStorage.getItem('id')
            }
        }
    }
})(RestaurantProfile))));

