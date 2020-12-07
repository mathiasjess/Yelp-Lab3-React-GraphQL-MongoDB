import {gql} from 'apollo-boost'

const customerRegistration = gql`
            mutation customerRegistration($firstName : String, $lastName : String, $email : String, $password : String){
                customerRegistration(firstName : $firstName, lastName : $lastName, email : $email, password : $password){
                    status,
                    message
                }
            }
        `;

export {customerRegistration}