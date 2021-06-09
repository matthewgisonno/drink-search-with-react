import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function App() {
  // Response for drink search - set terms or JSON to state variables
  let [searchDrinkTerm, setSearchDrinkTerm] = useState("");
  let [searchDrinkResponse, setSearchDrinkResponse] = useState("");
  let [drinkDetailsResponse, setDrinkDetailsResponse] = useState("");
  // URL used for searching for a drink
  const searchDrinkUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
  const drinkDetailsUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  // Get drink by name from async JSON API call
  const getSearchDrinkResponse = async (term) => {
    const url = searchDrinkUrl + term;
    const response = await fetch(url);
    const jsonData = await response.json();
    setSearchDrinkResponse(jsonData);
  };
  // Get drink by name from async JSON API call
  const getDrinkDetailsResponse = async (id) => {
    const url = drinkDetailsUrl + id;
    const response = await fetch(url);
    const jsonData = await response.json();
    setDrinkDetailsResponse(jsonData);
  };
  // Get the current search term
  function getSearchDrinkTerm() {
    return searchDrinkTerm;
  }
  // Handles the onChange event from the
  // input to set the Search Term state
  // variable
  function handleDrinkInputChange(event) {
    setSearchDrinkTerm(event.target.value);
  }
  // Handles the Search button click event
  function handleDrinkSubmit(event) {
    event.preventDefault();
    const searchTerm = getSearchDrinkTerm();
    setDrinkDetailsResponse("");
    setSearchDrinkResponse("");
    if (searchDrinkTerm) {
      getSearchDrinkResponse(searchTerm);
    } else {
      alert("Please enter a drink to search for.");
    }
  }
  // Handles the drink link click event
  function handleDrinkClickEvent(id) {
    getDrinkDetailsResponse(id);
  }
  // Prints a search response...
  // Called from loop over drink search
  // response
  let PrintSearchResponse = (props) => {
    return (
      <div>
        <a
          href="#Drink"
          data={props.id}
          onClick={() => handleDrinkClickEvent(props.id)}
        >
          {props.drink}
        </a>
      </div>
    );
  };
  // This prints the actual drink details
  // once a search has been execute and the
  // user clicks on a drink
  let PrintDrinkResponse = (props) => {
    console.log(props.img);
    return (
      <div className="w-75 p-3 text-start">
        <img src={props.img} alt="" height="100" className="float-start" />

        <div className="float-start text-start ps-3">
          <strong>{props.name}</strong>

          <div className="pt-2 pb-2 w-75">
            <strong>Directions: </strong>
            {props.instructions}
          </div>

          <div className="pt-2 pb-2">
            <strong>Glass:</strong> {props.glass}
          </div>

          <strong>Ingredients:</strong>
          {Object.keys(props.ing).map((key) =>
            props.ing[key] ? (
              <div>
                {props.ing[key]} {props.msr[key]}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Drinks are on React!</h1>
      <h5>Search for a drink by name</h5>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Drink Name
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          onChange={handleDrinkInputChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleDrinkSubmit}
      >
        Search
      </button>
      {!drinkDetailsResponse ? (
        <div id="searchResponse">
          {!searchDrinkResponse ? (
            ""
          ) : (
            <div>
              Search Response:
              {Object.keys(searchDrinkResponse.drinks).map((key) => (
                <PrintSearchResponse
                  id={searchDrinkResponse.drinks[key].idDrink}
                  drink={searchDrinkResponse.drinks[key].strDrink}
                  key={key}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <PrintDrinkResponse
          name={drinkDetailsResponse.drinks[0].strDrink}
          img={drinkDetailsResponse.drinks[0].strDrinkThumb}
          glass={drinkDetailsResponse.drinks[0].strGlass}
          instructions={drinkDetailsResponse.drinks[0].strInstructions}
          ing={[
            drinkDetailsResponse.drinks[0].strIngredient1,
            drinkDetailsResponse.drinks[0].strIngredient2,
            drinkDetailsResponse.drinks[0].strIngredient3,
            drinkDetailsResponse.drinks[0].strIngredient4,
            drinkDetailsResponse.drinks[0].strIngredient5,
            drinkDetailsResponse.drinks[0].strIngredient6,
            drinkDetailsResponse.drinks[0].strIngredient7,
            drinkDetailsResponse.drinks[0].strIngredient8,
            drinkDetailsResponse.drinks[0].strIngredient9,
            drinkDetailsResponse.drinks[0].strIngredient10,
            drinkDetailsResponse.drinks[0].strIngredient11,
            drinkDetailsResponse.drinks[0].strIngredient12,
            drinkDetailsResponse.drinks[0].strIngredient13,
            drinkDetailsResponse.drinks[0].strIngredient14,
            drinkDetailsResponse.drinks[0].strIngredient15
          ]}
          msr={[
            drinkDetailsResponse.drinks[0].strMeasure1,
            drinkDetailsResponse.drinks[0].strMeasure2,
            drinkDetailsResponse.drinks[0].strMeasure3,
            drinkDetailsResponse.drinks[0].strMeasure4,
            drinkDetailsResponse.drinks[0].strMeasure5,
            drinkDetailsResponse.drinks[0].strMeasure6,
            drinkDetailsResponse.drinks[0].strMeasure7,
            drinkDetailsResponse.drinks[0].strMeasure8,
            drinkDetailsResponse.drinks[0].strMeasure9,
            drinkDetailsResponse.drinks[0].strMeasure10,
            drinkDetailsResponse.drinks[0].strMeasure11,
            drinkDetailsResponse.drinks[0].strMeasur12,
            drinkDetailsResponse.drinks[0].strMeasure13,
            drinkDetailsResponse.drinks[0].strMeasure14,
            drinkDetailsResponse.drinks[0].strMeasure15
          ]}
        />
      )}
    </div>
  );
}
