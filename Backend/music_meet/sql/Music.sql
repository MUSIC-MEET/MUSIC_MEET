CREATE TABLE `Music` (
	`MusicNum`	INT(10)	AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`ImgSrc`	VARCHAR(250)	NULL,
	`title`	VARCHAR(50)	NOT NULL,
	`singer`	VARCHAR(30)	NULL,
	`Album`	VARCHAR(100)	NULL,
	`releaseDate`	VARCHAR(50)	NULL,
	`lyrics`	VARCHAR(2500)	NULL,
	`Genre`	INT(2)	NOT NULL
);

ALTER TABLE `Music` ADD CONSTRAINT `FK_GenreState_TO_Music_1` FOREIGN KEY (
	`Genre`
)
REFERENCES `GenreState` (
	`genre`
);