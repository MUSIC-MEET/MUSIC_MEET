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
