CREATE TABLE `MusicComment` (
	`MusicCommentNum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`musicNum` INT(10) NOT NULL,
	`usernum` INT(10) NOT NULL,
	`content` VARCHAR(200) NULL,
	`createdAt` datetime NULL,
	`state` INT(1) NOT NULL
);
ALTER TABLE `MusicComment` ADD CONSTRAINT `FK_Music_TO_MusicComment_1` FOREIGN KEY (
	`musicNum`
)
REFERENCES `Music` (
	`MusicNum`
);
ALTER TABLE `MusicComment` ADD CONSTRAINT `FK_User_TO_MusicComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);
ALTER TABLE `MusicComment` ADD CONSTRAINT `FK_VisibleState_TO_MusicComment_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);

