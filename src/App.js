import "./App.css";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { useInView } from "react-intersection-observer";

function App() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("");
  const [from, setFrom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [url, setUrl] = useState(
    "https://newsapi.org/v2/top-headlines?country=kr&page=1&apiKey=94b00823b790482094d652f6cd3b55b2"
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        await fetch(url)
          .then((res) => res.json())
          .then((data) => setArticles(data.articles));
        setIsLoading(false);
      } catch (error) {
        window.alert(error);
      }
    }
    fetchData();
  }, [url]);

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
    setUrl(
      `https://newsapi.org/v2/everything?q=${topic}&from=${from}&to=${from}&page=${page}&sortBy=publishedAt&apiKey=5ff16da1c98c4f08aa5dcdb903ad4df1`
    );
  };

  console.log(articles);
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
        </div>
      </div>
    </>
  );
}

export default App;
