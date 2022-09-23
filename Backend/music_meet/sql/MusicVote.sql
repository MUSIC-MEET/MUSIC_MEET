CREATE TABLE `MusicVote` (
	`MusicVoteNum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`MusicNum` INT(10) NOT NULL,
	`usernum` INT(10) NOT NULL
);
ALTER TABLE `MusicVote` ADD CONSTRAINT `FK_Music_TO_MusicVote_1` FOREIGN KEY (
	`MusicNum`
)
REFERENCES `Music` (
	`MusicNum`
);
ALTER TABLE `MusicVote` ADD CONSTRAINT `FK_User_TO_MusicVote_1` FOREIGN KEY (
	`usernum`
)
REFERENCES `User` (
	`usernum`
);