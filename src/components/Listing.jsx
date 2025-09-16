import { Link } from "react-router-dom";
import { ReactComponent as DeleletIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/badgeIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

const Listing = ({ listingData, id, onDelete }) => {
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listingData.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listingData.imageUrls[0]}
          alt={listingData.name}
          className="categoryListingImg"
        />

        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listingData.location}</p>
          <p className="categoryListingName">{listingData.name}</p>
          <p className="categoryListingPrice">
            $
            {listingData.offer
              ? listingData.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listingData.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listingData.type === "rent" && " / Month"}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="BED" />
            <p className="categoryListingInfoText">
              {listingData.bedrooms && listingData.bedrooms > 1
                ? `${listingData.bedrooms} Bedrooms`
                : "One Bedroom"}
            </p>
            <img src={bathtubIcon} alt="BATH" />
            <p className="categoryListingInfoText">
              {listingData.bathrooms && listingData.bathrooms > 1
                ? `${listingData.bathrooms} Bathrooms`
                : "One Bathroom"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleletIcon
          className="removeIcon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(id, listingData.name)}
        />
      )}
    </li>
  );
};

export default Listing;
