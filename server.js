import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/reddit", async (req, res) => {
  try {
    const response = await axios.get("https://www.reddit.com/r/reactjs.json", {
      headers: {
        "User-Agent": "MyRedditApp/1.0 (by u/yourusername)"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Reddit:", error.message);
    res.status(500).json({ error: "Failed to fetch Reddit" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));

export default app;
