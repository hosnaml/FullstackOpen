-- Create blogs table and seed initial data
-- Run with: psql "$DATABASE_URL" -f commands.sql

BEGIN;

CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL CHECK (url <> ''),
  title TEXT NOT NULL CHECK (title <> ''),
  likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
  ('Robert C. Martin', 'https://blog.cleancoder.com/uncle-bob/2011/01/11/Blogging.html', 'Clean Code Thoughts', 10);

INSERT INTO blogs (author, url, title, likes) VALUES
  ('Dan Abramov', 'https://overreacted.io/', 'Overreacted — Dan Abramov', 5);

COMMIT;

-- Verify (optional when running interactively):
-- SELECT * FROM blogs;
