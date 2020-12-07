import { gql } from 'apollo-boost';

const customerDetails = gql`
query($_id : String){
        customerDetails(_id: $_id){
            firstName
            lastName
            email
            password
            yelpingSince
            DOB
            city
            country
            favourites
            findmeIn
            headline
            location
            nickName
            phoneNumber
            state
            thingsILove
            websiteDetails
            zipcode
        
        } 
    }`

export { customerDetails}