import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listOfCocktails : {
                drinks : []
            }
        }
    }

    retrieveCocktails(){
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
            .then(response => {
                if ( response.ok ){
                    return response.json();
                }
                else{
                    throw new Error("Something went wrong!");
                }
            })
            .then(responseJSON => {
                this.setState({
                    listOfCocktails : {drinks : responseJSON.drinks}
                });
            })
            .catch( err => {
                console.log(err);
            });
    }
    /*
    componentDidMount(){
        fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
            .then(response => {
                if ( response.ok ){
                    return response.json();
                }
                else{
                    throw new Error("Something went wrong!");
                }
            })
            .then(responseJSON => {
                this.setState({
                    listOfCocktails : {drinks : responseJSON.drinks}
                });
            })
            .catch( err => {
                console.log(err);
            });
    } */

    render(){
        return (
            <div className="App">
                <div>
                {
                    this.state.listOfCocktails.drinks.map((cocktail,index) => {
                        return (
                            <div key={index}>
                                <h3> {cocktail.strDrink} </h3>
                                <img src={cocktail.strDrinkThumb} />
                            </div>
                        )
                    })
                }
                </div>
                <button onClick={() => this.retrieveCocktails()}> Do the fetch call </button>
            </div>

        );
    }

}

export default App;
