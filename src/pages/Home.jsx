import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/addRecipe")
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
     

            {/* Hero Section */}
            <section className='flex flex-col md:flex-row items-center justify-between p-8 md:h-96 bg-gradient-to-r from-green-200 to-blue-100'>
                {/* Left Section */}
                <div className='w-full md:w-1/2 text-center md:text-left space-y-4'>
                    <h1 className='text-4xl font-bold text-violet-800'>Food Recipe Sharing</h1>
                    <p className='text-lg text-gray-600'>
                        <br />
                        Discover and share your favorite recipes with a vibrant community of food lovers.
                        <br /><br />
                        "One cannot think well, love well, sleep well, if one has not dined well".
                        <br /><br />
                    </p>
                    <button 
                        onClick={addRecipe} 
                        className='mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition duration-300'
                        aria-label="Share your recipe"
                    >
                        Share your recipe
                    </button>
                </div>

                {/* Right Section - Image */}
                <div className='w-full md:w-1/2 flex justify-center overflow-hidden'>
                    <img 
                        src={foodRecipe} 
                        className='sm:h-96 md:h-max w-auto object-cover rounded-lg' 
                        alt="Delicious food representation" 
                    />
                </div>
            </section>

            {/* Modal for Login */}
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm setIsOpen={setIsOpen} />
                </Modal>
            )}

            {/* Recipe Section */}
            <div className='py-12 bg-gray-100'>
                <div className='max-w-6xl mx-auto px-4'>
                    <RecipeItems />
                </div>
            </div>

         
        </>
    )
}
