
CREATE TABLE `Music` (
	`MusicNum` INT(10) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`ImgSrc`	 VARCHAR(250) NULL,
	`origin_title` VARCHAR(50) NULL,
	`origin_singer` VARCHAR(30) NULL,
	`singer` VARCHAR(30) NULL,
	`title` VARCHAR(50) NULL,
	`Album` VARCHAR(50) NULL,
	`releaseDate` VARCHAR(50) NULL,
	`lyrics` VARCHAR(1500) NULL,
	`FileName` VARCHAR(100) NULL,
	`Length` INT(1) NULL,
	`vote` INT(10) NULL default 0,
	`genre` INT(2) NOT NULL,
	`state` INT(1) NOT NULL default 0
);
ALTER TABLE `Music` ADD CONSTRAINT `FK_GenreState_TO_Music_1` FOREIGN KEY (
	`genre`
)
REFERENCES `GenreState` (
	`genre`
);
ALTER TABLE `Music` ADD CONSTRAINT `FK_VisibleState_TO_Music_1` FOREIGN KEY (
	`state`
)
REFERENCES `VisibleState` (
	`state`
);


INSERT INTO `Music`(`ImgSrc`,`origin_title`,`origin_singer`,`title`, `singer`,`album`,`releaseDate`,`lyrics`,`filename`,`length`,`Genre`) 
VALUES(
'https://cdnimg.melon.co.kr/cm/album/images/010/93/562/1093562_500.jpg/melon/resize/282/quality/80/optimize',
'좋은 날',
'아이유(IU)',
'좋은날',
'아이유(IU)',
'Real',
'2010.12.09',
'어쩜 이렇게 하늘은 더 파란 건지
오늘따라 왜 바람은 또 완벽한지
그냥 모르는 척 하나 못들은 척
지워버린 척 딴 얘길 시작할까
아무 말 못하게 입맞출까
눈물이 차올라서 고갤 들어
흐르지 못하게 또 살짝 웃어
내게 왜 이러는지 무슨 말을 하는지
오늘 했던 모든 말 저 하늘 위로
한번도 못했던 말
울면서 할 줄은 나 몰랐던 말
나는요 오빠가 좋은걸 어떡해',
'',
236,
8
);


INSERT INTO `Music`(`ImgSrc`,`origin_title`,`origin_singer`,`title`, `singer`,`album`,`releaseDate`,`lyrics`,`filename`,`length`,`Genre`) 
VALUES(
'https://cdnimg.melon.co.kr/cm2/album/images/108/97/407/10897407_20220323150744_500.jpg?389545aadd50ead38a260c8438fc5924/melon/resize/282/quality/80/optimize',
'내가 아니라도',
'주호',
'내가아니라도',
'주호',
'내가 아니라도',
'2022-03-25',
'사랑이었다 별거 없던 내 하루에
빛이 돼준 단한 사람
나보다 나를 더 아껴 주던 너를
그땐 왜 몰랐을까
행복이었다 다시는 없을 것 같던
잠시나마 행복했었다
다른 사람 곁에 있는 널
생각해 본 적 없지만
이젠 너를 보내줘야 할 것 같아
내가 아니라도
눈부시게 사랑받았을 너라서
그 소중한 시간을 나와 함께해 줘서
고마웠어
예쁘고 아름다웠던 너의 그날에
함께했던 그 모든 순간이 행복했어
내 전부였다 무엇도 바꿀 수 없던
우리라서 행복했었다
다른 누구라도
나보다 더 좋은 사람 만나서
이젠 나를 잊고 행복하게 살아
내가 아니라도
눈부시게 사랑받았을 너라서
그 소중한 시간을 나와 함께해 줘서
고마웠어
예쁘고 아름다웠던 너의 그날에
함께했던 그 모든 순간이 행복했어
어두웠던 내 하루에
빛이 되어주던 그날들을
어떻게 잊고 살아
과분했던 너라는 사람을 만나
누구보다 사랑했었다
내가 아니었다면
눈부시게 사랑받았을 너란 걸
이 세상에 누구보다 더 잘 알아서
미안했어 너와 함께한 날들이
더 말할 게 있을까
행복한 기억만 가져갈게',
'',
248,
8);