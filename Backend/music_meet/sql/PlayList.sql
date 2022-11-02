CREATE TABLE `PlayList` (
	`playlistnum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`usernum` INT(10) NOT NULL,
	`MusicNum` INT(10) NOT NULL
);

ALTER TABLE `PlayList` ADD CONSTRAINT `FK_User_TO_PlayList_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `PlayList` ADD CONSTRAINT `FK_Music_TO_PlayList_1` FOREIGN KEY (
	`MusicNum`
)
REFERENCES `Music` (
	`MusicNum`
);