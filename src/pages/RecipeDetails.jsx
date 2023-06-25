import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import pancakeImage from "/images/pancake.jpg";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";

function RecipeDetails() {
  const { id } = useParams();

  // Fetch the recipe details using the ID from an API or a data source
  // For this example, we'll use a dummy recipe object
  const recipe = {
    id: 1,
    title: "Pancake",
    description: "Delicious pancake recipe with sweet toppings.",
    ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter", "Baking Powder"],
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: pancakeImage,
    rating: 4.5,
  };

  // Helper function to render star rating with star icons
  function renderStarRating(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key={fullStars} />);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<BsStar key={fullStars + (hasHalfStar ? 1 : 0) + i} />);
    }

    return stars;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="mt-4">{recipe.title}</h1>
        <div className="row">
          <div className="col-md-6">
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
          <div className="col-md-6 d-flex flex-column align-items-start">
            <div
              className="img-container"
              style={{ maxWidth: "100%", height: "auto" }}
            >
              <img
                src={recipe.image}
                className="img-fluid"
                alt={recipe.title}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 w-100">
              <div>{renderStarRating(recipe.rating)}</div>
              <button className="btn btn-link text-muted">
                <BsBookmark size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
