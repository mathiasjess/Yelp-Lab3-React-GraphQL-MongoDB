import {gql} from 'apollo-boost'

const updateRestaurant = gql`
            mutation updateRestaurant($restaurantId: String, $restaurantName : String, $email : String, $location : String, $city: String, $state: String, $country: String, $zipcode: String, $description: String, $contact:String,$timings:String,$curbPickup:Boolean,$dineIn:Boolean,$yelpDelivery:Boolean){
                updateRestaurant(restaurantId: $restaurantId,restaurantName : $restaurantName, email : $email, location : $location, city: $city, state: $state, country: $country, zipcode: $zipcode,description: $description, contact:$contact,timings:$timings,curbPickup:$curbPickup,dineIn:$dineIn,yelpDelivery:$yelpDelivery){
                    status,
                    message
                }
            }
        `;

export {updateRestaurant}


