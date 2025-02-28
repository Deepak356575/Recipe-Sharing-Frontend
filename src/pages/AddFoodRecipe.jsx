import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
        file: null
    });

    const navigate = useNavigate();

    const onHandleChange = (e) => {
        let val = e.target.name === 'ingredients'
            ? e.target.value.split(',')
            : e.target.name === 'file'
                ? e.target.files[0]
                : e.target.value;

        setRecipeData((prev) => ({ ...prev, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipeData);

        const formData = new FormData();
        formData.append("title", recipeData.title);
        formData.append("time", recipeData.time);
        formData.append("instructions", recipeData.instructions);
        formData.append("ingredients", recipeData.ingredients.join(", ")); // Convert array to comma-separated string
        formData.append("file", recipeData.file);

        try {
            await axios.post(`${API_URL}/recipe`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            navigate('/');
        } catch (error) {
            console.error("Error adding recipe", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-violet-700 text-2xl font-bold text-center mb-6">Add a New Recipe</h2>
            <form className="space-y-4" onSubmit={onHandleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" onChange={onHandleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input type="text" name="time" onChange={onHandleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
                    <textarea name="ingredients" rows="3" onChange={onHandleChange} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Instructions</label>
                    <textarea name="instructions" rows="5" onChange={onHandleChange} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Recipe Image</label>
                    <input type="file" name="file" onChange={onHandleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">
                    Add Recipe
                </button>
            </form>
        </div>
    );
}
