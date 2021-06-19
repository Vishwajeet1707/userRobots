import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from "../components/Scroll";
import Popup from '../components/Popup';
import "./App.css";

//state is an object that describe the app!

// const state = {
//     robots : robots,
//     searchfield : ''
// }

class App extends React.Component {

    constructor(){
        super()
        this.state = {
            // message : 'VishuFans'
            robots : [],
            searchfield : '',
            popup: false

        }
        
    }
     
    // changeMessage = () => {
    //     this.setState({message : "You suscribed successfully!"});
    // }
        onSearchChange = (event) => {
        this.setState({searchfield : event.target.value});
         }

 async componentDidMount(){
    
    await fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => {
         return response.json()
     })
     .then(users => {
         this.setState({robots : users});
     })
     
 }

 openPopup = () => {
     this.setState({popup:true});
 }

 closePopup = () => {
     this.setState({popup:false})
 }

    render(){

        const {robots,searchfield} = this.state;
        
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());

           }) 

           if(filteredRobots.length === 0) {
               return <h1>Loading.......</h1>
           }
           else {

            return(
                <React.Fragment>
                     {this.state.popup ? <Popup closePopup = {this.closePopup}/> : ""}
                <div className="tc">
                    <h1>RoboFans</h1>
                    {/* <button type="button" onClick={this.changeMessage}>SUSCRIBE!</button> */}
                    <button onClick={this.openPopup}>Open Popup</button>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                    <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
                </React.Fragment>
            )

            }
         }
    }

 

export default App;