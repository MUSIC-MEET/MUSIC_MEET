CREATE TABLE `User` (
	`usernum`	 INT(10)   AUTO_INCREMENT	  NOT NULL primary key,
	`id`	 VARCHAR(20)	  NOT NULL,
	`pw`	 VARCHAR(100)	  NOT NULL,
	`email`	 VARCHAR(100)	  NOT NULL,
	`nickname`	 VARCHAR(48)	  NOT NULL,
	`createdat`	 DATETIME	  NOT NULL,
	`updatedat`	 DATETIME	  NULL,
	`deletedat`	 DATETIME	  NULL,
	`createdip`	 VARCHAR(15)	  NULL,
	`updatedIp`	 VARCHAR(15)	  NOT NULL,
	`deletedip`	 VARCHAR(15)	 NULL,
	`state`	 INT(1)	  NOT NULL,
    `userimage`		VARCHAR(100)   DEFAULT 'default.png'
);

ALTER TABLE `User` ADD CONSTRAINT `FK_UserState_TO_User_1` FOREIGN KEY (
	`state`
)
REFERENCES `UserState` (
	`state`
);

Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 values('idtest', '$2a$10$l8dRv3.sUfG3xPm74kk5K.71OYB8JyqzchJVgmDTY3e6Z0WMNBQoa', 'q+QCoSUsKhuCAD3FmnI9Xw==', 'abx1234', '2022-08-25 22:25:32', NULL, NULL, 0, 0, NULL, 0, 'default.png');
Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 values('abc50050', '$2a$10$DUD3kWg7unxOldFAmjh8xOIc/tjcLjzqraUAAaOQIfihn5UoUuaoe', 'WZlmy85L0FAHsD9H74Hgrf8Ul5GsWxvtYTLhJxOghmQ=', '전국노예자랑', '2022-08-25 21:17:10', NULL, NULL, 0, 0, NULL, 0, 'default.png');
Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 VALUES('test0', '$2a$10$yWOOUfM./LNZRsVpYg1LROrElep86.WnQmbpNV2vC0XeZtSqbv7gC', 'VkF5c7wIAtqGm1n+Wno1xTwIGUpyz3+coN+2Z3WkRxo=', 'nan0805', '2022-08-25 22:56:41', NULL, NULL, 0, 0, NULL, 0, 'default.png');
Insert into user(`id`, `pw`, `email`, `nickname`, `createdat`, `updatedat`, `deletedat`, `createdip`, `updatedIp`, `deletedip`, `state`, `userimage`)
 VALUES('kjr123', '$2a$10$/O3IYxMkpnlKBD2opoxvGeJy5622lmcYkbI926QkII9KooOPb/EbC', 'KI0d5WicvhulZRlVqInCfq/UQoZ5vgxNe7kSnwWsEOk=', '정렬정렬', '2022-08-23 19:23:02', NULL, NULL, 0, 0, NULL, 0, 'default.png');