import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const API_URL = "https://recipe-sharing-iw23.onrender.com/api/recipes/";

export default function RecipeItems() {
    const recipes = useLoaderData();
    const [allRecipes, setAllRecipes] = useState([]);
    const [favItems, setFavItems] = useState(JSON.parse(localStorage.getItem('fav')) || []);
    const navigate = useNavigate();
    const path = window.location.pathname === '/myRecipe';

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    const onDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });

            setAllRecipes((prev) => prev.filter((recipe) => recipe._id !== id));

            const updatedFavItems = favItems.filter((recipe) => recipe._id !== id);
            localStorage.setItem('fav', JSON.stringify(updatedFavItems));
            setFavItems(updatedFavItems);
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    const favRecipe = (item) => {
        let updatedFavItems;
        if (favItems.some((recipe) => recipe._id === item._id)) {
            updatedFavItems = favItems.filter((recipe) => recipe._id !== item._id);
        } else {
            updatedFavItems = [...favItems, item];
        }

        localStorage.setItem('fav', JSON.stringify(updatedFavItems));
        setFavItems(updatedFavItems);
    };

    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-6 p-6">
            {allRecipes?.map((item) => (
                <div
                    key={item._id}
                    className="bg-white text-violet-700 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
                    onDoubleClick={() => navigate(`/recipe/${item._id}`)}
                >
                    <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-1 text-gray-600">
                                <BsStopwatchFill className="text-violet-700" />
                                <span>{item.time}</span>
                            </div>
                            {!path ? (
                                <FaHeart
                                    onClick={() => favRecipe(item)}
                                    className={`cursor-pointer text-xl transition ${
                                        favItems.some((res) => res._id === item._id)
                                            ? 'text-violet-700'
                                            : 'text-gray-400'
                                    }`}
                                />
                            ) : (
                                <div className="flex gap-4">
                                    <Link to={`/editRecipe/${item._id}`} className="text-violet-500 hover:text-violet-700">
                                        <FaEdit className="text-xl" />
                                    </Link>
                                    <MdDelete
                                        onClick={() => onDelete(item._id)}
                                        className="text-violet-500 text-xl cursor-pointer hover:text-violet-700"
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
