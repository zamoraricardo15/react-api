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

    retrieveCocktails(event){

        event.preventDefault();
        let searchTerm = event.target.cocktailName.value;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
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
                <form onSubmit={(event) => this.retrieveCocktails(event)}>
                    <label htmlFor="cocktailName">Type your favorite cocktail:</label>
                    <input type="text" id="cocktailName" name="cocktailName" />
                    <button type="submit"> Do the fetch call </button>
                </form>
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
            </div>

        );
    }

}

export default App;
