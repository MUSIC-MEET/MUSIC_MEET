CREATE TABLE `UploadComment` (
	`uploadcommentnum`	INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`uploadnum`	INT(10) NOT NULL,
	`usernum`	INT(10) NOT NULL,
	`comment`	VARCHAR(150) NOT NULL,
	`createdat`	DATETIME NOT NULL,
	`state`	INT(1)	NULL DEFAULT 0
);

ALTER TABLE `UploadComment` ADD CONSTRAINT `FK_Upload_TO_UploadComment_1` FOREIGN KEY (
	`uploadnum`
)
REFERENCES `Upload` (
	`uploadnum`
);

ALTER TABLE `UploadComment` ADD CONSTRAINT `FK_User_TO_UploadComment_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);