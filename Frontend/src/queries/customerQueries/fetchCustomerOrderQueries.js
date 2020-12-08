import { gql } from 'apollo-boost';

const fetchCustomerOrderSummary = gql`
query($customerID : String){
    fetchCustomerOrderSummary(customerID: $customerID){
      restaurantName
        orders{
            _id
            totalPrice
            deliveryOption
            delivery_status
            deliveryFilter
            orderDate
            orderDetails{
                dishName
                price
                quantity
            }
        }
    }
  }
`
export {fetchCustomerOrderSummary}