CREATE TABLE public.tbl_tours_steps
(
    id integer NOT NULL,
    element text NOT NULL,
    placement text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    tutorialid integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE public.tbl_tours_steps
    OWNER to dunder_mifflin;