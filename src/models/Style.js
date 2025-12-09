//각 스타일의 대표 이미지, 제목, 닉네임, 태그, 스타일 구성, 스타일 설명, 조회수, 큐레이팅 수가 표시됩니다.

export class Style {
  constructor(
    id,
    title,
    nickname,
    thumbnail, //대표 이미지
    tags,
    components, // 스타일 구성
    description,
    views,
    curatedCount
  ) {
    this.id = id;
    this.title = title;
    this.nickname = nickname;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.components = components;
    this.description = description;
    this.views = views;
    this.curatedCount = curatedCount;
  }

  static fromEntity(entity) {
    return new Style(
      entity.id.toString(),
      entity.title,
      entity.nickname,
      entity.thumbnail,
      entity.tags ?? [],
      entity.components ?? [],
      entity.description,
      entity.views,
      entity.curatedCount
    );
  }
}
