CREATE TABLE `Upload` (
	`uploadnum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`usernum` INT(10) NOT NULL,
	`title` VARCHAR(150) NOT NULL,
	`origin_title` VARCHAR(150) NOT NULL,
	`comment` VARCHAR(300) NOT NULL,
	`file` VARCHAR(200) NOT NULL,
	`origin_file` VARCHAR(200) NOT NULL,
	`vote` INT(1) NOT NULL DEFAULT 0,
	`createdat` DATETIME NOT NULL,
	`view` INT(10) NOT NULL DEFAULT 0,
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
