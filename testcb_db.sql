CREATE TABLE `author` (
  `author_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
);


ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);


ALTER TABLE `author`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `book` (
  `book_id` int(11) NOT NULL,
  `title` varchar(255)  NOT NULL,
  `edition_date` date NOT NULL
);


ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`);


ALTER TABLE `book`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


CREATE TABLE `author_book` (
  `author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
);


ALTER TABLE `author_book`
  ADD KEY `author_book_ibfk_1` (`author_id`),
  ADD KEY `author_book_ibfk_2` (`book_id`);


ALTER TABLE `author_book`
  ADD CONSTRAINT `author_book_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`),
  ADD CONSTRAINT `author_book_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`);

  INSERT INTO `author` (`name`) VALUES
( 'Giacomo Guilizzoni'),
('Marco Botton'),
('Mariah Maclachlan'),
('Valerie Liberty');