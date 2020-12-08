import React, { Component } from 'react';
import NavBar from './LandingPage/Navbar';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Login/Register'
import CustomerRegister from './customer/CustomerRegister'
import RestaurantRegister from './restaurantOwner/RestaurantEntryAuth/RestaurantRegister'
import CustomerLogin from './customer/CustomerLogin'
import RestaurantLogin from './restaurantOwner/RestaurantEntryAuth/RestaurantLogin'
import CustomerHomePage from './customer/CustomerHomePage'
import RestaurantHomePage from './restaurantOwner/RestaurantProfile/RestaurantHomePage'
import DisplayMenu from './restaurantOwner/RestaurantMenu/DisplayMenu'
import DishDetails from './restaurantOwner/RestaurantMenu/DishDetails'
import RestaurantViewOfCustomer from './restaurantOwner/CustomerView/RestaurantViewOfCustomer'
import Orders from './restaurantOwner/Orders/Orders'
import UpdateOrder from './restaurantOwner/Orders/UpdateOrder'
import CustomerReviews from './restaurantOwner/reviews/CustomerReviews'
import UpdateCustomerProfile from './customer/Profile/UpdateCustomerProfile'
import ReviewsOnProfile from './customer/Profile/ReviewsOnProfile'
import SearchRestaurant from './customer/Search/SearchRestaurant'
import CustomerViewofRestaurant from './customer/Search/CustomerViewofRestaurant'
import WriteaReview from './customer/review/WriteReview'
import CustomerOrders from './customer/Orders/CustomerOrders'
import CustomerOrderHistory from './customer/Orders/CustomerOrderHistory'
import CustomerOrderDetails from './customer/Orders/CustomerOrderDetails'
import { Switch, Route, withRouter } from 'react-router-dom';
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div className="homepage">
                <div id="site-content">
                    <Route path="/" component={NavBar} />
                    {/*<Route
                        path="/register"
                        render={props => <Register {...props} />}
                    />*/}
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/register/restaurantregister" component={RestaurantRegister} />
                    <Route path="/home" component={Home} />
                    <Route path="/login/restaurantlogin" component={RestaurantLogin} />
                    <Route path="/restauranthomepage/:id" component = {RestaurantHomePage} />
                    <Route path="/displaymenu" component = {DisplayMenu} />
                    <Route path="/dishdetails/:id" component = {DishDetails} />
                    <Route path="/restaurantviewofcustomer" component = {RestaurantViewOfCustomer}/>
                    <Route path="/viewcustomerreviews" component = {CustomerReviews} />
                    <Route path="/orders" component = {Orders} />
                    <Route path="/updateorder/:id" component = {UpdateOrder} />


                    <Route path="/register/customerregister" component = {CustomerRegister} />
                    <Route path="/login/customerlogin" component = {CustomerLogin}/>
                    <Route path="/customerhomepage/:id" component = {CustomerHomePage}/>
                    <Route path="/updatecustomerprofile" component = {UpdateCustomerProfile} />
                    <Route path="/searchrestaurant" component = {SearchRestaurant} />
                    <Route path="/customerviewofrestaurant/:id" component = {CustomerViewofRestaurant}/>
                    <Route path="/writereview/:id" component = {WriteaReview} />
                    <Route path="/viewreviews" component ={ReviewsOnProfile} />
                    <Route path="/customerorder/:id" component = {CustomerOrders} />
                    <Route path="/customerorderdetails/:id" component = {CustomerOrderDetails} />
                    <Route path="/customerorderhistory" component = {CustomerOrderHistory} />

                </div>
            </div>
        )
    }
}
//Export The Main Component
export default Main;