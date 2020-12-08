import React from 'react'
import '../../restaurantOwner/RestaurantHomePage.css'
import { graphql} from 'react-apollo';
import { writeReviews} from '../../../mutations/customerMutation/writeReviewMutation'

class WriteReview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            restaurantId:'',
            customerId:'',
            reviewDate:'',
            ratings:'',
            comments:'',
        }
        this.addReview = this.addReview.bind(this)
        this.handleAddEvent = this.handleAddEvent.bind(this)
    }
    handleAddEvent(event){
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    addReview(event){
        event.preventDefault();
        this.props.writeReviews({
            variables : {
            customerID : localStorage.getItem('id'),
            restaurantId : localStorage.getItem('restaurantId'),
            customerName : localStorage.getItem('name'),
            ratings: this.state.ratings,
            comments : this.state.comments
            }
        }).then(response =>{
            console.log("Response status", response.data.writeReviews)
            console.log("Response status", response.data.writeReviews.message)
            console.log("Response status", response.data.writeReviews.status)
            if(response.data.writeReviews.status === "200")
            {   
                alert(response.data.writeReviews.message)
                this.props.history.push(`/customerviewofrestaurant/${localStorage.getItem('restaurantId')}`)
                // window.location.reload()
            }
            else{
                alert(response.data.writeReviews.message)
                this.props.history.push(`/customerviewofrestaurant/${localStorage.getItem('restaurantId')}`)
            }
            
        })
    }
    render(){
        return(
            <div class="biz-site-expanded-grid-content-column" style={{marginTop: '5%'}}>
            <button class = "btn btn-primary" onClick={()=>{this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)}}> Go Back to Restaurant Page</button>
            <form>
            <h2 class="page-title">Write a review</h2>
                <div class="biz-info-section">
                        <ul>
                            <li class="BusinessName"><label class="u-nowrap">Ratings</label></li>
                            <li><input type="text" class="inputFields"
                                onChange={this.handleAddEvent}
                                placeholder = {this.state.eventName}
                                name="ratings" /></li>
                            <li class="BusinessName"><label class="u-nowrap">Comments</label></li>
                            <li><textarea class="inputFields"
                            placeholder = {this.state.eventDescription}
                                name="comments" rows="4" cols="50"
                                onChange={this.handleAddEvent}>
                            </textarea></li>
                        </ul>
                    </div>
                <div class="SubmitUpdate">
                    <button type="submit" class="ybtn ybtn--primary" onClick={this.addReview}><span>Submit Review</span></button>
                    <button type="submit" class="ybtn ybtn--primary" onClick={()=>{this.props.history.push(`/customerviewofrestaurant/${this.props.match.params.id}`)}}><span>Cancel Review</span></button>
                </div>
            </form>
        </div>
        )
    }
}


export default graphql(writeReviews, { name: "writeReviews" })(WriteReview);