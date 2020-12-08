import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import restaurant_image from '../../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment'
import 'moment-timezone';
import { customerReviews } from '../../../actions/customerOtherDetailsAction'
import { graphql} from 'react-apollo';
import { getcustomerReviews } from '../../../queries/customerQueries/getCustomerReviewsQueries'

class ReviewsOnProfile extends React.Component{
        displayCustomerReviews() {
        let reviewsResult = []
        let individualResult = {}
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
                return this.props.data.getcustomerReviews.map(item => {
                    return <div class="Reviews">
                    <h4>Ratings: {item.reviews[0].ratings}/5</h4>
                    <div class="reviews-header-details">
                        <img class="photo-box-rest" src={restaurant_image} alt="Avatar" />
                        <h5 style={{ paddingTop: '1rem'}}>  {item.restaurantName}</h5>
                    </div>
                    <p style={{ paddingTop: '2rem' }}><b>Date: </b>{moment(parseInt(item.reviews[0].reviewDate)).format("DD-MM-YYYY h:mm:ss")}</p>
                    <p><b>Comments: </b>{item.reviews[0].comments}</p>
                </div>
            })
            
        }
    }
    render(){
        return(
            <div>
            <div> Reviews Page</div>
            {this.displayCustomerReviews()}
            </div>
        )
    }

}

export default graphql(getcustomerReviews, {
    options: () => {
        return {
            variables: {
                customerID: localStorage.getItem('id')
            }
        }
    }
})(ReviewsOnProfile);