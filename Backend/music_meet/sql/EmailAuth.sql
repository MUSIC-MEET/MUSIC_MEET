CREATE TABLE AuthEmail (
`num`    INT(10)  AUTO_INCREMENT     NOT NULL primary key,
`encoding_value`     VARCHAR(100)   NULL,
`id`     VARCHAR(20)     NOT NULL
);


ALTER TABLE `AuthEmail` ADD CONSTRAINT `FK_User_TO_AuthEmail_1` FOREIGN KEY (
`id`
)
REFERENCES `User` (
`id`
);