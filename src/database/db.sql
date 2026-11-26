create database n8_lms


create table admins(
	id serial primary key,
	fullname varchar(60) not null,
	phone varchar(12) unique not null,
	password text not null,
	photo text default('/uploads/photo.jpg'),
	status varchar(20) default('active'),
	created_at date default(current_date)
)


create table teachers(
	id serial primary key,
	fullname varchar(60) not null,
	phone varchar(12) unique not null,
	password text not null,
	photo text default('/uploads/photo.jpg'),
	experience varchar(20),
	job varchar(40),
	site text,
	description text,
	facebook text,
	telegram text,
	linked_in text,
	instagram text,
	git_hub text,
	status varchar(20) default('active'),
	created_at date default(current_date)
)



