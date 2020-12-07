import React from 'react'
import { graphql } from 'react-apollo';
import { customerLogin } from '../../mutations/customerMutation/loginMutation'

 // @ts-ignore  
 import jwt_decode from "jwt-decode";


class CustomerLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:'',
            token : '',
            customerID: ''
        }
        this.ChangeHandler = this.ChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }
    ChangeHandler(event){
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    async submitLogin(event){
        event.preventDefault();
        await this.props.customerLogin({
            variables : {
            email : this.state.email,
            password : this.state.password
        }
    }).then(response =>{
        console.log("Response status", response.data.customerLogin)
        console.log("Response status", response.data.customerLogin.message)
        console.log("Response status", response.data.customerLogin.status)
        if(response.data.customerLogin.status === "200")
        {
            this.setState({
                token: response.data.customerLogin.message
            })
        }
        else{
            alert("Invalid credentials")
        }
        
    })
    }
    render() {
        if (this.state.token.length > 0){
            localStorage.setItem("token", this.state.token);
            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("id",decoded._id);
            localStorage.setItem("email",decoded.email);
            localStorage.setItem("name",decoded.firstName + ' '+ decoded.lastName);
            localStorage.setItem("role",decoded.role);
            this.props.history.replace(`/customerhomepage/${localStorage.getItem('id')}`);
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
                    <button onClick={this.submitLogin} class="btn btn-danger">User Log In</button>
                </div>

            </form>
        )
    }

}

export default graphql(customerLogin, { name: "customerLogin" })(CustomerLogin);