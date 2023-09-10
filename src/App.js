import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Loading from "./components/Loading";
import { useInView } from "react-intersection-observer";

function App() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("tesla");
  const [from, setFrom] = useState("2023-09-09");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const [url, setUrl] = useState(
    `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => setArticles([...articles, ...data.articles]));

      setIsLoading(false);
      console.log(articles);
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
      // if (topic) {
      setUrl(
        `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
      );
      // }

      // if (topic === "") {
      //   setUrl(
      //     `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
      //   );
      // }
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
    if (topic) {
      setUrl(
        `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
      );
    }

    if (!topic) {
      setUrl(
        `https://newsapi.org/v2/everything?q=${topic}&from=${from}&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=3ff5a28debea4f11892ef4dd34f978bf`
      );
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="App">
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

        <div className="scroll-box">
          {articles.map((article, index) => (
            <div
              className="article"
              key={Math.random()}
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
          ))}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  );
}

export default App;
