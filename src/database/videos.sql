-- Active: 1725403213931@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    time_segunds NUMBER NOT NULL,
    upload_date TEXT DEFAULT (DATETIME()) NOT NULL
)

INSERT INTO videos(id, title, time_segunds)
VALUES
('v001', 'Como programar em JS', 600),
('v002', 'Desenvolvendo primeiro projeto em React', 1550);

SELECT * from videos;