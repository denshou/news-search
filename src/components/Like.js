import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Like = () => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLike = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-practice-fdff6-default-rtdb.asia-southeast1.firebasedatabase.app/like.json",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      const likeArray = [];
      for (const key in data) {
        const newObj = {
          id: key,
          ...data[key],
        };
        likeArray.push(newObj);
      }
      setLikes(likeArray);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getLike();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="scroll-box">
        {likes.map((article, index) => (
          <div className="article-box" key={Math.random()}>
            <button
              key={index}
              className="like-btn plus"
              onClick={() => plusButtonHandler(article)}
            ></button>
            <div
              className="article"
              id={index}
              onClick={(event) => {
                window.open(article.url);
              }}
            >
              <div className="imgdiv">
                <img src={article.urlToImage} alt="img" />
              </div>
              <div className="text">
                <h2 id={index}>{article.title}</h2>
                <p id={index}>{article.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Like;
