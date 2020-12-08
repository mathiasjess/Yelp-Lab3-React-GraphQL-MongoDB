import React from 'react';
import '../RestaurantHomePage.css';
import '../UpdateRestaurantProfile.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {restaurantProfileUpdate} from '../../../actions/restaurantAction'
import {updateRestaurant} from '../../../mutations/restaurantMutations/updateRestaurantMutation'
import { graphql } from 'react-apollo';


class UpdateRestaurantProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantName: this.props.user.restaurantName,
            email: this.props.user.email,
            description: this.props.user.description,
            contact: this.props.user.contact,
            location: this.props.user.location,
            city: this.props.user.city,
            state: this.props.user.state,
            country: this.props.user.country,
            zipcode: this.props.user.zipcode,
            restaurantImage: this.props.user.restaurantImage,
            timings: this.props.user.timings,
            delivery: {
                curbPickup: Boolean(this.props.user.curbPickup),
                dineIn: Boolean(this.props.user.dineIn),
                yelpDelivery: Boolean(this.props.user.yelpDelivery)
            },
        }

        this.handleRestaurantInfoUpdate = this.handleRestaurantInfoUpdate.bind(this)
        this.updateRestaurantProfile = this.updateRestaurantProfile.bind(this)
        this.handledeliveryOptions = this.handledeliveryOptions.bind(this)
        this.updateallprofileData = this.updateallprofileData.bind(this)
    }
    handleRestaurantInfoUpdate(event) {
        event.preventDefault();
        event.target.type === "file" ? this.setState({ [event.target.name]: event.target.files[0] }) : this.setState({ [event.target.name]: event.target.value })

    }
    handledeliveryOptions(e) {
        const name = e.target.name;
        this.setState((prevState) => {
            return {
                delivery: {
                    ...prevState.delivery,
                    [name]: !prevState.delivery[name]
                }
            }
        })
    }
    updateRestaurantProfile(event) {
        // event.preventDefault();
        this.props.updateRestaurant({
            variables : {
                restaurantId : localStorage.getItem('id'),
                restaurantName: this.state.restaurantName,
                email: this.state.email,
                description: this.state.description,
                contact: this.state.contact,
                location: this.state.location,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                zipcode: this.state.zipcode,
                timings: this.state.timings,
                curbPickup: this.state.delivery.curbPickup,
                dineIn: this.state.delivery.dineIn,
                yelpDelivery: this.state.delivery.yelpDelivery
            }
        }).then(response =>{
            console.log("Response status", response.data.updateRestaurant)
            console.log("Response status", response.data.updateRestaurant.message)
            console.log("Response status", response.data.updateRestaurant.status)
            if(response.data.updateRestaurant.status === "200")
            {   
                this.updateRestaurantProfile()
                alert(response.data.updateRestaurant.message)
                this.props.history.replace(`/restauranthomepage/${localStorage.getItem("id")}`);
                // window.location.reload()
            }
            else{
                alert(response.data.updateRestaurant.message)
            }
            
        })

    }
    updateallprofileData(event) {
        event.preventDefault();
        const data = {
            restaurantName: this.state.restaurantName,
            email: this.state.email,
            description: this.state.description,
            contact: this.state.contact,
            location: this.state.location,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipcode: this.state.zipcode,
            timings: this.state.timings,
            curbPickup: this.state.delivery.curbPickup,
            dineIn: this.state.delivery.dineIn,
            yelpDelivery: this.state.delivery.yelpDelivery,
        }
        alert("Updated Restaurant Profile successfully")
        this.props.restaurantProfileUpdate(data)

    }

    render() {
        console.log("Curb pick up", this.state.curbPickup)
        return (
            <div class="biz-site-expanded-grid-content-column">
                <h1 class="page-title">Basic Information</h1>
                <form>
                    <div class="biz-info-section">
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">Restaurant Profile Image</label></li>
                                <li><input type="file"
                                    name="restaurantImage"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    class="inputFields" /></li>
                                <li class="BusinessName"><label class="u-nowrap">Restaurant Name</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="restaurantName"
                                    placeholder={this.props.user.restaurantName} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Email</label></li>
                                <li><input type="email" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="email"
                                    placeholder={this.props.user.email} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Location</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="location"
                                    placeholder={this.props.user.location} /></li>
                                <li class="BusinessName"><label class="u-nowrap">City</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="city"
                                    placeholder={this.props.user.city} /></li>
                                <li class="BusinessName"><label class="u-nowrap">State</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="state"
                                    placeholder={this.props.user.state} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Zip Code</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="zipcode"
                                    placeholder={this.props.user.zipcode} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Description</label></li>
                                <li><textarea class="inputFields"
                                    name="description"
                                    rows="4" cols="50"
                                    placeholder={this.props.user.description}
                                    onChange={this.handleRestaurantInfoUpdate}>
                                </textarea></li>
                                <li class="BusinessName"><label class="u-nowrap">Contact Information</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="contact"
                                    placeholder={this.props.user.contact} /></li>
                                <li class="BusinessName"><label class="u-nowrap">Timings</label></li>
                                <li><input type="text" class="inputFields"
                                    onChange={this.handleRestaurantInfoUpdate}
                                    name="timings"
                                    placeholder={this.props.user.timings} /></li>
                            </ul>
                        </div>
                    </div>
                    <div class="biz-info-section">
                        <h2 class="page-title">Amenities and more</h2>
                        <div class="biz-info-row">
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="curbPickup"
                                        checked={this.state.delivery.curbPickup}
                                        onChange={this.handledeliveryOptions} />
                                        Curbside Pickup</label></li>

                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="dineIn"
                                        checked={this.state.delivery.dineIn}
                                        onChange={this.handledeliveryOptions} />
                                        Dine In</label></li>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="yelpDelivery"
                                        checked={this.state.delivery.yelpDelivery}
                                        onChange={this.handledeliveryOptions} />
                                        Yelp Delivery</label></li>
                            </ul>
                        </div>

                    </div>
                    <div class="SubmitUpdate">
                        <button type="submit" onClick={this.updateRestaurantProfile} class="ybtn ybtn--primary"><span>Save Changes</span></button>
                        <Link to="#" >Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.restaurantReducer
});

function mapDispatchToProps(dispatch) {
    return {
        restaurantProfileUpdate: (data) => dispatch(restaurantProfileUpdate(data))
    }
}

// export default connect(mapStateToProps)(UpdateRestaurantProfile);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(graphql(updateRestaurant, {name : "updateRestaurant"})(UpdateRestaurantProfile)));