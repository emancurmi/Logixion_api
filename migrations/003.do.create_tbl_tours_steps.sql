CREATE TABLE public.tbl_tours_steps
(
    id serial primary key,
    element text NOT NULL,
    placement text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    tutorialid integer NOT NULL
);


