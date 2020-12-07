import { gql } from 'apollo-boost';

const getcustomerReviews = gql`
query($customerID : String){
    getcustomerReviews(customerID: $customerID){
      restaurantName
      reviews{
        reviewDate
        comments
        ratings
      }
    }
  }
`
export {getcustomerReviews}