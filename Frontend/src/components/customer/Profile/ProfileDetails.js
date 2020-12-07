import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './ProfileDetails.css'
import default_image from '../../../images/customer_default_pic.png'
import restaurant_image from '../../../images/restaurantprofileImage.png'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import { customerReviews } from '../../../actions/customerOtherDetailsAction'
import { customerLogin } from '../../../actions/customerAction'
import { userfollowers } from '../../../actions/customerAction'
import ReviewsOnProfile from './ReviewsOnProfile'
import { graphql} from 'react-apollo';
import { customerDetails } from '../../../queries/customerQueries/customerHomePageQueries'

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerDetails: [],
            reviews: [],
        }
        this.handleOrderPage = this.handleOrderPage.bind(this)
        this.handleEventsPage = this.handleEventsPage.bind(this)
    }
    handleOrderPage(custID) {
        this.props.history.push('/customerorderhistory')
    }

    handleEventsPage(custID) {
        this.props.history.push(`/customerevents/${custID}`)
    }
    displayCustomerDetails() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
            this.props.customerLogin(data.customerDetails[0])
            return data.customerDetails.map(customer => {
            return <div class="table">
                <div class="tr-middle">
                    <div class="td-11">
                        <img class="photo-box-img" src={default_image} alt="Avatar" />
                    </div>
                    <div class="td-21">
                        <h1> {customer.firstName} {customer.lastName} (Also known as {customer.nickName})</h1>
                        <h3>HeadLine: #{customer.headline} </h3>
                        <h5> {customer.city}, {customer.state} </h5>
                        <h6> Favourites Include: {customer.favourites} </h6>
                    </div>
                    <div class="td-31">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link to='/updatecustomerprofile' class="nav-link1">
                                    <span class="glyphicon glyphicon-user" />Update your Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tr-bottom">
                    <div class="td-1">
                        {localStorage.getItem('id') === this.props.match.params.id ?
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <Link to='#' class="nav-link is-active" onClick={this.handleMainProfile}>Profile Overview</Link>
                                    {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                                </li>
                                <li class="nav-item">
                                    <button class="profileLinks" onClick={() => this.handleOrderPage(localStorage.getItem('id'))}>Order History</button>
                                    {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                                </li>
                                <li class="nav-item">
                                    <button class="profileLinks" onClick={() => this.handleEventsPage(localStorage.getItem('id'))}> Registered Events</button>
                                    {/* <span  class="nav-link" >Update  Restaurant Profile</span>*/}
                                </li>
                                <li class="nav-item">
                                    <Link to='/viewcustomerreviews' class="nav-link disabled" >Reviews</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link" onClick={this.handleAddMenu}>Friends</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled">Review Drafts</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Compliments</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Tips</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Bookmarks</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Collections</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to='#' class="nav-link disabled"> Check-Ins</Link>
                                </li>
                            </ul>
                            : null}
                    </div>
                    <div class="td-2">
                        <h2>Reviews</h2>
                        <ReviewsOnProfile />
                    </div>
                    <div class="td-3">
                        <h2> About Me</h2>
                        <p class="details-heading">Location</p>
                        <p class="details-info">{customer.location}{customer.city}, {customer.state} {customer.country}, {customer.zipcode}</p>
                        <p class="details-heading">Date of Birth</p>
                        <p class="details-info"><Moment>{customer.DOB}</Moment></p>
                        <p class="details-heading">Yelping Since</p>
                        <p class="details-info"><Moment>{customer.yelpingSince}</Moment></p>
                        <p class="details-heading">Things I Love</p>
                        <p class="details-info">{this.state.thingsILove}</p>
                        <p class="details-heading">Find me In</p>
                        <p class="details-info">{customer.findmeIn}</p>
                        <p class="details-heading">My Blog or Website</p>
                        <p class="details-info">{customer.websiteDetails}</p>
                        <p class="details-heading">Email ID</p>
                        <p class="details-info">{customer.email}</p>
                        <p class="details-heading">Phone Number</p>
                        <p class="details-info">{customer.phoneNumber}</p>
                    </div>
                </div>
            </div> })
        }
    }
    render() {
        return (
            <div>
            {this.displayCustomerDetails()}
            </div>
        )
    }

}
const mapStateToProps = state => ({
    user: state.customerReducer,
});

function mapDispatchToProps(dispatch) {
    return {
        customerLogin: (data) => dispatch(customerLogin(data)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(graphql(customerDetails, {
    options: () => {
        return {
            variables: {
                _id: localStorage.getItem('id')
            }
        }
    }
})(ProfileDetails)));