import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import * as emoji from 'node-emoji';
import './SearchRecipes.css';
import { searchSharedRecipes_List } from "../../database/recipes";

export default function SearchRecipes({ inputData }) {
  const [searchWords, setSearchWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleAddWord = () => {
    if (newWord.trim() !== '') {
      setSearchWords([...searchWords, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (index) => {
    const updatedWords = [...searchWords];
    updatedWords.splice(index, 1);
    setSearchWords(updatedWords);
  };

  const handleSearch = async () => {
    console.log('Searching for words:', searchWords);
    try {
      const recipesData = await searchSharedRecipes_List(searchWords);
      console.log('Search result:', recipesData);
      setSearchResults(recipesData);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  }

  return (
    <body>
      <header id="search-header" className="search-header">
        <h1 style={{ fontSize: "30px", textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>Search Recipes</h1>
        <div id="search-input-bar" className="search-input-bar">
          <input
            id="search-input"
            type="text"
            placeholder="Type a word..."
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
          <button id="search-add-button" onClick={handleAddWord}>Add</button>
          <button id="search-button" onClick={handleSearch}>Search</button>
        </div>
      </header>

      <div id="search-words-container" className="search-words-container">
        {searchWords.map((word, index) => (
          <div id={`search-word-${index}`} className="search-word" key={index} onClick={() => handleRemoveWord(index)}>
            {word}
          </div>
        ))}
      </div>

      <div id="search-results-container" className="search-results-container">
        {searchResults.map((recipe, index) => (
          <div id="search-result" className="search-result" key={index}>
            <ReactMarkdown children={recipe.recipe} />
          </div>
        ))}
      </div>
    </body>
  );
}
