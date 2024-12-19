import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData(); // Get recipes data from the loader
    const [allRecipes, setAllRecipes] = useState([]);
    const navigate = useNavigate();
    const isMyRecipePage = window.location.pathname === "/myRecipe";
    let favItems = JSON.parse(localStorage.getItem("fav")) || [];
    const [isFavRecipe, setIsFavRecipe] = useState(false);

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    // Delete Recipe
    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/recipe/${id}`)
            .then((res) => console.log(res));
        setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
        let updatedFavItems = favItems.filter((recipe) => recipe._id !== id);
        localStorage.setItem("fav", JSON.stringify(updatedFavItems));
    };

    // Favorite Recipe
    const favRecipe = (item) => {
        let updatedFavItems = favItems.filter((recipe) => recipe._id !== item._id);
        favItems = favItems.filter((recipe) => recipe._id === item._id).length === 0 
            ? [...favItems, item] 
            : updatedFavItems;
        localStorage.setItem("fav", JSON.stringify(favItems));
        setIsFavRecipe((prev) => !prev);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {allRecipes.map((item) => (
                <div
                    key={item._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                    onDoubleClick={() => {
                        const recipeId = item._id; // Ensure item._id is being passed correctly
                        navigate(`/recipe/${recipeId}`);
                      }}
                      // Navigate to details page
                >
                    {/* Recipe Image */}
                    <img
                        src={`http://localhost:5000/recipe/images/${item.coverImage}`}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                    />

                    {/* Card Body */}
                    <div className="p-4">
                        {/* Recipe Title */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {item.title}
                        </h3>

                        {/* Icons Section */}
                        <div className="flex items-center justify-between text-gray-600">
                            {/* Time Indicator */}
                            <div className="flex items-center space-x-2">
                                <BsStopwatchFill className="text-green-500" />
                                <span>{item.time}</span>
                            </div>

                            {/* Favorite or Edit/Delete */}
                            {!isMyRecipePage ? (
                                <FaHeart
                                    onClick={() => favRecipe(item)}
                                    className={`cursor-pointer ${
                                        favItems.some((recipe) => recipe._id === item._id)
                                            ? "text-red-500"
                                            : "text-gray-400"
                                    }`}
                                />
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        to={`/editRecipe/${item._id}`}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <MdDelete
                                        onClick={() => onDelete(item._id)}
                                        className="text-red-500 hover:text-red-600 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
