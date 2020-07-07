CREATE TABLE public.tbl_tours_users
(
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.tbl_tours_users
    OWNER to dunder_mifflin;