import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Offers } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as Explore } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonProfile } from "../assets/svg/personOutlineIcon.svg";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationMatchPath = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/");
            }}
          >
            <Explore
              fill={locationMatchPath("/") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                locationMatchPath("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>

          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/offers");
            }}
          >
            <Offers
              fill={locationMatchPath("/offers") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                locationMatchPath("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>

          <li
            className="navbarListItem"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <PersonProfile
              fill={locationMatchPath("/profile") ? "#2c2c2c" : "#8f8f8f"}
              width="36px"
              height="36px"
            />
            <p
              className={
                locationMatchPath("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Nav;
