CREATE TABLE `admin` (
	`adminNum`  INT(1) AUTO_INCREMENT   NOT NULL    PRIMARY KEY,
	`id`    VARCHAR(20) NOT NULL,
	`pw`    VARCHAR(100)    NOT NULL,
	`authority` INT(1)  DEFAULT 3  NOT NULL
);

Insert into `admin`(`id`, `pw`, `authority`)
 values('idtest', '$2a$10$l8dRv3.sUfG3xPm74kk5K.71OYB8JyqzchJVgmDTY3e6Z0WMNBQoa', 3);
Insert into `admin`(`id`, `pw`, `authority`)
 values('abc50050', '$2a$10$DUD3kWg7unxOldFAmjh8xOIc/tjcLjzqraUAAaOQIfihn5UoUuaoe', 3);
Insert into `admin`(`id`, `pw`, `authority`)
 VALUES('test0', '$2a$10$yWOOUfM./LNZRsVpYg1LROrElep86.WnQmbpNV2vC0XeZtSqbv7gC', 3);
Insert into `admin`(`id`, `pw`, `authority`)
 VALUES('kjr123', '$2a$10$/O3IYxMkpnlKBD2opoxvGeJy5622lmcYkbI926QkII9KooOPb/EbC', 3);