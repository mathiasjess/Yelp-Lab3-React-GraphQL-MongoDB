import {gql} from 'apollo-boost'

const addDish = gql`
            mutation addDish($restaurantId: String, $dishName: String, $dishIngredients:String,$dishDescription:String,$price: String, $dishCategory:String,){
                addDish(restaurantId: $restaurantId,dishName:$dishName , dishIngredients:$dishIngredients,dishDescription:$dishDescription,price:$price , dishCategory:$dishCategory){
                    status,
                    message
                }
            }
        `;

export {addDish}