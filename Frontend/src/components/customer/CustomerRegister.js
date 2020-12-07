import React from 'react'
import {customerRegistration} from '../../mutations/customerMutation/registerMutation'
import { graphql } from 'react-apollo';

class customerRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName:'',
            lastName: '',
            email:'',
            password:'',
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitCustomerRegistration = this.submitCustomerRegistration.bind(this)
    }
    ChangeHandler(event){
        event.preventDefault();
        this.setState({
            [event.target.name] :event.target.value
        })
    }
    submitCustomerRegistration(event){
        //prevent page from refresh
        event.preventDefault();
        this.props.customerRegistration({
            variables : {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
    }).then(response =>{
        console.log("Response status", response.data.customerRegistration)
        console.log("Response status", response.data.customerRegistration.message)
        console.log("Response status", response.data.customerRegistration.status)
        if(response.data.customerRegistration.status === "200")
        {
            alert(response.data.customerRegistration.message)
            this.props.history.replace('/login/customerlogin');
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
                    <div class="form-group" style={{display:"flex", width:"30%", justifyContent:"space-between"}}>
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="firstName" placeholder="First Name" />
                        <input onChange={this.ChangeHandler} type="text" class="form-control" name="lastName" placeholder="Last Name" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="email" class="form-control" name="email" placeholder="Email ID" />
                    </div>
                    <div class="form-group">
                        <input onChange={this.ChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <button onClick={this.submitCustomerRegistration} class="btn btn-danger">Sign Up</button>
                </div>

            </form>
        )
    }

}

export default graphql(customerRegistration, {name : "customerRegistration"})(customerRegister);