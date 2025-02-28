import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData();
    const [allRecipes, setAllRecipes] = useState();
    let path = window.location.pathname === '/myRecipe';
    let favItems = JSON.parse(localStorage.getItem('fav')) ?? [];
    const [isFavRecipe, setIsFavRecipe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAllRecipes(recipes);
    }, [recipes]);

    const onDelete = async (id) => {
        await axios.delete(`https://recipe-sharing-iw23.onrender.com/recipe/${id}`).then((res) => console.log(res));
        setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
        let filterItem = favItems.filter((recipe) => recipe._id !== id);
        localStorage.setItem('fav', JSON.stringify(filterItem));
    };

    const favRecipe = (item) => {
        let filterItem = favItems.filter((recipe) => recipe._id !== item._id);
        favItems = favItems.some((recipe) => recipe._id === item._id) ? filterItem : [...favItems, item];
        localStorage.setItem('fav', JSON.stringify(favItems));
        setIsFavRecipe((pre) => !pre);
    };

    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-6 p-6 ">
            {allRecipes?.map((item, index) => (
                <div
                    key={index}
                    className="bg-white text-violet-700 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
                    onDoubleClick={() => navigate(`/recipe/${item._id}`)}
                >
                    <img
                        src={`https://recipe-sharing-iw23.onrender.com/images/${item.coverImage}`}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4 ">
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
                                        favItems.some((res) => res._id === item._id) ? 'text-violet-00' : 'text-gray-400'
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
