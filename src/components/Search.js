import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../store/loadingSlice";

const Search = () => {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("tesla");
  const [from, setFrom] = useState("2023-09-12");

  // const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const switchLoad = () => {
    dispatch(loadingActions.switchLoading());
  };

  const [url, setUrl] = useState(
    `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
  );

  const fetchData = async () => {
    switchLoad();
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => setArticles([...articles, ...data.articles]));

      switchLoad();
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  useEffect(() => {
    if (inView) {
      setPage((prevState) => prevState + 1);

      setUrl(
        `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
      );
    }
  }, [inView]);

  const inputChange = (event) => {
    setTopic(event.target.value);
  };
  const changeDate = (event) => {
    setFrom(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (topic === "") {
      window.alert("검색어를 입력해주세요.");
      return;
    }

    setArticles([]);
    setPage(1);

    setUrl(
      `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
    );
  };

  const plusButtonHandler = (article) => {
    const postHandler = async () => {
      await fetch(
        "https://react-practice-fdff6-default-rtdb.asia-southeast1.firebasedatabase.app/like.json",
        {
          method: "POST",
          body: JSON.stringify(article),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    };
    postHandler();
  };
  return (
    <>
      {isLoading && <Loading />}
      <SearchPage>
        <form className="search" onSubmit={submitHandler}>
          <input type="text" value={topic || ""} onChange={inputChange} />
          <input
            type="date"
            name="date"
            id="date"
            value={from || ""}
            onChange={changeDate}
          />
          <button type="submit">검색</button>
        </form>

        <ScrollBox>
          {articles.map((article, index) => (
            <ArticleBox key={Math.random()}>
              <LikeBtn
                key={index}
                className="like-btn plus"
                onClick={() => plusButtonHandler(article)}
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
          <div ref={ref}></div>
        </ScrollBox>
      </SearchPage>
    </>
  );
};

export default Search;

const SearchPage = styled.div`
  text-align: center;
  padding: 4rem;
`;
const ScrollBox = styled.div`
  margin: 5rem 0 0 0;
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
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z'/%3E%3C/svg%3E")
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
`;
const Text = styled.div`
  margin-left: 1rem;
`;
