DROP DATABASE if exists contacts_db;
CREATE DATABASE contacts_db;
USE contacts_db;
CREATE TABLE contact(
   contact_id INT(11) NOT NULL AUTO_INCREMENT Primary Key,
   contact_name VARCHAR(255) NOT NULL,
   contact_number VARCHAR(11) NOT NULL,
   contact_email VARCHAR(255),
   user_id INT(11) NOT NULL
);
INSERT INTO contact values (101,'Virat Kohli','9876543212','viratkohli@bcci.in',1);
INSERT INTO contact values (102,'Dhoni','9122321122','dhoni@csk.in',1);
CREATE TABLE user(
   user_id INT(11) NOT NULL AUTO_INCREMENT Primary Key,
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   secret VARCHAR(255) NOT NULL
);
INSERT INTO user values (1,'Tony','tony123@gmail.com','Tony@123','user001');
