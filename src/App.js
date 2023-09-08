import "./App.css";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import ArticleModal from "./components/ArticleModal";

function App() {
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState("");
  const [from, setFrom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState(null);

  const [url, setUrl] = useState(
    "https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=5ff16da1c98c4f08aa5dcdb903ad4df1"
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
      `https://newsapi.org/v2/everything?q=${topic}&from=${from}&to=${from}&sortBy=publishedAt&apiKey=5ff16da1c98c4f08aa5dcdb903ad4df1`
    );
  };

  const viewDetails = () => {};
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

        {
          isOpen && <ArticleModal articles={articles} modalId={modalId} isOpen={isOpen} setIsOpen={setIsOpen}/>
          // <div>{articles[modalId].title}</div>
         
        }

        <div>
          {articles.map((article, index) => (
            <div
              className="article"
              key={Math.random()}
              id={index}
              onClick={(event) => {
                article.source.id = index;
                // console.log(article);
                setIsOpen(true);

                setModalId(event.target.id);
              }}
            >
              <p id={index}>{article.title}</p>
              <p id={index}>{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
