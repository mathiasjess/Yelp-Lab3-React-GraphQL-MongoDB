import React from 'react'
import { Link } from 'react-router-dom'
import './reviews.css'
import default_image from '../../../images/customer_default_pic.png'
import '../Paginate.css'
import Moment from 'react-moment';
import { graphql} from 'react-apollo';
import { restaurantDetails } from '../../../queries/restaurantQueries/restaurantHomePageQueries'

class CustomerReviews extends React.Component {
    componentDidMount() {
        this.receivedData()
    }
    receivedData() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else{
        console.log("Reviews data", data)
        return data.restaurantDetails[0].reviews.map(review => {
            return <div class="Reviews">
                <h4>Rating: {review.ratings}/5</h4>
                <div class="review-header">
                    <img class="photo-box" src={default_image} alt="Avatar" />
                    <Link to={{
                        pathname: '/restaurantviewofcustomer',
                        aboutProps: { id: review.customerID }
                    }}><h5>{review.customerName}</h5></Link>
                </div>
                <h6>Date: <Moment>{Date(review.reviewDate)}</Moment></h6>
                <h6>Comments:{review.comments}</h6>
            </div>})
        }
    }
    render() {
        return (
            <div class="container">
                {this.receivedData()}
            </div>
        )
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
})(CustomerReviews);