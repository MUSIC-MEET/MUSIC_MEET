CREATE TABLE `uploadvote` (
	`num`	INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`usernum` INT(10) NOT NULL,
	`num2`	INT(10) NOT NULL
);

ALTER TABLE `uploadvote` ADD CONSTRAINT `FK_User_TO_uploadvote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `uploadvote` ADD CONSTRAINT `FK_Upload_TO_uploadvote_1` FOREIGN KEY (
	`num2`
)
REFERENCES `Upload` (
	`num`
);
