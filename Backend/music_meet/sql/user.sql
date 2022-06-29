CREATE TABLE `User`  (
	`num`	int(10) 	 NOT NULL AUTO_INCREMENT,
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