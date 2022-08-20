CREATE TABLE `baladBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `baladBoard` ADD CONSTRAINT `FK_User_TO_baladBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `baladBoard` ADD CONSTRAINT `FK_VisibleState_TO_baladBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `rnbBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `rnbBoard` ADD CONSTRAINT `FK_User_TO_rnbBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `rnbBoard` ADD CONSTRAINT `FK_VisibleState_TO_rnbBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `hippopBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `hippopBoard` ADD CONSTRAINT `FK_User_TO_hippopBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `hippopBoard` ADD CONSTRAINT `FK_VisibleState_TO_hippopBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `trortBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `trortBoard` ADD CONSTRAINT `FK_User_TO_trortBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `trortBoard` ADD CONSTRAINT `FK_VisibleState_TO_trortBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `kpopBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `kpopBoard` ADD CONSTRAINT `FK_User_TO_kpopBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `kpopBoard` ADD CONSTRAINT `FK_VisibleState_TO_kpopBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `jpopBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `jpopBoard` ADD CONSTRAINT `FK_User_TO_jpopBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jpopBoard` ADD CONSTRAINT `FK_VisibleState_TO_jpopBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `popBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `popBoard` ADD CONSTRAINT `FK_User_TO_popBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `popBoard` ADD CONSTRAINT `FK_VisibleState_TO_popBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `classicBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `classicBoard` ADD CONSTRAINT `FK_User_TO_classicBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `classicBoard` ADD CONSTRAINT `FK_VisibleState_TO_classicBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `danceBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `danceBoard` ADD CONSTRAINT `FK_User_TO_danceBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `danceBoard` ADD CONSTRAINT `FK_VisibleState_TO_danceBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `mrBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `mrBoard` ADD CONSTRAINT `FK_User_TO_mrBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `mrBoard` ADD CONSTRAINT `FK_VisibleState_TO_mrBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `jazzBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `jazzBoard` ADD CONSTRAINT `FK_User_TO_jazzBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jazzBoard` ADD CONSTRAINT `FK_VisibleState_TO_jazzBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `ostBoard` (
	`num`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`vote`		INT(10)	NOT NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `ostBoard` ADD CONSTRAINT `FK_User_TO_ostBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `ostBoard` ADD CONSTRAINT `FK_VisibleState_TO_ostBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);