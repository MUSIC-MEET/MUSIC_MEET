CREATE TABLE `PlayList` (
	`playlistnum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`usernum` INT(10) NOT NULL,
	`playlist` VARCHAR(3000) NOT NULL default '[]'
);

ALTER TABLE `PlayList` ADD CONSTRAINT `FK_User_TO_PlayList_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);