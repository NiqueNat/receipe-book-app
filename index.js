const API_KEY = '3f5c0394b45647de8dc1906ba1c71926';
const recipeList = document.getElementById('recipe-list');

//displayRecipes function
function displayRecipes(recipes) {
  recipeList.innerHTML = '';
  recipes.forEach((recipe) => {
    const recipeItem = document.createElement('li');
    recipeItem.classList.add('recipe-item'); 
    
    const recipeImage = document.createElement('img');
    recipeImage.src = recipe.image;
    recipeImage.alt = 'recipe';
    
    const recipeTitle = document.createElement('h2'); 
    recipeTitle.innerText = recipe.title;
    
    const recipeIngredients = document.createElement('p');
    recipeIngredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(', ')}`; // Changed 'orginal' to 'original'
    
    const recipeLink = document.createElement('a'); 
    recipeLink.href = recipe.sourceUrl;
    recipeLink.innerText = 'View Recipe';
    
    recipeItem.appendChild(recipeTitle); 
    recipeItem.appendChild(recipeImage);
    recipeItem.appendChild(recipeIngredients);
    recipeItem.appendChild(recipeLink);
    recipeList.appendChild(recipeItem);
  });
}

//getRecipes function
async function getRecipes() {
  const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
  const data = await response.json();
  return data.recipes;
}

//init function
async function init() {
  try {
    const recipes = await getRecipes();
    displayRecipes(recipes);
  } catch (error) {
    console.error('Error:', error);
  }
}

init();
