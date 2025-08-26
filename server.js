import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ Change this subreddit if you want a different one by default
const subreddit = "reactjs";

app.get("/api/reddit", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.reddit.com/r/${subreddit}.json`,
      { headers: { "User-Agent": "Reddit-Proxy-Server/1.0" } }
    );

    const data = response.data;

    // ✅ Cleaned structure: only what you need
    const posts = data.data.children.map((post) => ({
      id: post.data.id,
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      score: post.data.score,
      author: post.data.author,
      created_utc: post.data.created_utc,
    }));

    res.json(posts);
  } catch (error) {
    console.error("Reddit fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch subreddit posts" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));

export default app;
