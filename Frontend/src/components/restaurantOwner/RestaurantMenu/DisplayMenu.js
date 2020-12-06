import React from 'react'
import '../RestaurantHomePage.css'
import '../Paginate.css'
import { graphql} from 'react-apollo';
import { restaurantDetails } from '../../../queries/restaurantQueries/restaurantHomePageQueries'



class DisplayMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            data: [],
            perPage: 3,
            currentPage: 0
        };
        this.viewDish = this.viewDish.bind(this)
    }
    viewDish(ID, menu) {
        this.props.history.replace({
            pathname: `/dishdetails/${ID}`,
            state: {
                detail: menu
            }
        });
    }

    componentDidMount() {
        this.receivedData()
    }


    receivedData() {
        var data = this.props.data;
        if (data.loading) {
            return (<div>Loading......</div>)
        }
        else{
        console.log("Menu data", data)
        return data.restaurantDetails[0].menuItem.map(menu => {
         return <div class="card-menu">
                <div class="card-items">
                    <h5 style={{ textAlign: 'center', lineHeight: '2rem' }}><b>{menu.dishName}</b></h5>
                    <p style={{ lineHeight: '2rem' }}><b><span class="glyphicon glyphicon-th-list"></span>Category: </b> {menu.dishCategory}</p>
                    <p><b>Description: </b>{menu.dishDescription}</p>
                    <p><b>{menu.price}</b></p>
                </div>
                <button class="btn btn-primary" value={menu._id} onClick={() => this.viewDish(menu._id, menu)}>View Details</button>
            </div>})
        }
    }
    render() {
        return (
            <div class="menu">
                <h2 style={{ textAlign: 'center' }}>Menu Page</h2>
                <div class="flex-display-items">
                    {this.receivedData()}
                </div>
            </div>
        )
    }

}

export default graphql(restaurantDetails, {
    options: () => {
        return {
            variables: {
                _id: localStorage.getItem('id')
            }
        }
    }
})(DisplayMenu);