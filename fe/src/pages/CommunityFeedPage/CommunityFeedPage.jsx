import React, { useEffect, useState } from "react";

function CommunityFeedPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Fetching articles...");
    fetch("http://localhost:5050/articles") // 백엔드
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched articles:", data);
        setArticles(data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div>
      <h1>Community Feed</h1>
      {articles.length === 0 ? <p>No articles found.</p> : null}
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <small>{new Date(article.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommunityFeedPage;
