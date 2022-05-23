create table usergenre(
id varchar(20),
hiphop int(5) default 0,
ballade int(5) default 0,
jazz int(5) default 0,
rb int(5) default 0,
kpop int(5) default 0,
jpop int(5) default 0,
pop int(5) default 0,
rock int(5) default 0,
trot int(5) default 0,
etc int(5) default 0,

FOREIGN KEY (id)
REFERENCES account(id)
);