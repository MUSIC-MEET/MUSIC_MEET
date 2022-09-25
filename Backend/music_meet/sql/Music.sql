
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
'좋은날.jpg',
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
'내가아니라도.jpg',
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
0);


INSERT INTO `Music`(`ImgSrc`,`origin_title`,`origin_singer`,`title`, `singer`,`album`,`releaseDate`,`lyrics`,`filename`,`length`,`Genre`) 
VALUES(
'에잇(Prod.&Feat.SUGAofBTS).jpg',
'에잇(Prod.&Feat. SUGA of BTS)',
'아이유(IU)',
'에잇(Prod.&Feat.SUGAofBTS)',
'아이유(IU)',
'에잇',
'2020.05.06',
'So are you happy now
Finally happy now are you

뭐 그대로야 난
다 잃어버린 것 같아

모든 게 맘대로 왔다가 인사도 없이 떠나
이대로는 무엇도 사랑하고 싶지 않아
다 해질 대로 해져버린
기억 속을 여행해

우리는 오렌지 태양 아래
그림자 없이 함께 춤을 춰
정해진 이별 따위는 없어
아름다웠던 그 기억에서 만나
Forever young

우우우 우우우우 우우우 우우우우
Forever we young
우우우 우우우우
이런 악몽이라면 영영 깨지 않을게

섬 그래 여긴 섬 서로가 만든 작은 섬
예 음 forever young 영원이란 말은 모래성

작별은 마치 재난문자 같지
그리움과 같이 맞이하는 아침
서로가 이 영겁을 지나
꼭 이 섬에서 다시 만나

지나듯 날 위로하던 누구의 말대로 고작
한 뼘짜리 추억을 잊는 게 참 쉽지 않아
시간이 지나도 여전히
날 붙드는 그곳에

우리는 오렌지 태양 아래
그림자 없이 함께 춤을 춰
정해진 안녕 따위는 없어
아름다웠던 그 기억에서 만나

우리는 서로를 베고 누워
슬프지 않은 이야기를 나눠
우울한 결말 따위는 없어
난 영원히 널 이 기억에서 만나
Forever young

우우우 우우우우 우우우 우우우우
Forever we young
우우우 우우우우
이런 악몽이라면 영영 깨지 않을게',
'',
248,
4);