-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: stock
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_stock`
--

DROP TABLE IF EXISTS `user_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stock_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_stock_user` (`user_id`),
  KEY `fk_user_stock_stock` (`stock_id`),
  CONSTRAINT `fk_user_stock_stock` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_stock_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_stock`
--

LOCK TABLES `user_stock` WRITE;
/*!40000 ALTER TABLE `user_stock` DISABLE KEYS */;
INSERT INTO `user_stock` VALUES (96,903,1,'Đáng chú ý!'),(100,2216,1,'Nền trên nền, đang siết chặc!'),(102,1077,1,'Tăng mạnh có thể mua!'),(104,1198,1,'Còn lâu!'),(107,1489,1,'Đợi siết chặt!'),(108,1528,1,'có tính hiệu tốt, chờ siết chặt và mua.'),(113,1632,1,'Tăng rồi!'),(114,1660,1,'Chờ siết chăc!'),(130,510,2,'Đùatýthôi'),(133,1081,1,'Chờ siết chăc!'),(135,162,1,'Đáng chú ý!'),(137,626,1,'Đáng chú ý!'),(138,710,1,'Đáng chú ý!'),(139,1062,1,'Đáng chú ý!'),(142,1895,1,'Đáng chú ý!'),(147,5,1,'Đáng chú ý!'),(148,4,1,'Đáng chú ý!'),(149,57,1,'Đáng chú ý!'),(150,510,1,'Đáng chú ý!'),(151,542,1,'Đáng chú ý!'),(152,177,1,'Đáng chú ý!'),(153,196,1,'Đáng chú ý!'),(154,626,1,'Đáng chú ý!'),(155,703,1,'Đáng chú ý!'),(156,708,1,'Đáng chú ý!'),(157,709,1,'Đáng chú ý!'),(158,710,1,'Đáng chú ý!'),(159,1062,1,'Đáng chú ý!'),(160,1266,1,'Đáng chú ý!'),(161,1298,1,'Đáng chú ý!'),(162,1969,1,'Đáng chú ý!'),(163,2027,1,'Đáng chú ý!'),(164,2105,1,'Đáng chú ý!'),(166,1536,1,'Đáng chú ý!'),(168,1632,1,'Đáng chú ý!'),(169,1660,1,'Đáng chú ý!'),(170,1695,1,'Đáng chú ý!'),(171,1704,1,'Đáng chú ý!'),(172,1707,1,'Đáng chú ý!'),(174,1811,1,'Đáng chú ý!'),(186,858,1,'Đáng chú ý!'),(187,2211,1,'Đáng chú ý!');
/*!40000 ALTER TABLE `user_stock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-24 10:08:11
