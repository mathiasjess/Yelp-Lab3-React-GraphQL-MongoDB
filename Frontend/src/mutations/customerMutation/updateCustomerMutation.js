import {gql} from 'apollo-boost'

const updateCustomer = gql`
            mutation updateCustomer($customerId: String, $firstName : String, $lastName : String, $email : String, $location : String, $city: String, $state: String, $country: String, $zipcode: String, $DOB: String, $phoneNumber:String,$nickName:String,$thingsILove:String,$findmeIn:String,$websiteDetails:String, $favourites : String, $headline: String){
                    updateCustomer(customerId: $customerId,firstName : $firstName, lastName : $lastName, email : $email, location : $location, city: $city, state: $state, country: $country, zipcode: $zipcode,DOB: $DOB, phoneNumber:$phoneNumber,nickName:$nickName,thingsILove:$thingsILove,findmeIn:$findmeIn,websiteDetails:$websiteDetails, favourites:$favourites,headline:$headline){
                    status,
                    message
                }
            }
        `;

export {updateCustomer}

