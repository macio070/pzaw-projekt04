BEGIN TRANSACTION;

DROP TABLE IF EXISTS "games_genres";

DROP TABLE IF EXISTS "games_platforms";

DROP TABLE IF EXISTS "genres";

DROP TABLE IF EXISTS "platforms";

DROP TABLE IF EXISTS "game_data";

DROP TABLE IF EXISTS "users";

CREATE TABLE
	IF NOT EXISTS "users" (
		"user_id" INTEGER,
		"user_login" VARCHAR(100) NOT NULL,
		"user_password" TEXT NOT NULL,
		"is_admin" BOOLEAN NOT NULL DEFAULT 0,
		PRIMARY KEY ("user_id" AUTOINCREMENT)
	);

CREATE TABLE
	IF NOT EXISTS "game_data" (
		"game_id" INTEGER,
		"game_title" VARCHAR(50),
		"release_date" DATE,
		"developer" VARCHAR(50),
		"description" VARCHAR(2000),
		"link" VARCHAR(512),
		"image" VARCHAR(512),
		"user_id" INTEGER,
		PRIMARY KEY ("game_id" AUTOINCREMENT),
		FOREIGN KEY ("user_id") REFERENCES "users" ("user_id")
	);

CREATE TABLE
	IF NOT EXISTS "genres" (
		"genre_id" INTEGER,
		"genre_name" VARCHAR(20),
		PRIMARY KEY ("genre_id" AUTOINCREMENT)
	);

CREATE TABLE
	IF NOT EXISTS "platforms" (
		"platform_id" INTEGER,
		"platform_name" VARCHAR(20),
		PRIMARY KEY ("platform_id" AUTOINCREMENT)
	);

CREATE TABLE
	IF NOT EXISTS "games_genres" (
		"game_id" INTEGER,
		"genre_id" INTEGER,
		PRIMARY KEY ("game_id", "genre_id"),
		FOREIGN KEY ("game_id") REFERENCES "game_data" ("game_id"),
		FOREIGN KEY ("genre_id") REFERENCES "genres" ("genre_id")
	);

CREATE TABLE
	IF NOT EXISTS "games_platforms" (
		"game_id" INTEGER,
		"platform_id" INTEGER,
		PRIMARY KEY ("game_id", "platform_id"),
		FOREIGN KEY ("game_id") REFERENCES "game_data" ("game_id"),
		FOREIGN KEY ("platform_id") REFERENCES "platforms" ("platform_id")
	);

INSERT INTO
	"users" (
		"user_id",
		"user_login",
		"user_password",
		"is_admin"
	)
VALUES
	(
		1,
		'admin',
		'$2b$10$6S/T4DUCRnyMgQ/X5F4EiuoE6Mi1DZMoHPO3.4s7CA20vwJ1F0c5G',
		1
	),
	(
		2,
		'user1',
		'$2b$10$8OebMrgVaX3VPsv.UlM2bOasQgOsn6CUU2htntVLvm3OOlZu5TzTe',
		0
	),
	(
		3,
		'user2',
		'$2b$10$BpDHOV7lphhVxGXo49c1BexmXCyqjyJJiXdSYoLWbfpJW7tvgrQLG',
		0
	);

INSERT INTO
	"game_data" (
		"game_id",
		"game_title",
		"release_date",
		"developer",
		"description",
		"link",
		"image",
		"user_id"
	)
VALUES
	(
		1,
		'Valorant',
		'2020-06-02',
		'Riot Games',
		'A team-based tactical shooter that relies on precise gunplay and unique agent abilities.',
		'https://playvalorant.com/',
		'../assets/valorant_logo.png',
		1
	),
	(
		2,
		'The Witcher 3: Wild Hunt',
		'2015-05-19',
		'CD Projekt Red',
		'An open-world RPG following Geralt of Rivia on his quest.',
		'https://thewitcher.com/en/witcher3',
		'../assets/thewitcher_logo.png',
		2
	),
	(
		3,
		'Minecraft',
		'2011-11-18',
		'Mojang Studios',
		'A sandbox game about placing blocks and going on adventures.',
		'https://www.minecraft.net/',
		'../assets/minecraft_logo.svg',
		2
	),
	(
		4,
		'Counter-Strike 2',
		'2023-09-27',
		'Valve Corporation',
		'The latest installment in the classic tactical shooter seies. It relies on team strategy and precise shooting skills.',
		'https://counter-strike.net/',
		'../assets/cs2_logo.svg',
		3
	),
	(
		5,
		'Cyberpunk 2077',
		'2020-12-10',
		'CD Projekt Red',
		'An open-world RPG set in a dystopian future, focusing on narrative and player choice.',
		'https://www.cyberpunk.net/',
		'../assets/cyberpunk2077_logo.png',
		2
	),
	(
		6,
		'GTA V',
		'2013-09-17',
		'Rockstar Games',
		'An open-world action-adventure game set in the fictional state of San Andreas.',
		'https://www.rockstargames.com/gta-v/',
		'../assets/gta5_logo.png',
		3
	),
	(
		7,
		'Overwatch 2',
		'2022-10-04',
		'Blizzard Entertainment',
		'A team-based multiplayer shooter with a focus on hero abilities and teamwork.',
		'https://playoverwatch.com/',
		'../assets/overwatch2_logo.svg',
		1
	);

INSERT INTO
	"genres" ("genre_id", "genre_name")
VALUES
	(1, 'FPS'),
	(2, 'RPG'),
	(3, 'Sandbox'),
	(4, 'Survival'),
	(5, 'Action'),
	(6, 'Adventure');

INSERT INTO
	"platforms" ("platform_id", "platform_name")
VALUES
	(1, 'PC'),
	(2, 'Consoles'),
	(3, 'Switch'),
	(4, 'Xbox'),
	(5, 'Playstation'),
	(6, 'Mobile');

INSERT INTO
	"games_genres" ("game_id", "genre_id")
VALUES
	(1, 1),
	(2, 2),
	(3, 3),
	(3, 4),
	(4, 1),
	(5, 2),
	(5, 5),
	(6, 5),
	(6, 6),
	(7, 1);

INSERT INTO
	"games_platforms" ("game_id", "platform_id")
VALUES
	(1, 1),
	(1, 2),
	(2, 1),
	(2, 2),
	(2, 3),
	(3, 1),
	(3, 2),
	(3, 3),
	(3, 6),
	(4, 1),
	(5, 1),
	(5, 2),
	(6, 1),
	(6, 2),
	(7, 1),
	(7, 2);

COMMIT;