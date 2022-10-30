
CREATE TABLE `Music` (
	`MusicNum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`ImgSrc`	 VARCHAR(250) NULL,
	`origin_title` VARCHAR(200) NULL,
	`origin_singer` VARCHAR(50) NULL,
	`singer` VARCHAR(50) NULL,
	`title` VARCHAR(200) NULL,
	`Album` VARCHAR(50) NULL,
	`releaseDate` VARCHAR(50) NULL,
	`lyrics` VARCHAR(2500) NULL,
	`FileName` VARCHAR(200) NULL,
	`Length` INT(1) NULL,
	`vote` INT(10) NULL default 0,
	`view`	INT(10)	NOT	NULL	DEFAULT	0,
	`genre` INT(2) NOT NULL,
	`state` INT(1) NOT NULL default 0
);
ALTER TABLE `Music` ADD CONSTRAINT `FK_GenreState_TO_Music_1` FOREIGN KEY (
	`genre`
)
REFERENCES `GenreState` (
	`genre`
);
ALTER TABLE `Music` ADD CONSTRAINT `FK_VisibleState_TO_Music_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);








