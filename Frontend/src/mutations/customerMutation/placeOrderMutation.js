import {gql} from 'apollo-boost'

const placeOrder = gql`
            mutation placeOrder($customerID : String, $customerName : String, $restaurantId : String, $totalPrice : String, $deliveryOption: String, $delivery_status:String, $deliveryFilter: String, $orderDetails:String){
                placeOrder(customerID : $customerID, customerName : $customerName, restaurantId : $restaurantId, totalPrice : $totalPrice, deliveryOption: $deliveryOption, delivery_status : $delivery_status, deliveryFilter: $deliveryFilter, orderDetails : $orderDetails){
                    status,
                    message
                }
            }
        `;

export {placeOrder}