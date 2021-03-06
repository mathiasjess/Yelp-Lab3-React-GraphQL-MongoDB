import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import '../../App.css';
import yelp_logo from '../../images/yelp_icon.png'
class Navbar extends Component {
    constructor(props) {
        super();
        this.state = {
            displayHome: true,
            customeractionsFlag: false
        }
        this.handleHome = this.handleHome.bind(this);
    }
    handleHome() {
        this.setState({
            displayHome: false
        })
    }
    componentDidMount() {
        if (localStorage.getItem('id')) {
            this.setState({
                displayHome: false
            })
        }
    }

    render() {
        //if localStorage is set render Logout Button
        let navLogin = null;
        if (localStorage.getItem('id')) {
            console.log("Able to read local session storage details");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/home" onClick={()=>{localStorage.clear()}}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read local session storage details");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login" onClick={this.handleHome}><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    <li><Link to="/register" onClick={this.handleHome}><span class="glyphicon glyphicon-log-in"></span> Register</Link></li>

                </ul>
            )
        }

        let customerFeatures = null;
        if (localStorage.getItem('id')) {
            if (localStorage.getItem('role') === 'customer') {
                customerFeatures = (
                    <ul class="nav navbar-nav">
                        <button class="customerFeatures" onClick={() => this.props.history.push(`/customerhomepage/${localStorage.getItem('id')}`)}>Home</button>
                    </ul>
                )
            }
            else if (localStorage.getItem('role') === 'restaurant') {
                customerFeatures = (
                    <ul class="nav navbar-nav">
                        <button class="customerFeatures" onClick={() => this.props.history.push(`/restauranthomepage/${localStorage.getItem('id')}`)}>Home</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/displaymenu")}>Menu</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push("/orders")}>Orders</button>
                        <button class="customerFeatures" onClick={() => this.props.history.push('/viewcustomerreviews')}>Reviews</button>
                    </ul>
                )
            }
        }
        return (
            <div>
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand"><Link to="/home"><img class="yelpLogo" src={yelp_logo} /></Link></a>
                            {customerFeatures}
                        </div>


                        {navLogin}
                    </div>
                </nav>
                {this.state.displayHome && <Home />}
            </div>
        )
    }
}
export default Navbar;