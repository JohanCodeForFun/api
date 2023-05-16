-- catalogue table
CREATE TABLE catalogue(
	book_id SERIAL NOT NULL PRIMARY KEY,
	author VARCHAR(100) NOT NULL,
	title VARCHAR(200) NOT NULL,
	genre VARCHAR(50) NOT NULL,
	published date
)

-- patron table
CREATE TABLE patron(
	patron_id SERIAL NOT NULL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	joined timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email)
);

-- loan table
CREATE TABLE loan(
  loan_id SERIAL NOT NULL PRIMARY KEY,
  patron_id int NOT NULL,
  book_id int NOT NULL,
  checkout_date date NOT NULL,
  return_date date NOT NULL,
  FOREIGN KEY (patron_id) REFERENCES patron(patron_id), 
  FOREIGN KEY (book_id) REFERENCES catalogue(book_id), 
);

-- change name to table
-- ALTER TABLE catalogue RENAME TO catalogue

-- insert book record
INSERT INTO catalogue(
  author,
  title,
  genre,
  published) 
  VALUES ('Azat Mardan', 'Express.js Guide', 'Technical Documentation', '2014-04-30')
  VALUES ('The PostgreSQL Global Development Group', 'PostgreSQL 15.2 Documentation', 'Technical Documentation', '2023-03-22')
  VALUES ('Bamse', 'Stark av honung', 'Honung', '1985-06-23')

-- insert patron record
INSERT INTO patron(
	first_name,
	last_name,
	email, 
	created) 
  VALUES ('Johan', 'Hellberg', 'johan@jhellberg.com', current_timestamp);
  VALUES ('Nalle', 'Puh', 'nalle@mail.com', current_timestamp);
  VALUES ('Christopher', 'Robinson', 'chris@robinson.com', current_timestamp);

-- insert loan record
INSERT INTO loan(
  patron_id,
  book_id,
  checkout_date,
  return_date
) VALUES(
  '2',
  '3',
  current_date,
  current_date + 14
);

-- SELECT * FROM loan;

-- update all items where column is null
-- UPDATE catalogue SET quantity = (trunc(random()*5)) WHERE quantity IS NULL;