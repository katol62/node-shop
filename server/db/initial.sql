CREATE DATABASE `shopdb` CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE `users` (
                         `id` int(11) NOT NULL AUTO_INCREMENT,
                         `phone` varchar(128) COLLATE utf8_bin NOT NULL,
                         'verified' BOOLEAN DEFAULT 0,
                         `password` varchar(128) COLLATE utf8_bin NOT NULL,
                         `firstName` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                         `lastName` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                         `email` varchar(128) COLLATE utf8_bin DEFAULT NULL,
                         `role` enum('super', 'admin','user') COLLATE utf8_bin NOT NULL DEFAULT 'user',
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin

CREATE TABLE `user_address` (
                                `user` int(11) NOT NULL,
                                `address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

ALTER TABLE `user_address`
    ADD UNIQUE KEY `user_address` (`user`,`address`);
