import "./SearchRecipes.css";
import React, { useEffect, useState } from 'react';
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

export default function SearchRecipes( {inputData} ) {
  
  return (
    <div className="container">
      <h1>Hi</h1>
    </div>

  );

}
