import {gql} from 'apollo-boost'

const updateOrderStatus = gql`
            mutation updateOrderStatus($orderID: String, $delivery_status : String, $deliveryFilter : String){
                updateOrderStatus(orderID: $orderID,delivery_status : $delivery_status, deliveryFilter : $deliveryFilter){
                    status,
                    message
                }
            }
        `;

export {updateOrderStatus}