import {gql} from 'apollo-boost'

const writeReviews = gql`
            mutation writeReviews($restaurantId : String, $customerID : String, $customerName : String, $ratings : String, $comments: String){
                writeReviews(restaurantId : $restaurantId, customerID : $customerID, customerName : $customerName, ratings : $ratings, comments: $comments){
                    status,
                    message
                }
            }
        `;

export {writeReviews}