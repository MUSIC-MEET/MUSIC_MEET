
CREATE TABLE `Music` (
	`MusicNum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`ImgSrc`	 VARCHAR(250) NULL,
	`origin_title` VARCHAR(50) NULL,
	`origin_singer` VARCHAR(30) NULL,
	`singer` VARCHAR(30) NULL,
	`title` VARCHAR(50) NULL,
	`Album` VARCHAR(50) NULL,
	`releaseDate` VARCHAR(50) NULL,
	`lyrics` VARCHAR(2500) NULL,
	`FileName` VARCHAR(100) NULL,
	`Length` INT(1) NULL,
	`vote` INT(10) NULL default 0,
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








