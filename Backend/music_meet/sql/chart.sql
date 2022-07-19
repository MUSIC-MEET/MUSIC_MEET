create table `Chart` (
	`rank`	 INT(3)	 NOT NULL  PRIMARY KEY,
	`time`	 datetime	 NULL,
	`title`	 VARCHAR(30)	 NULL,
	`singer`	 VARCHAR(20)	 NULL,
	`img_src`	 VARCHAR(100)	 NULL,
	`sitecode`	 INT(1)	 NOT NULL
);