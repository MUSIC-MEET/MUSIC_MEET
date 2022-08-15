CREATE TABLE `VisibleState` (
	`state`	INT(1)	NOT NULL  PRIMARY KEY,
	`stateName`	VARCHAR(10)	NULL
);
INSERT INTO VisibleState VALUES(0, 'activate');
INSERT INTO VisibleState VALUES(1, 'delete');