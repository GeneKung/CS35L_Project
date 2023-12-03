import "./SearchRecipes.css";
import React, { useEffect, useState } from 'react';
import getAllRecipes from "../../database/recipes";
import ReactMarkdown from 'react-markdown';
import * as emoji from 'node-emoji'


function generateTitleEmojis(recipeTitle){
  let words = recipeTitle.split(" ");
  for (let i = 0; i < words.length; i++) {
    if(emoji.has(words[i].toLowerCase())) {
      recipeTitle += emoji.get(words[i].toLowerCase());
    }
    if(emoji.has(words[i].toLowerCase().slice(0,-1))) {
      recipeTitle += emoji.get(words[i].toLowerCase().slice(0,-1));
    }
  }
  return recipeTitle;
}

export default function SearchRecipes() {

  return (
    <body>
      <header className="saved-header">
        <h1 style={{fontSize: "50px", textShadow: "5px 5px 10px rgba(0,0,0,0.5)"}}>Search Recipes</h1>
      </header>
      <div className="saved-search-bar">
        <p style={{fontSize:"15px"}}>Search for Recipes: </p>

        <intput type="text" placeholder="Type a recipe name" style={{width: "50%"}}/>
      </div>
      <div className="container">
        
            
      </div>
    </body>
  );

}

