Create database Node;

use Node;

create table user (
	id	varchar(32) NOT NULL,
    username	varchar(32) NOT NULL,
    `name` varchar(64) NOT NULL,
    primary key (id)
);

Insert into user  (id, username, `name`)
	values (123, 'jey', 'Jesus');
    
Create table auth(
	id	varchar(32) NOT NULL,
    username varchar(32) NOT NULL,
    password varchar(64) NOT NULL,
    primary key (id)
);

select * from auth;

delete from auth
	where username = 'PRB';

drop table auth;
drop table user;

create table user_follow (
	user_from varchar(32) not null,
    user_to varchar(32) not null
);