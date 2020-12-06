import { gql } from 'apollo-boost';

const restaurantDetails = gql`
query($_id : String){
        restaurantDetails(_id: $_id){
            restaurantName
            email
            location
            city
            state
            country
            zipcode
            latitude
            longitude
            reviews{
                customerID
                customerName
                customerImage
                ratings
                comments
                reviewDate
            }
            contact
            curbPickup
            description
            dineIn
            timings
            yelpDelivery
        
        } 
    }`

export { restaurantDetails}