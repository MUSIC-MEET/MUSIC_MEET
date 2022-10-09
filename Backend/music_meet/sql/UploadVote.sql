CREATE TABLE `uploadvote` (
	`votenum`	INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`usernum` INT(10) NOT NULL,
	`uploadnum`	INT(10) NOT NULL
);

ALTER TABLE `uploadvote` ADD CONSTRAINT `FK_User_TO_uploadvote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `uploadvote` ADD CONSTRAINT `FK_Upload_TO_uploadvote_1` FOREIGN KEY (
	`uploadnum`
)
REFERENCES `Upload` (
	`uploadnum`
);