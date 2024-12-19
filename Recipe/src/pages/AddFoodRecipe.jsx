import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.post("http://localhost:5000/recipe/create", recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => navigate("/"))
    }
    return (
        <>
          <div className="container mx-auto max-w-4xl p-6 bg-gray-50 shadow-lg rounded-lg">
            <form
              className="space-y-6"
              onSubmit={onHandleSubmit}
            >
              <div className="form-control space-y-2">
                <label className="block text-gray-700 font-medium">Title</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="title"
                  onChange={onHandleChange}
                  placeholder="Enter the recipe title"
                />
              </div>
      
              <div className="form-control space-y-2">
                <label className="block text-gray-700 font-medium">Time</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="time"
                  onChange={onHandleChange}
                  placeholder="Enter preparation time"
                />
              </div>
      
              <div className="form-control space-y-2">
                <label className="block text-gray-700 font-medium">Ingredients</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="ingredients"
                  rows="5"
                  onChange={onHandleChange}
                  placeholder="List ingredients"
                ></textarea>
              </div>
      
              <div className="form-control space-y-2">
                <label className="block text-gray-700 font-medium">Instructions</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="instructions"
                  rows="5"
                  onChange={onHandleChange}
                  placeholder="Add cooking instructions"
                ></textarea>
              </div>
      
              <div className="form-control space-y-2">
                <label className="block text-gray-700 font-medium">Recipe Image</label>
                <input
                  type="file"
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  name="file"
                  onChange={onHandleChange}
                />
              </div>
      
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
              >
                Add Recipe
              </button>
            </form>
          </div>
        </>
      );
    }