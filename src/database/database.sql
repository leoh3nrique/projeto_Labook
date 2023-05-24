-- Active: 1684411263805@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);
SELECT * FROM users;

--senhas
--leo123

INSERT INTO users
VALUES("a001","Leonardo","hgtleohgt@gmail.com","leo123","estudante","2021-02-10");

CREATE TABLE posts(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INT(0) ,
    dislikes INT(0) ,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    update_at TEXT DEFAULT(DATETIME()) NOT NULL,
    Foreign Key (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id),
    Foreign Key (post_id) REFERENCES posts(id)
);