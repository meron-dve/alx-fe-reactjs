import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
  import HomePage from "./components/HomePage";
  import { Routes, Route } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail';


function App() {



  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">
        Tailwind is Working 🚀
        
      </h1>
       <HomePage />;
     
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    

    </div>
  );
}


export default App;
