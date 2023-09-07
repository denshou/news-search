import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2023-08-07&sortBy=publishedAt&apiKey=5ff16da1c98c4f08aa5dcdb903ad4df1"
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  }, []); 
  console.log(articles);
  return (
    <div className="App">
      <div className="search">
        <input type="text" />
        <input type="date" name="" id="" />
      </div>
      <div>
        {articles.map((article) => (
          <div className="article" key={Math.random()}>
            <p>{article.title}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
