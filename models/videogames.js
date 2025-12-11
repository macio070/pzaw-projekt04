import { DatabaseSync } from "node:sqlite";

const db_path = "./games.db";
const db = new DatabaseSync(db_path);

console.log("tworzenie tabel");
db.exec(
    `
CREATE TABLE IF NOT EXISTS game_data(
    game_id INTEGER PRIMARY KEY AUTOINCREMENT,
    genre_id INTEGER,
    platform_id INTEGER,
    release_date DATE,
    developer VARCHAR(50),
    description VARCHAR(512),
    link VARCHAR(512),
    image VARCHAR(512)
    );

    CREATE TABLE IF NOT EXISTS genres(
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    genre_name VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS platforms(
    platform_id INTEGER PRIMARY KEY AUTOINCREMENT,
    plafrorm_name VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS games_genres(
    game_id INTEGER,
    genre_id INTEGER,

    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
    );

    CREATE TABLE IF NOT EXISTS games_platforms(
    game_id INTEGER,
    platform_id INTEGER,
	
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (platform_id) REFERENCES platforms(platform_id)
    );
    `

)


export const games = {
    "Valorant": {
        genre: ["FPS"],
        platform: ["PC", "Consoles"],
        release_date: new Date("2020-06-02"),
        developer: "Riot Games",
        description: "A team-based tactical shooter that relies on precise gunplay and unique agent abilities.",
        link: "https://playvalorant.com/",
        image: "../assets/valorant_logo.png"
    },
    "The Witcher 3: Wild Hunt": {
        genre: ["RPG"],
        platform: ["PC", "Consoles", "Switch"],
        release_date: new Date("2015-05-19"),
        developer: "CD Projekt Red",
        description: "An open-world RPG following Geralt of Rivia on his quest.",
        link: "https://thewitcher.com/en/witcher3",
        image: "../assets/thewitcher_logo.png"
    },
    "Minecraft": {
        genre: ["Sandbox", "Survival"],
        platform: ["PC", "Consoles", "Mobile"],
        release_date: new Date("2011-11-18"),
        developer: "Mojang Studios",
        description: "A sandbox game about placing blocks and going on adventures.",
        link: "https://www.minecraft.net/",
        image: "../assets/minecraft_logo.svg"
    },
    "Counter-Strike 2": {
        genre: ["FPS"],
        platform: ["PC"],
        release_date: new Date("2023-09-27"),
        developer: "Valve Corporation",
        description: "The latest installment in the classic tactical shooter seies. It relies on team strategy and precise shooting skills.",
        link: "https://counter-strike.net/",
        image: "../assets/cs2_logo.svg"
    },
    "Cyberpunk 2077": {
        genre: ["RPG", "Action"],
        platform: ["PC", "Consoles"],
        release_date: new Date("2020-12-10"),
        developer: "CD Projekt Red",
        description: "An open-world RPG set in a dystopian future, focusing on narrative and player choice.",
        link: "https://www.cyberpunk.net/",
        image: "../assets/cyberpunk2077_logo.png"
    },
    "GTA V": {
        genre: ["Action", "Adventure"],
        platform: ["PC", "Consoles"],
        release_date: new Date("2013-09-17"),
        developer: "Rockstar Games",
        description: "An open-world action-adventure game set in the fictional state of San Andreas.",
        link: "https://www.rockstargames.com/gta-v/",
        image: "../assets/gta5_logo.png"
    },
    "Overwatch 2": {
        genre: ["FPS"],
        platform: ["PC", "Consoles"],
        release_date: new Date("2022-10-04"),
        developer: "Blizzard Entertainment",
        description: "A team-based multiplayer shooter with a focus on hero abilities and teamwork. ",
        link: "https://playoverwatch.com/",
        image: "../assets/overwatch2_logo.svg"
    }
}


export const getGameTitles = () => {
    return Object.keys(games);
}
export const getGameData = (title) => {
    return {title: title, ...games[title]};
}

export const getAllGameImages = () => {
    const images = [];
    const games = getGameTitles();
    games.forEach(game => {
        images.push({title: getGameData(game).title, path: getGameImage(game)});
    });
    return images;
}
export const getGameImage = (title) => {
    return games[title]?.image || null;
}