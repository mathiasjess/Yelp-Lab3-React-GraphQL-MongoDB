import React from 'react'
import { connect } from 'react-redux';
// import {restaurantLogin} from '../../../actions/restaurantAction'
import { graphql } from 'react-apollo';
import { restaurantLogin } from '../../../mutations/restaurantMutations/loginMutation'
// @ts-ignore  
import jwt_decode from "jwt-decode";
// const jwt_decode = require('jwt-decode');

class RestaurantLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            token: '',
            restaurantId: ''
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }
    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitLogin(event) {
        let responseObj = {}
        event.preventDefault();
        this.props.restaurantLogin({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(response => {
            if (response.data.restaurantLogin.status === "200") {
                console.log(response.data)
                this.setState({
                    token: response.data.restaurantLogin.message
                })
                
            }
            else {
                alert("Invalid credentials")
            }
        })
    }
    render() {
        if (this.state.token.length > 0) {
            localStorage.setItem("token", this.state.token);
            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("id", decoded._id);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("role", decoded.role);
            localStorage.setItem("name", decoded.name);
            this.props.history.replace(`/restauranthomepage/${localStorage.getItem("id")}`);
        }
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <button onClick={this.submitLogin} class="btn btn-danger">Restaurant Log In</button>
                </div>

            </form>
        )
    }

}

// function mapDispatchToProps(dispatch){
//     console.log("Dispatch",dispatch);
//     return {
//         restaurantLogin : (data) => dispatch(restaurantLogin(data))
//     }
// }
// export default connect(null,mapDispatchToProps)(RestaurantLogin);
// export default RestaurantLogin; 
export default graphql(restaurantLogin, { name: "restaurantLogin" })(RestaurantLogin);