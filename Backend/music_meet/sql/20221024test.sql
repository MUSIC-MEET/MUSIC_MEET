-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: music_meet
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminNum` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `pw` varchar(100) NOT NULL,
  `authority` int NOT NULL DEFAULT '3',
  PRIMARY KEY (`adminNum`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'idtest','$2a$10$l8dRv3.sUfG3xPm74kk5K.71OYB8JyqzchJVgmDTY3e6Z0WMNBQoa',3),(2,'abc50050','$2a$10$DUD3kWg7unxOldFAmjh8xOIc/tjcLjzqraUAAaOQIfihn5UoUuaoe',3),(3,'test0','$2a$10$yWOOUfM./LNZRsVpYg1LROrElep86.WnQmbpNV2vC0XeZtSqbv7gC',3),(4,'kjr123','$2a$10$/O3IYxMkpnlKBD2opoxvGeJy5622lmcYkbI926QkII9KooOPb/EbC',3);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baladboard`
--

DROP TABLE IF EXISTS `baladboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baladboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_baladBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_baladBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_baladBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_baladBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baladboard`
--

LOCK TABLES `baladboard` WRITE;
/*!40000 ALTER TABLE `baladboard` DISABLE KEYS */;
INSERT INTO `baladboard` VALUES (1,'개인적으로',4,'내가 아니라도 좋은듯',0,0,0,'2022-10-24 15:37:20',0);
/*!40000 ALTER TABLE `baladboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baladboardcommentvote`
--

DROP TABLE IF EXISTS `baladboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baladboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_baladBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_baladBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_baladBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `baladcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_baladBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baladboardcommentvote`
--

LOCK TABLES `baladboardcommentvote` WRITE;
/*!40000 ALTER TABLE `baladboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `baladboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baladboardvote`
--

DROP TABLE IF EXISTS `baladboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baladboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_baladBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_baladBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_baladBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `baladboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_baladBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baladboardvote`
--

LOCK TABLES `baladboardvote` WRITE;
/*!40000 ALTER TABLE `baladboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `baladboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `baladcomment`
--

DROP TABLE IF EXISTS `baladcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baladcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_baladComment_1` (`usernum`),
  KEY `FK_baladBoard_TO_baladComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_baladComment_1` (`state`),
  CONSTRAINT `FK_baladBoard_TO_baladComment_1` FOREIGN KEY (`boardnum`) REFERENCES `baladboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_baladComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_baladComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baladcomment`
--

LOCK TABLES `baladcomment` WRITE;
/*!40000 ALTER TABLE `baladcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `baladcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bugschart`
--

DROP TABLE IF EXISTS `bugschart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bugschart` (
  `rank` int NOT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `singer` varchar(50) DEFAULT NULL,
  `img_src` varchar(200) DEFAULT NULL,
  `sitecode` int NOT NULL,
  PRIMARY KEY (`rank`),
  KEY `FK_ChartSite_TO_bugsChart_1` (`sitecode`),
  CONSTRAINT `FK_ChartSite_TO_bugsChart_1` FOREIGN KEY (`sitecode`) REFERENCES `chartsite` (`sitecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bugschart`
--

LOCK TABLES `bugschart` WRITE;
/*!40000 ALTER TABLE `bugschart` DISABLE KEYS */;
INSERT INTO `bugschart` VALUES (1,'2022-10-24 16:36:15','Nxde','(여자)아이들','https://image.bugsm.co.kr/album/images/50/40807/4080705.jpg?version=20221020022905.0',3),(2,'2022-10-24 16:36:15','ANTIFRAGILE','LE SSERAFIM (르세라핌)','https://image.bugsm.co.kr/album/images/50/40807/4080706.jpg?version=20221018063823.0',3),(3,'2022-10-24 16:36:15','After LIKE','IVE (아이브)','https://image.bugsm.co.kr/album/images/50/40789/4078936.jpg?version=20220824005434.0',3),(4,'2022-10-24 16:36:15','Shut Down','BLACKPINK','https://image.bugsm.co.kr/album/images/50/40788/4078880.jpg?version=20221014002940.0',3),(5,'2022-10-24 16:36:15','Hype Boy','NewJeans','https://image.bugsm.co.kr/album/images/50/40780/4078016.jpg?version=20221014011218.0',3),(6,'2022-10-24 16:36:15','우린 그렇게 사랑해서','강민경 강민경','https://image.bugsm.co.kr/album/images/50/204951/20495162.jpg?version=20220929011304.0',3),(7,'2022-10-24 16:36:15','ILLELLA (일낼라)','마마무(Mamamoo)','https://image.bugsm.co.kr/album/images/50/40805/4080525.jpg?version=20221012063733.0',3),(8,'2022-10-24 16:36:15','사건의 지평선','윤하(Younha/ユンナ)','https://image.bugsm.co.kr/album/images/50/40734/4073469.jpg?version=20220412011318.0',3),(9,'2022-10-24 16:36:15','Pink Venom','BLACKPINK','https://image.bugsm.co.kr/album/images/50/40788/4078880.jpg?version=20221014002940.0',3),(10,'2022-10-24 16:36:15','Rush Hour (Feat. j-hope of BTS)','Crush','https://image.bugsm.co.kr/album/images/50/204944/20494485.jpg?version=20220924004918.0',3),(11,'2022-10-24 16:36:15','Attention','NewJeans','https://image.bugsm.co.kr/album/images/50/40780/4078016.jpg?version=20221014011218.0',3),(12,'2022-10-24 16:36:15','Monologue','테이(Tei)','https://image.bugsm.co.kr/album/images/50/40798/4079823.jpg?version=20221022004025.0',3),(13,'2022-10-24 16:36:15','딱 10CM만','10CM 10CM','https://image.bugsm.co.kr/album/images/50/40800/4080055.jpg?version=20220926063623.0',3),(14,'2022-10-24 16:36:15','새삥 (Prod. ZICO) (Feat. 호미들)','지코','https://image.bugsm.co.kr/album/images/50/204905/20490588.jpg?version=20220927020129.0',3),(15,'2022-10-24 16:36:15','LOVE DIVE','IVE (아이브)','https://image.bugsm.co.kr/album/images/50/40737/4073710.jpg?version=20220426143556.0',3),(16,'2022-10-24 16:36:15','파노라마','이찬혁','https://image.bugsm.co.kr/album/images/50/40807/4080714.jpg?version=20221019002848.0',3),(17,'2022-10-24 16:36:15','Cookie','NewJeans','https://image.bugsm.co.kr/album/images/50/40780/4078016.jpg?version=20221014011218.0',3),(18,'2022-10-24 16:36:15','자격지심 (Feat. ZICO)','BE\'O (비오)','https://image.bugsm.co.kr/album/images/50/40802/4080200.jpg?version=20220930063546.0',3),(19,'2022-10-24 16:36:15','너에게 하지 못한 말','김희재','https://image.bugsm.co.kr/album/images/50/40808/4080868.jpg?version=20221024002527.0',3),(20,'2022-10-24 16:36:15','When I Get Old','Christopher(크리스토퍼) Christopher(크리스토퍼)','https://image.bugsm.co.kr/album/images/50/199188/19918891.jpg?version=20221021064153.0',3),(21,'2022-10-24 16:36:15','그때로 돌아가','로이킴','https://image.bugsm.co.kr/album/images/50/204991/20499166.jpg?version=20221015015936.0',3),(22,'2022-10-24 16:36:15','진심이었던 사람만 바보가 돼','권진아','https://image.bugsm.co.kr/album/images/50/40805/4080594.jpg?version=20221014064015.0',3),(23,'2022-10-24 16:36:15','LAW (Prod. Czaer)','윤미래 윤미래','https://image.bugsm.co.kr/album/images/50/204905/20490588.jpg?version=20220927020129.0',3),(24,'2022-10-24 16:36:15','사랑아','KCM','https://image.bugsm.co.kr/album/images/50/40809/4080909.jpg?version=20221024063151.0',3),(25,'2022-10-24 16:36:15','I Don’t Think That I Like Her','Charlie Puth(찰리 푸스)','https://image.bugsm.co.kr/album/images/50/40797/4079758.jpg?version=20220920023605.0',3),(26,'2022-10-24 16:36:15','FEARLESS','LE SSERAFIM (르세라핌)','https://image.bugsm.co.kr/album/images/50/40751/4075173.jpg?version=20221014002609.0',3),(27,'2022-10-24 16:36:15','ELEVEN','IVE (아이브)','https://image.bugsm.co.kr/album/images/50/40683/4068361.jpg?version=20220406015559.0',3),(28,'2022-10-24 16:36:15','그래서 그대는','이영현','https://image.bugsm.co.kr/album/images/50/40804/4080483.jpg?version=20221018141821.0',3),(29,'2022-10-24 16:36:15','Change','(여자)아이들','https://image.bugsm.co.kr/album/images/50/40807/4080705.jpg?version=20221020022905.0',3),(30,'2022-10-24 16:36:15','내 기쁨은 너가 벤틀리를 끄는 거야','김승민','https://image.bugsm.co.kr/album/images/50/204267/20426728.jpg?version=20220323020729.0',3),(31,'2022-10-24 16:36:15','주저하는 연인들을 위해','잔나비','https://image.bugsm.co.kr/album/images/50/202371/20237198.jpg?version=20210421045158.0',3),(32,'2022-10-24 16:36:15','TOMBOY','(여자)아이들','https://image.bugsm.co.kr/album/images/50/40724/4072414.jpg?version=20220315063707.0',3),(33,'2022-10-24 16:36:15','불륜','비비(BIBI)','https://image.bugsm.co.kr/album/images/50/40801/4080101.jpg?version=20221024130007.0',3),(34,'2022-10-24 16:36:15','그라데이션','10CM','https://image.bugsm.co.kr/album/images/50/40773/4077389.jpg?version=20220706005646.0',3),(35,'2022-10-24 16:36:15','취중고백','김민석 (멜로망스)','https://image.bugsm.co.kr/album/images/50/40691/4069154.jpg?version=20211219180024.0',3),(36,'2022-10-24 16:36:15','그때 그 순간 그대로 (그그그)','WSG워너비 (가야G)','https://image.bugsm.co.kr/album/images/50/40775/4077595.jpg?version=20220714005910.0',3),(37,'2022-10-24 16:36:15','도깨비불 (Illusion)','aespa','https://image.bugsm.co.kr/album/images/50/204715/20471520.jpg?version=20220721043332.0',3),(38,'2022-10-24 16:36:15','LOVE','(여자)아이들','https://image.bugsm.co.kr/album/images/50/40807/4080705.jpg?version=20221020022905.0',3),(39,'2022-10-24 16:36:15','Girls','aespa','https://image.bugsm.co.kr/album/images/50/204715/20471520.jpg?version=20220721043332.0',3),(40,'2022-10-24 16:36:15','사랑인가 봐','멜로망스(MeloMance)','https://image.bugsm.co.kr/album/images/50/40713/4071363.jpg?version=20220330120007.0',3),(41,'2022-10-24 16:36:15','Reset','(여자)아이들','https://image.bugsm.co.kr/album/images/50/40807/4080705.jpg?version=20221020022905.0',3),(42,'2022-10-24 16:36:15','밤의 공원','잔나비','https://image.bugsm.co.kr/album/images/50/40594/4059420.jpg?version=20220531010207.0',3),(43,'2022-10-24 16:36:15','그 밤 (The Night)','엔플라잉(N.Flying)','https://image.bugsm.co.kr/album/images/50/40804/4080492.jpg?version=20221022012834.0',3),(44,'2022-10-24 16:36:15','DICE','NMIXX','https://image.bugsm.co.kr/album/images/50/204934/20493467.jpg?version=20220920005959.0',3),(45,'2022-10-24 16:36:15','정이라고 하자 (Feat. 10CM)','BIG Naughty (서동현)','https://image.bugsm.co.kr/album/images/50/40745/4074520.jpg?version=20220421064211.0',3),(46,'2022-10-24 16:36:15','That\'s Hilarious','Charlie Puth(찰리 푸스)','https://image.bugsm.co.kr/album/images/50/176713/17671399.jpg?version=20220915014136.0',3),(47,'2022-10-24 16:36:15','FOREVER 1','소녀시대 (GIRLS\' GENERATION)','https://image.bugsm.co.kr/album/images/50/204845/20484595.jpg?version=20220818012053.0',3),(48,'2022-10-24 16:36:15','다정히 내 이름을 부르면','경서예지 경서예지','https://image.bugsm.co.kr/album/images/50/40452/4045282.jpg?version=20210927154638.0',3),(49,'2022-10-24 16:36:15','Talk that Talk','TWICE (트와이스)','https://image.bugsm.co.kr/album/images/50/204888/20488834.jpg?version=20220924003716.0',3),(50,'2022-10-24 16:36:15','나의 X에게','경서','https://image.bugsm.co.kr/album/images/50/40747/4074701.jpg?version=20220425063233.0',3),(51,'2022-10-24 16:36:15','Off My Face','Justin Bieber(저스틴 비버)','https://image.bugsm.co.kr/album/images/50/151758/15175845.jpg?version=20220701010601.0',3),(52,'2022-10-24 16:36:15','너의 모든 순간','성시경','https://image.bugsm.co.kr/album/images/50/4132/413209.jpg?version=20210203135508.0',3),(53,'2022-10-24 16:36:15','보고싶었어','WSG워너비 (4FIRE)','https://image.bugsm.co.kr/album/images/50/40775/4077595.jpg?version=20220714005910.0',3),(54,'2022-10-24 16:36:15','Left and Right (Feat. Jung Kook of BTS)','Charlie Puth(찰리 푸스) Charlie Puth(찰리 푸스)','https://image.bugsm.co.kr/album/images/50/40770/4077049.jpg?version=20220922015539.0',3),(55,'2022-10-24 16:36:15','Dangerously','Charlie Puth(찰리 푸스)','https://image.bugsm.co.kr/album/images/50/5277/527746.jpg?version=20210512100651.0',3),(56,'2022-10-24 16:36:15','POP!','나연 (TWICE)','https://image.bugsm.co.kr/album/images/50/204758/20475802.jpg?version=20220721025316.0',3),(57,'2022-10-24 16:36:15','SNEAKERS','ITZY (있지)','https://image.bugsm.co.kr/album/images/50/204799/20479942.jpg?version=20220824005253.0',3),(58,'2022-10-24 16:36:15','No Celestial','LE SSERAFIM (르세라핌)','https://image.bugsm.co.kr/album/images/50/40807/4080706.jpg?version=20221018111903.0',3),(59,'2022-10-24 16:36:15','내가 아니라도','주호','https://image.bugsm.co.kr/album/images/50/40732/4073229.jpg?version=20220325180012.0',3),(60,'2022-10-24 16:36:15','사랑은 늘 도망가','임영웅','https://image.bugsm.co.kr/album/images/50/40658/4065831.jpg?version=20211106011825.0',3),(61,'2022-10-24 16:36:15','My First Love (나와 결혼해 줄래요)','허각 허각','https://image.bugsm.co.kr/album/images/50/40805/4080595.jpg?version=20221024135750.0',3),(62,'2022-10-24 16:36:15','모든 날, 모든 순간 (Every day, Every Moment)','폴킴(Paul Kim)','https://image.bugsm.co.kr/album/images/50/201547/20154722.jpg?version=20190515010725.0',3),(63,'2022-10-24 16:36:15','드라마','아이유(IU)','https://image.bugsm.co.kr/album/images/50/40695/4069567.jpg?version=20220104003927.0',3),(64,'2022-10-24 16:36:15','해요 (2022)','#안녕','https://image.bugsm.co.kr/album/images/50/204720/20472041.jpg?version=20220608011946.0',3),(65,'2022-10-24 16:36:15','I Ain\'t Worried','OneRepublic(원리퍼블릭)','https://image.bugsm.co.kr/album/images/50/180472/18047275.jpg?version=20220805002616.0',3),(66,'2022-10-24 16:36:15','That That (prod. & feat. SUGA of BTS)','싸이 (PSY)','https://image.bugsm.co.kr/album/images/50/204651/20465114.jpg?version=20220604011441.0',3),(67,'2022-10-24 16:36:15','No Rules','백호','https://image.bugsm.co.kr/album/images/50/40805/4080554.jpg?version=20221013063434.0',3),(68,'2022-10-24 16:36:15','일과 이분의 일','츄 (이달의 소녀)','https://image.bugsm.co.kr/album/images/50/40793/4079381.jpg?version=20220905063545.0',3),(69,'2022-10-24 16:36:15','LOVE me','BE\'O (비오)','https://image.bugsm.co.kr/album/images/50/40740/4074098.jpg?version=20220413063847.0',3),(70,'2022-10-24 16:36:15','폭망 (I Like You)','엔플라잉(N.Flying)','https://image.bugsm.co.kr/album/images/50/40804/4080492.jpg?version=20221022012834.0',3),(71,'2022-10-24 16:36:15','STAY','The Kid LAROI The Kid LAROI','https://image.bugsm.co.kr/album/images/50/158177/15817728.jpg?version=20220426210018.0',3),(72,'2022-10-24 16:36:15','희재','성시경','https://image.bugsm.co.kr/album/images/50/90006/9000635.jpg?version=20211216021442.0',3),(73,'2022-10-24 16:36:15','Ready For Love','BLACKPINK','https://image.bugsm.co.kr/album/images/50/40788/4078880.jpg?version=20221014002940.0',3),(74,'2022-10-24 16:36:15','Love story','볼빨간사춘기','https://image.bugsm.co.kr/album/images/50/40742/4074262.jpg?version=20220716015646.0',3),(75,'2022-10-24 16:36:15','INVU','태연 (TAEYEON)','https://image.bugsm.co.kr/album/images/50/204506/20450649.jpg?version=20220428021409.0',3),(76,'2022-10-24 16:36:15','Feel My Rhythm','Red Velvet (레드벨벳)','https://image.bugsm.co.kr/album/images/50/204570/20457046.jpg?version=20221021004034.0',3),(77,'2022-10-24 16:36:15','GHOST TOWN','Benson Boone','https://image.bugsm.co.kr/album/images/50/162464/16246413.jpg?version=20220105012033.0',3),(78,'2022-10-24 16:36:15','고백 (영화 \'동감\' X 츄 (이달의 소녀))','츄 (이달의 소녀)','https://image.bugsm.co.kr/album/images/50/40806/4080665.jpg?version=20221017063109.0',3),(79,'2022-10-24 16:36:15','눈을 감으면','WSG워너비','https://image.bugsm.co.kr/album/images/50/40784/4078494.jpg?version=20220807063750.0',3),(80,'2022-10-24 16:36:15','사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 우리 함께했던 시간들이 자꾸 내 마음을 가둬두네','잔나비','https://image.bugsm.co.kr/album/images/50/4480/448006.jpg?version=20220818154342.0',3),(81,'2022-10-24 16:36:15','다시 사랑한다면 (니글니글 버터플라이)','김필(Kim Feel)','https://image.bugsm.co.kr/album/images/50/5486/548651.jpg?version=20210925003443.0',3),(82,'2022-10-24 16:36:15','못해','김나영','https://image.bugsm.co.kr/album/images/50/204971/20497133.jpg?version=20221006011059.0',3),(83,'2022-10-24 16:36:15','strawberry moon','아이유(IU)','https://image.bugsm.co.kr/album/images/50/40662/4066238.jpg?version=20211020063535.0',3),(84,'2022-10-24 16:36:15','Charlie Be Quiet!','Charlie Puth(찰리 푸스)','https://image.bugsm.co.kr/album/images/50/40801/4080158.jpg?version=20221001070623.0',3),(85,'2022-10-24 16:36:15','가수가 된 이유','신용재 (2F)','https://image.bugsm.co.kr/album/images/50/3365/336587.jpg?version=20211216011212.0',3),(86,'2022-10-24 16:36:15','봄여름가을겨울 (Still Life)','BIGBANG (빅뱅)','https://image.bugsm.co.kr/album/images/50/40736/4073653.jpg?version=20220408004457.0',3),(87,'2022-10-24 16:36:15','STAR WALKIN\' (League of Legends Worlds Anthem)','Lil Nas X','https://image.bugsm.co.kr/album/images/50/40800/4080021.jpg?version=20221006041054.0',3),(88,'2022-10-24 16:36:15','팡파레','다비치','https://image.bugsm.co.kr/album/images/50/204681/20468120.jpg?version=20220518014558.0',3),(89,'2022-10-24 16:36:15','신호등','이무진','https://image.bugsm.co.kr/album/images/50/40448/4044879.jpg?version=20210515065000.0',3),(90,'2022-10-24 16:36:15','난, 너를','김필(Kim Feel)','https://image.bugsm.co.kr/album/images/50/40788/4078825.jpg?version=20220824002931.0',3),(91,'2022-10-24 16:36:15','MY BAG','(여자)아이들','https://image.bugsm.co.kr/album/images/50/40724/4072414.jpg?version=20220315063707.0',3),(92,'2022-10-24 16:36:15','사랑은...향기를 남기고','테이(Tei)','https://image.bugsm.co.kr/album/images/50/80000/8000045.jpg?version=20211215012605.0',3),(93,'2022-10-24 16:36:15','parachute','John K','https://image.bugsm.co.kr/album/images/50/149170/14917009.jpg?version=20220926160406.0',3),(94,'2022-10-24 16:36:15','About Damn Time','Lizzo','https://image.bugsm.co.kr/album/images/50/40742/4074254.jpg?version=20220712021834.0',3),(95,'2022-10-24 16:36:15','이유','신용재 (2F)','https://image.bugsm.co.kr/album/images/50/2480/248009.jpg?version=20210421040735.0',3),(96,'2022-10-24 16:36:15','아프고 아픈 이름','포맨 (4MEN)','https://image.bugsm.co.kr/album/images/50/204998/20499807.jpg?version=20221020003546.0',3),(97,'2022-10-24 16:36:15','한 밤의 꿈처럼','이보람 (씨야)','https://image.bugsm.co.kr/album/images/50/204898/20489851.jpg?version=20220916002351.0',3),(98,'2022-10-24 16:36:15','Anti-Hero','Taylor Swift(테일러 스위프트)','https://image.bugsm.co.kr/album/images/50/199400/19940060.jpg?version=20221024002217.0',3),(99,'2022-10-24 16:36:15','DOMESTIC (팔각정)','비','https://image.bugsm.co.kr/album/images/50/204997/20499794.jpg?version=20221019023239.0',3),(100,'2022-10-24 16:36:15','I Ain\'t Worried','OneRepublic(원리퍼블릭)','https://image.bugsm.co.kr/album/images/50/179641/17964139.jpg?version=20220805012105.0',3);
/*!40000 ALTER TABLE `bugschart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chartsite`
--

DROP TABLE IF EXISTS `chartsite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chartsite` (
  `sitecode` int NOT NULL,
  `sitename` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`sitecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chartsite`
--

LOCK TABLES `chartsite` WRITE;
/*!40000 ALTER TABLE `chartsite` DISABLE KEYS */;
INSERT INTO `chartsite` VALUES (1,'멜론'),(2,'지니'),(3,'벅스'),(4,'플로');
/*!40000 ALTER TABLE `chartsite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classicboard`
--

DROP TABLE IF EXISTS `classicboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classicboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_classicBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_classicBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_classicBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_classicBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classicboard`
--

LOCK TABLES `classicboard` WRITE;
/*!40000 ALTER TABLE `classicboard` DISABLE KEYS */;
INSERT INTO `classicboard` VALUES (1,'time to say goodbye',2,'들어보셔요',2,1,0,'2022-10-24 15:57:38',0);
/*!40000 ALTER TABLE `classicboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classicboardcommentvote`
--

DROP TABLE IF EXISTS `classicboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classicboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_classicBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_classicBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_classicBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `classiccomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_classicBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classicboardcommentvote`
--

LOCK TABLES `classicboardcommentvote` WRITE;
/*!40000 ALTER TABLE `classicboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `classicboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classicboardvote`
--

DROP TABLE IF EXISTS `classicboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classicboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_classicBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_classicBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_classicBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `classicboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_classicBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classicboardvote`
--

LOCK TABLES `classicboardvote` WRITE;
/*!40000 ALTER TABLE `classicboardvote` DISABLE KEYS */;
INSERT INTO `classicboardvote` VALUES (1,4,1,0);
/*!40000 ALTER TABLE `classicboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classiccomment`
--

DROP TABLE IF EXISTS `classiccomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classiccomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_classicComment_1` (`usernum`),
  KEY `FK_classicBoard_TO_classicComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_classicComment_1` (`state`),
  CONSTRAINT `FK_classicBoard_TO_classicComment_1` FOREIGN KEY (`boardnum`) REFERENCES `classicboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_classicComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_classicComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classiccomment`
--

LOCK TABLES `classiccomment` WRITE;
/*!40000 ALTER TABLE `classiccomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `classiccomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danceboard`
--

DROP TABLE IF EXISTS `danceboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danceboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_danceBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_danceBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_danceBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_danceBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danceboard`
--

LOCK TABLES `danceboard` WRITE;
/*!40000 ALTER TABLE `danceboard` DISABLE KEYS */;
INSERT INTO `danceboard` VALUES (1,'뉴진스',2,'짱 노래 짱 좋다',0,0,0,'2022-10-24 15:57:57',0);
/*!40000 ALTER TABLE `danceboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danceboardcommentvote`
--

DROP TABLE IF EXISTS `danceboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danceboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_danceBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_danceBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_danceBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `dancecomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_danceBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danceboardcommentvote`
--

LOCK TABLES `danceboardcommentvote` WRITE;
/*!40000 ALTER TABLE `danceboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `danceboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danceboardvote`
--

DROP TABLE IF EXISTS `danceboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danceboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_danceBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_danceBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_danceBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `danceboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_danceBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danceboardvote`
--

LOCK TABLES `danceboardvote` WRITE;
/*!40000 ALTER TABLE `danceboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `danceboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dancecomment`
--

DROP TABLE IF EXISTS `dancecomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dancecomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_danceComment_1` (`usernum`),
  KEY `FK_danceBoard_TO_danceComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_danceComment_1` (`state`),
  CONSTRAINT `FK_danceBoard_TO_danceComment_1` FOREIGN KEY (`boardnum`) REFERENCES `danceboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_danceComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_danceComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dancecomment`
--

LOCK TABLES `dancecomment` WRITE;
/*!40000 ALTER TABLE `dancecomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `dancecomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailauth`
--

DROP TABLE IF EXISTS `emailauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailauth` (
  `num` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `encoding_value` varchar(100) NOT NULL,
  PRIMARY KEY (`num`),
  KEY `FK_User_TO_EmailAuth_1` (`usernum`),
  CONSTRAINT `FK_User_TO_EmailAuth_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailauth`
--

LOCK TABLES `emailauth` WRITE;
/*!40000 ALTER TABLE `emailauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flochart`
--

DROP TABLE IF EXISTS `flochart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flochart` (
  `rank` int NOT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `singer` varchar(50) DEFAULT NULL,
  `img_src` varchar(200) DEFAULT NULL,
  `sitecode` int NOT NULL,
  PRIMARY KEY (`rank`),
  KEY `FK_ChartSite_TO_floChart_1` (`sitecode`),
  CONSTRAINT `FK_ChartSite_TO_floChart_1` FOREIGN KEY (`sitecode`) REFERENCES `chartsite` (`sitecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flochart`
--

LOCK TABLES `flochart` WRITE;
/*!40000 ALTER TABLE `flochart` DISABLE KEYS */;
INSERT INTO `flochart` VALUES (1,'2022-10-24 16:36:15','Nxde','(여자)아이들','https://cdn.music-flo.com/image/v2/album/427/760/09/04/409760427_63494a85_s.jpg?1665747591220/dims/resize/75x75/quality/90',4),(2,'2022-10-24 16:36:15','ANTIFRAGILE','LE SSERAFIM (르세라핌)','https://cdn.music-flo.com/image/v2/album/327/792/09/04/409792327_634ca5a0_o.jpg?1665967522011/dims/resize/75x75/quality/90',4),(3,'2022-10-24 16:36:15','After LIKE','IVE (아이브)','https://cdn.music-flo.com/image/v2/album/223/131/09/04/409131223_6302d6a5_s.jpg?1661130406773/dims/resize/75x75/quality/90',4),(4,'2022-10-24 16:36:15','새삥 (Prod. ZICO) (Feat. 호미들)','지코 (ZICO)','https://cdn.music-flo.com/image/v2/album/289/253/09/04/409253289_6311c38c_s.jpg?1662108557697/dims/resize/75x75/quality/90',4),(5,'2022-10-24 16:36:15','Hype Boy','NewJeans','https://cdn.music-flo.com/image/v2/album/847/826/08/04/408826847_62e7289c_s.jpg?1659316382613/dims/resize/75x75/quality/90',4),(6,'2022-10-24 16:36:15','사건의 지평선','윤하','https://cdn.music-flo.com/image/v2/album/089/911/07/04/407911089_6243b0f9_s.jpg?1648603387603/dims/resize/75x75/quality/90',4),(7,'2022-10-24 16:36:15','Attention','NewJeans','https://cdn.music-flo.com/image/v2/album/847/826/08/04/408826847_62e7289c_s.jpg?1659316382613/dims/resize/75x75/quality/90',4),(8,'2022-10-24 16:36:15','Shut Down','BLACKPINK','https://cdn.music-flo.com/image/v2/album/673/103/09/04/409103673_6323f30d_o.jpg?1663300365672/dims/resize/75x75/quality/90',4),(9,'2022-10-24 16:36:15','LOVE DIVE','IVE (아이브)','https://cdn.music-flo.com/image/v2/album/067/967/07/04/407967067_624b980b_s.jpg?1649121294579/dims/resize/75x75/quality/90',4),(10,'2022-10-24 16:36:15','Rush Hour (Feat. j-hope of BTS)','Crush','https://cdn.music-flo.com/image/v2/album/442/489/09/04/409489442_632c2a3f_s.jpg?1663838784634/dims/resize/75x75/quality/90',4),(11,'2022-10-24 16:36:15','Pink Venom','BLACKPINK','https://cdn.music-flo.com/image/v2/album/673/103/09/04/409103673_6323f30d_o.jpg?1663300365672/dims/resize/75x75/quality/90',4),(12,'2022-10-24 16:36:15','Monologue','테이','https://cdn.music-flo.com/image/v2/album/600/449/09/04/409449600_63520c73_o.jpg?1666321524812/dims/resize/75x75/quality/90',4),(13,'2022-10-24 16:36:15','사랑은 늘 도망가','임영웅','https://cdn.music-flo.com/image/v2/album/973/716/06/04/406716973_615eb227_s.jpg?1633595946672/dims/resize/75x75/quality/90',4),(14,'2022-10-24 16:36:15','자격지심 (Feat. ZICO)','BE\'O (비오)','https://cdn.music-flo.com/image/v2/album/215/562/09/04/409562215_6334eece_s.jpg?1664413392238/dims/resize/75x75/quality/90',4),(15,'2022-10-24 16:36:15','딱 10CM만','10CM','https://cdn.music-flo.com/image/v2/album/890/505/09/04/409505890_632d56ee_s.jpg?1663915761048/dims/resize/75x75/quality/90',4),(16,'2022-10-24 16:36:15','그때 그 순간 그대로 (그그그)','WSG워너비 (가야G)','https://cdn.music-flo.com/image/v2/album/080/747/08/04/408747080_62c7dce2_s.jpg?1657265380357/dims/resize/75x75/quality/90',4),(17,'2022-10-24 16:36:15','우리들의 블루스','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(18,'2022-10-24 16:36:15','나의 X에게','경서','https://cdn.music-flo.com/image/v2/album/854/089/08/04/408089854_626246eb_s.jpg?1650607853236/dims/resize/75x75/quality/90',4),(19,'2022-10-24 16:36:15','ELEVEN','IVE (아이브)','https://cdn.music-flo.com/image/v2/album/543/048/07/04/407048543_61a6d895_s.jpg?1638324375781/dims/resize/75x75/quality/90',4),(20,'2022-10-24 16:36:15','다시 만날 수 있을까','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(21,'2022-10-24 16:36:15','Cookie','NewJeans','https://cdn.music-flo.com/image/v2/album/847/826/08/04/408826847_62e7289c_s.jpg?1659316382613/dims/resize/75x75/quality/90',4),(22,'2022-10-24 16:36:15','TOMBOY','(여자)아이들','https://cdn.music-flo.com/image/v2/album/779/766/07/04/407766779_622ea3d0_s.jpg?1647223763916/dims/resize/75x75/quality/90',4),(23,'2022-10-24 16:36:15','그라데이션','10CM','https://cdn.music-flo.com/image/v2/album/327/694/08/04/408694327_62beb573_s.jpg?1656665461446/dims/resize/75x75/quality/90',4),(24,'2022-10-24 16:36:15','이제 나만 믿어요','임영웅','https://cdn.music-flo.com/image/album/893/550/04/04/404550893_5e869142.jpg?1585877314626/dims/resize/75x75/quality/90',4),(25,'2022-10-24 16:36:15','FEARLESS','LE SSERAFIM (르세라핌)','https://cdn.music-flo.com/image/v2/album/361/136/08/04/408136361_626f37cf_s.jpg?1651455952976/dims/resize/75x75/quality/90',4),(26,'2022-10-24 16:36:15','무지개','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(27,'2022-10-24 16:36:15','FOREVER 1','소녀시대 (GIRLS\' GENERATION)','https://cdn.music-flo.com/image/v2/album/242/954/08/04/408954242_62eb872e_s.jpg?1659602736333/dims/resize/75x75/quality/90',4),(28,'2022-10-24 16:36:15','I Don’t Think That I Like Her','Charlie Puth','https://cdn.music-flo.com/image/v2/album/371/357/07/04/407357371_633e6f4d_o.jpg?1665036109523/dims/resize/75x75/quality/90',4),(29,'2022-10-24 16:36:15','내가 아니라도','주호','https://cdn.music-flo.com/image/v2/album/565/880/07/04/407880565_623d46b6_s.jpg?1648182967161/dims/resize/75x75/quality/90',4),(30,'2022-10-24 16:36:15','아버지','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(31,'2022-10-24 16:36:15','보고싶었어','WSG워너비 (4FIRE)','https://cdn.music-flo.com/image/v2/album/080/747/08/04/408747080_62c7dce2_s.jpg?1657265380357/dims/resize/75x75/quality/90',4),(32,'2022-10-24 16:36:15','해요 (2022)','#안녕','https://cdn.music-flo.com/image/v2/album/397/491/08/04/408491397_6299a2d4_o.jpg?1654235861423/dims/resize/75x75/quality/90',4),(33,'2022-10-24 16:36:15','That\'s Hilarious (Explicit Ver.)','Charlie Puth','https://cdn.music-flo.com/image/v2/album/371/357/07/04/407357371_633e6f4d_o.jpg?1665036109523/dims/resize/75x75/quality/90',4),(34,'2022-10-24 16:36:15','인생찬가','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(35,'2022-10-24 16:36:15','취중고백','김민석 (멜로망스)','https://cdn.music-flo.com/image/v2/album/662/145/07/04/407145662_61bc226d_s.jpg?1639719534775/dims/resize/75x75/quality/90',4),(36,'2022-10-24 16:36:15','정이라고 하자 (Feat. 10CM)','BIG Naughty (서동현)','https://cdn.music-flo.com/image/v2/album/162/080/08/04/408080162_625e506d_s.jpg?1650348144179/dims/resize/75x75/quality/90',4),(37,'2022-10-24 16:36:15','SNEAKERS','ITZY (있지)','https://cdn.music-flo.com/image/v2/album/686/785/08/04/408785686_62da4c7f_o.jpg?1658473600792/dims/resize/75x75/quality/90',4),(38,'2022-10-24 16:36:15','너의 모든 순간','성시경','https://cdn.music-flo.com/image/album/938/157/00/04/400157938_5c9f8e8e.jpg?1553960592004/dims/resize/75x75/quality/90',4),(39,'2022-10-24 16:36:15','다정히 내 이름을 부르면','경서예지','https://cdn.music-flo.com/image/v2/album/640/205/06/04/406205640_60a34fe8_s.jpg?1621315562306/dims/resize/75x75/quality/90',4),(40,'2022-10-24 16:36:15','A bientot','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(41,'2022-10-24 16:36:15','That That (prod. & feat. SUGA of BTS)','싸이 (PSY)','https://cdn.music-flo.com/image/v2/album/961/108/08/04/408108961_626a2dfd_o.jpg?1651125758601/dims/resize/75x75/quality/90',4),(42,'2022-10-24 16:36:15','우린 그렇게 사랑해서','강민경','https://cdn.music-flo.com/image/v2/album/037/505/09/04/409505037_632d126d_s.jpg?1663898223145/dims/resize/75x75/quality/90',4),(43,'2022-10-24 16:36:15','손이 참 곱던 그대','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(44,'2022-10-24 16:36:15','사랑해 진짜','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(45,'2022-10-24 16:36:15','사랑인가 봐','멜로망스','https://cdn.music-flo.com/image/v2/album/135/568/07/04/407568135_620df68a_s.jpg?1645082253509/dims/resize/75x75/quality/90',4),(46,'2022-10-24 16:36:15','연애편지','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(47,'2022-10-24 16:36:15','사랑역','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(48,'2022-10-24 16:36:15','모든 날, 모든 순간 (Every day, Every Moment)','폴킴','https://cdn.music-flo.com/image/album/431/369/02/04/402369431.jpg?1655283658197/dims/resize/75x75/quality/90',4),(49,'2022-10-24 16:36:15','사랑해요 그대를','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(50,'2022-10-24 16:36:15','보금자리','임영웅','https://cdn.music-flo.com/image/v2/album/827/064/08/04/408064827_626f999f_s.jpg?1651480994126/dims/resize/75x75/quality/90',4),(51,'2022-10-24 16:36:15','도깨비불 (Illusion)','aespa','https://cdn.music-flo.com/image/v2/album/289/476/08/04/408476289_62c78bd9_s.jpg?1657244636972/dims/resize/75x75/quality/90',4),(52,'2022-10-24 16:36:15','스티커 사진','21학번','https://cdn.music-flo.com/image/v2/album/306/760/08/04/408760306_62cbbb41_o.jpg?1657518914481/dims/resize/75x75/quality/90',4),(53,'2022-10-24 16:36:15','SMILEY (Feat. BIBI)','YENA (최예나)','https://cdn.music-flo.com/image/v2/album/503/314/07/04/407314503_61e11e8e_s.jpg?1642143376727/dims/resize/75x75/quality/90',4),(54,'2022-10-24 16:36:15','STAY (Explicit Ver.)','The Kid LAROI','https://cdn.music-flo.com/image/v2/album/478/345/06/04/406345478_60e49bdf_o.jpg?1625594847644/dims/resize/75x75/quality/90',4),(55,'2022-10-24 16:36:15','POP!','나연 (TWICE)','https://cdn.music-flo.com/image/v2/album/406/635/08/04/408635406_62b2caf5_s.jpg?1655884535359/dims/resize/75x75/quality/90',4),(56,'2022-10-24 16:36:15','LOVE me','BE\'O (비오)','https://cdn.music-flo.com/image/v2/album/966/051/08/04/408051966_6254cfd9_s.jpg?1649725404106/dims/resize/75x75/quality/90',4),(57,'2022-10-24 16:36:15','주저하는 연인들을 위해','잔나비','https://cdn.music-flo.com/image/album/951/514/02/04/402514951_5c9f7728.jpg?1553954602423/dims/resize/75x75/quality/90',4),(58,'2022-10-24 16:36:15','LAW (Prod. Czaer)','윤미래','https://cdn.music-flo.com/image/v2/album/289/253/09/04/409253289_6311c38c_s.jpg?1662108557697/dims/resize/75x75/quality/90',4),(59,'2022-10-24 16:36:15','Love story','볼빨간사춘기','https://cdn.music-flo.com/image/v2/album/660/078/08/04/408078660_625d6315_s.jpg?1650287383241/dims/resize/75x75/quality/90',4),(60,'2022-10-24 16:36:15','어떻게 이별까지 사랑하겠어, 널 사랑하는 거지','AKMU (악뮤)','https://cdn.music-flo.com/image/album/537/299/03/04/403299537_5d8b03e3.jpg?1569391589964/dims/resize/75x75/quality/90',4),(61,'2022-10-24 16:36:15','밤편지','아이유 (IU)','https://cdn.music-flo.com/image/album/931/304/02/04/402304931.jpg?1648451226688/dims/resize/75x75/quality/90',4),(62,'2022-10-24 16:36:15','드라마','아이유 (IU)','https://cdn.music-flo.com/image/v2/album/618/209/07/04/407209618_61cbf2b0_s.jpg?1640755890350/dims/resize/75x75/quality/90',4),(63,'2022-10-24 16:36:15','내 기쁨은 너가 벤틀리를 끄는 거야','김승민','https://cdn.music-flo.com/image/v2/album/598/812/06/04/406812598_616cd7fa_s.jpg?1634523132405/dims/resize/75x75/quality/90',4),(64,'2022-10-24 16:36:15','신호등','이무진','https://cdn.music-flo.com/image/v2/album/625/170/06/04/406170625_609cc0e4_s.jpg?1620885736012/dims/resize/75x75/quality/90',4),(65,'2022-10-24 16:36:15','사랑한다고 말해줘','탑현','https://cdn.music-flo.com/image/v2/album/896/963/08/04/408963896_62eca601_s.jpg?1659676163411/dims/resize/75x75/quality/90',4),(66,'2022-10-24 16:36:15','DICE','NMIXX','https://cdn.music-flo.com/image/v2/album/207/449/09/04/409449207_6323ca7f_s.jpg?1663289984546/dims/resize/75x75/quality/90',4),(67,'2022-10-24 16:36:15','늦은 밤 헤어지긴 너무 아쉬워','케이시 (Kassy)','https://cdn.music-flo.com/image/v2/album/245/361/08/04/408361245_62848bd9_s.jpg?1652853724072/dims/resize/75x75/quality/90',4),(68,'2022-10-24 16:36:15','바라만 본다','MSG워너비(M.O.M)','https://cdn.music-flo.com/image/v2/album/332/330/06/04/406330332_60d58c16_s.jpg?1624607767591/dims/resize/75x75/quality/90',4),(69,'2022-10-24 16:36:15','봄여름가을겨울 (Still Life)','BIGBANG (빅뱅)','https://cdn.music-flo.com/image/v2/album/298/953/07/04/407953298_624a9ecf_o.jpg?1649057488330/dims/resize/75x75/quality/90',4),(70,'2022-10-24 16:36:15','Talk that Talk','TWICE (트와이스)','https://cdn.music-flo.com/image/v2/album/767/144/09/04/409144767_6305dadb_s.jpg?1661328093297/dims/resize/75x75/quality/90',4),(71,'2022-10-24 16:36:15','새벽에 걸려온 너의 전화는','한동근','https://cdn.music-flo.com/image/v2/album/822/884/08/04/408884822_62e34f8c_s.jpg?1659064208829/dims/resize/75x75/quality/90',4),(72,'2022-10-24 16:36:15','Celebrity','아이유 (IU)','https://cdn.music-flo.com/image/v2/album/125/777/05/04/405777125_605c22d9_s.jpg?1616650972022/dims/resize/75x75/quality/90',4),(73,'2022-10-24 16:36:15','밤하늘의 별을 (2020)','경서','https://cdn.music-flo.com/image/v2/album/822/395/05/04/405395822_602b1cf0_s.jpg?1613438194140/dims/resize/75x75/quality/90',4),(74,'2022-10-24 16:36:15','듣고 싶을까','MSG워너비(M.O.M)','https://cdn.music-flo.com/image/v2/album/697/634/07/04/407634697_62184a8d_s.jpg?1645759118865/dims/resize/75x75/quality/90',4),(75,'2022-10-24 16:36:15','CASE 143','Stray Kids (스트레이 키즈)','https://cdn.music-flo.com/image/v2/album/558/658/09/04/409658558_633e7c2d_s.jpg?1665039407187/dims/resize/75x75/quality/90',4),(76,'2022-10-24 16:36:15','떠나보낼 준비해 둘걸 그랬어','임한별','https://cdn.music-flo.com/image/v2/album/526/795/09/04/409795526_634cf5e4_s.jpg?1665988070771/dims/resize/75x75/quality/90',4),(77,'2022-10-24 16:36:15','Feel My Rhythm','Red Velvet (레드벨벳)','https://cdn.music-flo.com/image/v2/album/995/841/07/04/407841995_62342270_s.jpg?1647583859745/dims/resize/75x75/quality/90',4),(78,'2022-10-24 16:36:15','너의 번호를 누르고 (Prod. 영화처럼)','#안녕','https://cdn.music-flo.com/image/album/020/281/04/04/404281020_5de0bc55.jpg?1575009365739/dims/resize/75x75/quality/90',4),(79,'2022-10-24 16:36:15','Next Level','aespa','https://cdn.music-flo.com/image/v2/album/934/197/06/04/406197934_60a203c9_o.jpg?1621230539198/dims/resize/75x75/quality/90',4),(80,'2022-10-24 16:36:15','고백','멜로망스','https://cdn.music-flo.com/image/v2/album/550/505/06/04/406505550_61288fb2_s.jpg?1630048179518/dims/resize/75x75/quality/90',4),(81,'2022-10-24 16:36:15','통화연결음','보라미유','https://cdn.music-flo.com/image/v2/album/922/034/09/04/409034922_62f5ae5d_s.jpg?1660268128566/dims/resize/75x75/quality/90',4),(82,'2022-10-24 16:36:15','사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 우리 함께했던 시간들이 자꾸 내 마음을 가둬두네','잔나비','https://cdn.music-flo.com/image/album/213/186/00/04/400186213_5c9cfa7e.jpg?1553791614954/dims/resize/75x75/quality/90',4),(83,'2022-10-24 16:36:15','그중에 그대를 만나','김호중','https://cdn.music-flo.com/image/v2/album/935/504/09/04/409504935_632d0c7b_s.jpg?1663896701285/dims/resize/75x75/quality/90',4),(84,'2022-10-24 16:36:15','빛이 나는 사람','김호중','https://cdn.music-flo.com/image/v2/album/866/591/08/04/408591866_62ac1021_o.jpg?1655443490886/dims/resize/75x75/quality/90',4),(85,'2022-10-24 16:36:15','Girls','aespa','https://cdn.music-flo.com/image/v2/album/289/476/08/04/408476289_62c78bd9_s.jpg?1657244636972/dims/resize/75x75/quality/90',4),(86,'2022-10-24 16:36:15','INVU','태연 (TAEYEON)','https://cdn.music-flo.com/image/v2/album/065/520/07/04/407520065_62046e9b_s.jpg?1644457630716/dims/resize/75x75/quality/90',4),(87,'2022-10-24 16:36:15','Love poem','아이유 (IU)','https://cdn.music-flo.com/image/album/955/200/04/04/404200955_5dd24da4.jpg?1574063525861/dims/resize/75x75/quality/90',4),(88,'2022-10-24 16:36:15','라일락','아이유 (IU)','https://cdn.music-flo.com/image/v2/album/125/777/05/04/405777125_605c22d9_s.jpg?1616650972022/dims/resize/75x75/quality/90',4),(89,'2022-10-24 16:36:15','I Ain\'t Worried','OneRepublic','https://cdn.music-flo.com/image/v2/album/714/453/08/04/408453714_629024ce_o.jpg?1653613774924/dims/resize/75x75/quality/90',4),(90,'2022-10-24 16:36:15','나의 목소리로','김호중','https://cdn.music-flo.com/image/v2/album/394/580/09/04/409580394_6336689d_o.jpg?1664510111360/dims/resize/75x75/quality/90',4),(91,'2022-10-24 16:36:15','주마등','김호중','https://cdn.music-flo.com/image/v2/album/988/854/08/04/408854988_62dfa5e9_s.jpg?1658824171889/dims/resize/75x75/quality/90',4),(92,'2022-10-24 16:36:15','인생은 뷰티풀','김호중','https://cdn.music-flo.com/image/v2/album/017/328/09/04/409328017_6316f7ae_s.jpg?1662449583563/dims/resize/75x75/quality/90',4),(93,'2022-10-24 16:36:15','못해','김나영','https://cdn.music-flo.com/image/v2/album/257/638/09/04/409638257_633b9bb6_s.jpg?1664850872045/dims/resize/75x75/quality/90',4),(94,'2022-10-24 16:36:15','약속 [約束]','김호중','https://cdn.music-flo.com/image/v2/album/988/854/08/04/408854988_62dfa5e9_s.jpg?1658824171889/dims/resize/75x75/quality/90',4),(95,'2022-10-24 16:36:15','친구','김호중','https://cdn.music-flo.com/image/v2/album/988/854/08/04/408854988_62dfa5e9_s.jpg?1658824171889/dims/resize/75x75/quality/90',4),(96,'2022-10-24 16:36:15','Weekend','태연 (TAEYEON)','https://cdn.music-flo.com/image/v2/album/678/344/06/04/406344678_60e3f655_s.jpg?1625552472078/dims/resize/75x75/quality/90',4),(97,'2022-10-24 16:36:15','바보에게 바보가 (웹툰 \'연애의 발견\' X 이석훈)','이석훈','https://cdn.music-flo.com/image/v2/album/876/755/08/04/408755876_62cb8a8c_o.jpg?1657506445245/dims/resize/75x75/quality/90',4),(98,'2022-10-24 16:36:15','팡파레','다비치','https://cdn.music-flo.com/image/v2/album/830/350/08/04/408350830_6281b3d6_s.jpg?1652667353723/dims/resize/75x75/quality/90',4),(99,'2022-10-24 16:36:15','슬픈등','김호중','https://cdn.music-flo.com/image/v2/album/017/328/09/04/409328017_6316f7ae_s.jpg?1662449583563/dims/resize/75x75/quality/90',4),(100,'2022-10-24 16:36:15','노래해요 (Duet with 최백호)','김호중','https://cdn.music-flo.com/image/v2/album/988/854/08/04/408854988_62dfa5e9_s.jpg?1658824171889/dims/resize/75x75/quality/90',4);
/*!40000 ALTER TABLE `flochart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geniechart`
--

DROP TABLE IF EXISTS `geniechart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `geniechart` (
  `rank` int NOT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `singer` varchar(50) DEFAULT NULL,
  `img_src` varchar(200) DEFAULT NULL,
  `sitecode` int NOT NULL,
  PRIMARY KEY (`rank`),
  KEY `FK_ChartSite_TO_genieChart_1` (`sitecode`),
  CONSTRAINT `FK_ChartSite_TO_genieChart_1` FOREIGN KEY (`sitecode`) REFERENCES `chartsite` (`sitecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geniechart`
--

LOCK TABLES `geniechart` WRITE;
/*!40000 ALTER TABLE `geniechart` DISABLE KEYS */;
INSERT INTO `geniechart` VALUES (1,'2022-10-24 16:36:15','Nxde','(여자)아이들','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/072/254/83072254_1665976983718_1_140x140.JPG/dims/resize/Q_80,0',2),(2,'2022-10-24 16:36:15','ANTIFRAGILE','LE SSERAFIM (르세라핌)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/082/184/83082184_1665969939180_1_140x140.JPG/dims/resize/Q_80,0',2),(3,'2022-10-24 16:36:15','새삥 (Prod. by ZICO) (Feat. 호미들)','지코 (ZICO)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/941/007/82941007_1662445894361_1_140x140.JPG/dims/resize/Q_80,0',2),(4,'2022-10-24 16:36:15','After LIKE','IVE (아이브)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/912/984/82912984_1661135567760_1_140x140.JPG/dims/resize/Q_80,0',2),(5,'2022-10-24 16:36:15','사건의 지평선','윤하 (YOUNHA)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/614/128/82614128_1648619377015_1_140x140.JPG/dims/resize/Q_80,0',2),(6,'2022-10-24 16:36:15','Hype boy','NewJeans','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/842/800/82842800_1659340238924_1_140x140.JPG/dims/resize/Q_80,0',2),(7,'2022-10-24 16:36:15','Rush Hour (Feat. j-hope of BTS)','Crush','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/998/598/82998598_1663838888101_1_140x140.JPG/dims/resize/Q_80,0',2),(8,'2022-10-24 16:36:15','Shut Down','BLACKPINK','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/912/188/82912188_1663300532914_1_140x140.JPG/dims/resize/Q_80,0',2),(9,'2022-10-24 16:36:15','Monologue','테이 (Tei)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/983/095/82983095_1666323297427_1_140x140.JPG/dims/resize/Q_80,0',2),(10,'2022-10-24 16:36:15','Attention','NewJeans','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/842/800/82842800_1659340238924_1_140x140.JPG/dims/resize/Q_80,0',2),(11,'2022-10-24 16:36:15','사랑은 늘 도망가','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/322/594/82322594_1633671778123_1_140x140.JPG/dims/resize/Q_80,0',2),(12,'2022-10-24 16:36:15','Pink Venom','BLACKPINK','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/912/188/82912188_1663300532914_1_140x140.JPG/dims/resize/Q_80,0',2),(13,'2022-10-24 16:36:15','LOVE DIVE','IVE (아이브)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/624/363/82624363_1649123068092_1_140x140.JPG/dims/resize/Q_80,0',2),(14,'2022-10-24 16:36:15','우리들의 블루스','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(15,'2022-10-24 16:36:15','다시 만날 수 있을까','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(16,'2022-10-24 16:36:15','자격지심 (Feat. ZICO)','BE\'O (비오)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/024/008/83024008_1664434674893_1_140x140.JPG/dims/resize/Q_80,0',2),(17,'2022-10-24 16:36:15','이제 나만 믿어요','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/410/156/81410156_1585878705990_1_140x140.JPG/dims/resize/Q_80,0',2),(18,'2022-10-24 16:36:15','무지개','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(19,'2022-10-24 16:36:15','그때 그 순간 그대로 (그그그)','WSG워너비 (가야G)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/814/458/82814458_1657270030475_1_140x140.JPG/dims/resize/Q_80,0',2),(20,'2022-10-24 16:36:15','아버지','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(21,'2022-10-24 16:36:15','우린 그렇게 사랑해서','강민경 (다비치) & 잔나비 최정훈','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/002/608/83002608_1664167182058_1_140x140.JPG/dims/resize/Q_80,0',2),(22,'2022-10-24 16:36:15','TOMBOY','(여자)아이들','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/586/132/82586132_1647227017471_1_140x140.JPG/dims/resize/Q_80,0',2),(23,'2022-10-24 16:36:15','A bientot','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(24,'2022-10-24 16:36:15','사랑인가 봐','멜로망스 (MeloMance)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/540/759/82540759_1645152997958_1_140x140.JPG/dims/resize/Q_80,0',2),(25,'2022-10-24 16:36:15','딱 10CM만','10CM & BIG Naughty (서동현)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/004/985/83004985_1663918763683_1_140x140.JPG/dims/resize/Q_80,0',2),(26,'2022-10-24 16:36:15','손이 참 곱던 그대','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(27,'2022-10-24 16:36:15','사랑해 진짜','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(28,'2022-10-24 16:36:15','Cookie','NewJeans','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/842/800/82842800_1659340238924_1_140x140.JPG/dims/resize/Q_80,0',2),(29,'2022-10-24 16:36:15','사랑역','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(30,'2022-10-24 16:36:15','보금자리','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(31,'2022-10-24 16:36:15','연애편지','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(32,'2022-10-24 16:36:15','사랑해요 그대를','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(33,'2022-10-24 16:36:15','내가 아니라도','주호','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/602/752/82602752_1648117827255_1_140x140.JPG/dims/resize/Q_80,0',2),(34,'2022-10-24 16:36:15','That\'s Hilarious','Charlie Puth','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/484/273/82484273_1665067200754_1_140x140.JPG/dims/resize/Q_80,0',2),(35,'2022-10-24 16:36:15','보고싶었어','WSG워너비 (4FIRE)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/814/458/82814458_1657270030475_1_140x140.JPG/dims/resize/Q_80,0',2),(36,'2022-10-24 16:36:15','LAW (Prod. by Czaer)','비비 (BIBI) & 윤미래','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/941/007/82941007_1662445894361_1_140x140.JPG/dims/resize/Q_80,0',2),(37,'2022-10-24 16:36:15','그라데이션','10CM','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/798/875/82798875_1656663217923_1_140x140.JPG/dims/resize/Q_80,0',2),(38,'2022-10-24 16:36:15','인생찬가','임영웅','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/638/032/82638032_1651479062721_1_140x140.JPG/dims/resize/Q_80,0',2),(39,'2022-10-24 16:36:15','다정히 내 이름을 부르면','경서예지 & 전건호','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/051/769/82051769_1621328428038_1_140x140.JPG/dims/resize/Q_80,0',2),(40,'2022-10-24 16:36:15','That That (Prod. & Feat. SUGA of BTS)','싸이 (Psy)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/662/688/82662688_1651196114166_1_140x140.JPG/dims/resize/Q_80,0',2),(41,'2022-10-24 16:36:15','나의 X에게','경서','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/651/870/82651870_1650613662156_1_140x140.JPG/dims/resize/Q_80,0',2),(42,'2022-10-24 16:36:15','해요 (2022)','#안녕','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/727/185/82727185_1654248208229_1_140x140.JPG/dims/resize/Q_80,0',2),(43,'2022-10-24 16:36:15','ELEVEN','IVE (아이브)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/417/569/82417569_1638329272770_1_140x140.JPG/dims/resize/Q_80,0',2),(44,'2022-10-24 16:36:15','FOREVER 1','소녀시대 (GIRLS\' GENERATION)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/874/768/82874768_1659669322718_1_140x140.JPG/dims/resize/Q_80,0',2),(45,'2022-10-24 16:36:15','취중고백','김민석 (멜로망스)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/443/459/82443459_1639718817315_1_140x140.JPG/dims/resize/Q_80,0',2),(46,'2022-10-24 16:36:15','FEARLESS','LE SSERAFIM (르세라핌)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/669/125/82669125_1651458341829_1_140x140.JPG/dims/resize/Q_80,0',2),(47,'2022-10-24 16:36:15','정이라고 하자 (Feat. 10CM)','BIG Naughty (서동현)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/645/633/82645633_1650352944627_1_140x140.JPG/dims/resize/Q_80,0',2),(48,'2022-10-24 16:36:15','내 기쁨은 너가 벤틀리를 끄는 거야','김승민','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/324/427/82324427_1634605967340_1_140x140.JPG/dims/resize/Q_80,0',2),(49,'2022-10-24 16:36:15','LOVE me','BE\'O (비오)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/631/622/82631622_1649731154266_1_140x140.JPG/dims/resize/Q_80,0',2),(50,'2022-10-24 16:36:15','너의 모든 순간','성시경','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/401/547/80401547_1392172764399_1_140x140.JPG/dims/resize/Q_80,0',2),(51,'2022-10-24 16:36:15','SNEAKERS','ITZY (있지)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/826/382/82826382_1658480107476_1_140x140.JPG/dims/resize/Q_80,0',2),(52,'2022-10-24 16:36:15','Love story','볼빨간사춘기','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/644/646/82644646_1650435003028_1_140x140.JPG/dims/resize/Q_80,0',2),(53,'2022-10-24 16:36:15','Stay','The Kid LAROI & Justin Bieber','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/130/513/82130513_1625722837604_1_140x140.JPG/dims/resize/Q_80,0',2),(54,'2022-10-24 16:36:15','Dynamite','방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/545/399/81545399_1600401677905_1_140x140.JPG/dims/resize/Q_80,0',2),(55,'2022-10-24 16:36:15','MY BAG','(여자)아이들','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/586/132/82586132_1647227017471_1_140x140.JPG/dims/resize/Q_80,0',2),(56,'2022-10-24 16:36:15','I Don\'t Think That I Like Her','Charlie Puth','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/484/273/82484273_1665067200754_1_140x140.JPG/dims/resize/Q_80,0',2),(57,'2022-10-24 16:36:15','Butter','방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/055/361/82055361_1621563082144_1_140x140.JPG/dims/resize/Q_80,0',2),(58,'2022-10-24 16:36:15','봄여름가을겨울 (Still Life)','BIGBANG (빅뱅)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/624/911/82624911_1649062753955_1_140x140.JPG/dims/resize/Q_80,0',2),(59,'2022-10-24 16:36:15','도깨비불 (Illusion)','aespa','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/720/438/82720438_1657250551244_1_140x140.JPG/dims/resize/Q_80,0',2),(60,'2022-10-24 16:36:15','Loving You Girl (Feat. Hkeem)','Peder Elias','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/044/844/82044844_1651133261932_1_140x140.JPG/dims/resize/Q_80,0',2),(61,'2022-10-24 16:36:15','신호등','이무진','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/045/022/82045022_1620896061233_1_140x140.JPG/dims/resize/Q_80,0',2),(62,'2022-10-24 16:36:15','POP!','나연 (TWICE)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/781/282/82781282_1656034600098_1_140x140.JPG/dims/resize/Q_80,0',2),(63,'2022-10-24 16:36:15','듣고 싶을까','MSG워너비 (M.O.M)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/554/034/82554034_1645770887366_1_140x140.JPG/dims/resize/Q_80,0',2),(64,'2022-10-24 16:36:15','Left and Right (Feat. Jung Kook of BTS)','Charlie Puth & 정국 & 방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/777/117/82777117_1655825727342_1_140x140.JPG/dims/resize/Q_80,0',2),(65,'2022-10-24 16:36:15','주저하는 연인들을 위해','잔나비','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/172/042/81172042_1552452730746_1_140x140.JPG/dims/resize/Q_80,0',2),(66,'2022-10-24 16:36:15','에잇 (Prod. & Feat. SUGA of BTS)','아이유 (IU)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/434/107/81434107_1588747979387_1_140x140.JPG/dims/resize/Q_80,0',2),(67,'2022-10-24 16:36:15','모든 날, 모든 순간 (Every day, Every Moment)','폴킴','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/044/453/81044453_1521524523818_1_140x140.JPG/dims/resize/Q_80,0',2),(68,'2022-10-24 16:36:15','떠나보낼 준비해 둘걸 그랬어','임한별','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/083/139/83083139_1666077446742_1_140x140.JPG/dims/resize/Q_80,0',2),(69,'2022-10-24 16:36:15','Yet To Come','방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/746/162/82746162_1654826016759_1_140x140.JPG/dims/resize/Q_80,0',2),(70,'2022-10-24 16:36:15','My Universe','Coldplay & 방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/290/326/82290326_1632386644735_1_140x140.JPG/dims/resize/Q_80,0',2),(71,'2022-10-24 16:36:15','고백','멜로망스 (MeloMance)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/215/884/82215884_1630051973827_1_140x140.JPG/dims/resize/Q_80,0',2),(72,'2022-10-24 16:36:15','strawberry moon','아이유 (IU)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/341/788/82341788_1634542366123_1_140x140.JPG/dims/resize/Q_80,0',2),(73,'2022-10-24 16:36:15','Bad Habits','Ed Sheeran','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/110/115/82110115_1654161923419_1_140x140.JPG/dims/resize/Q_80,0',2),(74,'2022-10-24 16:36:15','밤하늘의 별을 (2020)','경서','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/731/300/81731300_1613455604854_1_140x140.JPG/dims/resize/Q_80,0',2),(75,'2022-10-24 16:36:15','새벽에 걸려온 너의 전화는','한동근','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/858/789/82858789_1659075929023_1_140x140.JPG/dims/resize/Q_80,0',2),(76,'2022-10-24 16:36:15','스티커 사진','21학번','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/819/885/82819885_1657591275601_1_140x140.JPG/dims/resize/Q_80,0',2),(77,'2022-10-24 16:36:15','2002','Anne-Marie','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/031/556/81031556_1656957034547_1_140x140.JPG/dims/resize/Q_80,0',2),(78,'2022-10-24 16:36:15','Permission to Dance','방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/131/679/82131679_1625795131913_1_140x140.JPG/dims/resize/Q_80,0',2),(79,'2022-10-24 16:36:15','작은 것들을 위한 시 (Boy With Luv) (Feat. Halsey)','방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/185/967/81185967_1632456996941_1_140x140.JPG/dims/resize/Q_80,0',2),(80,'2022-10-24 16:36:15','회전목마 (Feat. Zion.T & 원슈타인) (Prod. by Slom)','sokodomo','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/387/392/82387392_1636696960130_1_140x140.JPG/dims/resize/Q_80,0',2),(81,'2022-10-24 16:36:15','Dangerously','Charlie Puth','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/673/272/80673272_1617265225691_1_140x140.JPG/dims/resize/Q_80,0',2),(82,'2022-10-24 16:36:15','GANADARA (Feat. 아이유)','박재범','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/578/704/82578704_1646967046557_1_140x140.JPG/dims/resize/Q_80,0',2),(83,'2022-10-24 16:36:15','바보에게 바보가 (웹툰 \'연애의 발견\' X 이석훈)','이석훈','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/819/442/82819442_1657509250253_1_140x140.JPG/dims/resize/Q_80,0',2),(84,'2022-10-24 16:36:15','OHAYO MY NIGHT','디핵 (D-Hack) & PATEKO','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/479/869/81479869_1592554370128_1_140x140.JPG/dims/resize/Q_80,0',2),(85,'2022-10-24 16:36:15','팡파레','다비치','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/689/476/82689476_1652678222501_1_140x140.JPG/dims/resize/Q_80,0',2),(86,'2022-10-24 16:36:15','Celebrity','아이유 (IU)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/867/444/81867444_1616662460652_1_140x140.JPG/dims/resize/Q_80,0',2),(87,'2022-10-24 16:36:15','Bad','Christopher','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/051/809/81051809_1588127109810_1_140x140.JPG/dims/resize/Q_80,0',2),(88,'2022-10-24 16:36:15','그중에 그대를 만나','김호중','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/002/500/83002500_1663912084716_1_140x140.JPG/dims/resize/Q_80,0',2),(89,'2022-10-24 16:36:15','사랑아','KCM','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/098/283/83098283_1666337125351_1_140x140.JPG/dims/resize/Q_80,0',2),(90,'2022-10-24 16:36:15','INVU','태연 (TAEYEON)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/529/386/82529386_1644820151763_1_140x140.JPG/dims/resize/Q_80,0',2),(91,'2022-10-24 16:36:15','그래서 그대는','이영현','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/083/052/845/83052845_1665129741443_1_140x140.JPG/dims/resize/Q_80,0',2),(92,'2022-10-24 16:36:15','바라만 본다','MSG워너비 (M.O.M)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/110/804/82110804_1624611382361_1_140x140.JPG/dims/resize/Q_80,0',2),(93,'2022-10-24 16:36:15','봄날','방탄소년단','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/921/195/80921195_1486716752321_1_140x140.JPG/dims/resize/Q_80,0',2),(94,'2022-10-24 16:36:15','사랑한다고 말해줘','탑현','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/874/435/82874435_1659686144189_1_140x140.JPG/dims/resize/Q_80,0',2),(95,'2022-10-24 16:36:15','Feel My Rhythm','Red Velvet (레드벨벳)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/593/427/82593427_1647690272642_1_140x140.JPG/dims/resize/Q_80,0',2),(96,'2022-10-24 16:36:15','Next Level','aespa','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/049/997/82049997_1621238537359_1_140x140.JPG/dims/resize/Q_80,0',2),(97,'2022-10-24 16:36:15','내 손을 잡아','아이유 (IU)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/257/897/80257897_1306206125910_1_140x140.JPG/dims/resize/Q_80,0',2),(98,'2022-10-24 16:36:15','어떻게 이별까지 사랑하겠어, 널 사랑하는 거지','AKMU (악뮤)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/271/853/81271853_1569396403906_1_140x140.JPG/dims/resize/Q_80,0',2),(99,'2022-10-24 16:36:15','너를 생각해','주시크 (Joosiq)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/264/995/82264995_1631860546082_1_140x140.JPG/dims/resize/Q_80,0',2),(100,'2022-10-24 16:36:15','리무진 (Feat. MINO) (Prod. by GRAY)','BE\'O (비오)','https://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/082/398/969/82398969_1637305467028_1_140x140.JPG/dims/resize/Q_80,0',2);
/*!40000 ALTER TABLE `geniechart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genrestate`
--

DROP TABLE IF EXISTS `genrestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genrestate` (
  `genre` int NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genrestate`
--

LOCK TABLES `genrestate` WRITE;
/*!40000 ALTER TABLE `genrestate` DISABLE KEYS */;
INSERT INTO `genrestate` VALUES (0,'balad'),(1,'rnb'),(2,'hiphop'),(3,'trort'),(4,'kpop'),(5,'jpop'),(6,'pop'),(7,'classic'),(8,'dance'),(9,'mr'),(10,'jazz'),(11,'ost'),(100,'정의되지 않은 장르');
/*!40000 ALTER TABLE `genrestate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hiphopboard`
--

DROP TABLE IF EXISTS `hiphopboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hiphopboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_hiphopBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_hiphopBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_hiphopBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_hiphopBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hiphopboard`
--

LOCK TABLES `hiphopboard` WRITE;
/*!40000 ALTER TABLE `hiphopboard` DISABLE KEYS */;
INSERT INTO `hiphopboard` VALUES (1,'김승민 노래는',4,'다 좋은 거 같음',1,0,0,'2022-10-24 15:40:00',0);
/*!40000 ALTER TABLE `hiphopboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hiphopboardcommentvote`
--

DROP TABLE IF EXISTS `hiphopboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hiphopboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_hiphopBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_hiphopBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_hiphopBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `hiphopcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_hiphopBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hiphopboardcommentvote`
--

LOCK TABLES `hiphopboardcommentvote` WRITE;
/*!40000 ALTER TABLE `hiphopboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `hiphopboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hiphopboardvote`
--

DROP TABLE IF EXISTS `hiphopboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hiphopboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_hiphopBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_hiphopBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_hiphopBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `hiphopboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_hiphopBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hiphopboardvote`
--

LOCK TABLES `hiphopboardvote` WRITE;
/*!40000 ALTER TABLE `hiphopboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `hiphopboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hiphopcomment`
--

DROP TABLE IF EXISTS `hiphopcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hiphopcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_hiphopComment_1` (`usernum`),
  KEY `FK_hiphopBoard_TO_hiphopComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_hiphopComment_1` (`state`),
  CONSTRAINT `FK_hiphopBoard_TO_hiphopComment_1` FOREIGN KEY (`boardnum`) REFERENCES `hiphopboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_hiphopComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_hiphopComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hiphopcomment`
--

LOCK TABLES `hiphopcomment` WRITE;
/*!40000 ALTER TABLE `hiphopcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `hiphopcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jazzboard`
--

DROP TABLE IF EXISTS `jazzboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jazzboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_jazzBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_jazzBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_jazzBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_jazzBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jazzboard`
--

LOCK TABLES `jazzboard` WRITE;
/*!40000 ALTER TABLE `jazzboard` DISABLE KEYS */;
INSERT INTO `jazzboard` VALUES (1,'What Am I To You',4,'명곡',0,0,0,'2022-10-24 16:00:00',0);
/*!40000 ALTER TABLE `jazzboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jazzboardcommentvote`
--

DROP TABLE IF EXISTS `jazzboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jazzboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_jazzBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_jazzBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_jazzBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `jazzcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_jazzBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jazzboardcommentvote`
--

LOCK TABLES `jazzboardcommentvote` WRITE;
/*!40000 ALTER TABLE `jazzboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `jazzboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jazzboardvote`
--

DROP TABLE IF EXISTS `jazzboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jazzboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_jazzBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_jazzBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_jazzBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `jazzboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_jazzBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jazzboardvote`
--

LOCK TABLES `jazzboardvote` WRITE;
/*!40000 ALTER TABLE `jazzboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `jazzboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jazzcomment`
--

DROP TABLE IF EXISTS `jazzcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jazzcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_jazzComment_1` (`usernum`),
  KEY `FK_jazzBoard_TO_jazzComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_jazzComment_1` (`state`),
  CONSTRAINT `FK_jazzBoard_TO_jazzComment_1` FOREIGN KEY (`boardnum`) REFERENCES `jazzboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_jazzComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_jazzComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jazzcomment`
--

LOCK TABLES `jazzcomment` WRITE;
/*!40000 ALTER TABLE `jazzcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `jazzcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jpopboard`
--

DROP TABLE IF EXISTS `jpopboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jpopboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_jpopBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_jpopBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_jpopBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_jpopBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jpopboard`
--

LOCK TABLES `jpopboard` WRITE;
/*!40000 ALTER TABLE `jpopboard` DISABLE KEYS */;
INSERT INTO `jpopboard` VALUES (1,'lemon',4,'짱좋음',3,1,0,'2022-10-24 15:41:53',0);
/*!40000 ALTER TABLE `jpopboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jpopboardcommentvote`
--

DROP TABLE IF EXISTS `jpopboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jpopboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_jpopBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_jpopBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_jpopBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `jpopcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_jpopBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jpopboardcommentvote`
--

LOCK TABLES `jpopboardcommentvote` WRITE;
/*!40000 ALTER TABLE `jpopboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `jpopboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jpopboardvote`
--

DROP TABLE IF EXISTS `jpopboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jpopboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_jpopBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_jpopBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_jpopBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `jpopboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_jpopBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jpopboardvote`
--

LOCK TABLES `jpopboardvote` WRITE;
/*!40000 ALTER TABLE `jpopboardvote` DISABLE KEYS */;
INSERT INTO `jpopboardvote` VALUES (1,4,1,0);
/*!40000 ALTER TABLE `jpopboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jpopcomment`
--

DROP TABLE IF EXISTS `jpopcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jpopcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_jpopComment_1` (`usernum`),
  KEY `FK_jpopBoard_TO_jpopComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_jpopComment_1` (`state`),
  CONSTRAINT `FK_jpopBoard_TO_jpopComment_1` FOREIGN KEY (`boardnum`) REFERENCES `jpopboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_jpopComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_jpopComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jpopcomment`
--

LOCK TABLES `jpopcomment` WRITE;
/*!40000 ALTER TABLE `jpopcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `jpopcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpopboard`
--

DROP TABLE IF EXISTS `kpopboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpopboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_kpopBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_kpopBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_kpopBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_kpopBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpopboard`
--

LOCK TABLES `kpopboard` WRITE;
/*!40000 ALTER TABLE `kpopboard` DISABLE KEYS */;
INSERT INTO `kpopboard` VALUES (1,'이번 신곡 어떤가요',4,'저는 개인적으로 제일 좋은드',5,1,0,'2022-10-19 13:10:36',0);
/*!40000 ALTER TABLE `kpopboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpopboardcommentvote`
--

DROP TABLE IF EXISTS `kpopboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpopboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_kpopBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_kpopBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_kpopBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `kpopcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_kpopBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpopboardcommentvote`
--

LOCK TABLES `kpopboardcommentvote` WRITE;
/*!40000 ALTER TABLE `kpopboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `kpopboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpopboardvote`
--

DROP TABLE IF EXISTS `kpopboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpopboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_kpopBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_kpopBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_kpopBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `kpopboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_kpopBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpopboardvote`
--

LOCK TABLES `kpopboardvote` WRITE;
/*!40000 ALTER TABLE `kpopboardvote` DISABLE KEYS */;
INSERT INTO `kpopboardvote` VALUES (1,4,1,0);
/*!40000 ALTER TABLE `kpopboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kpopcomment`
--

DROP TABLE IF EXISTS `kpopcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kpopcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_kpopComment_1` (`usernum`),
  KEY `FK_kpopBoard_TO_kpopComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_kpopComment_1` (`state`),
  CONSTRAINT `FK_kpopBoard_TO_kpopComment_1` FOREIGN KEY (`boardnum`) REFERENCES `kpopboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_kpopComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_kpopComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kpopcomment`
--

LOCK TABLES `kpopcomment` WRITE;
/*!40000 ALTER TABLE `kpopcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `kpopcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `melonchart`
--

DROP TABLE IF EXISTS `melonchart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `melonchart` (
  `rank` int NOT NULL,
  `time` datetime DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `singer` varchar(50) DEFAULT NULL,
  `img_src` varchar(200) DEFAULT NULL,
  `sitecode` int NOT NULL,
  PRIMARY KEY (`rank`),
  KEY `FK_ChartSite_TO_melonChart_1` (`sitecode`),
  CONSTRAINT `FK_ChartSite_TO_melonChart_1` FOREIGN KEY (`sitecode`) REFERENCES `chartsite` (`sitecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `melonchart`
--

LOCK TABLES `melonchart` WRITE;
/*!40000 ALTER TABLE `melonchart` DISABLE KEYS */;
INSERT INTO `melonchart` VALUES (1,'2022-10-24 16:36:15','Nxde','(여자)아이들','https://cdnimg.melon.co.kr/cm2/album/images/110/78/852/11078852_20221017102947_500.jpg/melon/resize/120/quality/80/optimize',1),(2,'2022-10-24 16:36:15','새삥 (Prod. ZICO) (Feat. 호미들)','지코 (ZICO)','https://cdnimg.melon.co.kr/cm2/album/images/110/45/985/11045985_20220905151107_500.jpg/melon/resize/120/quality/80/optimize',1),(3,'2022-10-24 16:36:15','After LIKE','IVE (아이브)','https://cdnimg.melon.co.kr/cm2/album/images/110/34/298/11034298_20220822101843_500.jpg/melon/resize/120/quality/80/optimize',1),(4,'2022-10-24 16:36:15','ANTIFRAGILE','LE SSERAFIM (르세라핌)','https://cdnimg.melon.co.kr/cm2/album/images/110/78/496/11078496_20221014153848_500.jpg/melon/resize/120/quality/80/optimize',1),(5,'2022-10-24 16:36:15','Hype boy','NewJeans','https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg/melon/resize/120/quality/80/optimize',1),(6,'2022-10-24 16:36:15','Rush Hour (Feat. j-hope of BTS)','Crush','https://cdnimg.melon.co.kr/cm2/album/images/110/62/364/11062364_20220922182518_500.jpg/melon/resize/120/quality/80/optimize',1),(7,'2022-10-24 16:36:15','Attention','NewJeans','https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg/melon/resize/120/quality/80/optimize',1),(8,'2022-10-24 16:36:15','Shut Down','BLACKPINK','https://cdnimg.melon.co.kr/cm2/album/images/110/33/394/11033394_20220916124707_500.jpg/melon/resize/120/quality/80/optimize',1),(9,'2022-10-24 16:36:15','사건의 지평선','윤하 (YOUNHA)','https://cdnimg.melon.co.kr/cm2/album/images/109/03/868/10903868_20220330103544_500.jpg/melon/resize/120/quality/80/optimize',1),(10,'2022-10-24 16:36:15','Monologue','테이','https://cdnimg.melon.co.kr/cm2/album/images/110/57/545/11057545_20221021124737_500.jpg/melon/resize/120/quality/80/optimize',1),(11,'2022-10-24 16:36:15','Pink Venom','BLACKPINK','https://cdnimg.melon.co.kr/cm2/album/images/110/33/394/11033394_20220916124707_500.jpg/melon/resize/120/quality/80/optimize',1),(12,'2022-10-24 16:36:15','LOVE DIVE','IVE (아이브)','https://cdnimg.melon.co.kr/cm2/album/images/109/09/179/10909179_20220405103521_500.jpg/melon/resize/120/quality/80/optimize',1),(13,'2022-10-24 16:36:15','딱 10CM만','10CM BIG Naughty (서동현)','https://cdnimg.melon.co.kr/cm2/album/images/110/63/205/11063205_20220923155512_500.jpg/melon/resize/120/quality/80/optimize',1),(14,'2022-10-24 16:36:15','자격지심 (Feat. ZICO)','BE\'O (비오)','https://cdnimg.melon.co.kr/cm2/album/images/110/67/591/11067591_20220929100834_500.jpg/melon/resize/120/quality/80/optimize',1),(15,'2022-10-24 16:36:15','사랑은 늘 도망가','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/107/35/654/10735654_20211008114339_500.jpg/melon/resize/120/quality/80/optimize',1),(16,'2022-10-24 16:36:15','우린 그렇게 사랑해서','강민경 (다비치) 잔나비 최정훈','https://cdnimg.melon.co.kr/cm2/album/images/110/63/334/11063334_20220923180858_500.jpg/melon/resize/120/quality/80/optimize',1),(17,'2022-10-24 16:36:15','우리들의 블루스','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(18,'2022-10-24 16:36:15','그때 그 순간 그대로 (그그그)','WSG워너비 (가야G)','https://cdnimg.melon.co.kr/cm2/album/images/110/00/171/11000171_20220708163659_500.jpg/melon/resize/120/quality/80/optimize',1),(19,'2022-10-24 16:36:15','Cookie','NewJeans','https://cdnimg.melon.co.kr/cm2/album/images/110/11/565/11011565_20220801102637_500.jpg/melon/resize/120/quality/80/optimize',1),(20,'2022-10-24 16:36:15','그라데이션','10CM','https://cdnimg.melon.co.kr/cm2/album/images/109/95/477/10995477_20220701165440_500.jpg/melon/resize/120/quality/80/optimize',1),(21,'2022-10-24 16:36:15','다시 만날 수 있을까','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(22,'2022-10-24 16:36:15','TOMBOY','(여자)아이들','https://cdnimg.melon.co.kr/cm2/album/images/108/90/384/10890384_20220314111504_500.jpg/melon/resize/120/quality/80/optimize',1),(23,'2022-10-24 16:36:15','사랑인가 봐','멜로망스','https://cdnimg.melon.co.kr/cm2/album/images/108/71/162/10871162_20220217162422_500.jpg/melon/resize/120/quality/80/optimize',1),(24,'2022-10-24 16:36:15','해요 (2022)','#안녕','https://cdnimg.melon.co.kr/cm2/album/images/109/75/276/10975276_20220603165713_500.jpg/melon/resize/120/quality/80/optimize',1),(25,'2022-10-24 16:36:15','보고싶었어','WSG워너비 (4FIRE)','https://cdnimg.melon.co.kr/cm2/album/images/110/00/171/11000171_20220708163659_500.jpg/melon/resize/120/quality/80/optimize',1),(26,'2022-10-24 16:36:15','정이라고 하자 (Feat. 10CM)','BIG Naughty (서동현)','https://cdnimg.melon.co.kr/cm2/album/images/109/25/762/10925762_20220419152007_500.jpg/melon/resize/120/quality/80/optimize',1),(27,'2022-10-24 16:36:15','무지개','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(28,'2022-10-24 16:36:15','내가 아니라도','주호','https://cdnimg.melon.co.kr/cm2/album/images/108/97/407/10897407_20220323150744_500.jpg/melon/resize/120/quality/80/optimize',1),(29,'2022-10-24 16:36:15','이제 나만 믿어요','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/104/12/319/10412319_20200403103006_500.jpg/melon/resize/120/quality/80/optimize',1),(30,'2022-10-24 16:36:15','FOREVER 1','소녀시대 (GIRLS\' GENERATION)','https://cdnimg.melon.co.kr/cm2/album/images/110/23/224/11023224_20220804182919_500.jpg/melon/resize/120/quality/80/optimize',1),(31,'2022-10-24 16:36:15','아버지','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(32,'2022-10-24 16:36:15','나의 X에게','경서','https://cdnimg.melon.co.kr/cm2/album/images/109/29/486/10929486_20220422151852_500.jpg/melon/resize/120/quality/80/optimize',1),(33,'2022-10-24 16:36:15','LAW (Prod. Czaer)','윤미래 비비 (BIBI)','https://cdnimg.melon.co.kr/cm2/album/images/110/45/985/11045985_20220905151107_500.jpg/melon/resize/120/quality/80/optimize',1),(34,'2022-10-24 16:36:15','A bientot','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(35,'2022-10-24 16:36:15','FEARLESS','LE SSERAFIM (르세라핌)','https://cdnimg.melon.co.kr/cm2/album/images/109/39/458/10939458_20220502123814_500.jpg/melon/resize/120/quality/80/optimize',1),(36,'2022-10-24 16:36:15','손이 참 곱던 그대','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(37,'2022-10-24 16:36:15','인생찬가','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(38,'2022-10-24 16:36:15','That That (prod. & feat. SUGA of BTS)','싸이 (PSY)','https://cdnimg.melon.co.kr/cm2/album/images/109/37/474/10937474_20220428225312_500.jpg/melon/resize/120/quality/80/optimize',1),(39,'2022-10-24 16:36:15','ELEVEN','IVE (아이브)','https://cdnimg.melon.co.kr/cm2/album/images/107/98/794/10798794_20211201113915_500.jpg/melon/resize/120/quality/80/optimize',1),(40,'2022-10-24 16:36:15','사랑해 진짜','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(41,'2022-10-24 16:36:15','That\'s Hilarious','Charlie Puth','https://cdnimg.melon.co.kr/cm2/album/images/108/44/485/10844485_20221006154824_500.jpg/melon/resize/120/quality/80/optimize',1),(42,'2022-10-24 16:36:15','내 기쁨은 너가 벤틀리를 끄는 거야','김승민','https://cdnimg.melon.co.kr/cm2/album/images/107/43/373/10743373_20211018161315_500.jpg/melon/resize/120/quality/80/optimize',1),(43,'2022-10-24 16:36:15','너의 모든 순간','성시경','https://cdnimg.melon.co.kr/cm/album/images/022/32/505/2232505_500.jpg/melon/resize/120/quality/80/optimize',1),(44,'2022-10-24 16:36:15','SNEAKERS','ITZY (있지)','https://cdnimg.melon.co.kr/cm2/album/images/110/04/992/11004992_20220722175827_500.jpg/melon/resize/120/quality/80/optimize',1),(45,'2022-10-24 16:36:15','취중고백','김민석 (멜로망스)','https://cdnimg.melon.co.kr/cm2/album/images/108/16/959/10816959_20211217144957_500.jpg/melon/resize/120/quality/80/optimize',1),(46,'2022-10-24 16:36:15','연애편지','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(47,'2022-10-24 16:36:15','사랑역','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(48,'2022-10-24 16:36:15','다정히 내 이름을 부르면','경서예지 전건호','https://cdnimg.melon.co.kr/cm2/album/images/106/10/525/10610525_20210518143433_500.jpg/melon/resize/120/quality/80/optimize',1),(49,'2022-10-24 16:36:15','LOVE me','BE\'O (비오)','https://cdnimg.melon.co.kr/cm2/album/images/109/16/904/10916904_20220412101049_500.jpg/melon/resize/120/quality/80/optimize',1),(50,'2022-10-24 16:36:15','보금자리','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(51,'2022-10-24 16:36:15','사랑해요 그대를','임영웅','https://cdnimg.melon.co.kr/cm2/album/images/109/23/444/10923444_20220502140600_500.jpg/melon/resize/120/quality/80/optimize',1),(52,'2022-10-24 16:36:15','I Don\'t Think That I Like Her','Charlie Puth','https://cdnimg.melon.co.kr/cm2/album/images/108/44/485/10844485_20221006154824_500.jpg/melon/resize/120/quality/80/optimize',1),(53,'2022-10-24 16:36:15','Love story','볼빨간사춘기','https://cdnimg.melon.co.kr/cm2/album/images/109/26/502/10926502_20220420071020_500.jpg/melon/resize/120/quality/80/optimize',1),(54,'2022-10-24 16:36:15','POP!','나연 (TWICE)','https://cdnimg.melon.co.kr/cm2/album/images/109/90/161/10990161_20220623203136_500.jpg/melon/resize/120/quality/80/optimize',1),(55,'2022-10-24 16:36:15','도깨비불 (Illusion)','aespa','https://cdnimg.melon.co.kr/cm2/album/images/109/72/706/10972706_20220708111110_500.jpg/melon/resize/120/quality/80/optimize',1),(56,'2022-10-24 16:36:15','새벽에 걸려온 너의 전화는','한동근','https://cdnimg.melon.co.kr/cm2/album/images/110/17/954/11017954_20220729152931_500.jpg/melon/resize/120/quality/80/optimize',1),(57,'2022-10-24 16:36:15','봄여름가을겨울 (Still Life)','BIGBANG (빅뱅)','https://cdnimg.melon.co.kr/cm2/album/images/109/08/834/10908834_20220404174407_500.jpg/melon/resize/120/quality/80/optimize',1),(58,'2022-10-24 16:36:15','모든 날, 모든 순간 (Every day, Every Moment)','폴킴','https://cdnimg.melon.co.kr/cm/album/images/101/49/492/10149492_500.jpg/melon/resize/120/quality/80/optimize',1),(59,'2022-10-24 16:36:15','사랑한다고 말해줘','탑현','https://cdnimg.melon.co.kr/cm2/album/images/110/23/572/11023572_20220805140858_500.jpg/melon/resize/120/quality/80/optimize',1),(60,'2022-10-24 16:36:15','Dynamite','방탄소년단','https://cdnimg.melon.co.kr/cm2/album/images/104/79/150/10479150_20200918102847_500.jpg/melon/resize/120/quality/80/optimize',1),(61,'2022-10-24 16:36:15','STAY','The Kid LAROI Justin Bieber','https://cdnimg.melon.co.kr/cm2/album/images/106/46/395/10646395_20210707141710_500.jpg/melon/resize/120/quality/80/optimize',1),(62,'2022-10-24 16:36:15','스티커 사진','21학번','https://cdnimg.melon.co.kr/cm2/album/images/110/01/347/11001347_20220711164254_500.jpg/melon/resize/120/quality/80/optimize',1),(63,'2022-10-24 16:36:15','Left and Right (Feat. Jung Kook of BTS)','Charlie Puth 정국 방탄소년단','https://cdnimg.melon.co.kr/cm2/album/images/109/89/806/10989806_20220623153505_500.jpg/melon/resize/120/quality/80/optimize',1),(64,'2022-10-24 16:36:15','주저하는 연인들을 위해','잔나비','https://cdnimg.melon.co.kr/cm/album/images/102/60/858/10260858_500.jpg/melon/resize/120/quality/80/optimize',1),(65,'2022-10-24 16:36:15','밤하늘의 별을(2020)','경서','https://cdnimg.melon.co.kr/cm2/album/images/105/18/234/10518234_20210216102853_500.jpg/melon/resize/120/quality/80/optimize',1),(66,'2022-10-24 16:36:15','통화연결음','보라미유 MJ (써니사이드)','https://cdnimg.melon.co.kr/cm2/album/images/110/29/030/11029030_20220812105653_500.jpg/melon/resize/120/quality/80/optimize',1),(67,'2022-10-24 16:36:15','DICE','NMIXX','https://cdnimg.melon.co.kr/cm2/album/images/110/57/553/11057553_20220916134728_500.jpg/melon/resize/120/quality/80/optimize',1),(68,'2022-10-24 16:36:15','그래서 그대는','이영현','https://cdnimg.melon.co.kr/cm2/album/images/110/73/603/11073603_20221007170204_500.jpg/melon/resize/120/quality/80/optimize',1),(69,'2022-10-24 16:36:15','Butter','방탄소년단','https://cdnimg.melon.co.kr/cm2/album/images/106/12/483/10612483_20210521111412_500.jpg/melon/resize/120/quality/80/optimize',1),(70,'2022-10-24 16:36:15','신호등','이무진','https://cdnimg.melon.co.kr/cm2/album/images/106/07/796/10607796_20210513201807_500.jpg/melon/resize/120/quality/80/optimize',1),(71,'2022-10-24 16:36:15','Feel My Rhythm','Red Velvet (레드벨벳)','https://cdnimg.melon.co.kr/cm2/album/images/108/94/554/10894554_20220321100622_500.jpg/melon/resize/120/quality/80/optimize',1),(72,'2022-10-24 16:36:15','strawberry moon','아이유','https://cdnimg.melon.co.kr/cm2/album/images/107/43/453/10743453_20211018165252_500.jpg/melon/resize/120/quality/80/optimize',1),(73,'2022-10-24 16:36:15','봄날','방탄소년단','https://cdnimg.melon.co.kr/cm/album/images/100/37/969/10037969_500.jpg/melon/resize/120/quality/80/optimize',1),(74,'2022-10-24 16:36:15','INVU','태연 (TAEYEON)','https://cdnimg.melon.co.kr/cm2/album/images/108/63/559/10863559_20220214160739_500.jpg/melon/resize/120/quality/80/optimize',1),(75,'2022-10-24 16:36:15','못해','김나영','https://cdnimg.melon.co.kr/cm2/album/images/110/70/148/11070148_20221004162524_500.jpg/melon/resize/120/quality/80/optimize',1),(76,'2022-10-24 16:36:15','MY BAG','(여자)아이들','https://cdnimg.melon.co.kr/cm2/album/images/108/90/384/10890384_20220314111504_500.jpg/melon/resize/120/quality/80/optimize',1),(77,'2022-10-24 16:36:15','드라마','아이유','https://cdnimg.melon.co.kr/cm2/album/images/108/27/816/10827816_20211229143632_500.jpg/melon/resize/120/quality/80/optimize',1),(78,'2022-10-24 16:36:15','Permission to Dance','방탄소년단','https://cdnimg.melon.co.kr/cm2/album/images/106/48/182/10648182_20210709104950_500.jpg/melon/resize/120/quality/80/optimize',1),(79,'2022-10-24 16:36:15','내 손을 잡아','아이유','https://cdnimg.melon.co.kr/cm/album/images/012/86/252/1286252_500.jpg/melon/resize/120/quality/80/optimize',1),(80,'2022-10-24 16:36:15','바보에게 바보가 (웹툰 \'연애의 발견\' X 이석훈)','이석훈','https://cdnimg.melon.co.kr/cm2/album/images/110/00/863/11000863_20220711113237_500.jpg/melon/resize/120/quality/80/optimize',1),(81,'2022-10-24 16:36:15','Yet To Come','방탄소년단','https://cdnimg.melon.co.kr/cm2/album/images/109/79/636/10979636_20220609175418_500.jpg/melon/resize/120/quality/80/optimize',1),(82,'2022-10-24 16:36:15','Girls','aespa','https://cdnimg.melon.co.kr/cm2/album/images/109/72/706/10972706_20220708111110_500.jpg/melon/resize/120/quality/80/optimize',1),(83,'2022-10-24 16:36:15','Off My Face','Justin Bieber','https://cdnimg.melon.co.kr/cm2/album/images/105/80/103/10580103_20211008114642_500.jpg/melon/resize/120/quality/80/optimize',1),(84,'2022-10-24 16:36:15','떠나보낼 준비해 둘걸 그랬어','임한별','https://cdnimg.melon.co.kr/cm2/album/images/110/78/887/11078887_20221018101221_500.jpg/melon/resize/120/quality/80/optimize',1),(85,'2022-10-24 16:36:15','늦은 밤 헤어지긴 너무 아쉬워','케이시 (Kassy)','https://cdnimg.melon.co.kr/cm2/album/images/109/60/568/10960568_20220518153132_500.jpg/melon/resize/120/quality/80/optimize',1),(86,'2022-10-24 16:36:15','회전목마 (Feat. Zion.T, 원슈타인) (Prod. Slom)','sokodomo','https://cdnimg.melon.co.kr/cm2/album/images/107/75/252/10775252_20211112142804_500.jpg/melon/resize/120/quality/80/optimize',1),(87,'2022-10-24 16:36:15','그중에 그대를 만나','김호중','https://cdnimg.melon.co.kr/cm2/album/images/110/62/828/11062828_20220923105240_500.jpg/melon/resize/120/quality/80/optimize',1),(88,'2022-10-24 16:36:15','Talk that Talk','TWICE (트와이스)','https://cdnimg.melon.co.kr/cm2/album/images/110/38/172/11038172_20220825154457_500.jpg/melon/resize/120/quality/80/optimize',1),(89,'2022-10-24 16:36:15','Next Level','aespa','https://cdnimg.melon.co.kr/cm2/album/images/106/09/232/10609232_20210517155130_500.jpg/melon/resize/120/quality/80/optimize',1),(90,'2022-10-24 16:36:15','GANADARA (Feat. 아이유)','박재범','https://cdnimg.melon.co.kr/cm2/album/images/108/89/981/10889981_20220311110820_500.jpg/melon/resize/120/quality/80/optimize',1),(91,'2022-10-24 16:36:15','I Ain\'t Worried','OneRepublic','https://cdnimg.melon.co.kr/cm2/album/images/109/67/172/10967172_20220525095420_500.jpg/melon/resize/120/quality/80/optimize',1),(92,'2022-10-24 16:36:15','너를 생각해','주시크 (Joosiq)','https://cdnimg.melon.co.kr/cm2/album/images/107/16/399/10716399_20210916173429_500.jpg/melon/resize/120/quality/80/optimize',1),(93,'2022-10-24 16:36:15','나의 목소리로','김호중','https://cdnimg.melon.co.kr/cm2/album/images/110/69/174/11069174_20220930140119_500.jpg/melon/resize/120/quality/80/optimize',1),(94,'2022-10-24 16:36:15','아무래도 난','주시크 (Joosiq)','https://cdnimg.melon.co.kr/cm2/album/images/109/03/658/10903658_20220329185034_500.jpg/melon/resize/120/quality/80/optimize',1),(95,'2022-10-24 16:36:15','듣고 싶을까','MSG워너비(M.O.M)','https://cdnimg.melon.co.kr/cm2/album/images/108/80/544/10880544_20220225141002_500.jpg/melon/resize/120/quality/80/optimize',1),(96,'2022-10-24 16:36:15','Weekend','태연 (TAEYEON)','https://cdnimg.melon.co.kr/cm2/album/images/106/45/654/10645654_20210706155154_500.jpg/melon/resize/120/quality/80/optimize',1),(97,'2022-10-24 16:36:15','LOVE','(여자)아이들','https://cdnimg.melon.co.kr/cm2/album/images/110/78/852/11078852_20221017102947_500.jpg/melon/resize/120/quality/80/optimize',1),(98,'2022-10-24 16:36:15','SMILEY (Feat. BIBI)','YENA (최예나)','https://cdnimg.melon.co.kr/cm2/album/images/108/42/611/10842611_20220117110002_500.jpg/melon/resize/120/quality/80/optimize',1),(99,'2022-10-24 16:36:15','Celebrity','아이유','https://cdnimg.melon.co.kr/cm2/album/images/105/54/246/10554246_20210325161233_500.jpg/melon/resize/120/quality/80/optimize',1),(100,'2022-10-24 16:36:15','인생은 뷰티풀','김호중','https://cdnimg.melon.co.kr/cm2/album/images/110/48/906/11048906_20220906180454_500.jpg/melon/resize/120/quality/80/optimize',1);
/*!40000 ALTER TABLE `melonchart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mrboard`
--

DROP TABLE IF EXISTS `mrboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_mrBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_mrBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_mrBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_mrBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mrboard`
--

LOCK TABLES `mrboard` WRITE;
/*!40000 ALTER TABLE `mrboard` DISABLE KEYS */;
INSERT INTO `mrboard` VALUES (1,'신호등',4,'부르기 쉬운가여',0,0,0,'2022-10-24 16:00:17',0);
/*!40000 ALTER TABLE `mrboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mrboardcommentvote`
--

DROP TABLE IF EXISTS `mrboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_mrBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_mrBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_mrBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `mrcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_mrBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mrboardcommentvote`
--

LOCK TABLES `mrboardcommentvote` WRITE;
/*!40000 ALTER TABLE `mrboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `mrboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mrboardvote`
--

DROP TABLE IF EXISTS `mrboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_mrBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_mrBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_mrBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `mrboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_mrBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mrboardvote`
--

LOCK TABLES `mrboardvote` WRITE;
/*!40000 ALTER TABLE `mrboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `mrboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mrcomment`
--

DROP TABLE IF EXISTS `mrcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mrcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_mrComment_1` (`usernum`),
  KEY `FK_mrBoard_TO_mrComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_mrComment_1` (`state`),
  CONSTRAINT `FK_mrBoard_TO_mrComment_1` FOREIGN KEY (`boardnum`) REFERENCES `mrboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_mrComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_mrComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mrcomment`
--

LOCK TABLES `mrcomment` WRITE;
/*!40000 ALTER TABLE `mrcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `mrcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music` (
  `musicnum` int NOT NULL AUTO_INCREMENT,
  `imgsrc` varchar(250) DEFAULT NULL,
  `origin_title` varchar(200) DEFAULT NULL,
  `origin_singer` varchar(50) DEFAULT NULL,
  `singer` varchar(50) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `album` varchar(50) DEFAULT NULL,
  `releasedate` varchar(50) DEFAULT NULL,
  `lyrics` varchar(2500) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `length` int DEFAULT NULL,
  `vote` int DEFAULT '0',
  `genre` int NOT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`musicnum`),
  KEY `FK_GenreState_TO_Music_1` (`genre`),
  KEY `FK_VisibleState_TO_Music_1` (`state`),
  CONSTRAINT `FK_GenreState_TO_Music_1` FOREIGN KEY (`genre`) REFERENCES `genrestate` (`genre`),
  CONSTRAINT `FK_VisibleState_TO_Music_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `music`
--

LOCK TABLES `music` WRITE;
/*!40000 ALTER TABLE `music` DISABLE KEYS */;
INSERT INTO `music` VALUES (5,'IVE-AfterLike.jpg','After Like','IVE','IVE','AfterLike',NULL,'2022-08-22','또 모르지 내 마음이\n저 날씨처럼 바뀔지\n날 나조차 다 알 수 없으니\n그게 뭐가 중요하니\n지금 네게 완전히\n푹 빠졌단 게 중요한 거지\n아마 꿈만 같겠지만 분명 꿈이 아니야\n달리 설명할 수 없는 이건 사랑일 거야\n방금 내가 말한 감정 감히 의심하지 마\n그냥 좋다는 게 아냐 What\'s after \'LIKE\'?\nYou and I\nIt\'s more than \'LIKE\'\nL 다음 또 O 다음 난 yeah\nYou and I\nIt\'s more than \'LIKE\'\nWhat\'s after \'LIKE\'?\nWhat\'s after \'LIKE\'?\n조심해 두 심장에 핀\n새파란 이 불꽃이\n저 태양보다 뜨거울 테니\n난 저 위로 또 아래로\n내 그래프는 폭이 커\nYeah that\'s me\n두 번 세 번 피곤하게 자꾸 질문하지 마\n내 장점이 뭔지 알아? 바로 솔직한 거야\n방금 내가 말한 감정 감히 의심하지 마\n그냥 좋다는 게 아냐 What\'s after \'LIKE\'?\nYou and I\nIt\'s more than \'LIKE\'\nL 다음 또 O 다음 난 yeah\nYou and I\nIt\'s more than \'LIKE\'\nWhat\'s after \'LIKE\'?\nWhat\'s after \'LIKE\'?\nWhat after like 내 맘에 strike\n지금 느낀 짜릿함은 마치 tike\nLO 다음에 I 그 다음에 VE\n여긴 너와 내 space 아무도 막지 못해\n나를 보면 눈 깜빡할\n시간 조차도 아까울 걸\n드디어 만나 반가워\nLOVE 사이 놓일 I\n(What\'s after \'LIKE\'?)\nYou and I\nIt\'s more than \'LIKE\'\nE 앞 또 V 앞 난 yeah\nYou and I\nIt\'s more than \'LIKE\'\nWhat\'s after \'LIKE\'?\nYou and I\nIt\'s more than \'LIKE\'\nL 다음 또 O 다음 난 yeah\nYou and I\nIt\'s more than \'LIKE\'\nWhat\'s after \'LIKE\'?\nWhat\'s after \'LIKE\'?','IVE-AfterLIKE.mp3',177,0,8,0),(6,'NewJeans-Attention.jpg','Attention','New Jeans','NewJeans','Attention',NULL,'2022-08-01','You and me\n내 맘이 보이지\n한참을 쳐다봐\n가까이 다가가\nYou see\nYou see, ey ey ey ey\nOne, two, three\n용기가 생겼지\n이미 아는 네 눈치\n고개를 돌려 천천히\n여기\nYou see\n여기 보이니\nLooking for attention 너야겠어\n확실하게 나로 만들겠어\nStop, eyyy\nDrop the question\nDrop the, drop the question\nWant attention\nWanna want attention\nYou give me butterflies you know\n내 맘은 온통 paradise\n꿈에서 깨워주지 마\nYou got me looking for attention\nYou got me looking for attention\n가끔은 정말\n헷갈리지만\n분명한 건\nGot me looking for attention\n널 우연히 마주친 척할래\n못 본 척 지나갈래\nYou\'re so fine\nGotta gotta get to know ya\n나와 나와 걸어가 줘\n지금 돌아서면\nI need ya, need ya, need ya\nTo look at me back\nHey 다 들켰었나\n널 보면 하트가 튀어나와\n난 사탕을 찾는 baby (baby)\n내 맘은 설레이지\nEyyy, drop the question\nDrop the, drop the question\nWant attention\nWanna want attention\nYou give me butterflies you know\n내 맘은 온통 paradise\n꿈에서 깨워주지 마\nYou got me looking for attention\nYou got me looking for attention\n가끔은 정말\n헷갈리지만\n분명한 건\nGot me looking for attention\nYou got me looking for attention\nYou got me looking for attention\n가끔은 정말\n헷갈리지만\n분명한 건\nGot me looking for attention\nA T T E N T I on\nAttention is what I want\nA T T E N T I on\nAttention is what I want\nA T T E N T I on\nAttention is what I want\nA T T E N T I on\nYou got me looking for attention','NewJeans-Attention.mp3',180,0,8,0),(7,'라붐-상상더하기.jpg','상상더하기','라붐','라붐','상상더하기',NULL,'2016-04-06','1, 2 Come On, R U Ready\n3, 4 Do It. I\'m Ready\n5, 6 Baby Are You Ready\n지금 나와 어디든 가자\n지루한 하루 여기까지만 All Stop\n작은 가방 운동화 챙겨\n자 더 크게 Radio를 높이고\n코발트블루 물결 눈부신 바다\n달빛 가득 묻은 작은 섬\n야경이 눈부신 도시는 어때?\n함께라면 어디든 좋아\n난 너와 나 그곳으로\n떠나는 거야\n상상에 상상에 상상을 더해서\n어머 깜짝야\n눈부셔 눈부셔 눈부셔 이건 뭐\nOh Hello New World\n두 손 모아 소리치면\n푸른 하늘이 내게로 와\n날아가볼래\n상상의 상상의 미래로 가볼까\n바람을 타고\n새로운 눈빛에 가슴이 붐 붐 붐\nOh 발견했어 우리들만의 Paradise\n흑백영화 같은 하루에\n레몬 터지듯 짜릿함이 필요해\n지금 당장 널 데려갈게\n꿈꿔오던 사진 속 그곳으로\n민트그린빛 바람 가득한 숲 속\n달콤한 향기의 칵테일\n지도를 벗어나 Ticket To The Dream\n함께라면 어디든 좋아\n난 너와 나 그곳으로\n떠나는 거야\n상상에 상상에 상상을 더해서\n어머 깜짝야\n눈부셔 눈부셔 눈부셔 이건 뭐\nOh Hello New World\n두 손 모아 소리치면\n푸른 하늘이 내게로 와\n날아가볼래\n상상의 상상의 미래로 가볼까\n바람을 타고\n새로운 눈빛에 가슴이 붐 붐 붐\nOh 발견했어 우리들만의 Paradise\n너와 나의 비밀스런 풍경들\n언제라도 다시 와 주겠니\n은하수 아래 밤새 부른 노래\n영원히 잊지 않을 거야\n이 시간 속에 영원히\n네 품에 안기고 싶은걸\n단 둘이 이순간 잠들고 싶은걸\n지도엔 없는 이 곳을 꼭 기억해줘\n우리들만의 Paradise\n상상에 상상에 상상을 더해서\n어머 깜짝야\n눈부셔 눈부셔 눈부셔 이건 뭐\noh Hello New World\n처음 만난 세상 속에\n나의 가슴이 라 라 라 라\n날아가볼래\n상상의 상상의 미래로 가볼까\n바람을 타고\n새로운 눈빛에 가슴이 붐 붐 붐\nOh 발견했어 우리 들만의 Paradise\n1, 2 Come On, R U Ready\n3, 4 Do It. I\'m Ready\n5, 6 Baby Are You Ready','라붐-상상더하기.mp3',240,0,8,0),(8,'방탄소년단-Butter.jpg','Butter','방탄소년단(BTS)','방탄소년단(BTS)','Butter',NULL,'2021-05-21','Smooth like butter\nLike a criminal undercover\nGon\' pop like trouble\nBreakin\' into your heart like that\nCool shade stunner\nYeah I owe it all to my mother\nHot like summer\nYeah I\'m makin\' you sweat like that\nBreak it down\nOh when I look in the mirror\nI\'ll melt your heart into 2\nI got that superstar glow so\nDo the boogie like\nSide step right left to my beat (heartbeat)\nHigh like the moon rock with me baby\nKnow that I got that heat\nLet me show you \'cause talk is cheap\nSide step right left to my beat (heartbeat)\nGet it, let it roll\nSmooth like butter\nPull you in like no other\nDon\'t need no Usher\nTo remind me you got it bad\nAin\'t no other\nThat can sweep you up like a robber\nStraight up, I got ya\nMakin\' you fall like that\nBreak it down\nOh when I look in the mirror\nI\'ll melt your heart into 2\nI got that superstar glow so\nDo the boogie like\nSide step right left to my beat (heartbeat)\nHigh like the moon rock with me baby\nKnow that I got that heat\nLet me show you \'cause talk is cheap\nSide step right left to my beat (heartbeat)\nGet it, let it roll\nGet it, let it roll\nGet it, let it roll\nNo ice on my wrist\nI\'m that n-ice guy\nGot that right body and that right mind\nRollin\' up to party got the right vibe\nSmooth like butter\nHate us love us\nFresh boy pull up and we lay low\nAll the playas get movin\' when the bass low\nGot ARMY right behind us when we say so\nLet\'s go\nSide step right left to my beat (heartbeat)\nHigh like the moon rock with me baby\nKnow that I got that heat\nLet me show you \'cause talk is cheap\nSide step right left to my beat (heartbeat)\nGet it, let it roll\nSmooth like (butter)\nCool shade (stunner)\nAnd you know we don\'t stop\nHot like (summer)\nAin\'t no (bummer)\nYou be like oh my god\nWe gon\' make you rock and you say (yeah)\nWe gon\' make you bounce and you say (yeah)\nHotter?\nSweeter!\nCooler?\nButter!\nGet it, let it roll','방탄소년단-Butter.mp3',171,0,8,0),(9,'브레이브걸스-롤린.jpg','롤린','브레이브걸스','브레이브걸스','롤린',NULL,'2017-03-07','그 날을 잊지 못해 babe\n날 보며 환히 웃던 너의 미소에\n홀린 듯 I\'m fall in love\nBut 너무 쪽팔림에 (난 그저)\n한마디 말도 못해 babe\nI wanna you 너의 눈빛은\n날 자꾸 네 곁을 맴돌게 해\nJust only you 굳게 닫힌 내 맘이\n어느새 무너져버려 Because of you\n온통 너의 생각뿐이야 나도 미치겠어\n너무 보고 싶어 매일 매일 매일\n자꾸 초라해지잖아 내 모습이\n그대여 내게 말해줘 사랑한다고\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\n하루가 멀다 하고 Rolling in the deep\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\n기다리고 있잖아 Babe Just only you\n기다리고 있잖아 Babe Just only you\nHey I just wanna be with you\n오늘 밤이 가기 전에\nI can\'t feel you 조금 더 다가와 줘\nTonight I\'m ready for you\nYou wanna touch me I know\n대체 뭘 고민해 빨리 안아\n아닌 척 모르는 척 하다가\n늦게 놓치고 후회 말아\nI wanna you 너의 눈빛은\n날 자꾸 네 곁을 맴돌게 해\nJust only you 굳게 닫힌 내 맘이\n어느새 무너져버려 Because of you\n온통 너의 생각뿐이야 나도 미치겠어\n너무 보고 싶어 매일 매일 매일\n자꾸 초라해지잖아 내 모습이\n그대여 내게 말해줘 사랑한다고\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\n하루가 멀다 하고 Rolling in the deep\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\n기다리고 있잖아 Babe Just only you\n(Bridge)\n이제 와 숨기려 하지 마요\n그대여 아닌 척하지 마요\n온종일 난 그대 생각에 잠긴 채로\n난 이대로 기다리고 있어요\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\n하루가 멀다 하고 Rolling in the deep\nRollin\' Rollin\' Rollin\' Rollin\'\nRollin\' Rollin\' Rollin\' Rollin\'\n기다리고 있잖아 Babe Just only you\n기다리고 있잖아 Babe Just only you','브레이브걸스-롤린.mp3',215,0,8,0),(10,'소녀시대-FOREVER1.jpg','FOREVER 1','소녀시대','소녀시대','FOREVER1',NULL,'2022-08-05','FOREVER 1\nIt\'s love It\'s love\nWe\'re not stopping\n네가 머문 이 세상이 더\n아름다운 건\n겁 없이 외치던 말 \'사랑해 너를\'\n영원하기에\nYou and I\n터지는 눈물이\n말하잖아\n난 그냥 전부 던진 거야\n아무런 망설임 따위도\n멋대로 끌렸던 그대로\nOh my baby 달려가 안을게\nI love 너의 모든 것, 내 전부인 너\n우리는 영원\nWe are one\n전율 속에 뜨거운 그 맘을 던져\nJust like a love bomb\nWe are one\nGirls, We are forever\n(Yeah we are, We\'re still FOREVER 1)\nIt\'s now or never\n(We keep on, We\'re still FOREVER 1)\nYeah we\'re forever\n(Yeah we are, We\'re still FOREVER 1)\n날 꼭 안아 절대 놓치지 마\n가슴이 뛰잖아\n다시는 아파하지 마\n너의 마음을\n우린 다 알아\n다 알아\n내 곁에 있어 줘\n이 순간도 마지막처럼\nYou know your love is crazy 항상 그랬지\nOh my baby 사랑해 기억해\nI love 너의 모든 것, 내 전부인 너\n우리는 영원\nWe are one\n전율 속에 뜨거운 그 맘을 던져\nJust like a love bomb\nWe are one\nGirls, We are forever\n(Yeah we are, We\'re still FOREVER 1)\nIt\'s now or never\n(We keep on, We\'re still FOREVER 1)\nYeah we\'re forever\n(Yeah we are, We\'re still FOREVER 1)\n언제나 너의 곁에 있고 싶은데\n널 생각하면 강해져\nThere\'s no one like you, no one like you\n우리 꼭 영원하자\n우리 머문 이 세상에서\n네게 말했어\n다시 태어나도 널 사랑할게\nCause we are the one\nI love 너의 (Ooh I Love 나의)\n모든 것 내 전부인 너 (전부인 너)\n우리는 영원 (Ooh)\nWe are one\n전율 속에 (그 전율 속에)\n뜨거운 그 맘을 던져\nJust like a love bomb (Just like a love bomb)\nWe are one\nGirls, We are forever\n(Yeah we are, We\'re still FOREVER 1)\nIt\'s now or never\n(We keep on, We\'re still FOREVER 1)\nYeah we\'re forever\n(Yeah we are, We\'re still FOREVER 1)','소녀시대-FOREVER1.mp3',202,1,8,0),(11,'오마이걸-던던댄스.jpg','Dun Dun Dance','오마이걸','오마이걸','DunDunDance',NULL,'2021-05-10','Dun Dun Dance Dun Dun Dance\nDun Dun Dance\nJust dance Just dance\nDun Dun Dance Dun Dun Dance\nDun Dun Dance\nJust dance Just dance\n유성이 비처럼 쏟아지는 하늘\n그 아래 너와 함께 춤추고 싶어\n색색의 옷들과 예쁜 액세서리\noh baby\n흐르는 저 음악이\n내 맘을 설레게 하지\nI feel the disco rhythm in my body\n다른 아무것도 생각하진 마\nyeah 발자국으로 가득한\n무대 위에 올라\n자유로운 몸짓 그 사랑스런 느낌\n저 따분했던 하루와\n일상에서 벗어나 oh tonight\nJust you and I\n지구를 등지고 떠올라\n맘껏 crazy crazy crazy 긴 춤을 춰\n말리지 마 지금 내 기분은\nfeel so high\n멀리 멀리 멀리 다 눈부셔\nI just wanna Dun Dun Dance\nDun Dun Dance Dun Dun Dance\nOh baby give me baby\ngive me baby give me more\n날 멈추지 마 love this song\nJust wanna Dun Dun Dance\nDun Dun Dance Dun Dun Dance\nJust dance Just dance\nShining like a disco ball\n빨간 high heels on the road\nGot my eyes on you\nand you got yours\n저 태양이 다시 눈뜰 때까지\n넌 평범한데 뭔가 달라\n왠지 묘한 구석이 있네\n난 가려져 있는 게 보여\n우린 모두 이상해 조금씩은 yeah\n사람을 가장한 낯선 존재들처럼\noh baby\nyeah 놀라지 않아\n괜찮아 좀 더 가까이 와\n다른 시선 따위 다 잊어버려 우리\n늘 복잡한 저세상과\n기대에서 벗어나 oh tonight\nJust you and I\n지구를 등지고 떠올라\n맘껏 crazy crazy crazy 긴 춤을 춰\n말리지 마 지금 내 기분은\nfeel so high\n멀리 멀리 멀리 다 눈부셔\nI just wanna Dun Dun Dance\nDun Dun Dance Dun Dun Dance\nOh baby give me baby\ngive me baby give me more\n날 멈추지 마 love this song\nJust wanna Dun Dun Dance\nDun Dun Dance Dun Dun Dance\nJust dance Just dance\n어차피 작은 점일 뿐야\n보석 같은 아이야\n몇 발짝 멀리 떨어져서 바라보면 돼\n우린 dancing on fire\nJust you and I\n지구를 등지고 떠올라\n맘껏 crazy crazy crazy 긴 춤을 춰\n말리지 마 지금 내 기분은\nfeel so high\n멀리 멀리 멀리 다 눈부셔\nI just wanna Dun Dun Dance\nDun Dun Dance Dun Dun Dance\nOh baby give me baby\ngive me baby give me more\n날 멈추지 마 love this song\nJust wanna Dun Dun Dance\nDun Dun Dance Dun Dun Dance','오마이걸-던던댄스.mp3',225,0,8,0),(12,'에스파-NextLevel.jpg','Next Level','에스파aespa','에스파aespa','NextLevel',NULL,'2021-05-17','I\'m on the Next Level Yeah\n절대적 룰을 지켜\n내 손을 놓지 말아\n결속은 나의 무기\n광야로 걸어가\n알아 네 Home ground\n위협에 맞서서\n제껴라 제껴라 제껴라\n상상도 못한 Black out\n유혹은 깊고 진해\n(Too hot too hot)\n맞잡은 손을 놓쳐\n난 절대 포기 못해\nI\'m on the Next Level\n저 너머의 문을 열어\nNext Level\n널 결국엔 내가 부셔\nNext Level\nKOSMO에 닿을 때까지\nNext Level\n제껴라 제껴라 제껴라\nLa la la la la la\nLa la la la la la\nLa la la la la la\nLa la la la la\nI see the NU EVO.\n적대적인 고난과 슬픔은\n널 더 Popping 진화시켜\nThat\'s my naevis It\'s my naevis\nYou lead, we follow\n감정들을 배운 다음\nWatch me while I make it out\nWatch me while I work it out\nWatch me while I make it out\nWatch me while I work it out\nWork it work it work it out\n감당할 수 없는 절망도\n내 믿음을 깨지 못해\n더 아픈 시련을 맞아도\n난 잡은 손을 놓지 않을게 Oh\n절대로 뒤를 돌아보지 말아\n광야의 것 탐내지 말아\n약속이 깨지면\n모두 걷잡을 수 없게 돼\n언제부턴가 불안해져 가는 신호\n널 파괴하고 말 거야\n(We want it)\nCome on!\nShow me the way to KOSMO Yeah\nBlack Mamba가 만들어낸 환각 퀘스트\naespa, ae를 분리시켜놓길 원해 그래\n중심을 잃고 목소리도 잃고 비난받고\n사람들과 멀어지는 착각 속에\nnaevis 우리 ae, ae들을 불러봐\naespa의 Next Level “P.O.S”를 열어봐\n이건 REAL WORLD 깨어났어\nWe against the villain\nWhat\'s the name?\nBlack Mamba\n결국 난 문을 열어\n그 빛은 네겐 Fire\n(Too hot too hot)\n난 궁금해 미치겠어\n이다음에 펼칠 Story\nHuh!\nI\'m on the Next Level\n저 너머의 문을 열어\nNext Level\n널 결국엔 내가 부셔\nNext Level\nKOSMO에 닿을 때까지\nNext Level\n제껴라 제껴라 제껴라\nI\'m on the Next Level\n더 강해져 자유롭게\nNext Level\n난 광야의 내가 아냐\nNext Level\n야수 같은 나를 느껴\nNext Level\n제껴라 제껴라 제껴라\nHuh!','에스파-NextLevel.mp3',222,0,8,0),(13,'싸이-ThatThat.jpg','That That','싸이','싸이','ThatThat',NULL,'2022-04-29','20 22\nPSY Coming back (이리 오너라)\nLong time no see huh?\n오래간만이지 huh?\n우리 다시 웃고 울고 지지고 볶고\nLet\'s get loco\nPandemic\'s over uh\n그래 기분이 오져 uh\n다시 그분이 오죠 uh\nEverybody say\n뻑적지근해\n걸쩍지근해\n시끌벅적거리네\n너무 좋아 북적거리네\n동서남북 Aye\n강남강북 Aye\n싹 다 모여 Throw yo hands in the air\nI say yeah\nCan you feel it?\nCan you feel it?\nOh oh woo yeah Oh woo oh\nCan you feel it?\nCan you feel it?\nOh oh woo yeah Ah\n준비하시고 (Go) 쏘세요 (Oh)\nThat that I like that (Like that)\n기분 좋아 Babe (Babe)\n흔들어 좌 우 위 아래로 (Sing it)\nOne two three to the four (Sing it)\nThat that I like that\nThat that I like that babe\nThat that I like that\nIt\'s like that that yo\nThat that I like that\nThat that I like that babe\nThat that I like that\nIt\'s like that\n야 내가 뭐 하는 사람인지 까먹었지?\nThat that I like that (Like that)\n시간이 지나도 변함없이\nThat that I like that (Like that)\nI don\'t care I don\'t care that I like that\nThat that I like that (Like that)\n내가 바라보고 바라왔던 사람들아\n모두 다 Ready set go\n되려 늘어난 맷집 때리던 분이 불편하겠지\n너네 바람대로 망할 거라 고사 지낸\n사람들을 모아다가 가볍게 때찌\n적당히 하라고 Oh oh oh\n그냥 닥치고 다 같이 놀아보자고 Oh oh oh\n민윤기와 박재상\nCan you feel it?\nCan you feel it?\nOh oh woo yeah Oh woo oh\nCan you feel it?\nCan you feel it?\nOh oh woo yeah Ah\n준비하시고 (Go) 쏘세요 (Oh)\nThat that I like that (Like that)\n기분 좋아 Babe (Babe)\n흔들어 좌 우 위 아래로 (Sing it)\nOne two three to the four (Sing it)\nThat that I like that\nThat that I like that babe\nThat that I like that\nIt\'s like that that yo\nThat that I like that\nThat that I like that babe\nThat that I like that\nIt\'s like that that yo\nDo what you wanna\nSay what you wanna\nDo what you wanna (Say what?)\nThat that I like that babe\nDo what you wanna\nSay what you wanna\nDo what you wanna (Say what?)\nThat that I like that babe\nThat that I like that','싸이-ThatThat.mp3',175,0,8,0),(14,'태연-INVU.jpg','INVU','태연','태연','INVU',NULL,'2022-02-14','Falling in love\n너에겐 난 Option\n시작부터 다른 너와 나\n깨지는 Heart\n빗나간 네 Mention\n익숙하거든\nI think I lost my mind\nBut It\'s my kind of love\n아끼지 않고 다\n쏟아내고는 주저앉아\n문득 어느 순간\n지친 내가 보여\n애쓰고 있지만\nSo I can\'t love you\nEven though I do\n밀어내 봐도\n난 너를 못 이겨\n날 버리고\n날 잃을수록\n넌 반짝이는 아이러니\nSo I N V U\nI N V U\nI N V U\n기대지 마\n기대하지도 마\n몇 번을 되뇌고 되놰도\n그 손길 한 번에\n무너지는 날 볼 때\n네 기분은 어때\nI guess I lost my mind\nYeah It\'s my kind of love\n늘 처음인 것처럼\n서툴러서 또 상처가 나\n무뎌지기 전에\n아물기도 전에\n잔뜩 헤집어놔\nSo I can\'t love you\nEven though I do\n밀어내 봐도\n난 너를 못 이겨\n날 버리고\n날 잃을수록\n넌 반짝이는 아이러니\nSo I N V U\nI N V U\nI N V U\n식은 온기\n부서진 맘이\n자꾸 날 할퀴어\n아파도 못 멈춰\nSo when you leave\nPlease make it easy\nCause I N V U\nI N V U\nI N V U\nI N V U\nI N V U','태연-INVU.mp3',205,0,8,0),(15,'10cm-나의어깨에기대어요.jpg','나의 어깨에 기대어요','10cm','10cm','나의어깨에기대어요',NULL,'2020-07-20','나의 두 눈에 보여지는 그 뒷모습이\n서글퍼지는 마음이라 눈물이 글썽여\n하루 또 하루 지나가면 더 멀어질까 봐\n이렇게 또 불안한 마음만\n날 떠나가지 말아요\n가슴속으로 그댈 향해 외치는 말\n돌아가지는 말아요\n그대 있는 곳 다시 사라지지 말아요\n외로운 맘에 서러워도 울지 말아요\n나의 어깨에 기대어요 그대 괜찮다면\n어떤 날에는 더 아프고 또 슬프겠지만\n내가 그대 곁에 있을게요\n날 떠나가지 말아요\n가슴속으로 그댈 향해 외치는 말\n돌아가지는 말아요\n그대 있는 곳 다시 사라지지 말아요\n지금은 아닐거에요\n우리 헤어지는 건\n내게서 멀어지지 말아요\n내 곁에 있어줘\n나의 품에 안겨줘요\n슬픈 날들이 지나가면 그때라면\n온 세상을 다 줄게요 나 그대에게\n지금 내 말 듣고 있나요\n나를 떠나가지 말아요','10cm-나의어깨에기대어요.mp3',211,0,11,0),(16,'아이유-좋은날.jpg','좋은 날','아이유 IU','아이유IU','좋은날',NULL,'2010-12-09','어쩜 이렇게 하늘은 더 파란건지\n오늘따라 왜 바람은 또 완벽한지\n그냥 모르는척 하나 못들은척\n지워버린척 딴 얘길 시작할까\n아무 말 못하게 입 맞출까\n눈물이 차올라서 고갤 들어\n흐르지 못하게 또 살짝 웃어\n내게 왜 이러는지 무슨 말을 하는지\n오늘 했던 모든 말 저 하늘 위로\n한번도 못했던 말\n울면서 할 줄은 나 몰랐던 말\n나는요 오빠가 좋은걸 어떡해\n\n새로 바뀐 내 머리가 별로였는지\n입고 나왔던 옷이 실수였던건지\n아직 모르는척 기억 안 나는척\n아무 일없던것처럼 굴어볼까\n그냥 나가자고 얘기할까\n눈물이 차올라서 고갤 들어\n흐르지 못하게 또 살짝 웃어\n내게 왜 이러는지 무슨 말을 하는지\n오늘 했던 모든 말 저 하늘 위로\n한번도 못했던 말\n울면서 할 줄은 나 몰랐던 말\n나는요 오빠가 좋은걸 어떡해\n(휴 어떡해)\n\n이런 나를 보고 그런 슬픈 말은 하지 말아요\n철 없는 건지 조금 둔한건지 믿을 수가 없는걸요\n\n눈물은 나오는데 활짝 웃어\n네 앞을 막고서 막 크게 웃어\n내가 왜 이러는지 부끄럼도 없는지\n자존심은 곱게 접어 하늘 위로\n한 번도 못했던 말 어쩌면 다신 못할 바로 그 말\n나는요 오빠가 좋은걸(아이쿠, 하나 둘)\nI\'m in my dream\n\n(It\'s too beautiful beautiful day)\n(Make it a good day)\n(Just don\'t make me cry)\n이렇게 좋은 날','아이유-좋은날.mp3',235,0,8,0),(17,'10cm-서랍.jpg','서랍','10cm','10cm','서랍',NULL,'2021-12-07','어린 햇살 아래서\n뛰어놀곤 했었던\n가쁜 숨결\n굽이진 골목 지나\n길을 따라가보면\n같은 기억\n어른이란 시간은\n아직 어색하게도\n나를 채워\n많은 게 변했다 해\n여긴 그대로인걸\nYou\'ll feel the same\n땀에 젖어 놀았던\n우리는 너와 난 이젠\n돌아갈 순 없지만\n낡아진 서랍 속에서\n작았던 서롤 기억해\nWhen I\'m far from home\nAlways 떠올라 난 아직도\n반짝이던 네 두 눈\n마주 보던 그림자\n마주 보던 우리는\n여기 still same\n시간은 언제나 날\n울리는 존재지만\n놓질 못해\n많은 게 더 지날 땐\n여긴 또 하나의\nOur home\n그땐 우린 어딜까\n낡아진 서랍 속에서\n작았던 서롤 기억해\nWhen I\'m far from home\nAlways 떠올라 난 아직도\n반짝이던 네 두 눈\n혼자서 숨겼던\n널 향한 마음은\n알게 하진 않을 거야\n널 볼 수 있다면 그걸로 충분해\n담을게 두 눈에 언제든 항상\n낡아진 서랍 속에서\n작았던 서롤 기억해\nWhen I\'m far from home\nAlways 떠올라 난 아직도\n반짝이던 네 두 눈','10cm-서랍.mp3',278,0,11,0),(18,'다비치-이사랑.jpg','이 사랑','다비치','다비치','이사랑',NULL,'2016-03-03','시간을 되돌리면\n기억도 지워질까\n해볼 수도 없는 말들을\n내뱉는 걸 알아\n널 힘들게 했고\n눈물로 살게 했던\n미안한 마음에 그런 거야\n하지만 난 말야\n너의 밖에선 살 수 없어\n내겐 너 하나로 물든\n시간만이 흘러갈 뿐이야\n사랑해요. 고마워요\n따뜻하게 나를 안아줘\n이 사랑 땜에 나는 살 수 있어\n사랑은 그런가봐\n무슨 말을 해봐도\n채워지지 않은 것 같은\n마음이 드나봐\n내 욕심이라고 다시\n생각을 해봐도\n그 마음 쉽게 사라지지 않아\n알잖아 난 말야\n너의 밖에선 살 수 없어\n내겐 너 하나로 물든\n시간만이 흘러갈 뿐이야\n사랑해요 고마워요\n따뜻하게 나를 안아줘\n이 사랑 땜에 나는 살 수 있어\n돌아가도 다시 견딜 수 있을까\n너무 힘들던 시간들\n흔들리지 않은 너를 볼 때면\n떨리는 내 입술이\n두루루..두루루..\n알잖아 난 말야\n너의 밖에선 살 수 없어\n내겐 너 하나로 물든\n시간만이 흘러갈 뿐이야\n사랑해요 고마워요\n따뜻하게 나를 안아줘\n이 사랑 땜에 나는 살 수 있어\n사랑 땜에 나는 살 수 있어','다비치-이사랑.mp3',225,0,11,0),(19,'로꼬,유주-우연히봄.jpg','우연히 봄','로꼬,유주','로꼬,유주','우연히봄',NULL,'2015-04-08','우연히 내게 오나 봐\n봄 향기가 보여\n너도 같이 오나 봐\n저 멀리서 네 향기가\n설레는 코끝에 나의 입술에\n괜찮은 느낌 이 떨림\n나도 몰래 우연히 봄\n\n어 어느새 겨울 지나 봄이야\n여전히 난 너 앞에선 돌이야\n난 아직 이게 믿기지가 않지만\n내 왼손은 지금까지도 너의 향기가\n미묘하게 흘렀던 분위기에\n아직까지 난 가까스로 숨 쉬네\n무대 위완 다르게 네 눈을 피해\n고개를 돌렸던 내 모습에 한숨 쉬네\n오랜만에 느껴지는 이 떨림이 날 단순하게 만들어\n딱 너만 아른거리지\n다 고쳤다고 생각했던 버벅임이 또 도져서\n준비했던 말을 잊어버리지\n난 주워 담지 못할 말은 절대 안 해\n원하는 걸 말해 봐 널 위해서만 할게\n너 빼곤 다 색칠할 수 있어 까맣게\n천천히 갈게 조금 더 가깝게\n\n우연히 내게 오나 봐\n봄 향기가 보여\n너도 같이 오나 봐\n저 멀리서 네 향기가\n설레는 코끝에 나의 입술에\n괜찮은 느낌 이 떨림\n나도 몰래 우연히 봄\n\n어 아직까지 향기가 짙네\n발걸음이 가벼워 집에 가는 길엔\n더 가까워질 너와 나를 상상하는 내 모습이 오글거려 몸서리치네\n어 어 머릿속이 하얘지기 때문에\n하루 종일 날씨 얘기만 반복하게 돼\n오로지 난 너 하나 때문에 다른 것들에겐 무감각하게 돼\n정적이 만드는 긴장감은 오히려 설레어 나를 미소 짓게 만들어\n모른 척하려 했던 네 옆의 남자들은\n흐릿했던 내 눈앞에 불을 켜게 만들어\n겨울은 유난히도 추웠고 다시 돌아온 그토록 기다렸던 봄\n움직이지 못하도록 잡고 있고 싶어\n날 더 느낄 수 있게 안고 있고 싶어\n\n우연히 내게 오나 봐\n봄 향기가 보여\n너도 같이 오나 봐\n저 멀리서 네 향기가\n설레는 코끝에 나의 입술에\n괜찮은 느낌 이 떨림\n나도 몰래 우연히 봄\n\nI love u so I love u\n너무 쉬운걸\n그래도 나 참고 있을게\n난 여자이니까 하루 더 기다려\n\n바보야 내게 말해 봐\n네 마음도 보여\n갖고 싶다고 해 봐\n더 이상은 감추지 마\n어느새 내 앞에 이젠 내 앞에\n괜찮은 느낌 이 떨림\n나도 몰래 우연히 봄','로꼬,유주-우연히봄.mp3',202,0,11,0),(20,'멜로망스-사랑인가봐.jpg','사랑인가 봐','멜로망스','멜로망스','사랑인가봐',NULL,'2022-02-18','너와 함께 하고 싶은 일들을 상상하는 게\n요즘 내 일상이 되고\n너의 즐거워하는 모습을 보고 있으면\n자연스레 따라 웃고 있는 걸\n너의 행동에 설레어하고 뒤척이다가\n지새운 밤이 많아지는데\n이건 누가 봐도 사랑일 텐데\n종일 함께면 질릴 텐데\n나 돌아서도 온통 너인 건\n아무래도 사랑인가 봐\n점점 너와 하고 싶은 일들 생각하면서\n하룰 보낸 날이 많아지는데\n이건 누가 봐도 사랑일 텐데\n종일 함께면 질릴 텐데\n나 돌아서도 온통 너인 건\n아무래도 사랑인가 봐\n너의 행복해하는 모습을 보고 있으면\n나도 모르게 따라 웃는데\n이 정도면 알아줄 만하잖아\n너도 용기 낼만 하잖아\n나만 이런 게 아니라면\n우리 만나볼 만하잖아\n아무래도 사랑인가 봐\n\n','멜로망스-사랑인가봐.mp3',186,0,11,0),(21,'서인국,정은지-Allforyou.jpg','All for you','서인국,정은지','서인국,정은지','Allforyou',NULL,'2012-08-28','all for you\n벌써 며칠째 전화도 없는 너\n얼마 후면 나의 생일이란 걸 아는지\n눈치도 없이 시간은 자꾸만 흘러가고\n난 미움보다 걱정스런 맘에\n무작정 찾아간 너의 골목 어귀에서\n생각지 못한 웃으며 반기는 너를 봤어\n\n사실은 말야 나 많이 고민했어\n네게 아무것도 해줄 수 없는걸\n아직 많이 모자라도 가진 것 없어도\n이런 나라도 받아 줄래\n\n너를 위해서 너만을 위해서\n난 세상 모든 걸 다 안겨 주지는 못하지만\n난 너에게만 이제 약속할게\n오직 너를 위한 내가 될게\n\nIt\'s only for you just wanna be for you\n넌 그렇게 지금 모습 그대로 내 곁에 있으면 돼\n난 다시 태어나도 영원히 너만 바라볼게\n\n넌 모르지만 조금은 힘들었어\n네게 어울리는 사람이 나인지\n그건 내가 아니라도 다른 누구라도\n이젠 그런 마음 버릴래\n\n너를 위해서 너만을 위해서\n난 세상 모든 걸 다 안겨 주지는 못하지만\n난 너에게만 이제 약속할게\n오직 너를 위한 내가 될게\n\nIt\'s only for you just wanna be for you\n넌 그렇게 지금 모습 그대로 내 곁에 있으면 돼\n난 다시 태어나도 영원히 너만 바라볼게\n\n\n(love 내 작은 맘속을 oh love 네 향기로 채울래)\n그 속에 영원히 갇혀 버린 대도\n난 행복 할 수 있도록\n\n너를 위해서\n\n너를 위해서 너만을 위해서\n난 세상 모든 걸 다 안겨 주진 못하지만\n난 너에게만 이제 약속할게\n오직 너를 위한 내가 될게\n\nIt\'s only for you just wanna be for you\n넌 그렇게 지금 모습 그대로 내 곁에 있으면 돼\n난 다시 태어나도 영원히 너만 바라볼게','서인국,정은지-Allforyou.mp3',263,0,11,0),(22,'성시경-너의모든순간.jpg','너의 모든 순간','성시경','성시경','너의모든순간',NULL,'2014-02-12','이윽고 내가 한눈에 너를 알아봤을 때\n모든 건 분명 달라지고 있었어\n내 세상은 널 알기 전과 후로 나뉘어\n니가 숨 쉬면 따스한 바람이 불어와\n니가 웃으면 눈부신 햇살이 비춰\n거기 있어줘서 그게 너라서\n가끔 내 어깨에 가만히 기대주어서\n나는 있잖아 정말 빈틈없이 행복해\n너를 따라서 시간은 흐르고 멈춰\n물끄러미 너를 들여다 보곤 해\n그것 말고는 아무것도 할 수 없어서\n너의 모든 순간 그게 나였으면 좋겠다\n생각만 해도 가슴이 차올라 나는 온통 너로\n보고 있으면 왠지 꿈처럼 아득한 것\n몇 광년 동안 날 향해 날아온 별빛 또 지금의 너\n*거기 있어줘서 그게 너라서\n가끔 나에게 조용하게 안겨주어서\n나는 있잖아 정말 남김없이 고마워\n너를 따라서 시간은 흐르고 멈춰\n물끄러미 너를 들여다보곤 해\n너를 보는 게 나에게는 사랑이니까\n너의 모든 순간 그게 나였으면 좋겠다\n생각만 해도 가슴이 차올라 나는 온통 너로.\n니 모든 순간 나였으면.','성시경-너의모든순간.mp3',237,0,11,0),(23,'아이유-내손을잡아.jpg','내 손을 잡아','아이유 IU','아이유IU','내손을잡아',NULL,'2011-05-25','느낌이 오잖아 떨리고 있잖아\n언제까지 눈치만 볼 거니\n네 맘을 말해봐 딴청 피우지 말란 말이야\n네 맘 가는 그대로 지금 내 손을 잡아\n어서 내 손을 잡아\n\n우연히 고개를 돌릴 때 마다\n눈이 마주치는 건\n며칠밤 내내 꿈속에 나타나\n밤새 나를 괴롭히는 건\n\n그 많은 빈자리 중에서 하필\n내 옆자릴 고르는 건\n나도 모르게 어느새 실없는 웃음\n흘리고 있다는 건\n\n그럼 말 다했지 뭐 우리 얘기 좀 할까\n\n느낌이 오잖아 떨리고 있잖아\n언제까지 눈치만 볼 거니\n네 맘을 말해봐 딴청 피우지 말란 말이야\n네 맘 가는 그대로 지금 내 손을 잡아\n\n핸드폰 진동에 심장이 덜컥\n내려 앉는다는 건\n오 나도 모르게 어느새 짓궂은 네 말투\n자꾸 듣고 싶은걸\n\n어떡해\n(저기 멀리 걸어온다)\n(눈이 마주친다)\n언제까지 넌 모른척 할거니\n\n사랑이 온거야 너와 나 말이야\n네가 좋아 정말 못 견딜 만큼\n그거면 된거야 더는 생각하지 말란 말이야\n네 맘 가는 그대로\n\n느낌이 오잖아 떨리고 있잖아\n언제까지 눈치만 볼 거니\n네 맘을 말해봐 딴청 피우지 말란 말이야\n네 맘 가는 그대로 지금 내 손을 잡아\n\n그냥 내 손을 잡아 지금 내 손을 잡아','아이유-내손을잡아.mp3',195,0,11,0),(24,'임영웅-사랑은늘도망가.jpg','사랑은 늘 도망가(신사의 아가씨 OST)','임영웅','임영웅','사랑은늘도망가(신사의아가씨OST)',NULL,'2021-10-11','눈물이 난다 이 길을 걸으면\n그 사람 손길이 자꾸 생각이 난다\n붙잡지 못하고 가슴만 떨었지\n내 아름답던 사람아\n사랑이란 게 참 쓰린 거더라\n잡으려 할수록 더 멀어지더라\n이별이란 게 참 쉬운 거더라\n내 잊지 못할 사람아\n사랑아 왜 도망가\n수줍은 아이처럼\n행여 놓아버릴까 봐\n꼭 움켜쥐지만\n그리움이 쫓아 사랑은 늘 도망가\n잠시 쉬어가면 좋을 텐데\n바람이 분다 옷깃을 세워도\n차가운 이별의 눈물이 차올라\n잊지 못해서 가슴에 사무친\n내 소중했던 사람아\n사랑아 왜 도망가\n수줍은 아이처럼\n행여 놓아버릴까 봐\n꼭 움켜쥐지만\n그리움이 쫓아 사랑은 늘 도망가\n잠시 쉬어가면 좋을 텐데\n기다림도 애태움도 다 버려야 하는데\n무얼 찾아 이 길을 서성일까\n무얼 찾아 여기 있나\n사랑아 왜 도망가\n수줍은 아이처럼\n행여 놓아버릴까 봐\n꼭 움켜쥐지만\n그리움이 쫓아 사랑은 늘 도망가\n잠시 쉬어가면 좋을 텐데\n잠시 쉬어가면 좋을 텐데','임영웅-사랑은늘도망가.mp3',273,0,11,0),(25,'폴킴-안녕.jpg','안녕','폴킴','폴킴','안녕',NULL,'2019-08-12','안녕 이라는 말을해\n짧은 시간을 뒤로 한채로\n여전히 아프겠지만\n하룻밤 자고 나면 사라지는 꿈처럼\n너를 oh 잊게될까 두려워져\n무심히 널 떠올리게 되면\n불안해지는 맘 어떻게 해야하니\n안녕 이제는 안녕\n이 말 도저히 할 수가 없어\n너로 가득찬 내 마음\n겨우 내가 할 수 있는 일\n너를 사랑하는 거\n다시 널 만날 수 있길\n아주 오래 전부터 정해진 연일지도\n너밖에 모를 내가 되었던 그때가\n두려워져 널 안고 있으면\n자꾸 욕심이나 어쩔 수 없는걸\n안녕 이제는 안녕\n이 말 도저히 할 수가 없어\n너로 가득찬 내 마음\n겨우 내가 할 수 있는 일\n너를 사랑하는 거\n다시 널 만날 수 있길\n굳게 닫힌 저 문이 열리면\n그때는 널 다시 볼 수 있을까\n잠시 스치듯 만나\n운명처럼 날 꽃 피우게 해\n매일 널 꿈꾸겠지만\n가득 채울 그리움만큼\n바라는 건 단 하나\n계속 내 곁에 있어줘','폴킴-안녕.mp3',225,0,11,0),(26,'Aimer-Zankyosanka귀멸의칼날op.jpg','Zankyosanka귀멸의 칼날op','Aimer','Aimer','Zankyosanka귀멸의칼날op',NULL,'2021-12-06','誰が袖に咲く幻花\n\nただそこに藍を落とした\n\n​派手に色を溶かすよるに\n\n銀朱の月を添えて\n\n転がるように風を切って\n\n躓くことに 強くなった\n\n光も痛みも怒りも全部抱き締めて\n\n選ばれなければ 選べばいい\n\n声よ轟け 夜のその向こうへ\n\n涙で滲んでた\n\nあんなに遠くの 景色まで 響き渡れ\n\n何を奏でて 誰に届けたくて\n\n不確かなままでいい\n\nどんなに暗い感情も\n\nどんなに長い葛藤も\n\n歌と散れ 残響\n\n​ただ一人舞う千夜\n\n違えない帯を結べば\n\n派手な色を負かす様に\n\n深紅の香こそあはれ\n\nこの先どんな辛い時も\n\n口先よりも胸を張って\n\n抱いた夢の灯りを全部 辿るだけ\n\n逃げ出すためここまで 来たんじゃないだろ\n\n​選ばれなければ 選べばいい\n\n声を枯らして 燃える花のように\n\n闇間を照らしたら\n\n曖昧過ぎる正解も譜面にして\n\n夜を数えて 朝を描く様な\n\n鮮やかな音を鳴らす\n\nどんなに深い後悔も\n\nどんなに高い限界も\n\n掻き消して 残響\n\n-','Aimer-Zankyosanka귀멸의칼날op.mp3',183,0,5,0),(27,'DJOkawari-FlowerDance.jpg','Flower Dance','DJ Okawari','DJOkawari','FlowerDance',NULL,'2011-06-29','They serve the purpose of changing hydrogen\ninto breathable oxygen\nAnd they’re as necessary here as the air is\non Earth\nBut I still say they’re flowers\nIf you like\nDo you sell them\nI’m afraid not\nBut maybe we could make a deal','DJOkawari-FlowerDance.mp3',264,0,5,0),(28,'KenshiYonezu-Lemon.jpg','Lemon','Kenshi Yonezu','KenshiYonezu','Lemon',NULL,'2018-03-14','夢ならばどれほどよかったでしょう\n\n未だにあなたのことを夢にみる\n\n忘れた物を取りに歸るように\n\n古びた思い出の埃を拂う\n\n\n戾らない幸せがあることを\n\n最後にあなたが敎えてくれた\n\n言えずに隱してた昏い過去も\n\nあなたがいなきゃ永遠に昏いまま\n\nきっともうこれ以上　傷つくことなど\n\nありはしないとわかっている\n\nあの日の悲しみさえ　あの日の苦しみさえ\n\nそのすべてを愛してた　あなたとともに\n\n胸に殘り離れない　苦いレモンのにおい\n\n雨が降り止むまでは歸れない\n\n今でもあなたはわたしの光\n\n\n\n\n暗闇であなたの背をなぞった\n\nその輪郭を鮮明に覺えている\n\n\n受け止めきれないものと出會うたび\n\n溢れてやまないのは淚だけ\n\n\n何をしていたの　何を見ていたの\n\nわたしの知らない橫顔で\n\nどこかであなたが今　わたしと同じ樣な\n\n淚にくれ　淋しさの中にいるなら\n\nわたしのことなどどうか　忘れてください\n\nそんなことを心から願うほどに\n\n今でもあなたはわたしの光\n\n自分が思うより\n\n戀をしていたあなたに\n\nあれから思うように\n\n息ができない\n\nあんなに側にいたのに\n\nまるで噓みたい\n\nとても忘れられない\n\nそれだけが確か\n\n\nあの日の悲しみさえ　あの日の苦しみさえ\n\nそのすべてを愛してた　あなたとともに\n\n胸に殘り離れない　苦いレモンのにおい\n\n雨が降り止むまでは歸れない\n\n切り分けた果實の片方の樣に\n\n今でもあなたはわたしの光\n','KenshiYonezu-Lemon.mp3',275,0,5,0),(29,'KingGnu-Sakayume.jpg','Sakayume','King Gnu','KingGnu','Sakayume',NULL,'2021-12-29','あなたが望むなら\nこの胸を射通して\n頼りの無い僕もいつか\n何者かに成れたなら\n訳もなく\n涙が溢れそうな\n夜を埋め尽くす\n輝く夢と成る\n白い息は頼りなく\n冬の寒さに溶けて消えた\nあの日の重ねた手と手の\n余熱じゃあまりに頼りないの\n春はいつだって\n当たり前の様に\n迎えに来ると\nそう思っていたあの頃\n瞼閉じれば\n夢はいつだって\n正夢だと信じてたあの頃\nあなたが望むなら\n何処迄も飛べるから\n意気地の無い僕もいつか\n生きる意味を見つけたなら\n愛と憎を\n聢と繋ぎ合わせて\n一生涯醒めない程の\n荒んだ夢と成る\n凍える夜空を\n二人で抜け出すの\nあたたかいコートを\nそっと掛けたなら\nあなたはいつだって\n当たり前の様に隣にいると\nそう思っていたあの頃\n失くせやしない\n記憶の雨が古傷へと\n沁み渡ろうとも\nあなたが望むなら\nこの胸を射通して\n頼りの無い僕もいつか\n何者かに成れたなら\n訳もなく\n涙が溢れそうな\n夜を埋め尽くす\n輝く夢と成る\n記憶の海を潜って\n愛の欠片を拾って\nあなたの中にずっと\n眩しい世界をそっと\nこの愛が例え呪いのように\nじんわりとじんわりと\nこの身体蝕んだとしても\n心の奥底から\nあなたが溢れ出して\n求め合って重なり合う\nその先で僕ら夢と成れ\nあなたが望むなら\nこの胸を射通して\n頼りの無い僕もいつか\n何者かに成れたなら\n訳もなく\n涙が溢れそうな\n夜を埋め尽くす\n輝く夢と成る\n正夢でも、逆夢だとしても','KingGnu-Sakayume.mp3',310,0,5,0),(30,'LiSA-homura.jpg','homura','Lisa','Lisa','homura',NULL,'2020-10-14','さよなら　ありがとう　声の限り\n\n悲しみよりもっと大事なこと\n\n去りゆく背中に伝えたくて\n\nぬくもりと痛みに間に合うように\n\n\nこのまま続くと思っていた\n\n僕らの明日を描いていた\n\n呼び合っていた光がまだ\n\n胸の奥に熱いのに\n\n\n僕たちは燃え盛る旅の途中で出会い\n\n手を取りそして離した　未来のために\n\n夢が一つ叶うたび　僕は君を想うだろう\n\n強くなりたいと願い　泣いた　決意を餞に\n\n\n懐かしい思いに囚われたり\n\n残酷な世界に泣き叫んで\n\n大人になるほど増えて行く\n\nもう何一つだって失いたくない\n\n\n悲しみに飲まれ落ちてしまえば\n\n痛みを感じなくなるけれど\n\n君の言葉　君の願い\n\n僕は守りぬくと誓ったんだ\n\n\n音を立てて崩れ落ちて行く\n\n一つだけの\n\nかけがえのない世界\n\n\n手を伸ばし抱き止めた激しい光の束\n\n輝いて消えてった　未来のために\n\n託された幸せと　約束を超えて行く\n\n振り返らずに進むから\n\n前だけ向いて叫ぶから\n\n心に炎を灯して\n\n遠い未来まで……\n','LiSA-homura.mp3',272,0,5,0),(31,'Official髭男dism-CryBaby.jpg','Cry Baby','Official髭男dism','Official髭男dism','CryBaby',NULL,'2021-08-18','胸ぐらを掴まれて 強烈なパンチを食らってよろけて\n肩を並べうずくまった\n予報通りの雨にお前はにやけて\n「傷口が綺麗になる」なんて嘘をつく\n\nいつも口喧嘩さえうまく出来ないくせして\n冴えない冗談言うなよ\nあまりのつまらなさに目が潤んだ\n\n何度も青アザだらけで涙を 流して 流して\n不安定な心を肩に預け合いながら 腐り切ったバッドエンドに抗う\nなぜだろう 喜びよりも心地よい痛み ずっしりと響いて\n濡れた服に舌打ちしながら 腫れ上がった顔を見合って笑う\n土砂降りの夜に 誓ったリベンジ\n\n胸ぐらを掴み返して 反撃のパンチを繰り出すくらいじゃなきゃ\nお前の隣には立てないから\n相手が何であれ日和らない 何度伸されても諦めない\n忘れるな忘れるなと言い聞かせ続けたのに\n\n(やり直して しくじって)\n(踏み倒して 食らいついて) どうして \n(やり直して しくじって) どうして \n(踏み倒して 肩落として) どうして どうして \n\nあぁ 傘はいらないから言葉を一つくれないか\n微温い優しさではなく\n弱音に侵された胸の奥を抉るような言葉を\n\n何度も青アザだらけで涙を 流して 流して\n不安定な心を肩に預け合いながら 腐り切ったバッドエンドに抗う\nなぜだろう 喜びよりも心地よい痛み ずっしりと響いて\n濡れた服に舌打ちしながら 腫れ上がった顔を見合って笑う\n土砂降りの夜に 囚われの日々に 問いかけるように\n光った瞳の中で 誓ったリベンジ\n','Official髭男dism-CryBaby.mp3',257,0,5,0),(32,'OtsukaAi-さくらんぼSakuranbo.jpg','さくらんぼ Sakuranbo','Otsuka Ai','OtsukaAi','さくらんぼSakuranbo',NULL,'2005-04-06','愛し合う2人 幸せの空\n隣どおし あなたとあたし さくらんぼ\n手帳開くと もう 2年たつなぁって\nやっぱ実感するね なんだか照れたりするね\nそういや ヒドイ コトもされたし\nヒドイ コトも言ったし\n中実がいっぱいつまった 甘い甘いものです\n泣き泣きの1日や 自転車の旅や\n書きあらわせれない\nだって 多いんだもん!!\n笑顔咲ク 君とつながってたい\nもしあの向こうに見えるものがあるなら\n愛し合う2人 幸せの空\n隣どおし あなたとあたし さくらんぼ\nもらったものは そう愛を感じ\nあげたものは もちろん 全力の愛です\nやっぱいいもんだよね 共同作業 罰ゲーム\n思いがけなく歴史は さらに深いけれど\n1つでも 欠けてたら とんでもなく\n足りない 足りない! 足りない!! 2人の絆\n笑顔咲ク 君と 抱き合ってたい\nもし遠い未来を 予想するのなら\n愛し合う2人 いつの時も\n隣どおし あなたと あたし さくらんぼ\n笑顔咲ク 君とつながってたい\nもしあの向こうに見えるものがあるなら\n愛し合う2人 幸せの空\n隣どおし あなたとあたし さくらんぼ\n(もういっかい!!)\n笑顔咲ク 君と 抱き合ってたい\nもし遠い未来を 予想するのなら\n愛し合う2人 いつの時も\n隣どおし あなたと あたし さくらんぼ\n愛し合う2人 いつの時も\n愛し合う2人 いつの時も\n隣どおし あなたと あたし さくらんぼ 접기','OtsukaAi-さくらんぼSakuranbo.mp3',232,0,5,0),(33,'RADWIMPS-なんでもないや(moviever.).jpg','なんでもないや (movie ver.)','RADWIMPS','RADWIMPS','なんでもないや(moviever.)',NULL,'2016-10-07','二人の間 通り過ぎた風は どこから寂しさを運んできたの\n泣いたりしたそのあとの空は やけに透き通っていたりしたんだ\nいつもは尖ってた父の言葉が 今日は暖かく感じました\n優しさも笑顔も夢の語り方も 知らなくて全部 君を真似たよ\nもう少しだけでいい あと少しだけでいい もう少しだけでいいから\nもう少しだけでいい あと少しだけでいい もう少しだけ くっついていようか\n僕らタイムフライヤー 時を駆け上がるクライマー\n時のかくれんぼ はぐれっこはもういやなんだ\n​嬉しくて泣くのは 悲しくて笑うのは\n君の心が 君を追い越したんだよ\n\n​\n星にまで願って 手にいれたオモチャも 部屋の隅っこに今 転がってる\n叶えたい夢も 今日で100個できたよ たった一つといつか 交換こしよう\n\n​\nいつもは喋らないあの子に今日は 放課後「また明日」と声をかけた\n慣れないこともたまにならいいね 特にあなたが 隣にいたら\nもう少しだけでいい あと少しだけでいい もう少しだけでいいから\nもう少しだけでいい あと少しだけでいい もう少しだけ くっついていようよ\n僕らタイムフライヤー 君を知っていたんだ\n僕が 僕の名前を 覚えるよりずっと前に\n君のいない 世界にも 何かの意味はきっとあって\nでも君のいない 世界など 夏休みのない 八月のよう\n君のいない 世界など 笑うことない サンタのよう\n君のいない 世界など\n僕らタイムフライヤー 時を駆け上がるクライマー\n時のかくれんぼ はぐれっこはもういやなんだ\nなんでもないや やっばりなんでもないや\n今から行くよ\n\n​\n僕らタイムフライヤー 時を駆け上がるクライマー\n時のかくれんぼ はぐれっこ はもういいよ\n\n​\n君は派手なクライヤー その涙 止めてみたいな\nだけど 君は拒んだ 零れるままの涙を見てわかった\n\n​\n嬉くて泣くのは 悲しくて 笑うのは\n僕の心が 僕を追い越したんだよ\n','RADWIMPS-なんでもないや(moviever.).mp3',344,0,5,0),(34,'SEKAINOOWARI-DragonNight.jpg','Dragon Night','SEKAI NO OWARI','SEKAINOOWARI','DragonNight',NULL,'2017-02-02','Today is the day\nwhen the sun sets on our home\nFinally the night will come\nout to say hello oh\nThe war that never ends\nstill wages on today\nBut tonight the fight\nwill stop and we will celebrate\nHEY\nEverybody has their own\nversion of what\'s just\nMaybe war is something\nthat is natural for us\nBut even the people\nthat fill me with hate\nHave their reasons to live\ntheir life that way\nDragon night Dragon night\nDragon night\nTonight\nall of us will sing together\nlike we\'re best of friends\nMoonlight starry skies\nfirebirds\nTonight let\'s dance everybody\nuntill the sunrise\nToday is the day\nwhen the sun sets on our home\nFinally the night will come\nout to say hello oh\nThe war that never ends\ncontinues for eternity\nBut tognight the fire burns to\nshow that we\'ve made peace\nHEY\nEverybody has their own\nversion of what\'s just\nMaybe war is something\nthat is natural for us\nBut the justice that i have\ncome to believe in\nMust be hurting others\nmore than i can comprehend\nDragon night Dragon night\nDragon night\nTonight\nall of us will sing together\nlike we\'re best of friends\ncongratulations congratulations\ncongratulations\nTonight let\'s dance everybody\nuntill the sunrise\nDragon night Dragon night\nDragon night\nTonight\nall of us will sing together\nlike we\'re best of friends\nMoonlight starry skies\nfire birds\nTonight let\'s dance everybody\nuntill the sunrise\nDragon night Dragon night\nDragon night\nTonight\nall of us will sing together\nlike we\'re best of friends\nMoonlight starry skies fire birds\nTonight our war will end\neven if it\'s just for one night','SEKAINOOWARI-DragonNight.mp3',229,0,5,0),(35,'YOASOBI-夜に駆ける.jpg','夜に駆ける','YOASOBI','YOASOBI','夜に駆ける',NULL,'2021-01-06','沈むように溶けてゆくように\n\n二人だけの空が広がる夜に\n\n「さよなら」だけだった\nその一言で全てが分かった\n日が沈み出した空と君の姿\nフェンス越しに重なっていた\n\n初めて会った日から\n僕の心の全てを奪った\nどこか儚い空気を纏う君は\n寂しい目をしてたんだ\n\nいつだってチックタックと\n鳴る世界で何度だってさ\n触れる心無い言葉うるさい声に\n涙が零れそうでも\nありきたりな喜びきっと二人なら見つけられる\n\n騒がしい日々に笑えない君に\n思い付く限り眩しい明日を\n明けない夜に落ちてゆく前に\n僕の手を掴んでほら\n忘れてしまいたくて閉じ込めた日々も\n抱きしめた温もりで溶かすから\n怖くないよいつか日が昇るまで\n二人でいよう\n\n君にしか見えない\n何かを見つめる君が嫌いだ\n見惚れているかのような恋するような\nそんな顔が嫌いだ\n\n信じていたいけど信じれないこと\nそんなのどうしたってきっと\nこれからだっていくつもあって\nそのたんび怒って泣いていくの\nそれでもきっといつかはきっと僕らはきっと\n分かり合えるさ信じてるよ\n\nもう嫌だって疲れたんだって\nがむしゃらに差し伸べた僕の手を振り払う君\nもう嫌だって疲れたよなんて\n本当は僕も言いたいんだ\n\nほらまたチックタックと\n鳴る世界で何度だってさ\n君の為に用意した言葉どれも届かない\n「終わりにしたい」だなんてさ\n釣られて言葉にした時\n君は初めて笑った\n\n騒がしい日々に笑えなくなっていた\n僕の目に映る君は綺麗だ\n明けない夜に溢れた涙も\n君の笑顔に溶けていく\n\n変わらない日々に泣いていた僕を\n君は優しく終わりへと誘う\n沈むように溶けてゆくように\n染み付いた霧が晴れる\n忘れてしまいたくて閉じ込めた日々に\n差し伸べてくれた君の手を取る\n涼しい風が空を泳ぐように今吹き抜けていく\n繋いだ手を離さないでよ\n二人今、夜に駆け出していく','YOASOBI-夜に駆ける.mp3',260,0,5,0),(36,'나연-POP.jpg','POP','나연','나연','POP',NULL,'2022-06-24','What\'s wrong?\n홀릴 듯이 난 너를 자극해 (Pop pop pop)\nWatch out!\n설렌 듯이 네 부푼 맘이 터질 듯해 (Pop pop pop)\n(Let\'s start) 내 맘대로 Play it\n(Won\'t stop) 거침없이 Shake it\nYou know? 넌 내게 달려있단 것만 알아둬\n이미 넌 나를 벗어날 수가 없어\n떨린 그 눈빛, 티 나는 몸짓 Baby\n터뜨리고 싶은 너\n설렘이 멎기 전에\nI wanna make it\nPop pop pop, you want it\nPop pop pop 터지길 원해\n가슴이 뛰는 이 느낌\nI wanna make it\nPop pop pop, you want it\nPop pop pop 널 갖길 원해\nPop pop pop (Uh uh)\n(You want it)\nPop pop pop (Uh uh)\n(I got it)\nPop pop pop (Uh uh)\nPop pop pop\n너무 잘 보여 아무리 숨겨도\n이미 들킨 걸 자꾸 둥둥 떠다니잖아\n여유롭게 Check it\n보란 듯이 Take it\n(Baby) Baby you\'re out of control\nSo you\'re under my control\n설렘이 멎기 전에\nI wanna make it\nPop pop pop, you want it\nPop pop pop 터지길 원해\n가슴이 뛰는 이 느낌\nI wanna make it\nPop pop pop, you want it\nPop pop pop 널 갖길 원해\nPop pop pop (Uh uh)\n(You want it)\nPop pop pop (Uh uh)\n(I got it)\nPop pop pop (Uh uh)\nPop pop pop\nPop pop 버블같이 터져 버릴지 몰라\n끝도 없이 점점 부풀어 가\n내게 푹 빠진 너를 애써 참진 마\nBae bae eyes on me now\n내가 터뜨려 줄 테니\nFive! 자, 때가 됐어\nFour! 딱 숨을 멈춰\nThree! 난 너를 겨눠\nTwo! One! Here we go!\n설렘이 멎기 전에\nI wanna make it\nPop pop pop, you want it\nPop pop pop 터지길 원해\n가슴이 뛰는 이 느낌\nI wanna make it\nPop pop pop, you want it\nPop pop pop 널 갖길 원해\nPop pop pop (Uh uh)\nPop pop pop (You gotta pop it)\nPop pop pop (I can\'t stop it)\nPop pop pop','나연-POP.mp3',167,0,4,0),(37,'아이유-에잇(Prod.&Feat.SUGAofBTS).jpg','에잇(Prod.&Feat. SUGA of BTS)','아이유 IU','아이유IU','에잇(Prod.&Feat.SUGAofBTS)',NULL,'2020-05-06','So are you happy now\nFinally happy now are you\n뭐 그대로야 난\n다 잃어버린 것 같아\n모든 게 맘대로 왔다가 인사도 없이 떠나\n이대로는 무엇도 사랑하고 싶지 않아\n다 해질 대로 해져버린\n기억 속을 여행해\n우리는 오렌지 태양 아래\n그림자 없이 함께 춤을 춰\n정해진 이별 따위는 없어\n아름다웠던 그 기억에서 만나\nForever young\n우우우 우우우우 우우우 우우우우\nForever we young\n우우우 우우우우\n이런 악몽이라면 영영 깨지 않을게\n섬 그래 여긴 섬 서로가 만든 작은 섬\n예 음 forever young 영원이란 말은 모래성\n작별은 마치 재난문자 같지\n그리움과 같이 맞이하는 아침\n서로가 이 영겁을 지나\n꼭 이 섬에서 다시 만나\n지나듯 날 위로하던 누구의 말대로 고작\n한 뼘짜리 추억을 잊는 게 참 쉽지 않아\n시간이 지나도 여전히\n날 붙드는 그곳에\n우리는 오렌지 태양 아래\n그림자 없이 함께 춤을 춰\n정해진 안녕 따위는 없어\n아름다웠던 그 기억에서 만나\n우리는 서로를 베고 누워\n슬프지 않은 이야기를 나눠\n우울한 결말 따위는 없어\n난 영원히 널 이 기억에서 만나\nForever young\n우우우 우우우우 우우우 우우우우\nForever we young\n우우우 우우우우\n이런 악몽이라면 영영 깨지 않을게','아이유-에잇(Prod.&Feat.SUGAofBTS).mp3',165,0,4,0),(38,'10cm-그라데이션.jpg','그라데이션','10cm','10cm','그라데이션Inst',NULL,'2022-07-03','해당 곡은 가사를 제공하지 않습니다.','10cm-그라데이션Inst.mp3',200,0,9,0),(39,'10cm-폰서트.jpg','폰서트Inst','10cm','10cm','폰서트Inst',NULL,'2017-09-01','해당 곡은 가사를 제공하지 않습니다.','10cm-폰서트Inst.mp3',198,0,9,0),(40,'BIGBANG-봄여름가을겨울.jpg','봄여름가을겨울Inst','BIGBANG','BIGBANG','봄여름가을겨울Inst',NULL,'2022-04-05','해당 곡은 가사를 제공하지 않습니다.','BIGBANG-봄여름가을겨울Inst.mp3',188,0,9,0),(41,'izi-응급실.jpg','응급실Inst','izi','izi','응급실Inst',NULL,'2005-04-19','해당 곡은 가사를 제공하지 않습니다.','izi-응급실Inst.mp3',226,0,9,0),(42,'넬-기억을걷는시간.jpg','기억을 걷는 시간Inst','넬','넬','기억을걷는시간Inst',NULL,'2008-03-21','해당 곡은 가사를 제공하지 않습니다','넬-기억을걷는시간Inst.mp3',313,0,9,0),(43,'멜로망스-고백.jpg','고백Inst','멜로망스','멜로망스','고백Inst',NULL,'2021-08-29','해당 곡은 가사를 제공하지 않습니다.','멜로망스-고백Inst.mp3',242,0,9,0),(44,'윤종신-좋니.jpg','좋니','윤종신','윤종신','좋니Inst',NULL,'2017-06-22','해당 곡은 가사를 제공하지 않습니다.','윤종신-좋니Inst.mp3',329,0,9,0),(45,'이무진-신호등.jpg','신호등','이무진','이무진','신호등Inst',NULL,'2021-05-14','해당 곡은 가사를 제공하지 않습니다.','이무진-신호등Inst.mp3',233,0,9,0),(46,'폴킴-너를만나.jpg','너를 만나Inst','폴킴','폴킴','너를만나Inst',NULL,'2018-10-29','해당 곡은 가사를 제공하지 않습니다.','폴킴-너를만나Inst.mp3',277,0,9,0),(47,'한동근-그대라는사치.jpg','그대라는 사치Inst','한동근','한동근','그대라는사치Inst',NULL,'2016-08-24','해당 곡은 가사를 제공하지 않습니다.','한동근-그대라는사치Inst.mp3',298,0,9,0),(48,'WSG워너비-그때그순간그대로.jpg','그때 그 순간 그대로','WSG워너비','WSG워너비','그때그순간그대로',NULL,'2022-07-09','잘 지냈지? 조금은 어색해 요즘 좋아 보여 인사 나누며\n사실 궁금한 게 너무 많았는데 반가움에 멍해졌죠\n생각보다 오래 된 것 같은 우리 수다스럽던 그때가 생각나\n뭐가 그렇게도 할 말이 많아서 밤을 지새우곤 했죠\n그리운 목소리 그리던 얼굴 참 많이도 기다렸어\n다시 만나자는 너의 한마디에 울컥 눈물이 나\n결국 너였단 걸\n알아\n기다림의 끝은 기적이 되고 기적 같은 우린 운명처럼\n서로를 알아보고 그렇게 눈앞에 서있죠\n우리 사랑했던 우리 다시 만나 그때 그 순간 그대로\n사랑했고 사랑할 거니까\n같이 듣던 노래 그때 그 거리를 이제 혼자 아닌 너와 둘이 걸어\n다시 오른쪽에 나란히 발맞춰 같은 노래를 부르죠\n그리운 만남을 그리던 날들 참 많이도 기다렸어\n다시 너를 만나 더욱 더 소중해 같은 마음이란 걸\n알아\n기다림의 끝은 기적이 되고 기적 같은 우린 운명처럼\n서로를 알아보고 그렇게 눈앞에 서있죠\n우리 사랑했던 우리 다시 만나 그때 그 순간 그대로\n사랑했고 사랑할 거니까\n처음 느낌 그대로 설렘이 가득한 날\n고마워 다시 돌아와줘서\n그때 그 순간처럼 날\n안아줘\n결국 기다림의 끝은 기적이 되고 기적 같은 우린 운명처럼\n서로를 알아보고 그렇게 눈앞에 서있죠\n우리 사랑했던 우리 다시 만나 그때 그 순간 그대로\n사랑했고 사랑할 거니까','WSG워너비-그때그순간그대로.mp3',234,0,0,0),(49,'경서-밤하늘의별을2020.jpg','밤하늘의 별을2020','경서','경서','밤하늘의별을2020',NULL,'2020-11-04','밤하늘의 별을 따서 너에게 줄래 너는 내가 사랑하니까 더 소중하니까\n오직 너 아니면 안 된다고 외치고 싶어 그저 내 곁에만 있어줘 떠나지 말아줘\n참 많이 어색했었죠 널 처음 만난 날\n멀리서 좋아하다가 들킨 사람처럼\n숨이 가득 차올라서 아무 말 하지 못했는데\n너는 말 없이 웃으며 내 손 잡아줬죠\n밤하늘의 별을 따서 너에게 줄래 너는 내가 사랑하니까 더 소중하니까\n오직 너 아니면 안 된다고 외치고 싶어 그저 내 곁에만 있어줘 떠나지 말아줘\n널 좋아하는 내 마음이 표현이 안 돼\n꿈이 아니면 좋겠어 자꾸 웃음 나와\n내 모든 걸 다 준대도 너에겐 아깝질 않아\n이 순간이 영원하길 난 정말 행복해\n밤하늘의 별을 따서 너에게 줄래 너는 내가 사랑하니까 더 소중하니까\n오직 너 아니면 안 된다고 외치고 싶어 그저 내 곁에만 있어줘 떠나지 말아줘\n그저 내 곁에만 있어줘 떠나지 말아줘\n많고 많은 사람 중에 너를 만나서 행복하고 싶어 두 번 다시 울지 않을래\n오직 내 눈에는 너만 보여 나를 아껴줘 이제부터 혼자가 아니야 우린 함께니까\n나나나 난난 난난나\n나나나 난난 난난나\n나 나나나 난난 난난나 나나난나\n나나나 난난 난난나\n나나나 난난 난난나\n나 나나나 난난 난난나 나나난나','경서-밤하늘의별을2020.mp3',215,0,0,0),(50,'멜로망스-취중고백.jpg','취중고백','김민석(멜로망스)','김민석(멜로망스)','취중고백',NULL,'2021-12-19','뭐하고 있었니 늦었지만\n잠시 나올래\n너의 집 골목에 있는\n놀이터에 앉아 있어\n친구들 만나서 오랜만에\n술을 좀 했는데\n자꾸만 니 얼굴 떠올라\n무작정 달려왔어\n이 맘 모르겠니\n요즘 난 미친 사람처럼\n너만 생각해\n대책없이 네가 점점 좋아져\n아냐 안 취했어 진짜야\n널 정말 사랑해\n눈물이 날만큼 원하고 있어\n정말로 몰랐니\n가끔 전화해 장난치듯\n주말엔 뭐할거냐며\n너의 관심 끌던 나를\n그리고 한번씩 누나 주려 샀는데\n너 그냥 준다고\n생색 낸 선물도 너 때문에 산거야\n이 맘 모르겠니\n요즘 난 미친 사람처럼\n너만 생각해\n대책없이 네가 점점 좋아져\n아냐 안 취했어 진짜야\n널 정말 사랑해\n진심이야 믿어줘\n갑자기 이런 말 놀랐다면 미안해\n부담이 되는게 당연해\n이해해 널\n하지만 내 고백도 이해해 주겠니 oh\n지금 당장 대답하진마\n나와 일주일만 사귀어줄래\n후회없이 잘 해주고 싶은데\n그 후에도 니가 싫다면\n나 그때 포기할게\n귀찮게 안할게 혼자 아플게\n진심이야 너를 사랑하고 있어','멜로망스-취중고백.mp3',259,0,0,0),(51,'박원-allofmylife.jpg','all of my life','박원','박원','allofmylife',NULL,'2017-07-27','너무 힘들어 삶에 치이고\n되는 것도 없고\n가족도 안 보이고 언제부턴가\n나도 중요하지 않고\n없진 않지만 더 많이 가져야\n사랑도 이어갈 수 있는 이 세상에서\nall of my life\nyou are all of my life\n그러고 보면 나\n너를 만나 참 많이 변했어\n꿈이 생기고 네가 가진 꿈도\n이뤄주고 싶었어 나 그러려면\n더 높은 곳에 올라가야만 했어\n더 많은 것들을 가져야 가능했어\n다 가질 때쯤\n사랑보다 꿈이 더 커졌어\nall of my life 내가 힘이 들 때\nyou are all of my life 네가 날 채웠는데\n다른 어떤 걸로 나를 채워봐도\nall of my life\nyou are all of my life\n채워지지가 않아\n그렇게 우리 바라왔고 간절했던 거잖아\n이젠 내방에 가득한데\n나도 아무것도 없는 방 안에서 넌 혼자\n이렇게 주저앉아 울고 있었니\nall of my life 넌 내 전부인데\n이 모든 게 다 무슨 소용 있는데\n어디선가 이 노랠 듣게 된다면\nall of my life\nall of my life\n네 이야기가 맞아','박원-allofmylife.mp3',249,2,0,0),(52,'아이유-드라마.jpg','드라마','아이유 IU','아이유IU','드라마',NULL,'2021-12-29','나도 한때는 그이의 손을 잡고\n내가 온 세상 주인공이 된 듯\n꽃송이의 꽃잎 하나하나까지\n모두 날 위해 피어났지\n올림픽대로 뚝섬 유원지\n서촌 골목골목 예쁜 식당\n나를 휘청거리게 만든\n주옥같은 대사들\n다시 누군가 사랑할 수 있을까\n예쁘다는 말 들을 수 있을까\n하루 단 하루만 기회가 온다면\n죽을힘을 다해 빛나리\n언제부턴가 급격하게\n단조로 바뀌던 배경음악\n조명이 꺼진 세트장에\n혼자 남겨진 나는\n단역을 맡은 그냥 평범한 여자\n꽃도 하늘도 한강도 거짓말\n나의 드라마는 또 이렇게 끝나\n나왔는지조차 모르게\n끝났는지조차 모르게','아이유-드라마.mp3',128,1,0,0),(53,'안녕-너의번호를누르고.jpg','너의 번호를 누르고(Prod. 영화처럼)','안녕','안녕','너의번호를누르고(Prod.영화처럼)',NULL,'2019-11-30','우연히 너를 만나서\n너의 옆자리에 앉아\n그렇게 우린 친해졌어\n짧은 시간에 그렇게\n가까워질 수 있다는게\n그게 참 신기했어\n소소한 일상부터\n어린 시절 얘기 까지도\n그리 똑같진 않아도\n말이 참 잘 통해서\n더 짧았던 거야\n너의 번호를 누르고\n설레임을 가득 채우다\n너의 번호를 지우며\n좋았던 시간을 덜어내\n그때 난 왜 몰랐을까\n이뤄질 수 없는\n짧은 시간속의\n우린 여기 까지인 가봐\n어쩌다 먼 훗날에\n그때 우리 약속 기억 날까\n아쉬움만 가득했던\n그때 난 왜 그랬을까\n너의 번호를 누르고\n설레임을 가득 채우다\n너의 번호를 지우며\n좋았던 시간을 덜어내\n그때 난 왜 몰랐을까\n이뤄질 수 없는\n짧은 시간속의\n우린 여기까지인 가봐\n아무일 없이 살다보면\n모두 잊혀질거라\n또 맘을 속이고 달래도\n자꾸만 그 때 니가 생각나\n또 너를 부르게 돼\n너의 번호를 누르고\n설레임을 가득 채우다\n너의 번호를 지우며\n좋았던 시간을 덜어내\n그때 난 왜 몰랐을까\n이뤄질 수 없는\n짧은 시간속의\n스쳐가버린\n그 때 그 시절 속의\n우린 여기까지인 가봐','안녕-너의번호를누르고.mp3',251,0,0,0),(54,'양다일-미안해.jpg','미안해','양다일','양다일','미안해',NULL,'2017-12-29','습관처럼 떠오르던\n눈에 아른거리던 네 모습이\n더는 그려지지 않아\n거짓 뿐이었던 너의 말과\n너도 모르는 너의 모습들을\n더는 원치 않아\n단 한 번 뿐인 이별에도 말하지 못한\n너의 진심을 이젠 다 알 것 같은데\n미안해 더는 널 바라보지 않아\n미안해 더는 나 후회하지 않아\n다시 널 마주할 그 순간에도\n널 사랑하지 않아 말할 수 있어\n수화기 너머 들리는\n지친 날 위로하던 네 목소리\n더는 그려지지 않아\n함께 쌓았던 추억과\n그 많던 말들이 아쉬워서\n전하지 못한 말들이\n미안해 더는 널 바라보지 않아\n미안해 더는 나 후회하지 않아\n다시 널 마주할 그 순간에도\n널 사랑하지 않아 말할 수 있어\n어색하게 만난 우리 시작도\n처음 고백했던 그 순간들도\n다 어제 같은 일인데\n누굴 만나 사랑한다는 게\n너를 만나 내가 변해간단 게\n이젠 없어\n미안해 더는 널 사랑하지 않아\n미안해 더는 나 후회하지 않아\n힘든 시간들에 지쳐갈 때도\n이렇게 해야만 내가 편할 것 같아','양다일-미안해.mp3',229,0,0,0),(55,'이석훈-바보에게바보가.jpg','바보에게 바보가','이석훈','이석훈','바보에게바보가',NULL,'2022-07-11','너무 걱정하지는 마\n보란 듯이 살아 볼 거야\n후회는 사치일 뿐이야\n다시 시작해 볼게\n나 어제 또 울었어\n나 어제 또 슬펐어\n왜 이런 바보를 사랑한 거니\n네 마음이 예뻐서\n네 사랑이 고마워\n이젠 네 손을 잡고\n다시 태어날 거야\n바보도 사랑합니다\n보내주신 이 사람\n이제 다시는 울지 않을 겁니다\n나 이제 목숨을 걸고\n세상 아픔에서 지켜낼게요\n이 사람을 사랑합니다\n널 위한다는 그 이유로\n너를 보낼 뻔했어\n나 그렇게 바보야\n넌 내 사랑 바보고\n서로를 많이도 울게 했었지\n네 사랑이 없다면\n널 만날 수 없다면\n아마 나는 평생을 후회하며 살 거야\n바보도 사랑합니다\n보내주신 이 사람\n이제 다시는 울지 않을 겁니다\n나 이제 목숨을 걸고\n세상 아픔에서 지켜낼게요\n이 사람을\n널 위해 노력해 볼게\n널 위해 살아갈게\n나약한 마음 따윈 모두 버릴게\n우리의 사랑을 위해\n너의 손을 잡고 놓지 않을게\n사랑하는 내 사랑 바보야','이석훈-바보에게바보가.mp3',229,0,0,0),(56,'주호-내가아니라도.jpg','내가 아니라도','주호','주호','내가아니라도',NULL,'2022-03-25','사랑이었다 별거 없던 내 하루에\n빛이 돼준 단한 사람\n나보다 나를 더 아껴 주던 너를\n그땐 왜 몰랐을까\n행복이었다 다시는 없을 것 같던\n잠시나마 행복했었다\n다른 사람 곁에 있는 널 생각해 본 적 없지만\n이젠 너를 보내줘야 할 것 같아\n내가 아니라도\n눈부시게 사랑받았을 너라서\n그 소중한 시간을 나와 함께해 줘서\n고마웠어\n예쁘고 아름다웠던 너의 그날에\n함께했던 그 모든 순간이 행복했어\n내 전부였다 무엇도 바꿀 수 없던\n우리라서 행복했었다\n다른 누구라도 나보다 더 좋은 사람 만나서\n이젠 나를 잊고 행복하게 살아\n내가 아니라도\n눈부시게 사랑받았을 너라서\n그 소중한 시간을 나와 함께해 줘서\n고마웠어\n예쁘고 아름다웠던 너의 그날에\n함께했던 그 모든 순간이 행복했어\n어두웠던 내 하루에\n빛이 되어주던 그날들을 어떻게 잊고 살아\n과분했던 너라는 사람을 만나\n누구보다 사랑했었다\n내가 아니었다면 눈부시게 사랑받았을 너란 걸\n이 세상에 누구보다 더 잘 알아서\n미안했어 너와 함께한 날들이 더 말할 게 있을까\n행복한 기억만 가져갈게','주호-내가아니라도.mp3',285,0,0,0),(57,'한동근-새벽에걸려온너의전화는.jpg','새벽에 걸려온 너의 전화는','한동근','한동근','새벽에걸려온너의전화는',NULL,'2022-07-31','사랑한다 말하고 보고 싶다 말하고\n많은 걸 약속하고 미래를 꿈꾸던 날들\n내가 줬던 사랑이 당연해진 걸까\n언제부터 너의 맘이 변했을까\n갑자기 온 전화는 날 불안하게 만들어\n혹시 무슨 일 있는 건지 걱정을 하다\n다시 만나자고 하지는 않을까\n괜한 기대를 해 잠들 수 없어\n새벽에 걸려온 너의 전화는 그리움보다는\n실수였다고 난 생각할게\n냉정하게 뿌리치고 매달렸던 날 밀어낸 넌데\n뜨는 너의 이름에 눈물만\n미안한 마음이야 아쉬운 마음이야\n애써 날 위해 주는척한 행동인 거니\n받아볼까 하다 정신을 차렸어\n목소리를 들으면 울 것 같아서\n새벽에 걸려온 너의 전화는그리움보다는\n실수였다고 난 생각할게\n냉정하게 뿌리치고 매달렸던 날 밀어낸 넌데\n뜨는 너의 이름에 눈물만\n상처받은 내 마음을 알아줘\n내가 아픈 만큼 더 힘들어줘\n내가 좀 유치해 보인다 해도\n새벽에 걸려온 너의 전화는..\n울리는 단 몇 초의 벨 소리에 널 미워한 맘이\n완벽히 무너질 것 같았어 잊으려 몸부림치고\n내 삶에서 분명 지웠는데 뜨는 너의 이름에 눈물만','한동근-새벽에걸려온너의전화는.mp3',238,0,0,0),(58,'Zion.T-꺼내먹어요.jpg','꺼내 먹어요','자이언티 Zion T ','자이언티ZionT','꺼내먹어요',NULL,'2015-05-19','안녕\n쉽지 않죠 바쁘죠\n왜 이렇게 까지\n해야 하나 싶죠\n바라는 게\n더럽게 많죠\n(그렇죠)\n쉬고 싶죠\n시끄럽죠\n다 성가시죠?\n집에 가고 싶죠?\n(집에 있는데도)\n집에 가고 싶을 거야\n그럴 땐 이 노래를\n초콜릿처럼 꺼내 먹어요\n피곤해도 아침 점심 밥 좀 챙겨 먹어요\n그러면 이따 내가 칭찬해줄게요\n보고 싶어\n많이 좋아해요\n더 많이 안아주고 싶어요\n사랑, 사랑 비슷한 걸 해요\n어쩌면 정말 사랑해요\n배고플 땐 이 노래를\n아침 사과처럼 꺼내 먹어요\n피곤해도 아침 점심 밥 좀 챙겨 먹어요\n그러면 이따 밤에 잠도 잘 올 거에요\n힘들어요\n아름다워서\n알아봐줘요 나를\n흘려 보내지 마요 나를\n사랑해줘요 날, 날\n놓치지 마요','Zion.T-꺼내먹어요.mp3',162,0,1,0),(59,'딘-instagram.jpg','instagram','딘','딘','instagram',NULL,'2017-12-26','내일이 올 걸 아는데\n난 핸드폰을 놓지 못해\n잠은 올 생각이 없대, yeah\n다시 인스타그램 인스타그램 하네\n\n잘난 사람 많고 많지\n누군 어디를 놀러 갔다지\n좋아요는 안 눌렀어\n나만 이런 것 같아서\n저기 인스타그램 인스타그램 속엔\n\n문제야 문제\n온 세상 속에\n똑같은 사랑노래가\n\n와닿지 못해\n나의 밤 속엔\n생각이 너무 많네\n\n복잡해\n틈만 나면 바뀌는 게\n관둘래\n이 놈의 정보화 시대\n단단히 잘못됐어\n요즘은 아는 게 더\n괴로운 것 같은데\n\n가면 갈수록\n너무 어려워\n나만 이런 건지\n\n클럽 말고 뭐\n영화 말고 뭐 없나 하다\n결국 동네\n\n내 맘에는 구멍이 있어\n그건 뭘로도 못 채우는 것, yeah\n난 지금 가라앉는 중인걸\n네모난 바다 속에서\n\n문제야 문제\n온 세상 속에\n똑같은 사랑 노래가\n\n와 닿지 못해\n나의 밤 속엔\n생각이 너무 많네\n\n뚜루루뚜 뚜루루뚜\n뚜루루뚜 뚜루루뚜\nall night\n그렇게 시간 낭비를 하네\n저 인스타그램 속에서\n\nLonely lonely so lonely\n원래 이리도 힘든가요\nno way no way\n이 피드 속엔\n나완 다른 세상 뿐인데\n\n부질없이\n올려 놓은 사진\n뒤에 가려진 내 마음을\n아는 이 없네\n난 또 헤매네\n저 인스타그램 속에서\n\n그래 너는 요즘 어때\n잠 못 자는 건 여전해\n자른 단발이 참 예쁘던데\n좋아요는 안 눌렀어\n조금 웃긴 것 같아서\n\n뚜루루뚜 뚜루루뚜\n뚜루루뚜 뚜루루뚜\nall night\n그렇게 시간 낭비를 하네\n네 인스타그램 속에서','딘-instagram.mp3',255,0,1,0),(60,'박재범JayPark-GANADARAFeat아이유.jpg','GANADARA(Feat 아이유 IU)','박재범 jay park','박재범jaypark','GANADARA(Feat아이유IU)',NULL,'2022-03-11','길거리를 걷다 보면\n사랑 노래만 흘러나와\n나는 왜 저런 게 낯설까\n난 한국말까지 서툴러\n번역기도 전혀 도움 안 돼\n네 맘엔 어떨까 걱정만\n어떤 단어를 쓸지 I don\'t know\n어떤 말을 할지 I don\'t know\n나는 왜 이런지 I don\'t know\nYou\'re on my mind\n어떤 단어를 쓸지 I don\'t know\n어떤 말을 할지 I don\'t know\n나는 왜 이런지 I don\'t know\nYou\'re on my mind\nBaby 정말 생각 안 나\nBody language로 자신 있어\n보여줄게 girl just give me some your time\n너를 보면 손에 땀 나\n긴장 풀게 한 번 웃어줘\nLet me take u on a magic carpet ride\n손을 잡아 따라와\n맑은 날씨 보름달\n가르쳐줘 오늘 밤\n가나다라마바사\n손을 잡아 따라와\n맑은 날씨 보름달\n가르쳐줘 오늘 밤\n가나다라마바사\n너무 완벽하지 않아도\n걱정 마 네 맘을 조금 알 것 같아\n네게 좀 더 다가서 볼까\n고민해 매일 밤\n길거리를 걷다 보면\n계속 계속 네 생각이 나\n이런 내 모습이 왜 낯설까\n번역기 위에서\n헤매는 네 손가락까지\n자꾸만 생각이 나는 걸\nBody language도 나는 괜찮아\nBut 생각 안 나면 그냥 웃어줘\n모든 것을 알려줄게 오늘 밤\n내가 나쁜 남자처럼 보여도\n너를 볼 때면 맘이 여려져\nI wouldn\'t mind if I died in your arms\n손을 잡아 따라와\n맑은 날씨 보름달\n가르쳐줘 오늘 밤\n가나다라마바사\n손을 잡아 따라와\n맑은 날씨 보름달\n가르쳐줘 오늘 밤\n가나다라마바사\n손을 잡아 따라와\n맑은 날씨 보름달\n가르쳐줘 오늘 밤\n가나다라마바사\n손을 잡아 따라와\n맑은 날씨 보름달\n가르쳐줘 오늘 밤\n가나다라마바사','박재범JayPark-GANADARAFeat아이유.mp3',204,0,1,0),(61,'서동현-정이라고하자Feat10cm.jpg','정이라고 하자 (Feat 10cm)','서동현 BIG Naughty','서동현BIGNaughty','정이라고하자(Feat10cm)',NULL,'2022-04-20','Back to the day\n갓 10대가 됐을 때\n그때 내가 널 보지 못했다면\n어땠을까 해\n왜인지 외로워지는 밤에 You say\n흐린 추억 속에 네게 안겨 잠드네\nYeah 친구들과의 술자리\n나는 또 네 얘기를 꺼내\n보고 싶다는 넋두리에 친구들 답은 뻔해\n10년도 더 된 애를 사랑할 수 있냬\n이제 그만 잊으래\n근데 그게 잘 안돼\n그래 걔 말마따나\n넌 아담의 사과일 수도\nBut 난 신을 안 믿으니까\n네 전화 바로 픽업\n지금 주소 찍어\n어디든 상관없어 다 갈 테니까\n그건 사랑이 아냐\n그건 미련이 아냐\n그냥 정이라고 하자\n임마 네가 뭘 알아\n이건 사랑이 맞아\n분명 약속했단 말이야\nI know, I\'m wrong\n그 자리에 그대로\n두고 온 기억들을\n더듬고 있을 때면\n(You say)\n그건 사랑이 아냐\n그건 미련이 아냐\n그냥 정리하고 가자\n아메리카노보단 라떼를\n맛있게 내리던 네 집 앞 카페를\n매일 같이 갔었었던 그때를\n내려줄게 쓰지 않아 이제는\n넌 매일 밤 예뻐 예뻐\n해주며 날 재워 재워\n식어버린 널 데워 태워\n꿈에서 날 깨워 줘\n버려진 기억들 속에서\n쓸만한 컷들을 찾고 있어\n이미 내 곁에 더는 없는 너지만\n난 너를 느낄 수 있어\n닿을 듯 안 닿을 듯\n떠나는 뒷모습이\n왜인지 행복해 보여\n너라도 행복해줘\n그건 사랑이 아냐\n그건 미련이 아냐\n그냥 정이라고 하자\n임마 네가 뭘 알아\n이건 사랑이 맞아\n분명 약속했단 말이야\nI know, I\'m wrong\n그 자리에 그대로\n두고 온 기억들을\n더듬고 있을 때면\n(You say)\n그건 사랑이 아냐\n그건 미련이 아냐\n그냥 정리하고 가자\n그건 사랑이 아냐\n그건 미련이 아냐\n그냥 정이라고 하자\n임마 네 말이 맞아\n이건 사랑이 아냐\n그냥 정리하고 가자','서동현-정이라고하자Feat10cm.mp3',189,0,1,0),(62,'시온-Braindead.jpg','Braindead','시온','시온','Braindead',NULL,'2022-09-13','braincells, melting pot\ndead self, fusing mind\nI\'m not me like your not you\nslavery, thot\nlooking in the mirror I can\'t see me\njust a donkey think he could\'ve made you stay for once\nyou look in the mirror and keep laughing\nyou got rid of me and got a significant other one\noh I feel like a zombie jealous of the lovers brains\nso imma come along and take a bite intelligence\nto avoid getting hurt again\nbe driven into breakdowns hurricane\nmaybe I need to hypnotize\ndon\'t love you, don\'t love you, don\'t love you\nI\'m a braindead lover for you\nI don\'t care if my mind falls apart\nI\'m already just a dead man, a fool\nfalling for these empty words you spit out\nhow could you be so ruthless\nstupid zombie get your brain to work\nI\'m a braindead lover for you\nI\'m a braindead lover for who?\nI know that, I know that\nI know I\'m inside your walls\nbut\nI don\'t care, I don\'t care\nI don\'t even wanna go\njust let me be, aside you, I can be a different person\nas long as you like me I could be anything you want\noh fool\noh I feel like a zombie jealous of the lovers brains\nso imma come along and take a bite intelligence\nto avoid getting hurt again\nbe driven into breakdowns hurricane\nmaybe I need to hypnotize\ndon\'t love you, don\'t love you, don\'t love you\nI\'m a braindead lover for you\nI don\'t care if my mind falls apart\nI\'m already just a dead man, a fool\nfalling for these empty words you spit out\nhow could you be so ruthless\nstupid zombie get your brain to work\nI\'m a braindead lover for you\nI\'m a braindead lover for who?','시온-Braindead.mp3',164,0,1,0),(63,'아이유-삐삐.jpg','삐삐','아이유 IU','아이유IU','삐삐',NULL,'2018-10-10','Hi there 인사해 호들갑 없이\n시작해요 서론 없이\n스킨십은 사양할게요 back off back off\n이대로 좋아요 balance balance\nIt\'s me 나예요 다를 거 없이\n요즘엔 뭔가요 내 가십\n탐색하는 불빛 scanner scanner\n오늘은 몇 점인가요? jealous jealous\n쟤는 대체 왜 저런 옷을 좋아한담?\n기분을 알 수 없는 저 표정은 뭐람?\n태가 달라진 건 아마 스트레스 때문인가?\n걱정이야 쟤도 참\nYellow C A R D\n이 선 넘으면 침범이야 beep\n매너는 여기까지 it\'s ma ma ma mine\nPlease keep the la la la line\nHello stuP I D\n그 선 넘으면 정색이야 beep\nStop it 거리 유지해 cause we don\'t know know know know\nComma we don\'t owe owe owe owe\n(anything)\nI don\'t care 당신의 비밀이 뭔지\n저마다의 사정 역시\n정중히 사양할게요 not my business\n이대로 좋아요 talk talkless\nStill me 또예요 놀랄 거 없이\nI\'m sure you\'re gonna say \"my gosh\"\n바빠지는 눈빛 checki cheking\n매일 틀린 그림 찾기 hash tagging\n꼿꼿하게 걷다가 삐끗 넘어질라\n다들 수군대는 걸 자긴 아나 몰라\n요새 말이 많은 걔랑 어울린다나?\n문제야 쟤도 참\nYellow C A R D\n이 선 넘으면 침범이야 beep\n매너는 여기까지 it\'s ma ma ma mine\nPlease keep the la la la line\nHello stuP I D\n그 선 넘으면 정색이야 beep\nStop it 거리 유지해 cause we don\'t know know know know\nComma we don\'t owe owe owe owe\n(anything)\n편하게 하지 뭐\n어 거기 너 내 말 알아 들어? 어?\nI don\'t believe it\n에이 아직 모를 걸\n내 말 틀려? 또 나만 나뻐? 어?\nI don\'t believe it\n깜빡이 켜 교양이 없어 너 knock knock knock\nEnough 더 상대 안 해 block block block block block\n잘 모르겠으면 이젠 좀 외워 babe\nRepeat repeat\n참 쉽지 right\nYellow C A R D\n이 선 넘으면 침범이야 beep\n매너는 여기까지 it\'s ma ma ma mine\nPlease keep the la la la line\nHello stuP I D\n그 선 넘으면 정색이야 beep\nStop it 거리 유지해 cause we don\'t know know know know\nComma we don\'t owe owe owe owe\n(anything)','아이유-삐삐.mp3',196,0,1,0),(64,'주시크-아무래도난.jpg','아무래도 난','주시크','주시크','아무래도난',NULL,'2022-03-30','아무렇지 않게 내 하루가 또\n지나갈 쯤에 문득\n네가 없다는 게 익숙해진 내가\n낯설어지곤 해 (yeah)\n이제와 너 없는 난 의미 없다고\n되돌릴 수 없는 우리겠지만\n네가 좋아했던 그 노랠 우연히\n듣게 됐어 아무래도 난\nBaby I Need You\n좀 늦었겠지만\n다시 하고 싶어\n여전히 I Need you\nNeed You\n좀 어렵겠지만\n너 없인 안돼 난\n너도 알잖아\nBaby I need you now\n몇 곡의 노래로 너를 불렀을까\n너도 들었겠지만\n아직도 궁금해\n내가 없이 보낸\n너의 지금은 어때\n이제와 너 없는 난 의미 없다고\n되돌릴 수 없는 우리겠지만\n네가 좋아했던 그 노랠 우연히\n불러 봤어 아무래도 난\nBaby I Need You\n좀 늦었겠지만\n다시 하고 싶어\n여전히 I Need you\nNeed You\n좀 어렵겠지만\n너 없인 안돼 난\n너도 알잖아\nBaby I need you now\n그때 네가 울던 한강 공원에서\n네 눈물을 보고 닦아 주질 못했어\n이런 게 떠올라 후회된 장면만\n웃는게 예뻤던 너를\nBaby I Need You\n여전히 사랑해\n내가 잘못했어\n돌아와 I Need you\nNeed You\n너도 그랬다고\n나없이 안돼 넌\n너도 알잖아\nBaby I need you now','주시크-아무래도난.mp3',255,0,1,0),(65,'크러쉬-잊어버리지마Feat태연.jpg','잊어버리지마(Feat 태연)','크러쉬','크러쉬','잊어버리지마(Feat태연)',NULL,'2016-01-22','너와 나 언젠가 남이 되어도\n영영 닿을 수 없는 사이 되어도\n잊어버리지마 잃어버리지마\n혹시나 다른 사람의 손 잡고 있어도\n영영 닿을 수 없는 곳에 있어도\n잊어버리지마 잃어버리지마\n따뜻해 볼이 맞닿을 때\n살며시 시린 내 손 잡아줄 때\n차가운 세상에 지친 내 맘을\n온기로 감싸네 내 눈에 담긴 너의 얼굴\n내 품에 잠든 너의 모습\n이대로 멈췄으면 해\n꽉 잡은 두 손 놓치면 안돼\n너와 나 언젠가 남이 되어도\n영영 닿을 수 없는 사이 되어도\n잊어버리지마 잃어버리지마\n혹시나 다른 사람의 손 잡고 있어도\n영영 닿을 수 없는 곳에 있어도\n잊어버리지마 잃어버리지마\n마주 앉아 널 바라보는 지금이\n영원하길 바래\n혹시나 시간이 우릴 질투 할까 봐\n사실 걱정 돼\n변치 마 always by my side\n영원히 함께 my love\n언젠가 날 기억해주길\n한번쯤은 뒤 돌아보길\n부디 놓지 말아줘\n우릴 계속 바라봐주길\nOh My love 시간이 지나 baby\n너와 나 우리가 남이 되어도\n잊어버리지마 날 잊어버리지마\n이 노랠 잊어버리지마','크러쉬-잊어버리지마Feat태연.mp3',219,0,1,0),(66,'펀치-밤이되니까.jpg','밤이 되니까','펀치','펀치','밤이되니까',NULL,'2017-09-29','오늘도 난 술을 마셔 우울하니까\n네가 또 생각나니까\n침대 위에 놓인 전활 꺼 둬야만 해\n내일 후회할 것 같아서\n찬 바람이 불어 오면\n왠지 술 한 잔이 생각나\n너도 옆에 있으면 좋겠어\n파도처럼 내게 밀려와\n나를 어지럽게 만드는\n네가 오늘따라 더 생각이 나\n오늘도 난 술을 마셔 밤이 되니까\n네가 또 생각나니까\n침대 위에 놓인 전활 꺼 둬야만 해\n내일 후회할 것 같아서\n나에게 읽어 주던 시\n너와 살던 집\n모든 게 다 생각이 나\n파란 지붕 밑 강이 보이는 곳\n한강 위에 비친 달빛이\n네가 있는 곳을 안다면\n그곳을 비춰준다면 좋겠어\n시간은 저녁을 지나 긴 새벽인데\n왜 자꾸 네가 생각나\n쓸쓸한 네 빈자리가 날 외롭게 해\n아직 많이 사랑하나 봐\n아직은 힘들 것 같아\n너의 번호를 지운단 건\n너를 모두 지우는 것 같아서\n오늘 밤은 너를 찾아가\n이 말을 전하고 싶어\n너를 정말 많이 사랑했다고\n오늘도 난 술을 마셔 비가 오니까\n네가 또 생각나니까\n침대 위에 놓인 전활 꺼 둬야만 해\n내일 후회할 것 같아서\n이 밤에 술을 한 잔 하는 건\n모두 그렇지만 나 결국 너를 잊을 걸\n알면서도 헤어지려는 마음이 이렇게 슬프기\n때문일까 내 탓일까\n지금은 너도 혹시 내 생각 하다\n잠 못들지 않는지\n너무나 보고 싶어 1분이라도\n네가 또 보고 싶어\n보고 싶어','펀치-밤이되니까.mp3',206,0,1,0),(67,'헤이즈-헤픈우연.jpg','헤픈 우연','헤이즈','헤이즈','헤픈우연',NULL,'2021-05-20','처음이라기엔 너무\n길을 이미 다 아는 듯이\n우연히라기엔 모두\n다 정해진 듯이\n우연히 눈을 떠 보니\n이 세상에 태어나 있었고\n하필 네가 있는 곳이었다\n서서히 몸에 배어버린\n사소한 습관들이\n네게로 가는 길을\n내게 알려줘\n처음이라기엔 너무\n길을 이미 다 아는 듯이\n우연히라기엔 모두\n다 정해진 듯이\n고통의 사랑도\n보통의 이별도\nYou can make it happen\nYou can make it heaven\n우연히라기엔 모두\n다 정해진 듯이\n만약 내가 그때 그곳을\n헤매지 않았더라면\n그날 네가 마음 아픈\n이별을 안 했었더라면\n네 뒤를 따라 걷던 곳\n네가 떨어트렸던 꽃\n위태롭던 시간 속\n서로를 기다려왔어\n운명이라고 하기엔\n이를 수 있다 생각해\n우연히라고 하기엔\n설명이 필요한 것 같아\n어쩌면 또 스칠 수 있을지 몰라도\n지금이 아니면 안 될 것 같던 그 때로\n처음이라기엔 너무\n길을 이미 다 아는 듯이\n우연히라기엔 모두\n다 정해진 듯이\n고통의 사랑도\n보통의 이별도\nYou can make it happen\nYou can make it heaven\n우연히라기엔 모두\n다 정해진 듯이\n어쩌면 기억을 지운 채로\n하나였던 우린 둘이 되고\n운명이란 작은 점 안에서\n서로를 찾으며 살았는지도\n고통의 사랑도\n보통의 이별도\nYou can make it happen\nYou can make it heaven\n우연히라기엔 모두\n다 정해진 듯이\n우연히\n서서히\n점점\n더 멀어져가\n우연히\n천천히\n처음\n그곳으로 가','헤이즈-헤픈우연.mp3',227,0,1,0),(68,'ChetBaker-IFallInLoveTooEasily.jpg','I Fall In Love Too Easily','Chet Baker','ChetBaker','IFallInLoveTooEasily',NULL,'2011-03-11','I fall in love too easily\nI fall in love too fast\nI fall in love too terribly hard\nFor love to ever last\nMy heart should be well-schooled\n\'Cause I\'ve been fooled in the past\nBut still I fall in love so easily\nI fall in love too fast\nMy heart should be well-schooled\n\'Cause I\'ve been fooled in the past\nBut still I fall in love too easily\nI fall in love too fast','ChetBaker-IFallInLoveTooEasily.mp3',202,0,10,0),(69,'EddieHiggins-AutumnLeaves.jpg','Autumn Leaves','Eddie Higgins','EddieHiggins','AutumnLeaves',NULL,'2015-05-27','해당 곡은 가사를 제공하지 않습니다.','EddieHiggins-AutumnLeaves.mp3',274,0,10,0),(70,'Hamel-Breezy.jpg','Breezy','Hamel','Hamel','Breezy',NULL,'2009-01-01','when Jody smiles the room\nlights up with fine\nwhite stardust\nand limelight seems to\nbeam out of her eyes\nshe doesn\'t seem to notice\nbut she doesn\'t need\nto she\'s had\nher share of compliments\nand lies\nshe says come turn off\nyour radio and let\'s go dancing\nwe\'re far too young to\nsit at home all night\nwhat\'s the use of sleeping\nwhen we\'re in this city\nthat tries to stay awake\nwith all its might\n\'cause life just feels so breezy\nso comfortable and easy\nthis sad and sullen winter\nnight seems tropical and bright\nlike champagne coloured\ndrops of neon light\nthese streets are paved\nwith melodies and\ntreasured pleasures\nlet\'s make the snowflakes\nmelt before they fall\nno agonizing painful\nhardships left to conquer\nno traumatizing\nchildhood to recall\ncome turn off your radio\nand let\'s go dancing\nthere\'s far too much to\nsee to stay inside\nwhat\'s the use in sleeping\nwhen the world could crumble\nso just sit back and\nplease enjoy your ride\n\'cause life just feels so breezy\nso comfortable and easy\nthis sad and sullen winter\nnight seems tropical and bright\nlike champagne coloured\ndrops of neon light\n\'cause life just feels so breezy\nso comfortable and easy\nthis sad and sullen winter\nnight seems tropical and bright\nlike champagne coloured\ndrops of neon light\n\'cause life just feels so breezy\nso comfortable and easy\nthis sad and sullen winter\nnight seems tropical and bright\nlike champagne coloured\ndrops of neon light\nwhen Jody smiles the room\nlights up with fine white stardust','Hamel-Breezy.mp3',240,0,10,0),(71,'NorahJones-ComeAwayWithMe.jpg','Come Away With Me','Norah Jones','NorahJones','ComeAwayWithMe',NULL,'2002-01-01','Come away with me in the night\nCome away with me\nAnd I will write you a song\nCome away with me on a bus\nCome away where they cant tempt us\nWith their lies\nI want to walk with you\nOn a cloudy day\nIn fields where the yellow grass grows knee-high\nSo wont you try to come\nCome away with me and well kiss\nOn a mountaintop\nCome away with me\nAnd Ill never stop loving you\nAnd I want to wake up with the rain\nFalling on a tin roof\nWhile Im safe there in your arms\nSo all I ask is for you\nTo come away with me in the night\nCome away with me','NorahJones-ComeAwayWithMe.mp3',198,0,10,0),(72,'MichaelBuble-Home.jpg','Home','Michael Buble','MichaelBuble','Home',NULL,'2005-02-08','Another summer day\nIs come and gone away\nIn Paris and Rome\nBut I wanna go home\nMmmmmmmm\nMaybe surrounded by\nA million people I\nStill feel all alone\nI just wanna go home\nOh I miss you, you know\nAnd I\'ve been keeping all the letters that I wrote to you\nEach one a line or two\n″I\'m fine baby, how are you?″\nWell I would send them but I know that it\'s just not enough\nMy words were cold and flat\nAnd you deserve more than that\nAnother aerorplane\nAnother sunny place\nI\'m lucky I know\nBut I wanna go home\nMmmm, I\'ve got to go home\nLet me go home\nI\'m just too far from where you are\nI wanna come home\nAnd I feel just like I\'m living someone else\'s life\nIt\'s like I just stepped outside\nWhen everything was going right\nAnd I know just why you could not\nCome along with me\nBut this was not your dream\nBut you always believe in me\nAnother winter day has come\nAnd gone away\nAnd even Paris and Rome\nAnd I wanna go home\nLet me go home\nAnd I\'m surrounded by\nA million people I\nStill feel alone\nOh, let go home\nOh, I miss you, you know\nLet me go home\nI\'ve had my run\nBaby, I\'m done\nI gotta go home\nLet me go home\nIt will all right\nI\'ll be home tonight\nI\'m coming back home','MichaelBuble-Home.mp3',224,0,10,0),(73,'NorahJones-WhatAmIToYou.jpg','What Am I To You','Norah Jones','NorahJones','WhatAmIToYou',NULL,'2004-01-01','What Am I to You\nWhat am I to you\nTell me darling true\nTo me you are the SEA\nFast as you CAN BE\nAnd deep the shade of blue\nWhen you\'re feeling low\nTo whom else do you GO\nSee I cry if you hurt\nI\'d give you my last shirt\nBecause I love you so\nIf my sky should fall\nWould you even call\nOpened up my heart\nI never want to part\nI\'m giving you the ball\nWhen I look in your eyes\nI can feel THE butterflies\nI love you when you\'re blue\nTell me darlin true\nWhat am I to you\nYah well if my sky should fall\nWould you even call\nOpened up my heart\nNever wanna part\nI\'m givin you the ball\nWhen I look in your eyes\nI can feel the butterflies\nCould you find a love in me\nCould you carve me in a tree\nDon\'t fill my heart with lies\nI will you love when you\'re blue\nTell me darlin true\nWhat am I to you\nWhat am I to you\nWhat am I to you','NorahJones-WhatAmIToYou.mp3',210,0,10,0),(74,'Paul-SleepingBeauty.jpg','Sleeping Beauty','Paul','Paul','SleepingBeauty',NULL,'2016-01-29','해당 곡은 가사를 제공하지 않습니다.','Paul-SleepingBeauty.mp3',187,0,10,0),(75,'SarahKang-SummerIsforFallinginLove.jpg','Summer Is for Falling in Love','Sarah Kang','SarahKang','SummerIsforFallinginLove',NULL,'2020-10-28','We could drive along\nAn ocean reflecting the sun\nOr make a bed of green\nAtop a wide open scene\nUnder a canvas of blue\nI would draw ever nearer to you\nTo feel the dew on your skin\nThat is how it would begin\nFor summer is for falling in love\n\n\n\nWe could stay out late\nUntil the sun sets past eight\nAnd the cotton candy haze\nMirrors the warmth of your gaze\nRaise your glass to mine\nAnd as we drink, we would lock eyes\nSo we could disregard\nThe thought of ever having to part\nFor summer is for falling in love\n\n\n\nThis lightness of being\nWe both know to be fleeting\nLike the last breath of a sunset\n\nRight before the day is dead\nBut maybe the heat of today\nCould keep even winter away\nSo Ill remember your laugh\nCause nothing ever changes the fact\nThat summer is for falling in love\nSummer is for falling in love','SarahKang-SummerIsforFallinginLove.mp3',186,0,10,0),(76,'백예린-Dearmyblue.jpg','Dear my blue','백예린','백예린','Dearmyblue',NULL,'2019-03-18','You know what I see,\nI see everyday,\nThe face I love so much\nWith smiles and a laugh\nSometimes you seem so sad, darling\nBut I see you\'re dreaming of something\nAnd I dreamed of you\nWe needed each other\nMore than a sleep or eat\nWe think about the same thing all day\nThat\'s what we call love…\nYou know what I see,\nI see everyday,\nYour eyes I love so much\nFilled with hopes and me\nSometimes you seem so happy\nThat\'s because of me\nPlease, say so\nThat you dreamed of me\nWe needed each other\nMore than a sleep or eat\nWe think about the same thing all day\nThat\'s what we call love…\nYou know what I see…\nI see everyday…','백예린-Dearmyblue.mp3',138,0,10,0),(77,'선우정아-고양이Feat아이유.jpg','고양이(Feat 아이유)','선우정아','선우정아','고양이(Feat아이유)',NULL,'2017-12-28','다시 생각해봐\n이게 우리 최선은 아닐 거잖아\n왜 애써 네 맘을 숨겨 자 나를 봐\n이렇게 금방 낚이는 시선\n좀 더 가까이 그렇게 말고\n이렇게 포근하게\n작은 내 심장 소리에 감동하게\n함께 좀 더 있자\n네가 나타나기 전까지 난 외로웠\n아니 심심했어\n어차피 넌 늦었어 분명 후회할 걸\n뒤돌아 선 순간부터\n넌 날 그리워하게 될 거야\n넌 날 그리워하게 될 거야\n한 번 빠지면 답이 없지\n어쩔 수 없어 태생인 걸\n가까이 삭막한 네 하루에 마법을 걸게\n나도 그 이유는 잘 모르겠는데\n다 난리 나던데?\n너 가버린대도 괜찮아\n나 좋다는 인간들이 널렸음\n아쉬울 게 뭐 있어 너만 손해인 걸\n뒤돌아 선 순간부터\n넌 날 그리워하게 될 거야\n넌 날 그리워하게 될 거야\n눈 마주치면 게임 끝이지\n어쩔 수 없어 태생인 걸\n넌 날 그리워하게 될 거야\n넌 날 그리워하게 될 거야\n넌 날 그리워하게 될 거야\n넌 날 그리워하게 될 거야\n한 번 빠지면 답이 없지\n(답이 없지)\n어쩔 수 없어 태생인 걸\n(그럼그럼 그럼그럼)\n다시 생각해봐\n다시 생각해봐','선우정아-고양이Feat아이유.mp3',242,0,10,0),(78,'NiccoloPaganini-Lacampanella.jpg','La campanella','Niccolo Paganini','NiccoloPaganini','Lacampanella',NULL,'2017-11-14','해당 곡은 가사를 제공하지 않습니다.','NiccoloPaganini-Lacampanella.mp3',456,0,7,0),(79,'김승민-내기쁨은너가벤틀리를끄는거야.jpg','내 기쁨은 너가 벤틀리를 끄는 거야','김승민','김승민','내기쁨은너가벤틀리를끄는거야',NULL,'2021-10-19','내가 슬플 때마다\n이 노래가 찾아와\n세상이 둥근 것처럼 우린 동글동글\n인생은 회전목마\n우린 매일 달려가\n언제쯤 끝나 난 잘 몰라\n어머, 벌써 정신없이 달려왔어\nSpeed up 어제로 돌아가는 시곌 보다가\n어려워 어른이 되어가는 과정이 Uh huh\nOn the road, 24 시간이 아까워 Uh huh\nBig noise, Everything brand new\n어렸을 때처럼 바뀌지 않는 걸\n찾아 나섰단 말야 왜냐면 그때가 더 좋았어 난\nSo let me go back\n타임머신 타고 I\'ll go back\n승호가 좋았을 때처럼만\n내가 슬플 때마다\n이 노래가 찾아와\n세상이 둥근 것처럼 우리\n인생은 회전목마\n우린 매일 달려가\n언제쯤 끝나 난 잘 몰라\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마\n어머 벌써 정신없이 달려왔어\nSpeed up 어제로 돌아가는 시곌 보다가\n청춘까지 뺏은 현재\n탓할 곳은 어디 없네\nTwenty two 세에게 너무 큰 벽\n그게 말로 하고 싶어도 어려웠어\n가끔은 어렸을 때로 돌아가\n불가능하단 건 나도 잘 알아\n그 순간만 고칠 수 있다면\n지금의 나는 더 나았을까\n달려가는 미터기 돈은 올라가\n기사님과 어색하게 눈이 맞아\n창문을 열어보지만 기분은 좋아지지 않아\n그래서 손을 밖으로 쭉 뻗어 쭉 뻗어\n흔들리는 택시는 어느새\n목적지에 도달했다고 해\n방 하나 있는 내 집 안의\n손에 있던 짐들은\n내가 힘들 때마다\n이 노래가 찾아와\n세상이 둥근 것처럼 우리\n인생은 회전목마\n우린 계속 달려가\n언제쯤 끝날지 잘 몰라\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마\nI\'m on a TV show\nYou would never even know\n사실 얼마나 많이\n불안했는지\n정신없이 돌아서\n어딜 봐야 할지 모르겠어\n들리나요 여길 보란 말이\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마 접기','김승민-내기쁨은너가벤틀리를끄는거야.mp3',180,0,2,0),(80,'JamesHorner-TheLudlows.jpg','The Ludlows','James Horner','JamesHorner','TheLudlows',NULL,'1995-01-10','해당 곡은 가사를 제공하지 않습니다.','JamesHorner-TheLudlows.mp3',340,0,7,0),(81,'JoeHisaishi-Summer.jpg','Summer','Joe Hisaishi','JoeHisaishi','Summer',NULL,'2020-01-17','해당 곡은 가사를 제공하지 않습니다.','JoeHisaishi-Summer.mp3',153,0,7,0),(82,'SarahBrightman&AndreaBocelli-TimeToSayGoodbye.jpg','Time To Say Goodbye','Sarah Brightman&Andrea Bocelli','SarahBrightman&AndreaBocelli','TimeToSayGoodbye',NULL,'2007-01-01','Quando sono solo\nsogno all\'orizzonte\ne mancan le parole,\nsi lo so che non c\'è luce\nin una stanza quando manca il sole,\nse non ci sei tu con me,\nSu le finestre\nmostra a tutti il mio cuore\nche hai acceso,\nchiudi dentro me\nla lace che\nhai incontrato per strada,\nTime to say goodbye\nPaesi che non ho mai\nveduto e vissuto con te,\nadesso si li vivro\'\nCon te partiro\'\nsu navi per mari\nche, io lo so,\nno, no, non esistono più\nIt\'s time to say goodbye\nQuando sei lontana\nsogno all\'orizzonte\ne mancan le parole,\ne io si lo so\nche sie con me, con me,\ntu mia luna tu sei qui con me,\nmio sole tu sei qui con me, con me, con me, con me\nTime to say goodbye\nPaesi che non ho mai\nveduto e vissuto con te,\nadesso si li vivrò.\nCon te partirò,\nsu navi per mari\nche, io lo so,\nno, no, non esistono più,\ncon te io li rivivrò.\nCon te partirò\nsu navi per mari\nche, io lo so,\nno, no, non esistono più.\ncon te io li rivivrò.\nCon te partirò...\nIo con te.','SarahBrightman&AndreaBocelli-TimeToSayGoodbye.mp3',247,0,7,0),(83,'드뷔시-달빛.jpg','달빛','드뷔시','드뷔시','달빛',NULL,'2005-06-01','해당 곡은 가사를 제공하지 않습니다.','드뷔시-달빛.mp3',332,0,7,0),(84,'모차르트-터키행진곡.jpg','터키 행진곡','모차르트','모차르트','터키행진곡',NULL,'2015-03-19','해당 곡은 가사를 제공하지 않습니다.','모차르트-터키행진곡.mp3',226,0,7,0),(85,'바흐-G선상의아리아.jpg','G선상의 아리아','바흐','바흐','G선상의아리아',NULL,'2018-07-04','해당 곡은 가사를 제공하지 않습니다.','바흐-G선상의아리아.mp3',339,0,7,0),(86,'베토벤-엘리제를위하여.jpg','엘리제를 위하여','베토벤','베토벤','엘리제를위하여',NULL,'2019-05-14','','베토벤-엘리제를위하여.mp3',316,0,7,0),(87,'쇼팽-즉흥환상곡.jpg','즉흥 환상곡','쇼팽','쇼팽','즉흥환상곡',NULL,'2015-05-14','해당 곡은 가사를 제공하지 않습니다.','쇼팽-즉흥환상곡.mp3',336,0,7,0),(88,'이루마YIRUMA-flower.jpg','f l o w e r','이루마 YIRUMA','이루마YIRUMA','flower',NULL,'2017-05-16','해당 곡은 가사를 제공하지 않습니다.','이루마YIRUMA-flower.mp3',234,0,7,0),(89,'김연자-아모르파티.jpg','아모르 파티','김연자','김연자','아모르파티',NULL,'2013-07-23','산다는 게 다 그런 거지 누구나 빈손으로 와\n소설같은 한 편의 얘기들을 세상에 뿌리며 살지\n자신에게 실망하지마 모든 걸 잘할 순 없어\n오늘보다 더 나은 내일이면 돼\n인생은 지금이야\n아모르 파티\n아모르 파티\n인생이란 붓을 들고 서 무엇을 그려야할지\n고민하고 방황하던 시간이 없다면 거짓말이지\n말해 뭐해 쏜 화살처럼 사랑도 지나갔지만\n그 추억들 눈이 부시면서도 슬펐던 행복이여\n나이는 숫자 마음이 진짜\n가슴이 뛰는대로 가면 돼\n이제는 더이상 슬픔이여 안녕\n왔다 갈 한 번의 인생아\n연애는 필수 결혼은 선택\n가슴이 뛰는대로 하면 돼\n눈물은 이별의 거품일 뿐이야\n다가올 사랑은 두렵지 않아\n아모르 파티\n아모르 파티\n말해 뭐해 쏜 화살처럼 사랑도 지나갔지만\n그 추억들 눈이 부시면서도 슬펐던 행복이여\n나이는 숫자 마음이 진짜\n가슴이 뛰는대로 가면 돼\n이제는 더이상 슬픔이여 안녕\n왔다 갈 한 번의 인생아\n연애는 필수 결혼은 선택\n가슴이 뛰는대로 하면 돼\n눈물은 이별의 거품일 뿐이야\n다가올 사랑은 두렵지 않아\n아모르 파티\n아모르 파티\n아모르 파티','김연자-아모르파티.mp3',218,0,3,0),(90,'김효중-고맙소.jpg','고맙소','김호중','김호중','고맙소',NULL,'2020-09-05','이 나이 먹도록 세상을 잘 모르나 보다\n진심을 다해도 나에게 상처를 주네\n이 나이 먹도록 사람을 잘 모르나 보다\n사람은 보여도 마음은 보이질 않아\n이 나이 되어서 그래도 당신을 만나서\n고맙소 고맙소 늘 사랑하오\n술 취한 그날 밤 손등에 눈물을 떨굴 때\n내 손을 감싸며 괜찮아 울어준 사람\n세상이 등져도 나라서 함께 할 거라고\n등 뒤에 번지던 눈물이 참 뜨거웠소\n이 나이 되어서 그래도 당신을 만나서\n고맙소 고맙소 늘 사랑하오\n못난 나를 만나서\n긴 세월 고생만 시킨 사람\n이런 사람이라서 미안하고 아픈 사람\n나 당신을 위해 살아가겠소\n남겨진 세월도 함께 갑시다\n고맙소 고맙소 늘 사랑하오 늘 사랑하오\n고맙소 고맙소 늘 사랑하오','김호중-고맙소.mp3',320,0,3,0),(91,'나훈아-테스형!.jpg','테스형!','나훈아','나훈아','테스형!',NULL,'2020-08-20','어쩌다가 한바탕 턱 빠지게 웃는다\n그리고는 아픔을 그 웃음에 묻는다\n그저 와준 오늘이 고맙기는 하여도\n죽어도 오고 마는 또 내일이 두렵다\n아! 테스형 세상이 왜 이래 왜 이렇게 힘들어\n아! 테스형 소크라테스형 사랑은 또 왜 이래\n너 자신을 알라며 툭 내뱉고 간 말을\n내가 어찌 알겠소 모르겠소 테스형\n울 아버지 산소에 제비꽃이 피었다\n들국화도 수줍어 샛노랗게 웃는다\n그저 피는 꽃들이 예쁘기는 하여도\n자주 오지 못하는 날 꾸짖는 것만 같다\n아! 테스형 아프다 세상이 눈물 많은 나에게\n아! 테스형 소크라테스형 세월은 또 왜 저래\n먼저가본 저세상 어떤 가요 테스형\n가보니까 천국은 있던 가요 테스형\n아! 테스형 아! 테스형 아! 테스형 아! 테스형\n아! 테스형 아! 테스형 아! 테스형 아! 테스형','나훈아-테스형!.mp3',278,0,3,0),(92,'박군-한잔해.jpg','한잔해','박군','박군','한잔해',NULL,'2019-09-17','한잔해 한잔해 한잔해\n갈때까지 달려보자 한잔해\n오늘밤 너와 내가 하나되어\n달려 달려 달려 달려\n한잔해 한잔해 한잔해\n갈때까지 달려보자 한잔해\n내가 쏜다 한잔해\n월요일은 원래 먹는 날\n화요일은 화가 나니까\n숙취에 한잔\n목이 말라 한잔\n금요일은 불금 이니까\n밤새도록 한잔 어때요\n한잔해 한잔해 한잔해\n갈때까지 달려보자 한잔해\n오늘밤 너와 내가 하나되어\n달려 달려 달려 달려\n한잔해 두잔해 세잔해\n갈때까지 달려보자 한잔해\n내가 쏜다 한잔해\n삼겹살에 한잔 때리자\n치킨에다 한잔 때리자\n두부김치 해물파전\n시원한 한잔 주세요\n밤새도록 한잔 어때요\n한잔해 한잔해 한잔해\n갈때까지 달려보자 한잔해\n오늘밤 너와 내가 하나되어\n달려 달려 달려 달려\n한잔해 두잔해 세잔해\n갈때까지 달려보자 한잔해\n내가 쏜다 한잔해\n한잔해 한잔해 한잔해\n갈때까지 달려보자 한잔해\n오늘밤 너와 내가 하나되어\n달려 달려 달려 달려\n한잔해 두잔해 세잔해\n갈때까지 달려보자 한잔해\n내가 쏜다 한잔해','박군-한잔해.mp3',202,0,3,0),(93,'박현빈-곤드레만드레.jpg','곤드레만드레','박현빈','박현빈','곤드레만드레',NULL,'2006-08-08','곤드레 만드레\n나는 취해버렸어\n너의 사랑에 향기속에 빠져버렸어\n가진것은 없다지만 사랑으로 감싸줄게\n진심어린 마음하나 나는 너를사랑해\n비오는날 흐린날도 햇살처럼 안아줄게\n너의 흔들리는 사랑을 꽃으로 피워줘 다시는 너를 울리지않을꺼야\n나의 여자로 만들꺼야\n내게 언제나 너뿐이야\n웃으며 내게 돌아와줘\n곤드레 만드레\n나는 취해버렸어\n너의 사랑에 향기속에 빠져버렸어 곤드레 만드레\n나는 지쳐버렸어\n나의 심장이 멎기전에 제발 돌아와\n내세울건 없다지만\n니곁에서 있어줄께\n변함없는 그림자로 영원히 사랑해\n비오는날 흐린날도 햇살처럼 안아줄께\n너의 흔들리는 사랑을 꽃으로 피어줘 다시는 너를 울리지않을꺼야\n나의 여자로 만들꺼야\n내게 언제나 너뿐이야\n웃으며 내게 돌아와줘\n곤드레 만드레\n나는 취해버렸어\n너의 사랑에 향기속에 빠져버렸어 곤드레 만드레\n나는 지쳐버렸어\n나의 심장이 멎기전에 제발 돌아와 나의 심장이 멎기전에 제발 돌아와','박현빈-곤드레만드레.mp3',198,0,3,0),(94,'영탁-니가왜거기서나와.jpg','니가 왜 거기서 나와','영탁','영탁','니가왜거기서나와',NULL,'2018-10-21','남 : 어디야?\n여 : 집이야. 피곤해서 일찍 자려구.\n남 : 아 그래? 잠깐 볼랬더니.\n오늘 피곤했나 보네. 언능 자\n여 : 어 끊어.\n근데! 니가!\n니가 왜 거기서 나와\n니가 왜 거기서 나와\n사랑을 믿었었는데\n발등을 찍혔네\n그래 너 그래 너 야 너\n니가 왜 거기서 나와.\n피곤하다 하길래\n잘자라 했는데\n혹시나 아픈건가\n걱정도 했는데\n뭐하는데\n여기서 뭐하는데\n도대체\n너네집은 연신내\n난 지금 강남에\n시끄런 클럽을\n무심코 지나는데\n이게 누구십니까\n니가 왜 거기서 나와\n니가 왜 거기서 나와\n내 눈을 의심해보고\n보고 또 보아도\n딱봐도 너야\n오마이 너야\n니가 왜 거기서 나와\n니가 왜 거기서 나와\n사랑을 믿었었는데\n발등을 찍혔네\n그래 너 그래 너 야 너\n이런건 사랑이 아냐.\n노는 남자 싫다매\n술은 못한다매\n그것 땜에 나는 다\n끊어버렸는데\n지금 넌 왜\n혀가 꼬이는 건데\n도대체\n근데 지금 니 옆에\n이 남잔 누군데\n교회 오빠하고\n클럽은 왜 왔는데\n너네 집 불교잖아.\n니가 왜 거기서 나와\n니가 왜 거기서 나와\n내 눈을 의심해보고\n보고 또 보아도\n딱봐도 너야\n오마이 너야\n니가 왜 거기서 나와\n니가 왜 거기서 나와\n사랑을 믿었었는데\n발등을 찍혔네\n그래 너 그래 너 야너\n이런건 사랑이 아냐.\n그래 너 그래 너 야너\n니가 왜 거기서 나와.','영탁-니가왜거기서나와.mp3',192,0,3,0),(95,'임영웅-사랑역.jpg','사랑역','임영웅','임영웅','사랑역',NULL,'2022-05-02','돌고 돌아 사랑역\n다시 한번 내렸네\n아픔만 두고 떠나가는\n저 기차는 말이 없는데\n이리 갈까 저리 갈까\n몇 번을 물어보아도\n돌아온 대답은 멀어지는\n멀어지는 기적 소리뿐\n아아아 사랑역 나에겐 눈물역\n돌고 돌아 사랑역\n다시 한번 내렸네\n상처만 두고 떠나가는\n저 기차는 말이 없는데\n남은 짐 구겨 넣고\n돌아서는 내 모습이\n마주친 대합실 창 너머로\n쓸쓸히 웃음 짓는다\n아아아 사랑역 나에겐 눈물역\n이리 갈까 저리 갈까\n몇 번을 물어보아도\n돌아온 대답은 멀어지는\n멀어지는 기적 소리뿐\n아아아 사랑역 나에겐 눈물역\n나에겐 눈물역','임영웅-사랑역.mp3',193,0,3,0),(96,'임영웅-어느60대노부부이야기.jpg','어느 60대 노부부 이야기','임영웅','임영웅','어느60대노부부이야기',NULL,'2020-02-21','곱고 희던 그손으로 넥타이를 매어주던 때\n어렴풋이 생각나오 여보 그때를 기억하오\n막내아들 대학시험 뜬눈으로 지내던 밤들\n어렴풋이 생각나오 여보 그때를 기억하오\n세월은 그렇게 흘러 여기까지 왔는데\n인생은 그렇게 흘러 황혼에 기우는데\n큰딸아이 결혼식날 흘리던 눈물방울이\n이제는 모두 말라 여보 그눈물을 기억하오\n세월이 흘러감에 흰머리가 늘어가네\n모두다 떠난다고 여보 내손을 꼭 잡았소\n세월은 그렇게 흘러 여기까지 왔는데\n인생은 그렇게 흘러 황혼에 기우는데\n다시 못올 그먼길을\n어찌 혼자 가려하오\n여기날 홀로 두고 여보 왜 한마디 말이 없소\n여보 안녕히 잘 가시게..','임영웅-어느60대노부부이야기.mp3',314,0,3,0),(97,'임영웅-이제나만믿어요.jpg','이제 나만 믿어요','임영웅','임영웅','이제나만믿어요',NULL,'2020-04-03','무얼 믿은 걸까 부족했던 내게서\n나조차 못 믿던 내게 여태 머문 사람\n무얼 봤던 걸까 가진 것도 없던 내게\n무작정 내 손을 잡아 날 이끈 사람\n최고였어\n그대 눈 속에 비친 내 모습\n이제는 내게서 그댈 비춰줄게\n궂은 비가 오면\n세상 가장 큰 그대 우산이 될게\n그댄 편히 걸어가요\n걷다가 지치면\n내가 그대를 안고 어디든 갈게\n이제 나만 믿어요\n나만 두고 가던, 나만 스쳐 간 행운이 모여\n그대가 되어서 내게 와준 거야\n궂은 비가 오면\n세상 가장 큰 그대 우산이 될게\n그댄 편히 걸어가요\n걷다가 지치면\n내가 그대를 안고 어디든 갈게\n이제 나만 믿어요\n나의 마지막 주인공이 되어\n다신 누구 앞에서도 그대는 고개 숙이지 마요\n내가 보지 못했던 홀로 고단했던 시간\n고맙고 미안해요 사랑해요\n이 세상은\n우리를 두고 오랜 장난을 했고\n우린 속지 않은 거야\n이제 울지 마요\n좋을 땐 밤새도록 맘껏 웃어요\n전부 그대 꺼니까\n그대는 걱정 말아요\n이제 나만 믿어요','임영웅-이제나만믿어요.mp3',274,0,3,0),(98,'홍진영-산다는건.jpg','산다는 건','홍진영','홍진영','산다는건',NULL,'2019-03-08','산다는 건 다 그런 거래요\n힘들고 아픈 날도 많지만\n산다는 건 참 좋은 거래요\n오늘도 수고 많으셨어요\n어떻게 지내셨나요\n오늘도 한잔 걸치셨네요\n뜻대로 되는 일 없어\n한숨이 나도 슬퍼마세요\n어느 구름 속에\n비가 들었는지 누가 알아\n살다보면 나에게도\n좋은 날이 온답니다\n산다는 건 다 그런 거래요\n힘들고 아픈 날도 많지만\n산다는 건 참 좋은 거래요\n오늘도 수고 많으셨어요\n옆집이 부러운가요\n친구가 요즘 잘나가나요\n남들은 다 좋아 보여\n속상해져도 슬퍼마세요\n사람마다 알고 보면\n말 못할 사연도 많아\n인생이 별거 있나요\n거기서 거기인거지\n산다는 건 다 그런 거래요\n힘들고 아픈 날도 많지만\n산다는 건 참 좋은 거래요\n오늘도 수고 많으셨어요\n산다는 건 다 그런 거래요\n세상일이란 알 수 없지만\n산다는 건 참 멋진 거래요\n모두다 내일도 힘내세요\n오늘도 수고 많으셨어요','홍진영-산다는건.mp3',206,0,3,0),(99,'AdamLevine-LostStars.jpg','Lost Stars','Adam Levine','AdamLevine','LostStars',NULL,'2015-05-18','Please dont see just a boy caught up in dreams and fantasies\nPlease see me reaching out for someone I cant see\nTake my hand lets see where we wake up tomorrow\nBest laid plans sometimes are just a one night stand\nId be damned Cupids demanding back his arrow\nSo lets get drunk on our tears and\nGod, tell us the reason youth is wasted on the young\nIts hunting season and the lambs are on the run\nSearching for meaning\nBut are we all lost stars, trying to light up the dark?\nWho are we? Just a speck of dust within the galaxy?\nWoe is me. if were not careful turns into reality\nDont you dare let our best memories bring you sorrow\nYesterday I saw a lion kiss a deer\nTurn the page maybe well find a brand new ending\nWhere were dancing in our tears and\nGod, tell us the reason youth is wasted on the young\nIts hunting season and the lambs are on the run\nSearching for meaning\nBut are we all lost stars, trying to light up the dark?\nI thought I saw you out there crying\nI thought I heard you call my name\nI thought I heard you out there crying\nJust the same\nGod, give us the reason youth is wasted on the young\nIts hunting season and this lamb is on the run\nSearching for meaning\nI thought I saw you out there crying\nI thought I heard you call my name\nI thought I heard you out there crying\nBut are we all lost stars, trying to light up the dark?\nBut are we all lost stars, trying to light up the dark?','AdamLevine-LostStars.mp3',268,0,6,0),(100,'AnneMarie-2002.jpg','2002','Anne Marie','AnneMarie','2002',NULL,'2018-08-03','I will always remember\nThe day you kissed my lips\nLight as a feather\nAnd it went just like this\nNo, it\'s never been better\nThan the summer of 2002\nWe were only eleven\nBut acting like grownups\nLike we are in the present\nDrinking from plastic cups\nSinging love is forever and ever\nWell, I guess that was true\n\nDancing on the hood in the middle of the woods\nOn an old Mustang, where we sang\nSongs with all our childhoods friends\nAnd it went like this, say\n\nOops I got 99 problems singing bye, bye, bye\nHold up, if you wanna go and take a ride with me\nBetter hit me, baby, one more time\nPaint a picture for you and me\nOf the days when we were young\nSinging at the top of both our lungs\n\nNow we\'re under the covers\nFast forward to eighteen\nWe are more than lovers\nYeah, we are all we need\nWhen we\'re holding each other\nI\'m taken back to 2002\n\nDancing on the hood in the middle of the woods\nOn an old Mustang, where we sang\nSongs with all our childhoods friends\nAnd it went like this, say\n\nOops I got 99 problems singing bye, bye, bye\nHold up, if you wanna go and take a ride with me\nBetter hit me, baby, one more time\nPaint a picture for you and me\nOf the days when we were young\nSinging at the top of both our lungs\nOn the day we fell in love\nOn the day we fell in love\n\nDancing on the hood in the middle of the woods\nOn an old Mustang, where we sang\nSongs with all our childhoods friends\nOh, now\n\nOops I got 99 problems singing bye, bye, bye\nHold up, if you wanna go and take a ride with me\nBetter hit me, baby, one more time\nPaint a picture for you and me\nOf the days when we were young\nSinging at the top of both our lungs\nOn the day we fell in love\nOn the day we fell in love\nOn the day we fell in love\nOn the day we fell in love, love, love','AnneMarie-2002.mp3',189,0,6,0),(101,'CharliePuth-WeDontTalkAnymoreFeatSelenaGomez.jpg','We Dont Talk Anymore (Feat Selena Gomez)','Charlie Puth','CharliePuth','WeDontTalkAnymore(FeatSelenaGomez)',NULL,'2016-11-11','We don\'t talk anymore\nWe don\'t talk anymore\nWe don\'t talk anymore\nLike we used to do\nWe don\'t love anymore\nWhat was all of it for\nOh, we don\'t talk anymore\nLike we used to do\nI just heard you found the one you\'ve been looking\nYou\'ve been looking for\nI wish I would have known that wasn\'t me\nCause even after all this time, I still wonder\nWhy I can\'t move on\nJust the way you did so easily\nDon\'t wanna know\nKind of dress you\'re wearing tonight\nIf he\'s holding onto you so tight\nThe way I did before\nI overdosed\nShould\'ve known your love was a game\nNow I can\'t get you out of my brain\nOh, it\'s such a shame\nThat we don\'t talk anymore\nWe don\'t talk anymore\nWe don\'t talk anymore\nLike we used to do\nWe don\'t love anymore\nWhat was all of it for\nOh, we don\'t talk anymore\nLike we used to do\nI just hope you\'re lying next to somebody\nWho knows how to love you like me\nThere must be a good reason that you\'re gone\nEvery now and then I think you might want me to\nCome show up at your door\nBut I\'m just too afraid that I\'ll be wrong\nDon\'t wanna know\nIf you\'re looking into her eyes\nIf she\'s holding onto you so tight\nThe way I did before\nI overdosed\nShould\'ve known your love was a game\nNow I can\'t get you out of my brain\nOh, it\'s such a shame\nThat we don\'t talk anymore\nWe don\'t talk anymore\nWe don\'t talk anymore\nLike we used to do\nWe don\'t love anymore\nWhat was all of it for\nOh, we don\'t talk anymore\nLike we used to do\nLike we used to do\nDon\'t wanna know\nKind of dress you\'re wearing tonight\nIf he\'s giving it to you just right\nThe way I did before\nI overdosed\nShould\'ve known your love was a game\nNow I can\'t get you out of my brain\nOh, it\'s such a shame\nThat we don\'t talk anymore\nWe don\'t talk anymore\nWe don\'t talk anymore\nLike we used to do\nWe don\'t love anymore\nWhat was all of it for\nOh, we don\'t talk anymore\nLike we used to do\nWe don\'t talk anymore (don\'t wanna know)\nKind of dress you\'re wearing tonight (oh)\nIf he\'s holding onto you so tight (oh)\nThe way I did before\nWe don\'t talk anymore (I overdosed)\nShould\'ve known your love was a game (oh)\nNow I can\'t get you out of my brain (whoa)\nOh, it\'s such a shame\nThat we don\'t talk anymore','CharliePuth-WeDontTalkAnymoreFeatSelenaGomez.mp3',218,0,6,0),(102,'EdSheeran-BadHabits.jpg','Bad Habits','Ed Sheeran','EdSheeran','BadHabits',NULL,'2021-10-29','Every time you come around you know I can\'t say no\nEvery time the sun goes down I let you take control\nI can feel the paradise before my world implodes\nand tonight had something wonderful\nMy bad habits lead to late nights ending alone\nConversations with a stranger I barely know\nSwearing this will be the last, but it probably won\'t\nI\'ve got nothing left to lose, or use, or do\nMy bad habits to lead to wide eyes stare into space\nAnd I know I lose control of the things that I say\nI was looking for a way out, now I can\'t escape\nNothing happens after two\nIt\'s true it\'s true\nMy bad habits lead to you\nMy bad habits lead to you\nMy bad habits lead to you\nEvery pure intention ends when the good times start\nFalling over everything to reach the first times spark\nStarted under neon lights then it all got dark\nI only know how to go too far\nMy bad habits lead to late nights ending alone\nConversations with a stranger I barely know\nSwearing this will be the last, but it probably won\'t\nI\'ve got nothing left to lose, or use, or do\nMy bad habits to lead to wide eyes stare into space\nAnd I know I lose control of the things that I say\nI was looking for a way out, now I can\'t escape\nNothing happens after two\nIt\'s true it\'s true\nMy bad habits lead to you\nMy bad habits lead to you\nWe took the long way round\nAnd burned til the fun ran out, now\nMy bad habits lead to late nights ending alone\nConversations with a stranger I barely know\nSwearing this will be the last, but it probably won\'t\nI\'ve got nothing left to lose, or use, or do\nMy bad habits to lead to wide eyes stare into space\nAnd I know I lose control of the things that I say\nI was looking for a way out, now I can\'t escape\nNothing happens after two\nIt\'s true it\'s true\nMy bad habits lead to you\nMy bad habits lead to you\nMy bad habits lead to you','EdSheeran-BadHabits.mp3',231,0,6,0),(103,'GAYLE-abcdefu.jpg','abcdefu','GAYLE','GAYLE','abcdefu',NULL,'2021-08-13','and your mom\nand your sister\nand your job\nand your broke ass car\nand that shit you call art\nfuck you\nAnd your friends\nthat i\'ll never see again\neverybody but your dog\nyou can all FUCK OFF\ni swear i meant to mean the best\nwhen it ended\neven try to bite my tongue\nwhen you start shit\nnow you\'re texting all my friends asking questions\nthey never even liked you in the first place\ndated a girl that i hate for the attention\nshe only made it two days, what a connection\nit\'s like you\'d do anything for my affection\nyou\'re going all about it in the worst ways\ni was into you but I\'m over it now\nand I was trying to be nice\nbut nothing\'s getting through so let me spell it out\na b c d e\nf u\nand your mom\nand your sister\nand your job\nand your broke ass car\nand that shit you call art\nfuck you\nAnd your friends\nthat i\'ll never see again\neverybody but your dog\nyou can all fuck off\nNananananananana\na b c d e f u\nYou said you just needed space\nand so i gave it\nwhen I had nothing to say\nyou couldn\'t take it\ntold everyone i\'m a bitch\nso i became it\nalways had to put yourself above me\ni was into you but I\'m over it now\nand I was trying to be nice\nbut nothing\'s getting through so let me spell it out\na b c d e\nf u\nand your mom\nand your sister\nand your job\nand your craigslist couch\nand the way your voice sounds\nfuck you\nAnd you friends\nthat i\'ll never see again\neverybody but your dog\nyou can all fuck off\nNananananananana\na b c d e f off\nNananananananana\na b c d e\nf u\nand your mom\nand your sister\nand your job\nand your broke ass car\nand that shit you call art\nfuck you\nAnd your friends\nthat i\'ll never see again\neverybody but your dog\nyou can all FUCK OFF','GAYLE-abcdefu.mp3',170,0,6,0),(104,'JustinBieber-OffMyFace.jpg','Off My Face','Justin Bieber','JustinBieber','OffMyFace',NULL,'2021-03-18','[Verse 1]\nOne touch and you got me stoned\nHigher than I\'ve ever known\nYou call the shots and I follow\nSunrise but the night\'s still young\nNo words, but we speak in tongues\nIf you let me, I might say too much\n\n[Pre-Chorus]\nYour touch blurred my vision\nIt\'s your world, and I\'m just in it\nEven sober I\'m not thinkin\' straight\n\n[Chorus]\n\'Cause I\'m off my face, in love with you\nI\'m out my head, so into you\nAnd I don\'t know how you do it\nBut I\'m forever ruined by you, ooh-ooh-ooh\n\n[Verse 2]\nCan\'t sleep \'cause I\'m way too buzzed\nToo late, now you\'re in my blood\nI don\'t hate the way you keep me up\n\n[Pre-Chorus]\nYour touch blurred my vision\nIt\'s your world, and I\'m just in it\nEven sober I\'m not thinkin\' straight\n\n[Chorus]\n\'Cause I\'m off my face, in love with you\nI\'m out my head, so into you\nAnd I don\'t know how you do it\nBut I\'m forever ruined by you, ooh-ooh-ooh\n\n[Bridge]\nOoh, ooh-ooh\nOoh-ooh-ooh-ooh-ooh-ooh\nOoh-ooh-ooh-ooh\nOoh, ooh-ooh\nOoh-ooh-ooh-ooh-ooh-ooh\nOoh-ooh-ooh-ooh\n\n[Chorus]\n\'Cause I\'m off my face, in love with you\nI\'m out my head, so into you\nAnd I don\'t know how you do it\nBut I\'m forever ruined by you, ooh-ooh-ooh\nBy you, ooh-ooh-ooh','JustinBieber-OffMyFace.mp3',157,0,6,0),(105,'JustinBieber-Stay.jpg','Stay','Justin Bieber','JustinBieber','Stay',NULL,'2021-07-09','I do the same thing I told you\nthat I never would\nI told you I\'d change, even\nwhen I knew I never could\nI know that I can\'t find nobody else\nas good as you\nI need you to stay,\nneed you to stay, hey (Oh)\nI get drunk, wake up, I\'m wasted still\nI realize the time that I wasted here\nI feel like you can\'t feel the way I feel\nOh, I\'ll be fucked up\nif you can\'t be right here\nOh, ooh-woah (Oh, ooh-woah, ooh-woah)\nOh, ooh-woah (Oh, ooh-woah, ooh-woah)\nOh, ooh-woah (Oh, ooh-woah, ooh-woah)\nOh, I\'ll be fucked up\nif you can\'t be right here\nI do the same thing I told you\nthat I never would\nI told you I\'d change,\neven when I knew I never could\nI know that I can\'t find nobody else\nas good as you\nI need you to stay, need you to stay, hey\nI do the same thing I told you\nthat I never would\nI told you I\'d change,\neven when I knew I never could\nI know that I can\'t find nobody else\nas good as you\nI need you to stay, need you to stay, hey\nWhen I\'m away from you,\nI miss your touch (Ooh)\nYou\'re the reason I believe in love\nIt\'s been difficult for me to trust (Ooh)\nAnd I\'m afraid that I\'ma fuck it up\nAin\'t no way that I can leave you stranded\n\'Cause you ain\'t ever left me empty-handed\nAnd you know that I know\nthat I can\'t live without you\nSo, baby, stay\nOh, ooh-woah (Oh, ooh-woah, ooh-woah)\nOh, ooh-woah (Oh, ooh-woah, ooh-woah)\nOh, ooh-woah (Oh, ooh-woah, ooh-woah)\nI\'ll be fucked up if you can\'t be right here\nI do the same thing I told you\nthat I never would\nI told you I\'d change,\neven when I knew I never could\nI know that I can\'t find nobody else\nas good as you\nI need you to stay, need you to stay, hey\nI do the same thing I told you\nthat I never would\nI told you I\'d change,\neven when I knew I never could\nI know that I can\'t find nobody else\nas good as you\nI need you to stay, need you to stay, hey\nWoah-oh\nI need you to stay, need you to stay, hey','JustinBieber-Stay.mp3',139,1,6,0),(106,'Lauv-ParisintheRain.jpg','Paris in the Rain','Lauv','Lauv','ParisintheRain',NULL,'2018-10-08','All I know is (ooh-ooh-ooh)\nWe could go anywhere, we could do\nAnything, girl, whatever the mood we\'re in\nAll I know is (ooh-ooh-ooh)\nGetting lost late at night, under stars\nFinding love standing right where we are, your lips\nThey pull me in the moment, you and I alone and\nPeople may be watching, I don\'t mind\n\'Cause\nAnywhere with you feels right\nAnywhere with you feels like\nParis in the rain\nParis in the rain\nWe don\'t need a fancy town\nOr bottles that we can\'t pronounce\n\'Cause anywhere, babe\nIs like Paris in the rain\nWhen I\'m with you\nWhen I\'m with you\nParis in the rain\nParis in the rain\nI look at you now and I want this forever\nI might not deserve it but there\'s nothing better\nDon\'t know how I ever did it all without you\nMy heart is about to, about to jump out of my chest\nFeelings they come and they go, that they do\nFeelings they come and they go, not with you\nThe late nights and the street lights and the people\nLook at me, girl, and the whole world could stop\nAnywhere with you feels right\nAnywhere with you feels like\nParis in the rain\nParis in the rain\nWe don\'t need a fancy town\nOr bottles that we can\'t pronounce\n\'Cause anywhere, babe\nIs like Paris in the rain\nWhen I\'m with you\nWhen I\'m with you\nParis in the rain\nParis in the rain (oh)\nGirl, when I\'m not with you\nAll I do is miss you\nSo come and set the mood right\nUnderneath the moonlight\n(Days in Paris, nights in Paris)\nPaint you with my eyes closed\nWonder where the time goes\n(Yeah, isn\'t it obvious, isn\'t it obvious?)\nCome and set the mood right\nUnderneath the moonlight\n\'Cause anywhere with you feel right\nAnywhere with you feels like\nParis in the rain\nParis in the rain\nWalking down an empty street\nPuddles underneath our feet','Lauv-ParisintheRain.mp3',203,0,6,0),(107,'Maroon5-Memories.jpg','Memories','Maroon 5','Maroon5','Memories',NULL,'2019-09-19','Here\'s to the ones that we got\nCheers to the wish you were here, but you\'re not\n\'Cause the drinks bring back all the memories\nOf everything we\'ve been through\nToast to the ones here today\nToast to the ones that we lost on the way\n\'Cause the drinks bring back all the memories\nAnd the memories bring back, memories bring back you\n\nThere\'s a time that I remember, when I did not know no pain\nWhen I believed in forever, and everything would stay the same\nNow my heart feel like December when somebody say your name\n\'Cause I can\'t reach out to call you, but I know I will one day, yeah\n\nEverybody hurts sometimes\nEverybody hurts someday, ayy ayy\nBut everything gon\' be alright\nGo and raise a glass and say, ayy\n\nHere\'s to the ones that we got\nCheers to the wish you were here, but you\'re not\n\'Cause the drinks bring back all the memories\nOf everything we\'ve been through\nToast to the ones here today\nToast to the ones that we lost on the way\n\'Cause the drinks bring back all the memories\nAnd the memories bring back, memories bring back you\n\nDoo doo, doo doo doo doo\nDoo doo doo doo, doo doo doo doo\nDoo doo doo doo, doo doo doo\nMemories bring back, memories bring back you\n\nThere\'s a time that I remember when I never felt so lost\nWhen I felt all of the hatred was too powerful to stop (ooh, yeah)\nNow my heart feel like an ember and it\'s lighting up the dark\nI\'ll carry these torches for ya that you know I\'ll never drop, yeah\n\nEverybody hurts sometimes\nEverybody hurts someday, ayy ayy\nBut everything gon\' be alright\nGo and raise a glass and say, ayy\n\nHere\'s to the ones that we got (oh)\nCheers to the wish you were here, but you\'re not\n\'Cause the drinks bring back all the memories\nOf everything we\'ve been through (no, no)\nToast to the ones here today (ayy)\nToast to the ones that we lost on the way\n\'Cause the drinks bring back all the memories (ayy)\nAnd the memories bring back, memories bring back you\n\nDoo doo, doo doo doo doo\nDoo doo doo doo, doo doo doo doo\nDoo doo doo doo, doo doo doo\nMemories bring back, memories bring back you\nDoo doo, doo doo doo doo\nDoo doo doo doo, doo doo doo doo\nDoo doo doo doo, doo doo doo (ooh, yeah)\nMemories bring back, memories bring back you\n\nYeah, yeah, yeah\nYeah, yeah, yeah, yeah, yeah, doh, doh\nMemories bring back, memories bring back you','Maroon5-Memories.mp3',191,0,6,0),(108,'OneRepublic-IAintWorried.jpg','I Aint Worried','OneRepublic','OneRepublic','IAintWorried',NULL,'2022-05-13','I don\'t know what you\'ve been told\nBut time is running out, no need to take it slow\nI\'m stepping to you toe-to-toe\nI should be scared, honey, maybe so\n\nBut I ain\'t worried \'bout it right now (Right now)\nKeeping dreams alive, 1999, heroes\nI ain\'t worried \'bout it right now (Right now)\nSwimmin\' in the floods, dancing on the clouds below\n\nI ain\'t worried \'bout it\nI ain\'t worried \'bout it (Hey)\n\nI don\'t know what you\'ve been told\nBut time is running out so spend it like it\'s gold\nI\'m living like I\'m nine-zeros\nGot no regrets even when I am broke (Yeah)\n\nI\'m at my best when I got something I\'m wanting to steal\nWay too busy for them problems and problems to feel (Yeah, yeah)\nNo stressing, just obsessing with sealing the deal\nI\'ll take it in and let it go\n\nBut I ain\'t worried \'bout it right now (Right now)\nKeeping dreams alive, 1999, heroes\nI ain\'t worried \'bout it right now (Right now)\nSwimmin\' in the floods, dancing on the clouds below\nI ain\'t worried \'bout it\nI ain\'t worried \'bout it (Hey)\nOoh, I ain\'t worried\nOoh, oh, no, no\n\nI ain\'t worried \'bout it right now (Right now)\nKeeping dreams alive, 1999, heroes\nI ain\'t worried \'bout it right now (Right now)\nSwimmin\' in the floods, dancing on the clouds below\n\n\nI ain\'t worried \'bout it\nI ain\'t worried \'bout it (Hey)\nI ain\'t worried \'bout it','OneRepublic-IAintWorried.mp3',149,0,6,0),(109,'sokodomo-회전목마FeatZionT,원슈타인.jpg','회전목마 (Feat Zion T,원슈타인)','sokodomo','sokodomo','회전목마(FeatZionT,원슈타인)',NULL,'2021-11-13','내가 슬플 때마다\n이 노래가 찾아와\n세상이 둥근 것처럼 우린 동글동글\n인생은 회전목마\n우린 매일 달려가\n언제쯤 끝나 난 잘 몰라\n어머, 벌써 정신없이 달려왔어\nSpeed up 어제로 돌아가는 시곌 보다가\n어려워 어른이 되어가는 과정이 Uh huh\nOn the road, 24 시간이 아까워 Uh huh\nBig noise, Everything brand new\n어렸을 때처럼 바뀌지 않는 걸\n찾아 나섰단 말야 왜냐면 그때가 더 좋았어 난\nSo let me go back\n타임머신 타고 I\'ll go back\n승호가 좋았을 때처럼만\n내가 슬플 때마다\n이 노래가 찾아와\n세상이 둥근 것처럼 우리\n인생은 회전목마\n우린 매일 달려가\n언제쯤 끝나 난 잘 몰라\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마\n어머 벌써 정신없이 달려왔어\nSpeed up 어제로 돌아가는 시곌 보다가\n청춘까지 뺏은 현재\n탓할 곳은 어디 없네\nTwenty two 세에게 너무 큰 벽\n그게 말로 하고 싶어도 어려웠어\n가끔은 어렸을 때로 돌아가\n불가능하단 건 나도 잘 알아\n그 순간만 고칠 수 있다면\n지금의 나는 더 나았을까\n달려가는 미터기 돈은 올라가\n기사님과 어색하게 눈이 맞아\n창문을 열어보지만 기분은 좋아지지 않아\n그래서 손을 밖으로 쭉 뻗어 쭉 뻗어\n흔들리는 택시는 어느새\n목적지에 도달했다고 해\n방 하나 있는 내 집 안의\n손에 있던 짐들은\n내가 힘들 때마다\n이 노래가 찾아와\n세상이 둥근 것처럼 우리\n인생은 회전목마\n우린 계속 달려가\n언제쯤 끝날지 잘 몰라\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마\nI\'m on a TV show\nYou would never even know\n사실 얼마나 많이\n불안했는지\n정신없이 돌아서\n어딜 봐야 할지 모르겠어\n들리나요 여길 보란 말이\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마\n빙빙 돌아가는 회전목마처럼\n영원히 계속될 것처럼\n빙빙 돌아올 우리의 시간처럼\n인생은 회전목마 접기','sokodomo-회전목마FeatZionT원슈타인.mp3',250,0,2,0),(110,'디핵,파테코(Pateko)-OHAYOMYNIGHT.jpg','OHAYO MY NIGHT','디핵,파테코(Pateko)','디핵,파테코(Pateko)','OHAYOMYNIGHT',NULL,'2020-06-20','너를 사랑하고 있어\n너를 사랑하고 있어\n자기야 날 사랑해주면 안 될까?\n말처럼 쉽지는 않은 걸 알지만\n세게 날 안아주면 안 될까?\n오늘따라 세상이 무섭단 말이야\n잠깐 인공호흡을 해주라\n왠지 숨이 잘 안 쉬어져서 난\n날 놓을 거면 과거에 놔주라\n네가 있는 시간에서 죽어갈 거야\n우리 그냥 결혼하면 안 될까?\n돈은 내가 열심히 벌 테니까\n이 세상과 내가 눈감는 날\n까지만 날 사랑한다 말해주라\n내가 너를 사랑해도\n네가 날 안 사랑해도\n우린 나름대로 행복할 거야\n내 방 천장에 그려 본 내 우주에게 물어본\n말은 나를 사랑하면 안 될까?\n오사카나 오키나와의 바다\n내 뮤비들을 찍었던 곳 말이야\n같이 가자 약속했었잖아\n그 약속이 깨질까 봐 겁이 나\nWHUTUF이 결혼한다 하던 날\n진짜 처음으로 걔가 부럽더라\n하얀 웨딩드레스를 입은 아름다운\n너와 영원을 말할 수 있을까?\n가족이 되어주라\n내 집이 되어주라\n나도 날 줄 테니 너도 널 주라\n평생의 연인이야\n네 말대로 말이야\n그래 별과 우주잖아\n날 사랑하지 않는다면\n나의 사랑 반을 받아\n남은 사랑의 반도\n내가 채워줄 거야 꼭\n내가 너를 사랑해도\n네가 날 안 사랑해도\n우린 나름대로 행복할 거야\n내 방 천장에 그려 본 내 우주에게 물어본\n말은 나를 사랑하면 안 될까?\n내가 너를 사랑해도\n네가 날 안 사랑해도\n우린 나름대로 행복할 거야\n내 방 천장에 그려 본 내 우주에게 물어본\n말은 나를 사랑하면 안 될까? 접기','디핵,파테코(PATEKO)-OHAYOMYNIGHT.mp3',239,0,2,0),(111,'블루(BLOO)-DowntownBaby.jpg','Downtown Baby','블루(BLOO)','블루(BLOO)','DowntownBaby',NULL,'2017-12-06','너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\n628 너 집 번호\n네 집 앞이니까 나와 Let\'s Roll\n시간 아까우니 잡아 나의 두 손\nI don\'t wanna let go\n핑크머리색에 피어싱은 세 개\n너는 좋아했지 나의 팔베개\n우린 서로 아파하는 짓도 나빠\n하나밖에 없는 Downtown Baby\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\n영화 보고\nLet\'s drink all night long\n담배 한 대 피며\nTalk all night long\n힘든 일이 있을 땐 내게 와 일로\n너의 얇은 팔로 감싸 나를 사이로\n지금 아프더라도 It\'s alright\n시간은 다 지나가 It\'s alright\n항상 그랬지 넌 손발이 차가워\n그래서 내게 말했지 빨리 안아줘\nI\'ll make you Rich 조금만\n기다려 네가 없는 날에는 Raining\nI\'ll do anything 조금만\n기다려 맑았던 하늘도\n다시 보니 Gray\n술도 한잔 못 했던 네가 날 만나\n와인을 사와\n술도 한잔 못 했던 네가 날 만나\n마음이 아파\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\nIt\'s okay baby\n항상 같은 자리에서 있을게\nIt\'s okay baby\n널 위해 내 핸드폰을 켜 놓을게\nIt\'s okay baby\n항상 같은 자리에서 있을게\nIt\'s okay baby\n널 위해 내 핸드폰을 켜 놓을게\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore\n너는 나의 다운타운 베이비야\n너의 눈은 밤하늘에 별이야\n매일마다 꾸고 싶은 꿈이야\nBaby without you\nI can\'t do this anymore','블루(BLOO)-DowntownBaby.mp3',233,0,2,0),(112,'비오(BEO)-문득.jpg','문득','비오(BEO)','비오(BEO)','문득',NULL,'2021-05-02','배가 고파서\n밥을 차렸는데\n문득 네가 앉아서\n내 앞에서 웃어서\n멍을 때리다가\n정신 차렸는데\n문득 바보 같아서\n식은 밥이 남아서\n배고파\n나의 밤이 바뀐 건\n살이 많이 빠진 건\n네가 문득 와서잖아\n(I want you to stop coming)\n욕도 했지 나쁜X\n근데 네가 다칠까\n다시 문득 멈추잖아\n밖에 나가서\n주문을 했는데\n문득 네가 앉아서\n네 음식을 골라서\n멍을 때리다가\n전부 시켰는데\n문득 바보 같아서\n너무 많이 남아서\n배고파\n나의 밤이 바뀐 건\n살이 많이 빠진 건\n네가 문득 와서잖아\n(I want you to stop coming)\n욕도 했지 나쁜X\n근데 네가 다칠까\n다시 문득 멈추잖아\n문득\n문득\n문득\n문득\n네가 생각나\n네가 떠올라\n문득\n문득\n문득\n문득\n네가 생각나\n네가 떠올라\nBad girl\n지금 쓰는 어린 이 곡이\n최선이란 말로는 변명이 안 되니까\n취해서라고 믿고 다음 곡 넘겨줄래\n대뜸 매번 나타나지 마\n어쨌든\n나는 진심이긴 했나 봐\n곡은 잘 나왔는데 너 생각나니까\n짜증 나게 기분이 또 오르내리락\n네 향기들 좀 데려가\n1년째 계속 나니까\n네가 고파서\n너를 찾았는데\n문득 네가 없어서\n모든 게 다 무서워서\n방 안에 숨었다가\n잊었나 했는데\n문득 많이 맡아 본\n네 향기가 또 나서\n잊고파\n나의 밤이 바뀐 건\n살이 많이 빠진 건\n네가 문득 와서잖아\n(I want you to stop coming)\n욕도 했지 나쁜X\n근데 네가 다칠까\n다시 문득 멈추잖아','비오(BEO)-문득.mp3',157,0,2,0),(113,'오반-어떻게지내.jpg','어떻게 지내','오반','오반','어떻게지내',NULL,'2020-03-05','어떻게 지내 식상한 말이\n내 가사가 될 줄 몰랐어\n얼마 안됐네 지나온 날이\n다 알아도 그립더라고\ni still need you\ni need you\n시간이 필요했어 우린 정말 사랑했지만\n가살 쓰는 법도 잊어버리게 됐지 난\n넌 헤어지면 우리 노랠 제발 내지 말아\n달라 했지만 못 들어줘 미안\n나는 하루 종일 누워 있었어\n불면이 심해져서 안 피곤한 날이 없어\n가끔은 문 밖에서 누가 문을 두드려\n그건 환상인데도 나는 두려워\n다시 눈 뜨면 니가 있을까\n그럼 무서운 표정을 지을까\n아니면 어떤 대화를 나누고 싶어질 수도\n있어 그때처럼\n대체 왜 보고싶지 남겨진 상처 대신\n남은 건 혼자 돼버린 역시 너와 나겠지\n난 아직 낯설기만 해 넌 어때\n더 지독해 지기 전에 잊어볼게\n어떻게 지내 식상한 말이\n내 가사가 될 줄 몰랐어\n얼마 안됐네 지나온 날이\n다 알아도 그립더라고\ni still need you\ni need you\n월요일에 병원을 예약했어\n너 없이 사는게 힘들었나봐\n하루도 빼지 않고 사람을 만나\n너도 알겠지만 오봉이도 데려 왔어\n너무 그리워하지 않더라 예범이는\n난 약을 먹었지만 아닐거야 별일은\n자전거를 타고 어디론가 가려하면\n다 너와 간 곳 뿐인게 좀 그럴 뿐야\n여기저기에 핑계를 대 불면증 습관이 돼\n너가 아닌 사람에게 널 원하고\n흉터가 된 상처는 더 이상 아프지가 않잖아\n그래서 널 그리나봐 이젠 눈물이 나와\n널 다치게 하지 않을 순 없었을까\n만약 나 때문이었다면 다 나 때문이면\n널 이렇게 망가지게 한 게\n나인 건 아닐까\n내가 이렇게 망가지다니\n대체 왜 병원에 다닐까','오반-어떻게지내.mp3',266,0,2,0),(114,'우원재-시차Feat로꼬,GRAY.jpg','시차 (Feat 로꼬,GRAY)','우원재','우원재','시차(Feat로꼬,GRAY)',NULL,'2017-09-04','밤새 모니터에 튀긴 침이\n마르기도 전에 강의실로\n아 참, 교수님이 문신 땜에 긴 팔 입고 오래\n난 시작도 전에 눈을 감았지\n날 한심하게 볼 게 뻔하니 이게 더 편해\n내 새벽은 원래 일몰이 지나고\n하늘이 까매진 후에야 해가 뜨네\n내가 처량하다고 다 그래\n\"야 야, 난 쟤들이 돈 주고 가는\n파리의 시간을 사는 중\"이라 전해\n난 이게 궁금해\n시계는 둥근데 날카로운 초침이\n내 시간들을 아프게\n모두가 바쁘게\n뭐를 하든 경쟁하라 배웠으니\n우린 우리의 시차로 도망칠 수밖에\n이미 저 문밖에는 모두 그래\n‘야, 일찍 일어나야 성공해, 안 그래?’\n맞는 말이지 다\n근데 니들이 꿈을 꾸던 그 시간에\n나도 꿈을 꿨지\n두 눈 똑바로 뜬 채로\n\n\nWe\'re livin\' in a different time zone\n바뀌어버린 낮과 밤이야 (yeah)\nHave a good night 먼저 자\n아직 난 일하는 중이야\nWe are who we are\nWe a-a-are who we a-a-are ohahh\nDon\'t you know who we are?\n\n4호선 문이 열릴 때,\n취해 있는 사람들과 날 똑같이 보지마\n그들이 휘청거릴 때마다\n풍기는 술 냄새마저 부러웠지만\n난 적응해야 했거든 이 시차,\n꿈을 꾸게 해 준 침댄 이 기차\n먼지 쌓일 틈이 없던 키보드 위,\n그리고 2009년부터 지금까지 계속\n\"GRAY on the beat ya\"\n아침은 까맣고, 우리의 밤은 하얘\n난 계속 칠하고 있고 똑같은 기차를 타네\n걱정한 적 없어 막차 시간은 한 번도\n얇았던 커튼이 햇빛을 완벽히 못 가려도\n난 지금 눈을 감아야 해\n내일의 나는 달라져야 해\n우린 아무것도 없이 여길 올라왔고\n넌 이 밤을 꼭 기억해야 돼\n\nWe\'re livin\' in a different time zone\n바뀌어버린 낮과 밤이야 (yeah)\nHave a good night 먼저 자\n아직 난 일하는 중이야\nWe are who we are\nWe a-a-are who we a-a-are ohahh\nDon\'t you know who we are?\n\n밤새 모니터에 튀긴 침이\n마르기도 전에 대기실로\n아 참, 문신 땜에 긴 팔 입고 오래\n녹화 전에 눈을 감고 생각하지\n똑같은 행동, 다른 느낌\n시차 부적응에 해당돼\n지금 내 옆엔 \'Loco\' 그리고 \'GRAY\'\n모두 비웃었던 동방의 소음이 어느새\n전국을 울려대\n\"야, 이게 우리 시차의 결과고,\n우린 아직 여기 산다 전해\"\n\nWe\'re livin\' in a different time zone\n바뀌어버린 낮과 밤이야 (yeah)\nHave a good night 먼저 자\n아직 난 일하는 중이야\nWe are who we are\nWe a-a-are who we a-a-are ohahh\nDon\'t you know who we are?\n\n모두 위험하다는 시간이 우린 되려 편해\n(Don\'t you know who we are?)\n밝아진 창문 밖을 봐야지 비로소 맘이 편해\n(Don\'t you know who we are?)\n모두가 다 피하는 반지하가 우린 편해\n(Don\'t you know who we are?)\nWe are, We are, We are...\nDon\'t you know who we are?','우원재-시차Feat로꼬,GRAY.mp3',196,0,2,0),(115,'조광일-곡예사.jpg','곡예사','조광일','조광일','곡예사',NULL,'2020-04-01','시기 다른 랩퍼들의 반대편을 바라보던\n랩퍼들의 배포 그건 백프로\n개뻥 뭐든 개빨어 마치 텐프로\n됐어 보인 각본 짜인 대본\n텐션을 up을 해 해야지 제대로\n난 이 게임에서 acrobat\n내 랩들은 전부 다 감으로 해\n돈 벌어먹지 못해 나를 바라보는\n랩퍼들은 말하더군 진짜 개 좆돼\n돈 되는 Song 그 밖에 내가 추는 트위스트\nDeep 해진 기운 탓에 쟤네는 챙겨야 돼 품위를\n여긴 힙합 사는 곳이 아냐 거기 발라드 랩퍼\n난 여기에 진짜를 뱉을테니 넌 발라드를 해줘\n쟤네는 얼굴이 먹혔고 돈 벌어 좆된건 나였지\n다시금 처음으로 돌아가 내 음악 취향을 바꾸면\n그게 더 멋있어 보일까?\n야 그냥 かんぱい yo spit it spit it spit it\n하던 대로 Fuck 좆까 저기 빙신 븅신 병신\n제대로 된 것들에만 투자\n날 깎으려 하는 애들에게 난\n장애아 선생의 마음으로 봐\n멋있는 조각가의 꿈을 심어 줬다\n난 했던 대로 외줄 타서 리듬 타지 Fuck up\n그때 BB 바른 한 랩퍼가 내게 말을 건다\n요즘 사회는 큰돈 벌어야 해 야 이 새끼야\n화장하는 남자 쪽팔리면 왜 랩퍼했냐\nTV 나가려면 파우더 찍어 발라야지\n좀이라도 이쁘장하게 찍어 담아야지\n요즘 사횐 큰돈 벌어야 해 야 이 새끼야\n화장하는 남자 쪽팔리면 왜 랩퍼했냐\nTV 나가려면 파우더 찍어 발라야지\n걍 다 좆 까고 난 니네 찍어 담아야지\n오르내려 내일의 너 그리고 오늘의 나\n이젠 대체 왜 내가 널 부러워해?\n더러운 돈벌이 어떻게 더 벌릴 생각이\n주가 돼 랩들이 부업이네\n내 올해는 멋지게 만들어\n멋지게 팔아 삐끗은 퍽이나\n내 곡예는 정신이상자라 처음부터\n이 게임은 너에겐 부전패\n어리바리 깔 시간이 없다 이제\n어디까지 갈지 내 역량인 game\n이제 내 앞에 상승곡선은\n네 엄마 등골 보다 휘어서 폭등이 돼\n내 혓바닥 현란한 춤사위는\n네 멘탈을 가져와 돌려서 저글링 해\n네 형제들 전부 다 데리고 와\n시위를 해봐도 폭포 앞 촛불이네\nI don\'t need a doctor\n감성 같은 거 안 팔어 난 원해 파멸\n날 바보로 봤던 애들아 제발\n뱁새 눈 크게 떠 봐줘\n내 밥벌이는 창피할 것들이 없게\n번다고 지켜내 이 발언\n난 내가 탄 밧줄을 절대로\n내려올 일들이 없지 뭘 알어?\n내 피땀으로 얻은 자리 너네들이 무슨 말을 해도\n내가 더러워질 기미 따윈 없지 돈을 바라보는\n랩퍼들은 버릇처럼 얼굴들을 팔아먹어\n불만들을 가진 내가 문제아라 치부하는\n무리들에 내가 뭐를 하면 될까\n그냥 받아버리는 게 편한 너네 평가\n그때 BB 바른 한 랩퍼가 내게 말을 건다\n요즘 사회는 큰돈 벌어야 해 야 이 새끼야\n화장하는 남자 쪽팔리면 왜 랩퍼했냐\nTV 나갈려면 파우더 찍어 발라야지\n좀이라도 이쁘장하게 찍어 담아야지\n요즘 사횐 큰돈 벌어야 해 야 이 새끼야\n화장하는 남자 쪽팔리면 왜 랩퍼했냐\nTV 나갈려면 파우더 찍어 발라야지\n걍 다 좆 까고 난 니네 찍어 담아야지\n외설? 예술? 난 몰라 이 세계에서\n만약 사과나무 씨를 준다면 난 됐어\n니가 말한 ocean은 최고 아닌 최선\n박을 맛 좀 나게 열어 귓구멍을 알겠어?\n외설? 예술? 난 몰라 이 세계에서\n만약 사과나무 씨를 준다면 난 됐어\nRapper? DJ? dancer? 뭐 talent?\n투명해졌다고 말하는 너에게 말해줄게\n야 요즘 사회는 큰돈 벌어야만 해 근데 새끼야\n난 화장하는 네가 쪽팔려서 랩퍼했다\n그래 TV 나갈려면 파우더 찍어 발라야지\n여자같이 이쁘장하게 찍어 담아야지\n요즘 사회는 큰돈 벌어야만 해 근데 새끼야\n난 화장하는 네가 쪽팔려서 랩퍼했다\n그래 TV 나갈려면 파우더 찍어 발라야지\n걍 다 좆 까고 난 니네 찍어 발라야지','조광일-곡예사.mp3',187,0,2,0),(116,'창모-METEOR.jpg','METEOR','창모','창모','METEOR',NULL,'2019-11-29','Yeah, ha\nYeah, ha\nYeah, ha\nYeah, ha\nYeah, ha\nYeah, ha\n모두 그에게 말해 또 왔네 (새꺄 whut?)\n죽지 않고 왔다 이렇게 (새꺄 뭐?)\nSnacky chan의 라인을 빌릴래\n했어 예수처럼 이렇게 부활을\n031 팔 안쪽의 tatt freaky woah\n어젠 시장님이 만나쟤 motown\n어수룩해 엄마 속에 걱정\n한 톤만큼 쌓고 스물한살에 독립했던 얘는\n여섯이 되었고\n발견했지 우연히 5년 전의 노트\n“정말 스타 되고 싶어\n그럴려면 가서 만나면 돼 악마?”\n노트를 덮고\n거울에 비춰진 남자를 보니 와\n저 손목이 너무 부러워\n저 금 daydate rollie 넘을걸 천백은 더\n전국\n사람들이 외치네\n저 괴물체는 뭘까?\nMeteor\n거대 Meteor\n난 네게 처박힐 Meteor야\n별빛이 내려오지 마구\n내려오지\n경고\n경고\n그래도 처박힐 Meteor야\nmotown의 1번 노랠 기억해 니들?\n뭐였지? 뭐였나? 음 음?\ni\'m the man in the mirror 그러니 light me up\n1절의 그 별이 2절의 그 별이\n그래 모두 나였지 실화가 된 동화이지\n힘들 때면 홀로 쓴 노래를 불러\n환상들을 보던 성냥팔이 소년이였던 나날들이\n365, 24, 730, 24에 7\n1095 아 그만 세자 1400이 되니 oh\n그 애랑도 하고 돔페리뇽이 만든\n숙취 땜에 넋을 놓은 나를 향해\n몇천 명이 \'와\' 해\n본 적은 없지만 때론\n어떤 존재가 내 인생을 왔다 간 듯해\n그냥 그런 느낌이 들지\n상관없어 환상이던 현실이던지 hands up high\n전국\n사람들이 외치네\n저 괴물체는 뭘까?\nMeteor\n거대 Meteor\n난 네게 처박힐 Meteor야\n별빛이 내려오지 마구\n내려오지\n경고\n경고\n그래도 처박힐 Meteor야\n영 영 영원히\n약속해 영원하기로\n어둠 가득한 저 뒤로\n돌려보내지 말아요 제발 제발\n영 영 영원히\n난 영원할 거라 믿어\n흥분으로 가득차\n이 도시에 나 외칠 꺼야\n“드디어 내가 여 왔다”','창모-METEOR.mp3',198,0,2,0),(117,'파테코(PATEKO)-RainydayFeatASHISLAND.jpg','Rainy day (Feat ASH ISLAND)','파테코(PATEKO)','파테코(PATEKO)','Rainyday(FeatASHISLAND)',NULL,'2020-07-19','비가 와 오랜만에\n비가 오지 말라 했어\n근데 한 달간에\n나도 몰래 기다렸나 봐\nRainy day Rainy day aye yeah\nRainy day yeah\nRainy day\n오늘을 기다렸나 봐 난 Rainy day\n원래는 기다리지도 않았던 Rainy day\n이제는 비가 조금 내리는 건 맞곤 해 이젠\n어쩌면 조금 더 가서 난 기다려서 내일엔?\n비가 와라며 재촉해 너를 볼 핑곌 대기 때문에\nWhat\'s goin on girl 무슨 일은 없어\n밥은 먹었나 태어나서 첨 하는 걱정\n알려줘 나는 너를 더 알고 싶기보단\n그저 어디서 무엇을 하는지 보고해줘\n집착은 아냐 lady 그런 놈은 안될 게\n이런 얘기 원래 안 하는 거 알잖아. 왜 이래\n그냥 이 곡이 되게 유치해 보여서 제길\n비가 오면 같이 우울해지던 그런 내게\n빗물같이 떨어져서 너란 사람이\n물어서 나는 너에게 어떤 사람 같았니\n비가 올 때 우산 사줄 바엔 차라리\n나는 같이 맞는 게 좋으니까 걷자 같이\n비가 와 오랜만에\n비가 오지 말라 했어\n근데 한 달간에\n나도 몰래 기다렸나 봐\nRainy day Rainy day aye yeah\nRainy day yeah\nRainy day\n오늘을 기다렸나 봐 난 Rainy day\n준비되어 있지 않아서 나 혼자 (uh)\n울곤 해서 빗소리에 맞춰 혼자 (uh)\n참 좁았었지 몇 평 남짓한 공간엔\n오랜 적막과 어둠만이, 네가 내게 오기 전까지\n난 창 열고 확인해 weather\n손 뻗어 is u there?\n하늘이 어두워지면 거린 환하게 빛내어\n넌 보여주려 했나 봐 거리에 형형 색 umbrellas\n너와 발맞춰 걸어 불빛 위에 like a shadow\n계속 이렇게 있어 줘, Imma treat u better, better and\n너는 되고 내 인생에 new chapter\n비가 오는 것도 좋지만 말했잖아 뒤 rainbow\n까지 너와 보고 싶어 till the sunrise and sunset off\n비가 오길 기다려 본 적은 처음이야\n떨어지는 소린 노크 같아 처음이야\n네가 내 하루에 들어와서 다행이야\nuh, u are the reason why I\'m waitin on that rainy time\n비가 와 오랜만에\n비가 오지 말라 했어\n근데 한 달간에\n나도 몰래 기다렸나 봐\nRainy day Rainy day aye yeah\nRainy day yeah\nRainy day\n오늘을 기다렸나 봐 난 Rainy day ','파테코(PATEKO)-RainydayFeatASHISLAND.mp3',218,0,2,0),(118,'브레이브걸스-운전만해.jpg','운전만해','브레이브걸스','브레이브걸스','운전만해',NULL,'2020-08-14','넌 운전만 해 계속 운전만 해 왜 이리 된 걸까 우리 사이가 갑자기 어색해졌단 걸 왜 달라졌을까 웃음이 말라서 함께 있는 게 불편해졌어 말없이 그냥 걷기만 해요 We just walking down the street 아무런 말도 없이 처음과는 너무 다른 사이 말없이 그냥 먹기만 해요 부쩍 줄어든 대화 속에 What happened to us 침묵이 내려 지금 달리는 차 안에 우린 아무 말 없네 너는 그렇게 운전만 해 난 핸드폰 보네 넌 창밖을 보네 난 너무 답답해 우리 사이는 막막해 Babe . We\'re still in your car (In your car) 계속해서 침묵만 (So quiet) Can you break the silence cause I don\'t want it Radio 소리만 이곳에 (이곳에) That\'s so sad 무슨 말 좀 해봐 말없이 그냥 걷기만 해요 We just walking down the street 아무런 말도 없이 처음과는 너무 다른 사이 말없이 그냥 먹기만 해요 부쩍 줄어든 대화 속에 What happened to us 침묵이 내려 지금 달리는 차 안에 우린 아무 말 없네 너는 그렇게 운전만 해 난 핸드폰 보네 넌 창밖을 보네 난 너무 답답해 우리 사이는 막막해 Babe You know I know We both know 이 침묵은 깨져야만 해 너도 나도 다 알면서도 쉽게 뗄 수 없는 입 달리는 차 안에 우린 아무 말 없네 너는 그렇게 운전만 해 난 핸드폰 보네 넌 창밖을 보네 난 너무 답답해 우리 사이는 막막해 Babe 넌 운전만 해 계속 운전만 해','브레이브걸스-운전만해.mp3',188,0,4,0),(119,'bts-dynamite.jpg','Dynamite','방탄소년단(BTS)','방탄소년단(BTS)','Dynamite',NULL,'2020-08-21','Cos ah ah\nI’m in the stars tonight\nSo watch me bring the fire\nand set the night alight\nShoes on get up in the morn\nCup of milk let’s rock and roll\nKing Kong kick the drum\nrolling on like a rolling stone\nSing song when I’m walking home\nJump up to the top LeBron\nDing dong call me on my phone\nIce tea and a game of ping pong\nThis is getting heavy\nCan you hear the bass boom\nI’m ready\nLife is sweet as honey\nYeah this beat cha ching\nlike money\nDisco overload I’m into\nthat I’m good to go\nI\'m diamond you know I glow up\nHey so let’s go\nCos ah ah\nI’m in the stars tonight\nSo watch me bring the fire\nand set the night alight\nShining through the city\nwith a little funk and soul\nSo I’mma light it up\nlike dynamite woah\nBring a friend join the crowd\nWhoever wanna come along\nWord up talk the talk\njust move like we off the wall\nDay or night the sky’s alight\nSo we dance to the break of dawn\nLadies and gentlemen\nI got the medicine\nso you should keep ya\neyes on the ball huh\nThis is getting heavy\nCan you hear the bass boom\nI’m ready\nLife is sweet as honey\nYeah this beat cha ching\nlike money\nDisco overload\nI’m into that I’m good to go\nI\'m diamond you know I glow up\nLet’s go\nCos ah ah\nI’m in the stars tonight\nSo watch me bring the fire\nand set the night alight\nShining through the city\nwith a little funk and soul\nSo I’mma light it up\nlike dynamite woah\nDynnnnnanana life is dynamite\nDynnnnnanana life is dynamite\nShining through the city\nwith a little funk and soul\nSo I’mma light it up\nlike dynamite woah\nDynnnnnanana eh\nDynnnnnanana eh\nDynnnnnanana eh\nLight it up like dynamite\nDynnnnnanana eh\nDynnnnnanana eh\nDynnnnnanana eh\nLight it up like dynamite\nCos ah ah\nI’m in the stars tonight\nSo watch me bring the fire\nand set the night alight\nShining through the city\nwith a little funk and soul\nSo I’mma light it up\nlike dynamite\nCos ah ah\nI’m in the stars tonight\nSo watch me bring the fire\nand set the night alight\nShining through the city\nwith a little funk and soul\nSo I’mma light it up\nlike dynamite woah\nDynnnnnanana life is dynamite\nDynnnnnanana life is dynamite\nShining through the city\nwith a little funk and soul\nSo I’mma light it up\nlike dynamite woah','방탄소년단-Dynamite.mp3',198,0,4,0);
/*!40000 ALTER TABLE `music` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musiccomment`
--

DROP TABLE IF EXISTS `musiccomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musiccomment` (
  `MusicCommentNum` int NOT NULL AUTO_INCREMENT,
  `musicNum` int NOT NULL,
  `usernum` int NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`MusicCommentNum`),
  KEY `FK_Music_TO_MusicComment_1` (`musicNum`),
  KEY `FK_User_TO_MusicComment_1` (`usernum`),
  KEY `FK_VisibleState_TO_MusicComment_1` (`state`),
  CONSTRAINT `FK_Music_TO_MusicComment_1` FOREIGN KEY (`musicNum`) REFERENCES `music` (`musicnum`),
  CONSTRAINT `FK_User_TO_MusicComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_MusicComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musiccomment`
--

LOCK TABLES `musiccomment` WRITE;
/*!40000 ALTER TABLE `musiccomment` DISABLE KEYS */;
INSERT INTO `musiccomment` VALUES (1,51,2,'가사 슬프네','2022-10-24 16:10:58',0),(2,105,2,'짱 좋네','2022-10-24 16:11:22',0),(3,51,4,'절절하네','2022-10-24 16:11:40',0),(4,10,4,'소녀시대 짱','2022-10-24 16:11:52',1),(5,10,4,'소녀시대 짱','2022-10-24 16:59:42',0);
/*!40000 ALTER TABLE `musiccomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musicvote`
--

DROP TABLE IF EXISTS `musicvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musicvote` (
  `MusicVoteNum` int NOT NULL AUTO_INCREMENT,
  `MusicNum` int NOT NULL,
  `usernum` int NOT NULL,
  PRIMARY KEY (`MusicVoteNum`),
  KEY `FK_Music_TO_MusicVote_1` (`MusicNum`),
  KEY `FK_User_TO_MusicVote_1` (`usernum`),
  CONSTRAINT `FK_Music_TO_MusicVote_1` FOREIGN KEY (`MusicNum`) REFERENCES `music` (`musicnum`),
  CONSTRAINT `FK_User_TO_MusicVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musicvote`
--

LOCK TABLES `musicvote` WRITE;
/*!40000 ALTER TABLE `musicvote` DISABLE KEYS */;
INSERT INTO `musicvote` VALUES (1,51,2),(2,105,2),(3,51,4),(5,52,2),(7,10,4);
/*!40000 ALTER TABLE `musicvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ostboard`
--

DROP TABLE IF EXISTS `ostboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ostboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_ostBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_ostBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_ostBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_ostBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ostboard`
--

LOCK TABLES `ostboard` WRITE;
/*!40000 ALTER TABLE `ostboard` DISABLE KEYS */;
INSERT INTO `ostboard` VALUES (1,'사랑인가 봐',4,'멜로망스 믿고 듣네',0,0,0,'2022-10-24 15:58:38',0);
/*!40000 ALTER TABLE `ostboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ostboardcommentvote`
--

DROP TABLE IF EXISTS `ostboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ostboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_ostBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_ostBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_ostBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `ostcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_ostBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ostboardcommentvote`
--

LOCK TABLES `ostboardcommentvote` WRITE;
/*!40000 ALTER TABLE `ostboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `ostboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ostboardvote`
--

DROP TABLE IF EXISTS `ostboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ostboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_ostBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_ostBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_ostBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `ostboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_ostBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ostboardvote`
--

LOCK TABLES `ostboardvote` WRITE;
/*!40000 ALTER TABLE `ostboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `ostboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ostcomment`
--

DROP TABLE IF EXISTS `ostcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ostcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_ostComment_1` (`usernum`),
  KEY `FK_ostBoard_TO_ostComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_ostComment_1` (`state`),
  CONSTRAINT `FK_ostBoard_TO_ostComment_1` FOREIGN KEY (`boardnum`) REFERENCES `ostboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_ostComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_ostComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ostcomment`
--

LOCK TABLES `ostcomment` WRITE;
/*!40000 ALTER TABLE `ostcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `ostcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popboard`
--

DROP TABLE IF EXISTS `popboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_popBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_popBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_popBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_popBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popboard`
--

LOCK TABLES `popboard` WRITE;
/*!40000 ALTER TABLE `popboard` DISABLE KEYS */;
INSERT INTO `popboard` VALUES (1,'2002',4,'내 인생곡',1,0,0,'2022-10-24 15:45:33',0),(2,'저스틴비버',2,'stay 강추',1,0,0,'2022-10-24 15:46:18',0),(3,'off my face',2,'이 노래도 좋던데',1,0,0,'2022-10-24 15:50:58',0),(4,'마룬파이브',2,'특유의 감성이 좋음',0,0,0,'2022-10-24 15:51:15',0),(5,'팝송 부를때',2,'발음이 너무 어려워요',0,0,0,'2022-10-24 15:51:42',0),(6,'Lauv',4,'음색 짱![image.png](http://localhost:8080/board/image/1666594385805_image.png)',11,0,0,'2022-10-24 15:53:11',0),(7,'앤마리',4,'팬서비스 짱이다',13,0,0,'2022-10-24 15:53:56',0),(8,'ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ ㅋ',4,'들어도 들어도 질리지가 않네',6,1,0,'2022-10-24 15:54:40',0),(9,'abcdefu',2,'노래도 좋고 가사도 시원하고',1,0,0,'2022-10-24 15:55:38',0),(10,'memories',2,'마룬파이브 노래중에 제일 좋지 않나요',2,0,0,'2022-10-24 15:56:21',0),(11,'ed sheeran',2,'신곡 엄청 좋다',2,1,0,'2022-10-24 15:57:13',0);
/*!40000 ALTER TABLE `popboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popboardcommentvote`
--

DROP TABLE IF EXISTS `popboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_popBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_popBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_popBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `popcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_popBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popboardcommentvote`
--

LOCK TABLES `popboardcommentvote` WRITE;
/*!40000 ALTER TABLE `popboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `popboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popboardvote`
--

DROP TABLE IF EXISTS `popboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_popBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_popBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_popBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `popboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_popBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popboardvote`
--

LOCK TABLES `popboardvote` WRITE;
/*!40000 ALTER TABLE `popboardvote` DISABLE KEYS */;
INSERT INTO `popboardvote` VALUES (1,4,11,0),(2,4,8,0);
/*!40000 ALTER TABLE `popboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popcomment`
--

DROP TABLE IF EXISTS `popcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_popComment_1` (`usernum`),
  KEY `FK_popBoard_TO_popComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_popComment_1` (`state`),
  CONSTRAINT `FK_popBoard_TO_popComment_1` FOREIGN KEY (`boardnum`) REFERENCES `popboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_popComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_popComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popcomment`
--

LOCK TABLES `popcomment` WRITE;
/*!40000 ALTER TABLE `popcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `popcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pwauth`
--

DROP TABLE IF EXISTS `pwauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pwauth` (
  `num` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `encoding_value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`num`),
  KEY `FK_User_TO_PwAuth_1` (`usernum`),
  CONSTRAINT `FK_User_TO_PwAuth_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pwauth`
--

LOCK TABLES `pwauth` WRITE;
/*!40000 ALTER TABLE `pwauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `pwauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rnbboard`
--

DROP TABLE IF EXISTS `rnbboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rnbboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_rnbBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_rnbBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_rnbBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_rnbBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rnbboard`
--

LOCK TABLES `rnbboard` WRITE;
/*!40000 ALTER TABLE `rnbboard` DISABLE KEYS */;
INSERT INTO `rnbboard` VALUES (1,'Braindead',4,'좋지 않나요?',0,0,0,'2022-10-24 15:39:45',0);
/*!40000 ALTER TABLE `rnbboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rnbboardcommentvote`
--

DROP TABLE IF EXISTS `rnbboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rnbboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_rnbBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_rnbBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_rnbBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `rnbcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_rnbBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rnbboardcommentvote`
--

LOCK TABLES `rnbboardcommentvote` WRITE;
/*!40000 ALTER TABLE `rnbboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `rnbboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rnbboardvote`
--

DROP TABLE IF EXISTS `rnbboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rnbboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_rnbBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_rnbBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_rnbBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `rnbboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_rnbBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rnbboardvote`
--

LOCK TABLES `rnbboardvote` WRITE;
/*!40000 ALTER TABLE `rnbboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `rnbboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rnbcomment`
--

DROP TABLE IF EXISTS `rnbcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rnbcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_rnbComment_1` (`usernum`),
  KEY `FK_rnbBoard_TO_rnbComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_rnbComment_1` (`state`),
  CONSTRAINT `FK_rnbBoard_TO_rnbComment_1` FOREIGN KEY (`boardnum`) REFERENCES `rnbboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_rnbComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_rnbComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rnbcomment`
--

LOCK TABLES `rnbcomment` WRITE;
/*!40000 ALTER TABLE `rnbcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `rnbcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trortboard`
--

DROP TABLE IF EXISTS `trortboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trortboard` (
  `boardnum` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `usernum` int NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `view` int DEFAULT '0',
  `upvote` int NOT NULL DEFAULT '0',
  `downvote` int NOT NULL DEFAULT '0',
  `createdat` datetime DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`boardnum`),
  KEY `FK_User_TO_trortBoard_1` (`usernum`),
  KEY `FK_VisibleState_TO_trortBoard_1` (`state`),
  CONSTRAINT `FK_User_TO_trortBoard_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_trortBoard_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trortboard`
--

LOCK TABLES `trortboard` WRITE;
/*!40000 ALTER TABLE `trortboard` DISABLE KEYS */;
INSERT INTO `trortboard` VALUES (1,'임영웅~',4,'임영웅 목소리 너무 좋아요\\~\\~',2,0,0,'2022-10-24 15:40:29',0);
/*!40000 ALTER TABLE `trortboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trortboardcommentvote`
--

DROP TABLE IF EXISTS `trortboardcommentvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trortboardcommentvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `commentnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_trortBoardCommentVote_1` (`usernum`),
  KEY `FK_Comment_TO_trortBoardCommentVote_1` (`commentnum`),
  CONSTRAINT `FK_Comment_TO_trortBoardCommentVote_1` FOREIGN KEY (`commentnum`) REFERENCES `trortcomment` (`commentnum`),
  CONSTRAINT `FK_User_TO_trortBoardCommentVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trortboardcommentvote`
--

LOCK TABLES `trortboardcommentvote` WRITE;
/*!40000 ALTER TABLE `trortboardcommentvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `trortboardcommentvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trortboardvote`
--

DROP TABLE IF EXISTS `trortboardvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trortboardvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `vote` int DEFAULT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_trortBoardVote_1` (`usernum`),
  KEY `FK_Board_TO_trortBoardVote_1` (`boardnum`),
  CONSTRAINT `FK_Board_TO_trortBoardVote_1` FOREIGN KEY (`boardnum`) REFERENCES `trortboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_trortBoardVote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trortboardvote`
--

LOCK TABLES `trortboardvote` WRITE;
/*!40000 ALTER TABLE `trortboardvote` DISABLE KEYS */;
/*!40000 ALTER TABLE `trortboardvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trortcomment`
--

DROP TABLE IF EXISTS `trortcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trortcomment` (
  `commentnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `boardnum` int NOT NULL,
  `content` varchar(100) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `upvote` int DEFAULT '0',
  `downvote` int DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentnum`),
  KEY `FK_User_TO_trortComment_1` (`usernum`),
  KEY `FK_trortBoard_TO_trortComment_1` (`boardnum`),
  KEY `FK_VisibleState_TO_trortComment_1` (`state`),
  CONSTRAINT `FK_trortBoard_TO_trortComment_1` FOREIGN KEY (`boardnum`) REFERENCES `trortboard` (`boardnum`),
  CONSTRAINT `FK_User_TO_trortComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_trortComment_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trortcomment`
--

LOCK TABLES `trortcomment` WRITE;
/*!40000 ALTER TABLE `trortcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `trortcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upload`
--

DROP TABLE IF EXISTS `upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload` (
  `uploadnum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `origin_title` varchar(150) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `file` varchar(200) DEFAULT NULL,
  `origin_file` varchar(200) DEFAULT NULL,
  `vote` int NOT NULL DEFAULT '0',
  `createdat` datetime NOT NULL,
  `view` int NOT NULL DEFAULT '0',
  `state` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`uploadnum`),
  KEY `FK_User_TO_Upload_1` (`usernum`),
  KEY `FK_VisibleState_TO_Upload_1` (`state`),
  CONSTRAINT `FK_User_TO_Upload_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`),
  CONSTRAINT `FK_VisibleState_TO_Upload_1` FOREIGN KEY (`state`) REFERENCES `visiblestate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload`
--

LOCK TABLES `upload` WRITE;
/*!40000 ALTER TABLE `upload` DISABLE KEYS */;
INSERT INTO `upload` VALUES (1,4,'커버해봤습니다','커버해봤습니다','어떤가요?!?!?','1666595289169_안녕너의번호를누르고.mp3','안녕너의번호를누르고.mp3',0,'2022-10-24 16:08:09',0,1),(2,4,'너의번호를누르고커버','너의 번호를 누르고 커버','어떤가요!?!?','1666595367572_안녕너의번호를누르고.mp3','안녕너의번호를누르고.mp3',1,'2022-10-24 16:09:28',0,0),(3,2,'내가아니라도커버해봄','내가 아니라도 커버해봄','평가 시원하게 ㄱㄱ','1666595435330_주호내가아니라도.mp3','주호내가아니라도.mp3',0,'2022-10-24 16:10:35',0,0);
/*!40000 ALTER TABLE `upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploadcomment`
--

DROP TABLE IF EXISTS `uploadcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploadcomment` (
  `uploadcommentnum` int NOT NULL AUTO_INCREMENT,
  `uploadnum` int NOT NULL,
  `usernum` int NOT NULL,
  `comment` varchar(150) NOT NULL,
  `createdat` datetime NOT NULL,
  `state` int DEFAULT '0',
  PRIMARY KEY (`uploadcommentnum`),
  KEY `FK_Upload_TO_UploadComment_1` (`uploadnum`),
  KEY `FK_User_TO_UploadComment_1` (`usernum`),
  CONSTRAINT `FK_Upload_TO_UploadComment_1` FOREIGN KEY (`uploadnum`) REFERENCES `upload` (`uploadnum`),
  CONSTRAINT `FK_User_TO_UploadComment_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploadcomment`
--

LOCK TABLES `uploadcomment` WRITE;
/*!40000 ALTER TABLE `uploadcomment` DISABLE KEYS */;
INSERT INTO `uploadcomment` VALUES (1,2,2,'좋네여','2022-10-24 16:21:43',0);
/*!40000 ALTER TABLE `uploadcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploadvote`
--

DROP TABLE IF EXISTS `uploadvote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploadvote` (
  `votenum` int NOT NULL AUTO_INCREMENT,
  `usernum` int NOT NULL,
  `uploadnum` int NOT NULL,
  PRIMARY KEY (`votenum`),
  KEY `FK_User_TO_uploadvote_1` (`usernum`),
  KEY `FK_Upload_TO_uploadvote_1` (`uploadnum`),
  CONSTRAINT `FK_Upload_TO_uploadvote_1` FOREIGN KEY (`uploadnum`) REFERENCES `upload` (`uploadnum`),
  CONSTRAINT `FK_User_TO_uploadvote_1` FOREIGN KEY (`usernum`) REFERENCES `user` (`usernum`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploadvote`
--

LOCK TABLES `uploadvote` WRITE;
/*!40000 ALTER TABLE `uploadvote` DISABLE KEYS */;
INSERT INTO `uploadvote` VALUES (1,2,2);
/*!40000 ALTER TABLE `uploadvote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `usernum` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `pw` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(48) NOT NULL,
  `createdat` datetime NOT NULL,
  `updatedat` datetime DEFAULT NULL,
  `deletedat` datetime DEFAULT NULL,
  `createdip` varchar(15) DEFAULT NULL,
  `updatedIp` varchar(15) NOT NULL,
  `deletedip` varchar(15) DEFAULT NULL,
  `state` int NOT NULL,
  `userimage` varchar(100) DEFAULT 'default.png',
  PRIMARY KEY (`usernum`),
  KEY `FK_UserState_TO_User_1` (`state`),
  CONSTRAINT `FK_UserState_TO_User_1` FOREIGN KEY (`state`) REFERENCES `userstate` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'idtest','$2a$10$l8dRv3.sUfG3xPm74kk5K.71OYB8JyqzchJVgmDTY3e6Z0WMNBQoa','q+QCoSUsKhuCAD3FmnI9Xw==','abx1234','2022-08-25 22:25:32',NULL,NULL,'0','0',NULL,0,'default.png'),(2,'abc50050','$2a$10$DUD3kWg7unxOldFAmjh8xOIc/tjcLjzqraUAAaOQIfihn5UoUuaoe','WZlmy85L0FAHsD9H74Hgrf8Ul5GsWxvtYTLhJxOghmQ=','전국노예자랑','2022-08-25 21:17:10',NULL,NULL,'0','0',NULL,0,'1666594030915_뀨.gif'),(3,'test0','$2a$10$yWOOUfM./LNZRsVpYg1LROrElep86.WnQmbpNV2vC0XeZtSqbv7gC','VkF5c7wIAtqGm1n+Wno1xTwIGUpyz3+coN+2Z3WkRxo=','nan0805','2022-08-25 22:56:41',NULL,NULL,'0','0',NULL,0,'default.png'),(4,'kjr123','$2a$10$/O3IYxMkpnlKBD2opoxvGeJy5622lmcYkbI926QkII9KooOPb/EbC','KI0d5WicvhulZRlVqInCfq/UQoZ5vgxNe7kSnwWsEOk=','정렬정렬','2022-08-23 19:23:02',NULL,NULL,'0','0',NULL,0,'1666593413637_메인.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userstate`
--

DROP TABLE IF EXISTS `userstate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userstate` (
  `state` int NOT NULL,
  `statename` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userstate`
--

LOCK TABLES `userstate` WRITE;
/*!40000 ALTER TABLE `userstate` DISABLE KEYS */;
INSERT INTO `userstate` VALUES (0,'활동중'),(1,'탈퇴'),(2,'계정정지'),(3,'이메일 인증 안됨');
/*!40000 ALTER TABLE `userstate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visiblestate`
--

DROP TABLE IF EXISTS `visiblestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visiblestate` (
  `state` int NOT NULL,
  `stateName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visiblestate`
--

LOCK TABLES `visiblestate` WRITE;
/*!40000 ALTER TABLE `visiblestate` DISABLE KEYS */;
INSERT INTO `visiblestate` VALUES (0,'activate'),(1,'delete');
/*!40000 ALTER TABLE `visiblestate` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-24 17:05:13
