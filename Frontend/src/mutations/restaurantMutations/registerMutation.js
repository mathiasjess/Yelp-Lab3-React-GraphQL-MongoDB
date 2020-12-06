import {gql} from 'apollo-boost'

const restaurantRegistration = gql`
            mutation restaurantRegistration($restaurantName : String, $email : String, $password : String, $location : String, $city: String, $state: String, $country: String, $zipcode: String){
                restaurantRegistration(restaurantName : $restaurantName, email : $email, password : $password, location : $location, city: $city, state: $state, country: $country, zipcode: $zipcode){
                    status,
                    message
                }
            }
        `;

export {restaurantRegistration}