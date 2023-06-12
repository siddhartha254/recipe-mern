import React, {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";

const Saved = () =>{

    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();
    
    useEffect(()=> {

        const fetchSavedRecipe = async () =>{
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                //console.log(response.data);
            }catch(err){
                console.error(err);
            }
        }
        fetchSavedRecipe();
    }, []);


    return(
        <div className="header">
            <h1>Your Saved Recipes</h1>

            <ul>
                {savedRecipes.map((recipe)=>(
                    <li key={recipe._id}>
                        
                        <div className="recipe-top">
                            <div className="recipe-header">
                                <h2>{recipe.name}</h2>
                            </div>
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                        </div>

                        <div className="ingredients">
                            <div className="ingredients-name"><p>Ingredients: </p></div>
                            {recipe.ingredients.map((ingredient, index) => (
                                <p class="inline" key={index}> {ingredient},</p>
                            ))}
                        </div>

                        <div className="instructions">
                            <div className="instructions-name"><p>Instructions:</p></div>
                            <div className="text"><p> {recipe.instructions}</p></div>
                        </div>

                        <div className="image-div">
                            <img src={recipe.imageUrl} alt={recipe.name}/>
                        </div>
                        
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Saved;