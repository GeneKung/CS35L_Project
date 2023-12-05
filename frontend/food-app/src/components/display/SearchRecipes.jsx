import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import * as emoji from 'node-emoji';
import './SearchRecipes.css';
import { searchSharedRecipes_List } from "../../database/recipes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

export default function SearchRecipes({ inputData }) {
  const [searchWords, setSearchWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [searchResults, setSearchResults] = useState([-1]);
  const [showDisplayCard, setShowDisplayCard] = useState(-1);

  const handleAddWord = (e) => {
    e.preventDefault();
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

  function generateTitleEmojis(recipeTitle) {
    let words = recipeTitle.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (emoji.has(words[i].toLowerCase())) {
        recipeTitle += emoji.get(words[i].toLowerCase());
      }
      if (emoji.has(words[i].toLowerCase().slice(0, -1))) {
        recipeTitle += emoji.get(words[i].toLowerCase().slice(0, -1));
      }
    }
    return recipeTitle;
  }

  return (
    <body>
      <header id="search-header" className="search-header">
        <h1 style={{ fontSize: "30px", textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>Search Recipes</h1>
        <form id="search-input-bar" onSubmit={handleAddWord}>
          <input
            id="search-input"
            type="text"
            placeholder="Type a tag..."
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
          <button id="search-add-button" type="submit">Add</button>
          
        </form>
      </header>
      <div id="search-words-container">
        <h3 style={{paddingLeft:'0px',paddingRight:'0px'}}>Recipe tags:</h3>
        {searchWords.map((word, index) => (
          <button className="search-word" onClick={() => handleRemoveWord(index)}>
            {word}
          </button>
        ))}
        
      </div>
      <button style={{marginTop: '0px', marginBottom:'0px', marginLeft:'10px'}}onClick={handleSearch}>Search</button>
      <div id="search-results-container" className="search-results-container">
        {searchResults.length === 0 ? (
          <h1>No Recipes Found</h1>
        ) : null}

        {!searchResults.includes(-1) ? (
          <>
          {searchResults?.map((recipe, index) => (
            <>
            <div 
              id="search-result"
              className="search-result" 
              key={index}
              onClick={() => setShowDisplayCard(index)}
            >
              <ReactMarkdown 
                children={generateTitleEmojis(recipe.recipe.split("\n")[0])} 
              />
            </div>

            {showDisplayCard === index && (
              <div className="popup-card">
                <div className="popup-card-inner">
                  <div className="popup-content">
                      <ReactMarkdown children={recipe.recipe} />
                    </div>
                    <button
                      onClick={() => setShowDisplayCard(-1)}  
                      className="close-icon"
                      data-tooltip="Close"
                    >
                      <FontAwesomeIcon icon={faTimes}/>
                    </button>
                    <button
                      className="tooltip-btn"
                      data-tooltip="Save Recipe"
                    >
                      <FontAwesomeIcon icon={faSave}/>
                    </button>
                  
                </div>
              </div>
            )}
            </>
          ))} 
          </>
        ) : null}
        
      </div>
    </body>
  );
}
