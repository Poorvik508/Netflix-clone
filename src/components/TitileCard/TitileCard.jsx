import React, { useEffect, useRef, useState } from "react";
import "./TitileCard.css";

const TitileCard = ({ title, category }) => {
  const [apiData, setapiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTI0YzdmNGJmNjcwMDMyYzRjN2NjNmFkOGJlNTQ4MSIsIm5iZiI6MTc1MTM0ODE2NC41MTMsInN1YiI6IjY4NjM3M2M0OTI3ODViNzUxNjhjMjI4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cK8ukWm_avXa_dm8QYB3efmomfaGFQTSO1FoYl8DIS4",
    },
  };

  const handlewheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setapiData(res.results)) // ✅ FIXED
      .catch((err) => console.error(err));

    if (cardsRef.current) {
      cardsRef.current.addEventListener("wheel", handlewheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener("wheel", handlewheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {(apiData || []).map((card, index) => (
          <div className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt=""
            />
            {/* <p>{card.original_title}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitileCard;
