import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/reddit", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.reddit.com/r/reactjs.json")
    );
    const data = JSON.parse(response.data.contents);
    res.json(data);
  } catch (error) {
    console.error("Proxy fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch Reddit via proxy" });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));

export default app;
