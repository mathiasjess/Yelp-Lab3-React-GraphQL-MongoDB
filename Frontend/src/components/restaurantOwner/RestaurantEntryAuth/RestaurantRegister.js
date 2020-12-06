import React from 'react';
import {restaurantRegistration} from '../../../mutations/restaurantMutations/registerMutation'
import { graphql } from 'react-apollo';

class restaurantRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            restaurantname: '',
            email: '',
            password: '',
            location: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitRegister = this.submitRegister.bind(this)
    }
    ChangeHandler(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Submit Restaurant registration information
    submitRegister(event) {
        //prevent page from refresh
        event.preventDefault();
        this.props.restaurantRegistration({
            variables : {
            restaurantName: this.state.restaurantname,
            email: this.state.email,
            password: this.state.password,
            location: this.state.location,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipcode: this.state.zipcode,
            }
        }).then(response =>{
            console.log("Response status", response.data.restaurantRegistration)
            console.log("Response status", response.data.restaurantRegistration.message)
            console.log("Response status", response.data.restaurantRegistration.status)
            if(response.data.restaurantRegistration.status === "200")
            {
                alert(response.data.restaurantRegistration.message)
                this.props.history.replace('/login/restaurantlogin');
            }
            else{
                alert("Could not register")
            }
            
        })
    }
    render() {
        return (
            <form>
                <div class="regColumn">
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="restaurantname" placeholder="Restaurant name" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="location" placeholder="Building, Street Name" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="city" placeholder="City" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="state" placeholder="state" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="country" placeholder="Country" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="zipcode" placeholder="zipcode" />
                    </div>
                    <button onClick={this.submitRegister} class="btn btn-danger">Sign Up</button>
                </div>

            </form>
        )
    }

}


export default graphql(restaurantRegistration, {name : "restaurantRegistration"})(restaurantRegister);