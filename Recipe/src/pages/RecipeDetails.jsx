import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the recipe ID from the URL
import axios from 'axios';
import profileImg from '../assets/profile.jpg';

export default function RecipeDetails() {
    const { id } = useParams(); // Get the recipe ID from the URL params
    const [recipe, setRecipe] = useState(null);

    const fetchRecipe = async () => {
        try {
            console.log(`Fetching recipe with ID: ${id}`); // Log the recipe ID
            const response = await axios.get(`http://localhost:5000/recipe/${id}`);
            console.log("Recipe data:", response.data);
            setRecipe(response.data);
        } catch (error) {
            console.error("Error fetching recipe:", error);
            alert("An error occurred while fetching the recipe.");
        }
    };

    useEffect(() => {
        fetchRecipe(); // Fetch the recipe when the component mounts or when the ID changes
    }, [id]); // Re-run when the id changes

    if (!recipe) return <div>Loading...</div>; // Show loading state until recipe is fetched

    return (
        <div className="outer-container p-6 bg-gray-50 rounded-lg shadow-md max-w-3xl mx-auto my-8">
            {/* Profile Section */}
            <div className="profile flex items-center space-x-4 mb-6">
                <img
                    src={profileImg}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full border-2 border-green-400"
                />
                <h5 className="text-gray-800 text-lg font-medium">{recipe.createdBy.email}</h5> {/* Assuming createdBy contains the user info */}
            </div>

            {/* Recipe Title */}
            <h3 className="title text-2xl font-bold text-gray-900 mb-4">
                {recipe.title}
            </h3>

            {/* Recipe Image */}
            <img
                src={`http://localhost:5000/public/${recipe.coverImage}`}
                alt="Recipe"
                className="w-full max-w-xs h-auto mx-auto rounded-lg shadow-lg"
            />

            {/* Recipe Details */}
            <div className="recipe-details mt-8 space-y-6">
                {/* Ingredients */}
                <div className="ingredients">
                    <h4 className="text-xl font-semibold text-gray-700">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {recipe?.ingredients?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="instructions">
                    <h4 className="text-xl font-semibold text-gray-700">Instructions</h4>
                    <span className="block text-gray-600 leading-relaxed">
                        {recipe.instructions || "No instructions available"}
                    </span>
                </div>
            </div>
        </div>
    );
}
