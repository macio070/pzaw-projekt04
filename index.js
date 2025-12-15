import express from "express";
import fs from "node:fs";
import {
  getGameTitles,
  getGameData,
  getAllGameImages,
  getGameGenres,
  getGamePlatforms,
  getAllGenres,
  getAllPlatforms,
  db,
} from "./models/videogames.js";
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const html = fs.readFileSync("public/index.html");
app.get("/", (req, res) => {
  res.end(html);
});

app.get("/games", (req, res) => {
  res.render("games", {
    title: "List of Video Games",
    games: getGameTitles(),
    images: getAllGameImages(),
  });
});

app.get("/games/:title", (req, res) => {
  const title = req.params.title;
  if (!getGameTitles().includes(title)) {
    res.status(404).end("Game not found");
  } else {
    res.render("game", {
      title: title,
      gameData: getGameData(title),
      genres: getGameGenres(title),
      platforms: getGamePlatforms(title),
    });
  }
});
app.get("/new", (req, res) => {
  res.render("newGame", {
      title: "Add New Game",
      genres: getAllGenres(),
      platforms: getAllPlatforms(),
      form: {},
  });
});
app.post("/new", (req, res) => {
  const { title, release_date, developer, description, link, logo } = req.body;

  const genres = getAllGenres();
  const platforms = getAllPlatforms();

  const keys = Object.keys(req.body);
  const newGenres = [];
  const newPlatforms = [];

  //znalezienie wszystkich zaznaczonych gatunkow i platform
  keys.forEach((key) => {
    if (genres.includes(key)) newGenres.push(key);
    if (platforms.includes(key)) newPlatforms.push(key);
  });

  //form error handling
  const errors = [];
  if (!title || title.trim() === "") 
    errors.push("Title is required.");
  if (newGenres.length === 0)
    errors.push("At least one genre must be selected.");
  if (newPlatforms.length === 0)
    errors.push("At least one platform must be selected.");
  if (!release_date || release_date.trim() === "")
    errors.push("Release date is required.");
  if (!developer || developer.trim() === "")
    errors.push("Developer is required.");
  if (!description || description.trim() === "")
    errors.push("Description is required.");

  if (errors.length > 0) {
    return res.render("newGame", {
      title: "Add New Game",
      genres,
      platforms,
      errors,
      form: req.body,
    });
  }

  db.prepare(
    "INSERT INTO game_data (game_title, release_date, developer, description, link, image) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    title,
    release_date,
    developer,
    description,
    link || null,
    logo || null
  );

  //pobieranie id nowo dodanej gry
  const newGameId = db
    .prepare("SELECT game_id FROM game_data ORDER BY game_id DESC LIMIT 1")
    .get();
  const id = newGameId.game_id;

  newGenres.forEach((newGenre) => {
    //pobieranie id gatunku na podstawie nazwy
    const genreRow = db
      .prepare("SELECT genre_id FROM genres WHERE genre_name = ?")
      .get(newGenre);
    //dodawanie do relacji M-M nowo dodanej gry i wybranego gatunku
    db.prepare(
      "INSERT INTO games_genres (game_id, genre_id) VALUES (?, ?)"
    ).run(id, genreRow.genre_id);
  });

  //tak samo jak z gatunkami
  newPlatforms.forEach((newPlatform) => {
    const platformRow = db
      .prepare("SELECT platform_id FROM platforms WHERE platform_name = ?")
      .get(newPlatform);
    db.prepare(
      "INSERT INTO games_platforms (game_id, platform_id) VALUES (?, ?)"
    ).run(id, platformRow.platform_id);
  });

  res.redirect(`/games/`);
});

app.get("/delete/:game_id", (req, res) => {
  const gameId = req.params.game_id;

  //usuniecie powiazan M-M
  db.prepare("DELETE FROM games_genres WHERE game_id = ?").run(gameId);
  db.prepare("DELETE FROM games_platforms WHERE game_id = ?").run(gameId);
  //usuniecie gry
  db.prepare("DELETE FROM game_data WHERE game_id = ?").run(gameId);
  res.redirect(`/games/`);
});

app.get("/random", (req, res) => {
  const titles = getGameTitles();
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  res.redirect(`/games/${randomTitle}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});