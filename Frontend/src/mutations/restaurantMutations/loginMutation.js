import {gql} from 'apollo-boost'

const restaurantLogin = gql`
            mutation restaurantLogin($email : String, $password : String){
                restaurantLogin(email : $email, password : $password){
                    status,
                    message
                }
            }
        `;

export {restaurantLogin}