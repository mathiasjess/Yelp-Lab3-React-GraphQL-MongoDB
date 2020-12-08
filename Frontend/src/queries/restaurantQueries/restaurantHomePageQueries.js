import { gql } from 'apollo-boost';

const restaurantDetails = gql`
query($_id : String){
        restaurantDetails(_id: $_id){
            _id
            restaurantName
            email
            location
            city
            state
            country
            zipcode
            latitude
            longitude
            menuItem{
                _id
                dishName
                dishIngredients
                dishDescription
                price
                dishCategory
            }
            reviews{
                customerID
                customerName
                customerImage
                ratings
                comments
                reviewDate
            }
            orders{
                _id
                customerID
                customerName
                totalPrice
                deliveryOption
                delivery_status
                deliveryFilter
                orderDetails{
                    dishName
                    price
                    quantity
                }
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