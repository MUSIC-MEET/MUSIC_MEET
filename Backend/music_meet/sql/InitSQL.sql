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

Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 values('idtest', '$2a$10$l8dRv3.sUfG3xPm74kk5K.71OYB8JyqzchJVgmDTY3e6Z0WMNBQoa', 'q+QCoSUsKhuCAD3FmnI9Xw==', 'abx1234', '2022-08-25 22:25:32', NULL, NULL, 0, 0, NULL, 0, 'default.png');
Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 values('abc50050', '$2a$10$DUD3kWg7unxOldFAmjh8xOIc/tjcLjzqraUAAaOQIfihn5UoUuaoe', 'WZlmy85L0FAHsD9H74Hgrf8Ul5GsWxvtYTLhJxOghmQ=', '전국노예자랑', '2022-08-25 21:17:10', NULL, NULL, 0, 0, NULL, 0, 'default.png');
Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 VALUES('test0', '$2a$10$yWOOUfM./LNZRsVpYg1LROrElep86.WnQmbpNV2vC0XeZtSqbv7gC', 'VkF5c7wIAtqGm1n+Wno1xTwIGUpyz3+coN+2Z3WkRxo=', 'nan0805', '2022-08-25 22:56:41', NULL, NULL, 0, 0, NULL, 0, 'default.png');
Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 VALUES('kjr123', '$2a$10$/O3IYxMkpnlKBD2opoxvGeJy5622lmcYkbI926QkII9KooOPb/EbC', 'KI0d5WicvhulZRlVqInCfq/UQoZ5vgxNe7kSnwWsEOk=', '정렬정렬', '2022-08-23 19:23:02', NULL, NULL, 0, 0, NULL, 0, 'default.png');



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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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


CREATE TABLE `hiphopBoard` (
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`createdat`	datetime	 NULL,
	`state`		INT(1)	 NOT NULL DEFAULT 0
);

ALTER TABLE `hiphopBoard` ADD CONSTRAINT `FK_User_TO_hiphopBoard_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `hiphopBoard` ADD CONSTRAINT `FK_VisibleState_TO_hiphopBoard_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


CREATE TABLE `trortBoard` (
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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
	`boardnum`		INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`title`		VARCHAR(20)	 NULL,
	`usernum`		INT(10)	 NOT NULL,
	`content`		VARCHAR(1000)	 NULL,
	`view`		INT(10)	 NULL DEFAULT 0,
	`upvote`		INT(10)	NOT NULL DEFAULT 0,
	`downvote`		INT(10)	NOT NULL DEFAULT 0,
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







CREATE TABLE `baladComment` (
	`commentnum`	INT(10) AUTO_INCREMENT 	NOT NULL  PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`boardnum`	INT(10)	NOT NULL,
	`content`	VARCHAR(100)	  NULL,
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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
	`createdat`	datetime	  NULL,
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



CREATE TABLE `baladBoardVote` (
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL  PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL  PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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
	`votenum`		INT(10) 		AUTO_INCREMENT		NOT 	NULL PRIMARY KEY,
	`usernum`		INT(10)		NOT 	NULL,
	`boardnum`		INT(10)		NOT 	NULL,
	`vote`		INT(0)		NULL
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



CREATE TABLE `baladBoardCommentVote` (
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
	`votenum`	INT(10) AUTO_INCREMENT	NOT NULL PRIMARY KEY,
	`usernum`	INT(10)	NOT NULL,
	`commentnum`	INT(10)	NOT NULL,
	`vote`	INT(1)	NULL
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
