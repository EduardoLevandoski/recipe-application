import React, { useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import NavbarUser from "../components/NavbarUser";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      name: "Recipe 1",
      description: "Description 1",
      isBookmarked: true,
    },
    {
      id: 2,
      name: "Recipe 2",
      description: "Description 2",
      isBookmarked: true,
    },
    {
      id: 3,
      name: "Recipe 3",
      description: "Description 3",
      isBookmarked: true,
    },
  ]);

  const handleBookmarkToggle = (bookmarkId) => {
    const updatedBookmarks = bookmarks.map((bookmark) => {
      if (bookmark.id === bookmarkId) {
        return {
          ...bookmark,
          isBookmarked: !bookmark.isBookmarked,
        };
      }
      return bookmark;
    });
    setBookmarks(updatedBookmarks);
  };

  return (
    <>
      <NavbarUser />
      <div className="container">
        <h1 className="mt-4">Bookmarks</h1>
        <div className="row mt-4">
          <div className="col-md-12">
            <ul className="list-group">
              {bookmarks.map((bookmark) => (
                <li
                  className="list-group-item d-flex align-items-start justify-content-between"
                  key={bookmark.id}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <Link
                      to={`/recipes/${bookmark.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h5>{bookmark.name}</h5>
                      <p>{bookmark.description}</p>
                    </Link>
                  </div>
                  {bookmark.isBookmarked ? (
                    <BsBookmarkFill
                      size={20}
                      color="black"
                      onClick={() => handleBookmarkToggle(bookmark.id)}
                    />
                  ) : (
                    <BsBookmark
                      size={20}
                      color="black"
                      onClick={() => handleBookmarkToggle(bookmark.id)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookmarks;
