SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS  `big_data_object`;
CREATE TABLE `big_data_object` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `classId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `objectId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `objectKey` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `objectValue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `objectType` text NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `only` (`objectId`,`objectKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='大数据内容表';

DROP TABLE IF EXISTS  `big_data_application`;
CREATE TABLE `big_data_application` (
  `appId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '应用Id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '应用名',
  `appKey` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '应用Key',
  `appSecret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '应用Secret',
  `creatorId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '创建人Id',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='大数据应用表';

DROP TABLE IF EXISTS  `big_data_class`;
CREATE TABLE `big_data_class` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '类Id',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '类名',
  `appId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '关联应用Id',
  `creatorId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '创建人Id',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index` (`name`,`appId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='大数据类名表';

DROP TABLE IF EXISTS  `user`;
CREATE TABLE `user` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户ID',
  `account` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '登录密码',
  `email` varchar(200) NOT NULL COMMENT '邮箱',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

/* PROCEDURES */;
DROP PROCEDURE IF EXISTS `dorepeat`;
DELIMITER $$
CREATE PROCEDURE `dorepeat`(IN p1 INT)
BEGIN
  DECLARE x INT DEFAULT 0;
END
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS `REGISTER_STUDENTS_PROC`;
DELIMITER $$
CREATE PROCEDURE `REGISTER_STUDENTS_PROC`(out objectKeys TEXT)
BEGIN
    DECLARE Done INT DEFAULT 0;
    DECLARE meta_key TEXT;
	DECLARE SQL_FOR_CONCAT varchar(500) DEFAULT "SELECT objectId";
    DECLARE C_META CURSOR FOR SELECT objectKey FROM big_data_object group by objectKey;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET Done = 1;
    OPEN C_META; 
    FETCH C_META INTO meta_key;
    WHILE Done <> 1 DO
        SET SQL_FOR_CONCAT = concat(SQL_FOR_CONCAT,",MAX(CASE objectKey WHEN ",meta_key," THEN objectValue ELSE '' END ) ",meta_key);
        FETCH C_META INTO meta_key;
    END WHILE;
    CLOSE C_META;
	set @sql = SQL_FOR_CONCAT + " INTO objectKeys FROM big_data_object where classId = 'a' GROUP BY objectId";
	PREPARE p_sqlstr FROM @sql;
	EXECUTE p_sqlstr;
	DEALLOCATE PREPARE p_sqlstr;
END
$$
DELIMITER ;

/* FUNCTIONS */;
DROP FUNCTION IF EXISTS `hello`;
DELIMITER $$
CREATE FUNCTION `hello`(s CHAR(20)) RETURNS char(50) CHARSET utf8mb4
    DETERMINISTIC
RETURN 'select * from big_data_object'
$$
DELIMITER ;

