import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import AuthenticatedPage from "../hocs/AuthenticatedPage";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [isBookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchRecipe(id);
    fetchComments(id);
  }, [id]);

  const fetchRecipe = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const fetchComments = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleBookmarkToggle = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBookmarked: !isBookmarked }),
      });

      if (!response.ok) {
        throw new Error("Bookmark request failed");
      }

      setBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleStarClick = async (selectedRating) => {
    try {
      const response = await fetch(`/api/recipes/${id}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: selectedRating }),
      });

      if (!response.ok) {
        throw new Error("Star rating request failed");
      }

      setRating(selectedRating);
    } catch (error) {
      console.error("Error setting star rating:", error);
    }
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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      try {
        const response = await fetch(`/api/recipes/${id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        });
        const data = await response.json();
        console.log(data);
        setComment("");
        fetchComments(id);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  if (!recipe) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
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
                {comments.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <p className="username">{comment.user}</p>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthenticatedPage(RecipeDetails);
