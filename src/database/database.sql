-- Active: 1684411263805@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

CREATE TABLE
    posts(
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INT(0),
        dislikes INT(0),
        created_at TEXT DEFAULT(DATETIME()) NOT NULL,
        update_at TEXT DEFAULT(DATETIME()) NOT NULL,
        Foreign Key (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        Foreign Key (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE Foreign Key (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

--Aqui estão alguns dados para facilitar o entendimento dos endpoints

INSERT INTO users(id, name, email, password, role)
VALUES 
    (
        "fdae34bb-ac78-4d04-8844-23003db9a9a9",
        "Fulano",
        "fulano@email.com",
        "$2a$12$bfqz2oGAsgmH/gzZmFOfW.3FgnHXkMu6lt08p7wG/FqA6qrFiT0Fq", --senha para login: fulano123
        "Admin"
    ),
    (
        "d4e80172-e4ca-406c-a1fd-d7c08c084815",
        "Beltrana",
        "beltrana@email.com",
        "$2a$12$KJBl1iQCupyiNkbPGTU07OGmp5w7vgPnpr6puX.ZjfUSrH4tc4FHS", --senha para login: beltrana123
        "Normal"
    ),
    (
        "6d055b5f-dd15-47c3-82b4-ed10c34e60da",
        "Leonardo",
        "leonardo@email.com",   
        "$2a$12$61ApQ9n7VgHKnKmnYnc6ReFlalPacpi3SXbEQVVuywlJQ8xoAbW9K", --senha para login: leonardo123
        "Normal" 
    ),
    (
        "c21a2e55-eb0e-4229-b6b4-cce49e5301f1",
        "Roberto",
        "roberto@email.com",
        "$2a$12$onWglYybAb/YGSBrRDr5uuxXrdyDplSdKqMZZJKGoUY6R3PlJ.jmK", --senha para login: roberto123
        "Normal" 
    );

