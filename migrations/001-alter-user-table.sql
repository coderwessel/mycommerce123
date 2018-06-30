-- +migrate Up
alter table products add user_id integer;
-- +migrate Down
alter table products drop user_id integer;
