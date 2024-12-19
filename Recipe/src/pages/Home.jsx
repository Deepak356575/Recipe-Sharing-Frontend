import React, { useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import foodRecipe from '../assets/recipe.jpg';
import RecipeItems from '../components/RecipeItems';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';

export default function Home() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const recipes = useLoaderData(); // Get recipes from loader

    const addRecipe = () => {
        let token = localStorage.getItem('token');
        if (token) navigate('/addrecipe');
        else setIsOpen(true);
    };

    const viewRecipe = (id) => {
        navigate(`/recipe/${id}`); // Navigate to RecipeDetails with ID
    };

    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-gray-50">
                {/* Left Section */}
                <div className="left text-center md:text-left space-y-6">
                    <h1 className="text-4xl font-bold text-gray-800">Food Recipe</h1>
                    <h5 className="text-gray-600 text-lg leading-relaxed">
                        It is a long established fact that a reader will be distracted
                        by the readable content of a page when looking at its layout.
                        The point of using Lorem Ipsum is that it has a more-or-less
                        normal distribution of letters, as opposed to using 'Content
                        here, content here', making it look like readable English.
                    </h5>
                    <button
                        onClick={addRecipe}
                        className="bg-green-500 text-white py-3 px-6 rounded-md font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Share your recipe
                    </button>
                </div>

                {/* Right Section */}
                <div className="right mt-8 md:mt-0">
                    <img
                        src={foodRecipe}
                        alt="Food Recipe"
                        className="w-80 h-72 object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            {/* Background Section */}
            <div className="bg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    className="w-full h-auto"
                >
                    <path
                        fill="#d4f6e8"
                        fillOpacity="1"
                        d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                    ></path>
                </svg>
            </div>

            {/* Modal Section */}
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm setIsOpen={() => setIsOpen(false)} />
                </Modal>
            )}

            {/* Recipe Items Section */}
            <div className="recipe px-6 md:px-16 py-12">
                <RecipeItems recipes={recipes} onRecipeClick={viewRecipe} />
            </div>
        </>
    );
}
