CREATE DATABASE `shopdb` CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE `users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT,
                         `phone` varchar(32) COLLATE utf8_bin NOT NULL,
                         `deviceId` varchar(32) COLLATE utf8_bin DEFAULT NULL,
                         `verified` BOOLEAN DEFAULT 0,
                         `password` varchar(64) COLLATE utf8_bin DEFAULT NULL,
                         `firstName` varchar(32) COLLATE utf8_bin DEFAULT NULL,
                         `lastName` varchar(32) COLLATE utf8_bin DEFAULT NULL,
                         `email` varchar(32) COLLATE utf8_bin DEFAULT NULL,
                         `role` enum('super', 'admin','user') COLLATE utf8_bin NOT NULL DEFAULT 'user',
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `users` (`id`, `phone`, `deviceId`, `verified`, `password`, `firstName`, `lastName`, `email`, `role`) VALUES (NULL, '79788102131', NULL, '0', '$2b$05$P.CSgm.uima10H9DQEoBz.lzcqnEikJb3LhXWN9FJdNRpqCNVTDsa', 'Иван', 'Иванов', 's@s.com', 'super');

CREATE TABLE `address` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `country` varchar(128) COLLATE utf8_bin DEFAULT 'RU',
                           `state` varchar(128) COLLATE utf8_bin DEFAULT 'Crimea',
                           `city` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                           `street` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                           `house` varchar(16) COLLATE utf8_bin DEFAULT NULL,
                           `app` varchar(16) COLLATE utf8_bin DEFAULT NULL,
                           `entrance` varchar(16) COLLATE utf8_bin DEFAULT NULL,
                           `floor` varchar(16) COLLATE utf8_bin DEFAULT NULL,
                           `code` varchar(16) COLLATE utf8_bin DEFAULT NULL,
                           `userId` int(11),
                           PRIMARY KEY (`id`),
                           FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `user_address` (
                                `user` int(11) NOT NULL,
                                `address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

ALTER TABLE `user_address`
    ADD UNIQUE KEY `user_address` (`user`,`address`);

CREATE TABLE `banners` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `image` BLOB NOT NULL,
                           `name` varchar(128) COLLATE utf8_bin NOT NULL,
                           `description` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                           `display` BOOLEAN DEFAULT 0,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `category` (
                            `id` int(11) NOT NULL AUTO_INCREMENT,
                            `image` LONGBLOB NOT NULL,
                            `name` varchar(128) COLLATE utf8_bin NOT NULL,
                            `description` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                            `display` BOOLEAN DEFAULT 0,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `product` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `name` varchar(128) COLLATE utf8_bin NOT NULL,
                           `description` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                           `image1` MEDIUMBLOB DEFAULT NULL,
                           `image2` MEDIUMBLOB DEFAULT NULL,
                           `image3` MEDIUMBLOB DEFAULT NULL,
                           `image4` MEDIUMBLOB DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `product_category` (
                                    `product` int(11) NOT NULL,
                                    `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

ALTER TABLE `product_category`
    ADD UNIQUE KEY `product_category` (`product`,`category`);

