
-- library table
CREATE TABLE library(
	book_id SERIAL NOT NULL PRIMARY KEY,
	author VARCHAR(100),
	title VARCHAR(200),
	genre VARCHAR(100),
	published DATE
)

-- insert record
INSERT INTO library(
  author,
  title,
  genre,
  published) 
  VALUES ('Robert Jordan', 'The Wheel of Time', 'Fantasy', '1999-01-08')