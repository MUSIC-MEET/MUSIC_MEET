CREATE TABLE `UserState` (
    `state`    INT(1)    NOT NULL primary key,
    `statename`    VARCHAR(10)    NULL
);
insert into UserState values(0,"활동중");
insert into UserState values(1,"탈퇴");
insert into UserState values(2,"계정정지");
insert into UserState values(3,"이메일 인증 안됨");









CREATE TABLE `User`  (
	`id`	 VARCHAR(20)	 NOT NULL primary key,
	`pw`	 VARCHAR(100)	 NOT NULL,
	`email`	 VARCHAR(100)	 NOT NULL,
	`nickname`	 VARCHAR(48)	 NOT NULL,
	`createdat`	 datetime	 NOT NULL,
	`updatedat`	 datetime	 NULL,
	`deletedat`	 datetime	 NULL,
	`createdip`	 VARCHAR(15)	 NULL,
	`updatedIp`	 VARCHAR(15)	 NOT NULL,
	`deletedip`	 VARCHAR(15)	 NULL,
	`state`	 INT(1)	 NOT NULL,
    FOREIGN KEY (state)
	REFERENCES UserState(state) ON UPDATE CASCADE ON DELETE RESTRICT
);






CREATE TABLE EmailAuth (
`num`    INT(10)  AUTO_INCREMENT     NOT NULL primary key,
`id`     VARCHAR(20)     NOT NULL,
`encoding_value`     VARCHAR(100)  NOT NULL,
	FOREIGN KEY (id)
	REFERENCES User(id) ON UPDATE CASCADE ON DELETE RESTRICT
);















