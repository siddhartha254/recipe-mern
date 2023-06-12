import React, {useState, useEffect} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";

import {useCookies} from "react-cookie";


const Home = () =>{

    const [recipes, setRecipes] = useState([]);

    const [savedRecipes, setSavedRecipes] = useState([]);
    
    const [cookies,_] = useCookies(["access_token"])

    
    useEffect(()=> {

        const fetchRecipe = async () =>{
            try{
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
                //console.log(response.data);
            }catch(err){
                console.error(err);
            }
        }

        const fetchSavedRecipe = async () =>{
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                //console.log(response.data);
            }catch(err){
                console.error(err);
            }
        }

        fetchRecipe();

        if(cookies.access_token) fetchSavedRecipe();
    }, []);

    const userID = useGetUserID();

    const saveRecipe = async(recipeID) =>{
        try{
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID}, {headers:{Authorization: cookies.access_token}});
            //console.log(response);
            setSavedRecipes(response.data.savedRecipes);
        }catch(err){
            console.error(err);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return(
        <div className="header">
            <h1>Recipes</h1>

            <ul>
                {recipes.map((recipe)=>(
                    <li key={recipe._id}>

                        <div>
                            <h2>{recipe.name}</h2>
                            <button 
                                onClick={()=> saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                                >{isRecipeSaved(recipe._id)?"Saved":"Save"}
                            </button>
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                        </div>

                        <div className="ingredients">
                            <p>Ingredients: </p>
                            {recipe.ingredients.map((ingredient, index) => (
                                <p class="inline" key={index}> {ingredient},</p>
                            ))}
                        </div>

                        <div className="instructions">
                            <p>Instructions: {recipe.instructions}</p>
                        </div>

                        <img src={recipe.imageUrl} alt={recipe.name}/>

                        

                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Home;