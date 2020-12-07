import {gql} from 'apollo-boost'

const customerLogin = gql`
            mutation customerLogin($email : String, $password : String){
                customerLogin(email : $email, password : $password){
                    status,
                    message
                }
            }
        `;

export {customerLogin}