import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import axios from 'axios';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Get all recipes
const getAllRecipes = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/recipes`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return [];
  }
};

// ✅ Get user's recipes
const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];

  let allRecipes = await getAllRecipes();
  return allRecipes.filter((item) => item.createdBy === user._id);
};

// ✅ Get favorite recipes from local storage
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || [];
};

// ✅ Get a single recipe by ID
const getRecipe = async ({ params }) => {
  try {
    // Fetch recipe details
    const recipeRes = await axios.get(`${API_URL}/api/recipes/${params.id}`);
    let recipe = recipeRes.data;

    // Fetch user details who created the recipe
    const userRes = await axios.get(`${API_URL}/api/users/${recipe.createdBy}`);
    return { ...recipe, email: userRes.data.email };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};

// ✅ Define Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    children: [
      { path: '/', element: <Home />, loader: getAllRecipes },
      { path: '/myRecipe', element: <Home />, loader: getMyRecipes },
      { path: '/favRecipe', element: <Home />, loader: getFavRecipes },
      { path: '/addRecipe', element: <AddFoodRecipe /> },
      { path: '/editRecipe/:id', element: <EditRecipe /> },
      { path: '/recipe/:id', element: <RecipeDetails />, loader: getRecipe },
    ],
  },
]);

// ✅ Main App Component
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
