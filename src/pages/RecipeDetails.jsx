import React from "react";
import { useParams } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";
import pancakeImage from "/images/pancake.jpg";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

function RecipeDetails() {
  const { id } = useParams();

  const [isBookmarked, setBookmarked] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleBookmarkToggle = () => {
    setBookmarked(!isBookmarked);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  function renderStarRating(selectedRating, hoverRating) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let starIcon;

      if (i <= selectedRating || (i <= hoverRating && selectedRating === 0)) {
        starIcon = (
          <BsStarFill
            key={i}
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => handleStarHover(i)}
            onMouseLeave={() => handleStarHover(0)}
          />
        );
      } else if (
        i === Math.ceil(selectedRating) &&
        !Number.isInteger(selectedRating)
      ) {
        starIcon = (
          <BsStarHalf
            key={i}
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => handleStarHover(i)}
            onMouseLeave={() => handleStarHover(0)}
          />
        );
      } else {
        starIcon = (
          <BsStar
            key={i}
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => handleStarHover(i)}
            onMouseLeave={() => handleStarHover(0)}
          />
        );
      }

      stars.push(starIcon);
    }

    return stars;
  }

  const [comment, setComment] = React.useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      setComment("");
      console.log(comment);
    } else {
    }
  };

  const recipe = {
    id: 1,
    title: "Pancake",
    description: "Delicious pancake recipe with sweet toppings.",
    ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter", "Baking Powder"],
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    image: pancakeImage,
    rating: 4.5,
  };

  return (
    <>
      <NavbarUser />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <h1>{recipe.title}</h1>
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
          <div className="col-md-6 d-flex flex-column align-items-start align-self-start">
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
              <div>{renderStarRating(rating, hoverRating)}</div>
              <button
                className="btn btn-link text-muted"
                onClick={handleBookmarkToggle}
              >
                {isBookmarked ? (
                  <BsBookmarkFill size={20} style={{ fill: "black" }} />
                ) : (
                  <BsBookmark
                    size={20}
                    style={{ fill: "gray" }}
                    onMouseEnter={(e) => (e.target.style.fill = "black")}
                    onMouseLeave={(e) => (e.target.style.fill = "")}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        <hr />
        <div className="row mt-5 mb-5">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "orange", borderColor: "orange" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "darkorange")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "orange")
                  }
                >
                  Send Comment
                </button>
              </div>
              <div>
                <div className="comment">
                  <p className="username">Example User 1:</p>
                  <p className="comment-text">This recipe is amazing!</p>
                </div>
                <div className="comment">
                  <p className="username">Example User 2:</p>
                  <p className="comment-text">I love how easy it is to make.</p>
                </div>
                <div className="comment">
                  <p className="username">Example User 3:</p>
                  <p className="comment-text">The flavors are incredible!</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
