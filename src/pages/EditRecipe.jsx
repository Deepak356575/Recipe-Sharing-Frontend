import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        time: '',
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`https://recipe-sharing-iw23.onrender.com/recipe/${id}`);
                let res = response.data;
                setRecipeData({
                    title: res.title,
                    ingredients: res.ingredients.join(', '),
                    instructions: res.instructions,
                    time: res.time,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recipe data", error);
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    const onHandleChange = (e) => {
        let val = e.target.name === "ingredients"
            ? e.target.value
            : e.target.name === "file"
                ? e.target.files[0]
                : e.target.value;

        setRecipeData((prev) => ({ ...prev, [e.target.name]: val }));
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(recipeData);

        const formData = new FormData();
        Object.keys(recipeData).forEach((key) => {
            formData.append(key, recipeData[key]);
        });

        try {
            await axios.put(`https://recipe-sharing-iw23.onrender.com/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                },
            });
            navigate("/myRecipe");
        } catch (error) {
            console.error("Error updating recipe", error);
        }
    };

    if (loading) {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-violet-700 text-2xl font-bold text-center mb-6">Edit Recipe</h2>
            <form className="space-y-4" onSubmit={onHandleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" onChange={onHandleChange} value={recipeData.title} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input type="text" name="time" onChange={onHandleChange} value={recipeData.time} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
                    <textarea name="ingredients" rows="3" onChange={onHandleChange} value={recipeData.ingredients} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Instructions</label>
                    <textarea name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Recipe Image (Upload a new one if needed)</label>
                    <input type="file" name="file" onChange={onHandleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">
                    Update Recipe
                </button>
            </form>
        </div>
    );
}
