CREATE TABLE `baladBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `baladBoardCommentVote` ADD CONSTRAINT `FK_User_TO_baladBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `baladBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_baladBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `baladComment` (
	`commentnum`
);


CREATE TABLE `rnbBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `rnbBoardCommentVote` ADD CONSTRAINT `FK_User_TO_rnbBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `rnbBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_rnbBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `rnbComment` (
	`commentnum`
);


CREATE TABLE `hiphopBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `hiphopBoardCommentVote` ADD CONSTRAINT `FK_User_TO_hiphopBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `hiphopBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_hiphopBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `hiphopComment` (
	`commentnum`
);


CREATE TABLE `trortBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `trortBoardCommentVote` ADD CONSTRAINT `FK_User_TO_trortBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `trortBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_trortBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `trortComment` (
	`commentnum`
);


CREATE TABLE `kpopBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `kpopBoardCommentVote` ADD CONSTRAINT `FK_User_TO_kpopBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `kpopBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_kpopBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `kpopComment` (
	`commentnum`
);


CREATE TABLE `jpopBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `jpopBoardCommentVote` ADD CONSTRAINT `FK_User_TO_jpopBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `jpopBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_jpopBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `jpopComment` (
	`commentnum`
);


CREATE TABLE `popBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `popBoardCommentVote` ADD CONSTRAINT `FK_User_TO_popBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `popBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_popBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `popComment` (
	`commentnum`
);


CREATE TABLE `classicBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `classicBoardCommentVote` ADD CONSTRAINT `FK_User_TO_classicBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `classicBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_classicBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `classicComment` (
	`commentnum`
);


CREATE TABLE `danceBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `danceBoardCommentVote` ADD CONSTRAINT `FK_User_TO_danceBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `danceBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_danceBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `danceComment` (
	`commentnum`
);



CREATE TABLE `mrBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `mrBoardCommentVote` ADD CONSTRAINT `FK_User_TO_mrBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `mrBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_mrBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `mrComment` (
	`commentnum`
);



CREATE TABLE `jazzBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `jazzBoardCommentVote` ADD CONSTRAINT `FK_User_TO_jazzBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `jazzBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_jazzBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `jazzComment` (
	`commentnum`
);



CREATE TABLE `ostBoardCommentVote` (
`votenum`	 INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
`usernum`	 INT(10) NOT NULL,
`commentnum` INT(10) NOT NULL,
`vote` INT(1) NULL
);
ALTER TABLE `ostBoardCommentVote` ADD CONSTRAINT `FK_User_TO_ostBoardCommentVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `ostBoardCommentVote` ADD CONSTRAINT `FK_Comment_TO_ostBoardCommentVote_1` FOREIGN KEY (
	`commentnum`
)
REFERENCES `ostComment` (
	`commentnum`
);
