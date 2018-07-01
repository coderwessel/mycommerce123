-- +migrate Up
create table products (
  id serial,
  name text not null,
  price integer not null,
  description text not null,
  image text,
  user_id integer
);

create table users (
  id serial,
  email varchar(200) not null,
  password varchar(100) not null
);

-- +migrate Down
drop table users;
drop table products;
