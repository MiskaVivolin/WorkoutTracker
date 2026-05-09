CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_records (
    id SERIAL PRIMARY KEY,
    exercise TEXT NOT NULL,
    date DATE NOT NULL,
    weight INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_theme (
    user_id INTEGER PRIMARY KEY,
    theme TEXT CHECK (theme IN ('light','dark')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);