import React, { useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import NavbarUser from "../components/NavbarUser";
import pancakeImage from "/images/pancake.jpg";
import { Link } from "react-router-dom";
import hamburgerImage from "/images/hamburger.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Recipes() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Recipe 1",
      image: pancakeImage,
      rating: 4.5,
      isBookmarked: false,
    },
    {
      id: 2,
      title: "Recipe 2",
      image: hamburgerImage,
      rating: 3.8,
      isBookmarked: false,
    },
  ]);

  const handleBookmarkToggle = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => {
        if (recipe.id === recipeId) {
          return {
            ...recipe,
            isBookmarked: !recipe.isBookmarked,
          };
        }
        return recipe;
      })
    );
  };

  return (
    <div>
      <NavbarUser />
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="me-auto">Recipes</h1>
          <div className="input-group" style={{ width: "300px" }}>
            <input
              id="search-input"
              type="search"
              className="form-control"
              placeholder="Search"
              style={{ width: "200px" }}
            />
            <button
              id="search-button"
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "orange", borderColor: "orange" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "darkorange")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "orange")}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {recipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <Link
                to={`/recipes/${recipe.id}`}
                className="card h-100 d-flex flex-column position-relative text-decoration-none"
              >
                <div className="upper-left-icon"></div>
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <div className="d-flex align-items-center">
                    <div className="me-auto">
                      {renderStarRating(recipe.rating)}
                    </div>
                    <div className="position-absolute top-0 end-0 mt-2 me-2">
                      <button
                        className="btn btn-light btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookmarkToggle(recipe.id);
                        }}
                      >
                        {recipe.isBookmarked ? (
                          <HiBookmark size={20} className="text-gray" />
                        ) : (
                          <HiOutlineBookmark size={20} className="text-gray" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

export default Recipes;
