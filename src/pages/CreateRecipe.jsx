import React, { useState } from "react";
import NavbarUser from "../components/NavbarUser";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIngredientsChange = (e, index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = e.target.value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      image,
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error("Recipe creation failed");
      }

      setTitle("");
      setDescription("");
      setIngredients([]);
      setInstructions("");
      setImage("");
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="container mt-4">
        <h1>Create Recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
            ></textarea>
          </div>
          <div>
            <label className="form-label">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={ingredient}
                  onChange={(e) => handleIngredientsChange(e, index)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            style={{ color: "black", borderColor: "black" }}
            onClick={handleAddIngredient}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "orange")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
          >
            Add Ingredient
          </button>

          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instructions
            </label>
            <textarea
              className="form-control"
              id="instructions"
              value={instructions}
              onChange={handleInstructionsChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "orange", borderColor: "orange" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "darkorange")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "orange")}
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateRecipe;
