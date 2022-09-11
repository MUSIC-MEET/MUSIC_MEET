CREATE TABLE `baladviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT NULL PRIMARY KEY,
	`usernum`	INT(10) NOT NULL,
	`boardnum`	INT(10) NOT NULL
);
ALTER TABLE `baladviewtable` ADD CONSTRAINT `FK_User_TO_baladviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `baladviewtable` ADD CONSTRAINT `FK_Board_TO_baladviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `baladBoard` (
	`boardnum`
);


CREATE TABLE `rnbviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `rnbviewtable` ADD CONSTRAINT `FK_User_TO_rnbviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `rnbviewtable` ADD CONSTRAINT `FK_Board_TO_rnbviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `rnbBoard` (
	`boardnum`
);



CREATE TABLE `hiphopviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `hiphopviewtable` ADD CONSTRAINT `FK_User_TO_hiphopviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `hiphopviewtable` ADD CONSTRAINT `FK_Board_TO_hiphopviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `hiphopBoard` (
	`boardnum`
);


CREATE TABLE `trortviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `trortviewtable` ADD CONSTRAINT `FK_User_TO_trortviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `trortviewtable` ADD CONSTRAINT `FK_Board_TO_trortviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `trortBoard` (
	`boardnum`
);


CREATE TABLE `kpopviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `kpopviewtable` ADD CONSTRAINT `FK_User_TO_kpopviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `kpopviewtable` ADD CONSTRAINT `FK_Board_TO_kpopviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `kpopBoard` (
	`boardnum`
);


CREATE TABLE `jpopviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `jpopviewtable` ADD CONSTRAINT `FK_User_TO_jpopviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jpopviewtable` ADD CONSTRAINT `FK_Board_TO_jpopviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `jpopBoard` (
	`boardnum`
);


CREATE TABLE `popviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `popviewtable` ADD CONSTRAINT `FK_User_TO_popviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `popviewtable` ADD CONSTRAINT `FK_Board_TO_popviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `popBoard` (
	`boardnum`
);


CREATE TABLE `classicviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `classicviewtable` ADD CONSTRAINT `FK_User_TO_classicviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `classicviewtable` ADD CONSTRAINT `FK_Board_TO_classicviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `classicBoard` (
	`boardnum`
);


CREATE TABLE `danceviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `danceviewtable` ADD CONSTRAINT `FK_User_TO_danceviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `danceviewtable` ADD CONSTRAINT `FK_Board_TO_danceviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `danceBoard` (
	`boardnum`
);


CREATE TABLE `mrviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `mrviewtable` ADD CONSTRAINT `FK_User_TO_mrviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `mrviewtable` ADD CONSTRAINT `FK_Board_TO_mrviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `mrBoard` (
	`boardnum`
);


CREATE TABLE `jazzviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `jazzviewtable` ADD CONSTRAINT `FK_User_TO_jazzviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jazzviewtable` ADD CONSTRAINT `FK_Board_TO_jazzviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `jazzBoard` (
	`boardnum`
);


CREATE TABLE `ostviewtable` (
	`viewnum`	INT(10)  AUTO_INCREMENT	 NOT  NULL PRIMARY KEY,
	`usernum`	INT(10)  NOT  NULL,
	`boardnum`	INT(10)  NOT  NULL
);

ALTER TABLE `ostviewtable` ADD CONSTRAINT `FK_User_TO_ostviewtable_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `ostviewtable` ADD CONSTRAINT `FK_Board_TO_ostviewtable_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `ostBoard` (
	`boardnum`
);

