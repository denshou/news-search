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
    console.log(article)
   
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
            <div className="article-box">
              {/* <button className="like-btn unclicked"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></button>
              <button className="like-btn clicked"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg></button> */}
              <button
                key={index}
                className="like-btn plus"
                onClick={()=>plusButtonHandler(article)}
              ></button>
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
            </div>
          ))}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  );
}

export default App;
