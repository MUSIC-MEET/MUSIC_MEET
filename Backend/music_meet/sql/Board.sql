CREATE TABLE `Board` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`genre`		INT(2)	 NOT NULL,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `Board` ADD CONSTRAINT `FK_GenreState_TO_Board_1` FOREIGN KEY (
	`genre`
)
REFERENCES `GenreState` (
	`genre`
);

ALTER TABLE `Board` ADD CONSTRAINT `FK_User_TO_Board_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `Board` ADD CONSTRAINT `FK_VisibleState_TO_Board_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);