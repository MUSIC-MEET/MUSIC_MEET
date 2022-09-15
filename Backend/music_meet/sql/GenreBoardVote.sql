CREATE TABLE `baladBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `baladBoardVote` ADD CONSTRAINT `FK_User_TO_baladBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `baladBoardVote` ADD CONSTRAINT `FK_Board_TO_baladBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `baladBoard` (
	`boardnum`
);


CREATE TABLE `rnbBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `rnbBoardVote` ADD CONSTRAINT `FK_User_TO_rnbBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `rnbBoardVote` ADD CONSTRAINT `FK_Board_TO_rnbBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `rnbBoard` (
	`boardnum`
);



CREATE TABLE `hiphopBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `hiphopBoardVote` ADD CONSTRAINT `FK_User_TO_hiphopBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `hiphopBoardVote` ADD CONSTRAINT `FK_Board_TO_hiphopBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `hiphopBoard` (
	`boardnum`
);



CREATE TABLE `trortBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `trortBoardVote` ADD CONSTRAINT `FK_User_TO_trortBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `trortBoardVote` ADD CONSTRAINT `FK_Board_TO_trortBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `trortBoard` (
	`boardnum`
);



CREATE TABLE `kpopBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `kpopBoardVote` ADD CONSTRAINT `FK_User_TO_kpopBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `kpopBoardVote` ADD CONSTRAINT `FK_Board_TO_kpopBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `kpopBoard` (
	`boardnum`
);



CREATE TABLE `jpopBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `jpopBoardVote` ADD CONSTRAINT `FK_User_TO_jpopBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jpopBoardVote` ADD CONSTRAINT `FK_Board_TO_jpopBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `jpopBoard` (
	`boardnum`
);



CREATE TABLE `popBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `popBoardVote` ADD CONSTRAINT `FK_User_TO_popBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `popBoardVote` ADD CONSTRAINT `FK_Board_TO_popBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `popBoard` (
	`boardnum`
);



CREATE TABLE `classicBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `classicBoardVote` ADD CONSTRAINT `FK_User_TO_classicBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `classicBoardVote` ADD CONSTRAINT `FK_Board_TO_classicBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `classicBoard` (
	`boardnum`
);



CREATE TABLE `danceBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `danceBoardVote` ADD CONSTRAINT `FK_User_TO_danceBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `danceBoardVote` ADD CONSTRAINT `FK_Board_TO_danceBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `danceBoard` (
	`boardnum`
);



CREATE TABLE `mrBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `mrBoardVote` ADD CONSTRAINT `FK_User_TO_mrBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `mrBoardVote` ADD CONSTRAINT `FK_Board_TO_mrBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `mrBoard` (
	`boardnum`
);



CREATE TABLE `jazzBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `jazzBoardVote` ADD CONSTRAINT `FK_User_TO_jazzBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jazzBoardVote` ADD CONSTRAINT `FK_Board_TO_jazzBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `jazzBoard` (
	`boardnum`
);



CREATE TABLE `ostBoardVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`boardnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);

ALTER TABLE `ostBoardVote` ADD CONSTRAINT `FK_User_TO_ostBoardVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `ostBoardVote` ADD CONSTRAINT `FK_Board_TO_ostBoardVote_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `ostBoard` (
	`boardnum`
);

