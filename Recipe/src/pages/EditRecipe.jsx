import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const{id}=useParams()

    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response=>{
                let res=response.data
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time
                })
            })
        }
        getData()
    },[])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`http://localhost:5000/recipe/${id}`, recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => navigate("/myRecipe"))
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
                  value={recipeData.title}
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
                  value={recipeData.time}
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
                  value={recipeData.ingredients}
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
                  value={recipeData.instructions}
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
                className="w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
              >
                Edit Recipe
              </button>
            </form>
          </div>
        </>
      );
    }      