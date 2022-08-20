CREATE TABLE `UserState` (
    `state`    INT(1)    NOT NULL primary key,
    `statename`    VARCHAR(10)    NULL
);
insert into UserState values(0,"활동중");
insert into UserState values(1,"탈퇴");
insert into UserState values(2,"계정정지");
insert into UserState values(3,"이메일 인증 안됨");


CREATE TABLE `User` (
	`usernum`	 INT(10)   AUTO_INCREMENT	  NOT NULL primary key,
	`id`	 VARCHAR(20)	  NOT NULL,
	`pw`	 VARCHAR(100)	  NOT NULL,
	`email`	 VARCHAR(100)	  NOT NULL,
	`nickname`	 VARCHAR(48)	  NOT NULL,
	`createdat`	 DATETIME	  NOT NULL,
	`updatedat`	 DATETIME	  NULL,
	`deletedat`	 DATETIME	  NULL,
	`createdip`	 VARCHAR(15)	  NULL,
	`updatedIp`	 VARCHAR(15)	  NOT NULL,
	`deletedip`	 VARCHAR(15)	 NULL,
	`state`	 INT(1)	  NOT NULL,
    `userimage`		VARCHAR(100)   DEFAULT 'default.png'
);
ALTER TABLE `User` ADD CONSTRAINT `FK_UserState_TO_User_1` FOREIGN KEY (
	`state`
)
REFERENCES `UserState` (
	`state`
);



CREATE TABLE `EmailAuth` (
	`num`	 INT(10)  AUTO_INCREMENT	 NOT NULL  primary key,
	`usernum`	 INT(10)  	 NOT NULL,
	`encoding_value`	  VARCHAR(100)	 NOT NULL
);
ALTER TABLE `EmailAuth` ADD CONSTRAINT `FK_User_TO_EmailAuth_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);



CREATE TABLE `PwAuth` (
	`num`	INT(10)   AUTO_INCREMENT	  NOT NULL  primary key,
	`usernum`	 INT(10)	  NOT NULL,
	`email`	 VARCHAR(100)	 NULL,
	`encoding_value`	 VARCHAR(100)	 NULL
);
ALTER TABLE `PwAuth` ADD CONSTRAINT `FK_User_TO_PwAuth_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);



CREATE TABLE `ChartSite` (
	`sitecode`	INT(1)	NOT NULL PRIMARY KEY ,
	`sitename`	VARCHAR(10)	NULL
);
insert into chartSite values(1, '멜론');
insert into chartSite values(2, '지니');
insert into chartSite values(3, '벅스');
insert into chartSite values(4, '플로');

create table `melonChart` (
	`rank`	 INT(3)	 NOT NULL  PRIMARY KEY,
	`time`	 datetime	 NULL,
	`title`	 VARCHAR(70)	 NULL,
	`singer`	 VARCHAR(50)	 NULL,
	`img_src`	 VARCHAR(200)	 NULL,
	`sitecode`	 INT(1)	 NOT NULL
);
ALTER TABLE `melonChart` ADD CONSTRAINT `FK_ChartSite_TO_melonChart_1` FOREIGN KEY (
	`sitecode`
)
REFERENCES `ChartSite` (
	`sitecode`
);


create table `genieChart` (
	`rank`	 INT(3)	 NOT NULL  PRIMARY KEY,
	`time`	 datetime	 NULL,
	`title`	 VARCHAR(70)	 NULL,
	`singer`	 VARCHAR(50)	 NULL,
	`img_src`	 VARCHAR(200)	 NULL,
	`sitecode`	 INT(1)	 NOT NULL
);
ALTER TABLE `genieChart` ADD CONSTRAINT `FK_ChartSite_TO_genieChart_1` FOREIGN KEY (
	`sitecode`
)
REFERENCES `ChartSite` (
	`sitecode`
);


create table `bugsChart` (
	`rank`	 INT(3)	 NOT NULL  PRIMARY KEY,
	`time`	 datetime	 NULL,
	`title`	 VARCHAR(70)	 NULL,
	`singer`	 VARCHAR(50)	 NULL,
	`img_src`	 VARCHAR(200)	 NULL,
	`sitecode`	 INT(1)	 NOT NULL
);
ALTER TABLE `bugsChart` ADD CONSTRAINT `FK_ChartSite_TO_bugsChart_1` FOREIGN KEY (
	`sitecode`
)
REFERENCES `ChartSite` (
	`sitecode`
);


create table `floChart` (
	`rank`	 INT(3)	 NOT NULL  PRIMARY KEY,
	`time`	 datetime	 NULL,
	`title`	 VARCHAR(70)	 NULL,
	`singer`	 VARCHAR(50)	 NULL,
	`img_src`	 VARCHAR(200)	 NULL,
	`sitecode`	 INT(1)	 NOT NULL
);
ALTER TABLE `floChart` ADD CONSTRAINT `FK_ChartSite_TO_floChart_1` FOREIGN KEY (
	`sitecode`
)
REFERENCES `ChartSite` (
	`sitecode`
);


CREATE TABLE `VisibleState` (
	`state`	INT(1)	NOT NULL  PRIMARY KEY,
	`stateName`	VARCHAR(10)	NULL
);
INSERT INTO VisibleState VALUES(0, 'activate');
INSERT INTO VisibleState VALUES(1, 'delete');


CREATE TABLE `GenreState` (
	`genre`		INT(2)	 NOT NULL  PRIMARY KEY,
	`name`		VARCHAR(15)	 NULL
);
INSERT INTO GenreState VALUES(0, 'balad');
INSERT INTO GenreState VALUES(1, 'rnb');
INSERT INTO GenreState VALUES(2, 'hiphop');
INSERT INTO GenreState VALUES(3, 'trort');
INSERT INTO GenreState VALUES(4, 'kpop');
INSERT INTO GenreState VALUES(5, 'jpop');
INSERT INTO GenreState VALUES(6, 'pop');
INSERT INTO GenreState VALUES(7, 'classic');
INSERT INTO GenreState VALUES(8, 'dance');
INSERT INTO GenreState VALUES(9, 'mr');
INSERT INTO GenreState VALUES(10, 'jazz');
INSERT INTO GenreState VALUES(11, 'ost');


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