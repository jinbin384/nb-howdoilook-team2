import prisma from "../../prisma/prisma.js";

//목록조회
export const getStylesList = async ({ skip, limit, orderBy }) => {
  return await prisma.style.findMany({
    skip,
    take: limit,
    orderBy,
  });
};

//검색기능
export const searchStyles = async ({ search, skip, limit, orderBy }) => {
  return await prisma.style.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { nickname: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
        { components: { has: search } },
      ],
    },
    skip,
    take: limit,
    orderBy,
  });
};

// 상세조희
export const getFindStyle = async (styleId) => {
  return await prisma.style.findUnique({
    where: { id: BigInt(styleId) },
  });
};

// view 수 증가
export const increaseViewCount = async (styleId) => {
  return await prisma.style.update({
    where: { id: BigInt(styleId) },
    data: {
      views: { increment: 1 }, //prisma 숫자 증가 연산자
    },
  });
};

// 인기태그 순
export const getPopularTags = async () => {
  const styles = await prisma.style.findMany({
    select: { tags: true },
  });

  const tagCount = {};

  styles.forEach((style) => {
    style.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count); //많이 검색된 태그 확인
};

export const getStylesByTag = async ({ tag, skip, limit, orderBy }) => {
  return await prisma.style.findMany({
    where: { tags: { has: tag } },
    skip,
    take: limit,
    orderBy,
  });
};

// // 스타일 수정
// updateStyle = async (styleId, updateData) => {
//   const updatedStyle = await this.prisma.style.update({
//     where: { id: +styleId },
//     data: updateData,
//   });
//   return updatedStyle;
// };

// // 스타일 삭제
// deleteStyle = async (styleId) => {
//   const deletedStyle = await this.prisma.style.delete({
//     where: { id: +styleId },
//   });
//   return deletedStyle;
// };
