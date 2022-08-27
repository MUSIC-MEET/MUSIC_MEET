CREATE TABLE `baladComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `baladComment` ADD CONSTRAINT `FK_User_TO_baladComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `baladComment` ADD CONSTRAINT `FK_baladBoard_TO_baladComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `baladBoard` (
	`boardnum`
);

ALTER TABLE `baladComment` ADD CONSTRAINT `FK_VisibleState_TO_baladComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `rnbComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `rnbComment` ADD CONSTRAINT `FK_User_TO_rnbComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `rnbComment` ADD CONSTRAINT `FK_rnbBoard_TO_rnbComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `rnbBoard` (
	`boardnum`
);

ALTER TABLE `rnbComment` ADD CONSTRAINT `FK_VisibleState_TO_rnbComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `hiphopComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `hiphopComment` ADD CONSTRAINT `FK_User_TO_hiphopComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `hiphopComment` ADD CONSTRAINT `FK_hiphopBoard_TO_hiphopComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `hiphopBoard` (
	`boardnum`
);

ALTER TABLE `hiphopComment` ADD CONSTRAINT `FK_VisibleState_TO_hiphopComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `trortComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `trortComment` ADD CONSTRAINT `FK_User_TO_trortComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `trortComment` ADD CONSTRAINT `FK_trortBoard_TO_trortComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `trortBoard` (
	`boardnum`
);

ALTER TABLE `trortComment` ADD CONSTRAINT `FK_VisibleState_TO_trortComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `kpopComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `kpopComment` ADD CONSTRAINT `FK_User_TO_kpopComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `kpopComment` ADD CONSTRAINT `FK_kpopBoard_TO_kpopComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `kpopBoard` (
	`boardnum`
);

ALTER TABLE `kpopComment` ADD CONSTRAINT `FK_VisibleState_TO_kpopComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `jpopComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `jpopComment` ADD CONSTRAINT `FK_User_TO_jpopComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jpopComment` ADD CONSTRAINT `FK_jpopBoard_TO_jpopComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `jpopBoard` (
	`boardnum`
);

ALTER TABLE `jpopComment` ADD CONSTRAINT `FK_VisibleState_TO_jpopComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `popComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `popComment` ADD CONSTRAINT `FK_User_TO_popComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `popComment` ADD CONSTRAINT `FK_popBoard_TO_popComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `popBoard` (
	`boardnum`
);

ALTER TABLE `popComment` ADD CONSTRAINT `FK_VisibleState_TO_popComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `classicComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `classicComment` ADD CONSTRAINT `FK_User_TO_classicComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `classicComment` ADD CONSTRAINT `FK_classicBoard_TO_classicComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `classicBoard` (
	`boardnum`
);

ALTER TABLE `classicComment` ADD CONSTRAINT `FK_VisibleState_TO_classicComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `danceComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `danceComment` ADD CONSTRAINT `FK_User_TO_danceComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `danceComment` ADD CONSTRAINT `FK_danceBoard_TO_danceComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `danceBoard` (
	`boardnum`
);

ALTER TABLE `danceComment` ADD CONSTRAINT `FK_VisibleState_TO_danceComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `mrComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `mrComment` ADD CONSTRAINT `FK_User_TO_mrComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `mrComment` ADD CONSTRAINT `FK_mrBoard_TO_mrComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `mrBoard` (
	`boardnum`
);

ALTER TABLE `mrComment` ADD CONSTRAINT `FK_VisibleState_TO_mrComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `jazzComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `jazzComment` ADD CONSTRAINT `FK_User_TO_jazzComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `jazzComment` ADD CONSTRAINT `FK_jazzBoard_TO_jazzComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `jazzBoard` (
	`boardnum`
);

ALTER TABLE `jazzComment` ADD CONSTRAINT `FK_VisibleState_TO_jazzComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);




CREATE TABLE `ostComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createat`	datetime	  NULL,
	`upvote`	INT(10)	  NULL		  DEFAULT 0,
	`downvote`	INT(10)	  NULL 	  DEFAULT 0,
	`state`	INT(1)	  NOT NULL		  DEFAULT 0
);

ALTER TABLE `ostComment` ADD CONSTRAINT `FK_User_TO_ostComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `ostComment` ADD CONSTRAINT `FK_ostBoard_TO_ostComment_1` FOREIGN KEY (
	`boardnum`
)
REFERENCES `ostBoard` (
	`boardnum`
);

ALTER TABLE `ostComment` ADD CONSTRAINT `FK_VisibleState_TO_ostComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);