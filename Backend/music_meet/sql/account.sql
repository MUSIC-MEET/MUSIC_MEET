create table accountForm(
id varchar(15) NOT NULL primary key, 	// 5~20자
pw varchar(15)  NOT NULL, 		// 8~16자
email varchar(30) NOT NULL, 		// 10자~30자 
agree1 tinyint(1) NOT NULL,
agree2 tinyint(1) NOT NULL,
agree3 tinyint(1) NOT NULL,
state int(2) NOT NULL
);


