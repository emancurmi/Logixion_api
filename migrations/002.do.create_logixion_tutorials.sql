CREATE TABLE public.tbl_tours_tutorials
(
    id integer identity(1,1) NOT NULL,
    name text NOT NULL,
    userid integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.tbl_tours_tutorials
    OWNER to dunder_mifflin;