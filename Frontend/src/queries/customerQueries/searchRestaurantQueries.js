import { gql } from 'apollo-boost';

const searchRestaurant = gql`
query($searchParameter : String){
    searchRestaurant(searchParameter: $searchParameter){
      _id
      restaurantName
      location
      city
      zipcode
      cuisine
      description
      curbPickup
      yelpDelivery
      dineIn
      contact
      latitude
      longitude
    }
  }
`
export {searchRestaurant}