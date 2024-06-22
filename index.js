import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/get-joke", async (req, res) => {
  try {
    // console.log(req.body);
    const category = req.body.category;
    const blackFlags = req.body.blackFlags;
    const response = await axios.get(API_URL + "/joke/" + category, {
      params: {
        blacklistFlags: blackFlags,
      },
    });
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      data: result,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
