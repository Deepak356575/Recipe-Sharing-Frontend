import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'

export default function RecipeDetails() {
    const recipe = useLoaderData()

    if (!recipe) {
        return <p className="text-center text-gray-500 mt-6">Loading recipe details...</p>
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            {/* Profile Section */}
            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow">
                <img src={profileImg} className="w-16 h-16 rounded-full" alt="User profile" />
                <h5 className="text-lg font-semibold text-gray-800">
                    {recipe?.email || "Unknown User"}
                </h5>
            </div>

            {/* Recipe Title */}
            <h3 className="text-4xl font-bold text-center text-violet-700 mt-6">{recipe?.title || "No Title Available"}</h3>

            {/* Recipe Image */}
            <div className="flex justify-center mt-6">
                <img 
                    src={recipe?.coverImage ? `https://recipe-sharing-iw23.onrender.com/images/${recipe.coverImage}` : "https://via.placeholder.com/350x300"} 
                    className="rounded-lg shadow-lg w-full md:w-96 object-cover"
                    alt={recipe?.title || "Recipe image"} 
                />
            </div>

            {/* Recipe Details Section */}
            <div className="mt-8 space-y-6">
                {/* Ingredients Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold text-violet-800 border-b pb-2">Ingredients</h4>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        {recipe?.ingredients?.length > 0 ? (
                            recipe.ingredients.map((item, index) => (
                                <li key={index} className="py-1">{item}</li>
                            ))
                        ) : (
                            <li className="text-gray-500">No ingredients available</li>
                        )}
                    </ul>
                </div>

                {/* Instructions Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold text-violet-800 border-b pb-2">Instructions</h4>
                    <p className="mt-2 text-gray-700 leading-relaxed">
                        {recipe?.instructions || "No instructions provided."}
                    </p>
                </div>
            </div>
        </div>
    )
}
