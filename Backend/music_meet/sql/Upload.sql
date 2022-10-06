CREATE TABLE `Upload` (
	`num` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`usernum` INT(10) NOT NULL,
	`title`	VARCHAR(150) NOT NULL,
	`comment` VARCHAR(300) NOT NULL,
	`file` VARCHAR(150) NOT NULL,
	`state` INT(1) NOT NULL DEFAULT 0
);

ALTER TABLE `Upload` ADD CONSTRAINT `FK_User_TO_Upload_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);

ALTER TABLE `Upload` ADD CONSTRAINT `FK_VisibleState_TO_Upload_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);