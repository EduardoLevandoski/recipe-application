import React from "react";
import NavbarUser from "../components/NavbarUser";
import { AiFillEdit } from "react-icons/ai";
import userPicture from "/images/user.jpg";

function UserPage() {
  const user = {
    picture: userPicture,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  };

  return (
    <>
      <NavbarUser />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-2 text-center">
            <div
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "200px",
                height: "200px",
                background: `url(${user.picture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div className="mt-3">
            <h2 className="text-center">{user.name}</h2>
            <p className="text-center">{user.email}</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h3>Your Recipes</h3>
            <ul className="list-group mt-4">
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Recipe 1</h5>
                    <p className="recipe-description">
                      Description 1: Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse in semper turpis. Aenean
                      tincidunt, eros eu commodo euismod, urna dolor aliquam
                      mauris.
                    </p>
                  </div>
                  <div>
                    <a href="/edit-recipe">
                      <AiFillEdit
                        size={20}
                        color="gray"
                        onMouseEnter={(e) => (e.target.style.fill = "black")}
                        onMouseLeave={(e) => (e.target.style.fill = "")}
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Recipe 2</h5>
                    <p className="recipe-description">
                      Description 2: Fusce in interdum nulla. Aliquam at
                      volutpat ante. Cras elementum sapien augue, non
                      ullamcorper ipsum interdum a.
                    </p>
                  </div>
                  <div>
                    <a href="/edit-recipe">
                      <AiFillEdit
                        size={20}
                        color="gray"
                        onMouseEnter={(e) => (e.target.style.fill = "black")}
                        onMouseLeave={(e) => (e.target.style.fill = "")}
                      />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
