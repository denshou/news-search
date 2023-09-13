import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { styled } from "styled-components";

const Like = () => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const removeButtonHandler = async (id) => {
    console.log(id);
    await fetch(
      `https://react-practice-fdff6-default-rtdb.asia-southeast1.firebasedatabase.app/like.json/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

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
      <ScrollBox>
        {likes.map((article, index) => (
          <ArticleBox key={Math.random()}>
            <LikeBtn
              key={index}
              className="like-btn minus"
              onClick={() => removeButtonHandler(article.id)}
            ></LikeBtn>
            <Article
              id={index}
              onClick={(event) => {
                window.open(article.url);
              }}
            >
              <ImgDiv>
                <Img src={article.urlToImage} alt="img" />
              </ImgDiv>
              <Text>
                <h2 id={index}>{article.title}</h2>
                <p id={index}>{article.description}</p>
              </Text>
            </Article>
          </ArticleBox>
        ))}
      </ScrollBox>
    </>
  );
};

export default Like;

const ScrollBox = styled.div`
  margin: 5rem 4rem 0 4rem;
  border: 1px solid black;
  height: 61rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const ArticleBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;
const LikeBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M200-440v-80h560v80H200Z'/%3E%3C/svg%3E")
    no-repeat;
  &:hover {
    opacity: 0.6;
  }
`;
const Article = styled.div`
  margin: 2rem 2rem 2rem 1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
`;
const ImgDiv = styled.div`
  width: 10rem;
  height: 10rem;
`;
const Img = styled.img`
width: 10rem;
height: 10rem;
object-fit: cover;
`
const Text = styled.div`
  margin-left: 1rem;
`;
