BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "game_data" (
	"game_id"	INTEGER,
	"game_title"	VARCHAR(50),
	"release_date"	DATE,
	"developer"	VARCHAR(50),
	"description"	VARCHAR(512),
	"link"	VARCHAR(512),
	"image"	VARCHAR(512),
	PRIMARY KEY("game_id" AUTOINCREMENT)
);
INSERT INTO "game_data" VALUES (1,'Valorant','2020-06-02','Riot Games','A team-based tactical shooter that relies on precise gunplay and unique agent abilities.','https://playvalorant.com/','../assets/valorant_logo.png'),
 (2,'The Witcher 3: Wild Hunt','2015-05-19','CD Projekt Red','An open-world RPG following Geralt of Rivia on his quest.','https://thewitcher.com/en/witcher3','../assets/thewitcher_logo.png'),
 (3,'Minecraft','2011-11-18','Mojang Studios','A sandbox game about placing blocks and going on adventures.','https://www.minecraft.net/','../assets/minecraft_logo.svg'),
 (4,'Counter-Strike 2','2023-09-27','Valve Corporation','The latest installment in the classic tactical shooter seies. It relies on team strategy and precise shooting skills.','https://counter-strike.net/','../assets/cs2_logo.svg'),
 (5,'Cyberpunk 2077','2020-12-10','CD Projekt Red','An open-world RPG set in a dystopian future, focusing on narrative and player choice.','https://www.cyberpunk.net/','../assets/cyberpunk2077_logo.png'),
 (6,'GTA V','2013-09-17','Rockstar Games','An open-world action-adventure game set in the fictional state of San Andreas.','https://www.rockstargames.com/gta-v/','../assets/gta5_logo.png'),
 (7,'Overwatch 2','2022-10-04','Blizzard Entertainment','A team-based multiplayer shooter with a focus on hero abilities and teamwork.','https://playoverwatch.com/','../assets/overwatch2_logo.svg');
COMMIT;
