import React from 'react'
import './SearchRestaurant.css'
import axios from 'axios'
import { connect } from 'react-redux'
import default_pic from '../../../images/restaurantprofileImage.png'
import yelp_brand from '../../../images/yelp_brand.png'
import { Link, withRouter } from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { restaurantLogin } from '../../../actions/restaurantAction'
import {searchRestaurant} from '../../../queries/customerQueries/searchRestaurantQueries'
import { graphql} from 'react-apollo';


class SearchRestaurant extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchParameter1: '',
            searchParameter2: '',
            delivery: {
                curbPickup: false,
                dineIn: false,
                yelpDelivery: false,
                location: false
            },
            searchResults: [],
            staticResults: [],
            handleFilterFlag : true
        }
        this.goToRestaurant = this.goToRestaurant.bind(this)
        this.Filter = this.Filter.bind(this)
        this.displayMarkers = this.displayMarkers.bind(this)
    }

    displaySearchResults(){
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else {
            return data.searchRestaurant.map(result => {
            return <div class="card">
            <div class="search-res-header">
             <img class="card-img-top-search" src={default_pic} alt="Card image cap" />}
                <h4 style={{ paddingTop: '45px' }}>{result.restaurantName}</h4>
            </div>
            <div class="card-body">
                <p><b>Address:</b>{result.location},{result.city}-{result.zipcode}</p>
                <p><b>Cuisine:</b> {result.cuisine}</p>
                <p><b> Description:</b>{result.description}</p>
                <p><b>Mode of Delivery:</b></p>
                <div class="services1">
                    <h6>{result.curbPickup ? <span class="glyphicon glyphicon-ok">Curbside Pickup</span> : <span class="glyphicon glyphicon-remove">Curbside Pickup</span>}</h6>
                    <h6>{result.yelpDelivery ? <span class="glyphicon glyphicon-ok">Yelp Delivery </span> : <span class="glyphicon glyphicon-remove">Yelp Delivery</span>}</h6>
                    <h6>{result.dineIn ? <span class="glyphicon glyphicon-ok">Dine In </span> : <span class="glyphicon glyphicon-remove">Dine In</span>}</h6>
                </div>
                <p><b>Phone No:</b>{result.contact}</p>
                <button class="btn btn-danger" onClick={() => this.props.history.push(`/customerviewofrestaurant/${result._id}`)}>Visit website</button>
            </div>
        </div>
            })
        }
    }

    displayFilteredSearchResults(){
            return this.state.searchResults.map(result => {
            return <div class="card">
            <div class="search-res-header">
                <img class="card-img-top-search" src={default_pic} alt="Card image cap" />}
                <h4 style={{ paddingTop: '45px' }}>{result.restaurantName}</h4>
            </div>
            <div class="card-body">
                <p><b>Address:</b>{result.location},{result.city}-{result.zipcode}</p>
                <p><b>Cuisine:</b> {result.cuisine}</p>
                <p><b> Description:</b>{result.description}</p>
                <p><b>Mode of Delivery:</b></p>
                <div class="services1">
                    <h6>{result.curbPickup ? <span class="glyphicon glyphicon-ok">Curbside Pickup</span> : <span class="glyphicon glyphicon-remove">Curbside Pickup</span>}</h6>
                    <h6>{result.yelpDelivery ? <span class="glyphicon glyphicon-ok">Yelp Delivery </span> : <span class="glyphicon glyphicon-remove">Yelp Delivery</span>}</h6>
                    <h6>{result.dineIn ? <span class="glyphicon glyphicon-ok">Dine In </span> : <span class="glyphicon glyphicon-remove">Dine In</span>}</h6>
                </div>
                <p><b>Phone No:</b>{result.contact}</p>
                <button class="btn btn-danger" onClick={() => this.props.history.push(`/customerviewofrestaurant/${result._id}`)}>Visit website</button>
            </div>
        </div>
            })
    }

    Filter(e) {
        this.setState({
            handleFilterFlag : false,
            searchResults: this.props.data.searchRestaurant
        })
        const name = e.target.name;
        this.setState(((prevState) => {
            return {
                delivery: {
                    ...prevState.delivery,
                    [name]: !prevState.delivery[name]
                }
            }
        }), function () {
            console.log(this.state.delivery.curbPickup)
            if (this.state.delivery.location === true) {
                this.setState(({
                    searchResults: this.props.data.searchRestaurant.filter((result) => {
                        return result.zipcode === this.props.user.zipcode;
                    })
                }), function () { this.displayFilteredSearchResults() })
            }
            else if (this.state.delivery.curbPickup === true) {
                this.setState(({
                    searchResults: this.props.data.searchRestaurant.filter((result) => {
                        return result.curbPickup === true;
                    })
                }), function () { this.displayFilteredSearchResults()})
            }
            else if (this.state.delivery.dineIn === true) {
                this.setState(({
                    searchResults: this.props.data.searchRestaurant.filter((result) => {
                        return result.dineIn === true;
                    })
                }), function () { this.displayFilteredSearchResults()})
            }
            else if (this.state.delivery.yelpDelivery === true) {
                this.setState(({
                    searchResults: this.props.data.searchRestaurant.filter((result) => {
                        return result.yelpDelivery === true;
                    })
                }), function () { this.displayFilteredSearchResults() })
            }
        });

    }
    displayMarkers = () => {
        return this.props.data.searchRestaurant.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }
    render() {
        const mapStyles = {
            width: '45rem',
            height: '50rem',
        };
        return (
            <div class="table">
                <div class="tr-top">
                    <div class="td-top1">
                        <img class="yelp_logo" src={yelp_brand} alt="Avatar" />
                    </div>
                    <div class="td-top2">
                        <h2 style={{ textAlign: 'center' }}> Restaurant Search Results</h2>
                    </div>
                    <div class="td-top3">
                    </div>
                </div>
                <div class="tr-middle1">
                    <div class="td-filter">
                        <div class="tr-filtermode">
                            <h5 style={{ textAlign: 'center' }}>Mode</h5>
                            <p>{this.state.curbPickup}</p>
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="curbPickup"
                                        checked={this.state.delivery.curbPickup}
                                        onChange={this.Filter} />
                                    <p>Curbside Pickup</p></label></li>

                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="dineIn"
                                        checked={this.state.delivery.dineIn}
                                        onChange={this.Filter} />
                                    <p>Dine In</p></label></li>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="yelpDelivery"
                                        checked={this.state.delivery.yelpDelivery}
                                        onChange={this.Filter} />
                                    <p>Yelp Delivery</p></label></li>
                            </ul>
                        </div>
                        <div class="tr-filterlocation">
                            <h5 style={{ textAlign: 'center' }}>Neighbourhood Locations</h5>
                            <ul>
                                <li class="BusinessName"><label class="u-nowrap">
                                    <input type="checkbox"
                                        name="location"
                                        checked={this.state.delivery.zipcode}
                                        onChange={this.Filter} />
                                        Location</label></li>
                            </ul>
                        </div>
                        <div class="tr-filterOthers">
                        </div>
                    </div>
                    <div class="td-restaurant">
                        {this.state.handleFilterFlag ? this.displaySearchResults() : this.displayFilteredSearchResults()}
                    </div>
                    <div class="td-maps">
                        <Map
                            google={this.props.google}
                            zoom={8}
                            style={mapStyles}
                            initialCenter={{ lat: 37.40377490, lng: -121.87985110 }}
                        >
                            {this.displayMarkers()}
                        </Map>
                    </div>
                </div>
            </div>

        )
    }
}



export default withRouter(graphql(searchRestaurant, {
    options: () => {
        return {
            variables: {
                searchParameter: this.props.location.aboutProps.searchParameter1
            }
        }
    }
})(SearchRestaurant));