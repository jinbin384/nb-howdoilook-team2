import { Style, StyleDetail } from "../models/Style.js";
import {
  getStylesList,
  getFindStyle,
  increaseViewCount,
  searchStyles,
  getPopularTags,
  getStylesByTag,
} from "../repositories/style.repository.js";

//목록조회, 오프셋페이지네이션, 검색, 정렬기준
export const getStylesService = async ({ page, limit, sort, search, tag }) => {
  const skip = (page - 1) * limit; //페이지네이션

  // 기본 정렬 조건(생성 시간 순)
  let orderByOption = { createdAt: "desc" };
  if (sort === "views") orderByOption = { views: "desc" }; // view 오름차순
  if (sort === "curatedCount") orderByOption = { curatedCount: "desc" }; // curatedCount 오름차순

  // 태그 검색 우선
  if (tag) {
    return (
      await getStylesByTag({
        search: tag,
        skip,
        limit,
        orderBy: orderByOption,
        type: "tag",
      })
    ).map((style) => Style.fromEntity(style));
  }
  // 검색 옵션 추가 (search에 값이 들어왔고 빈 문자열이 아니라면 시행)
  // 검색 입력을 했으나 빈문자열("") 일경우 전체 조회
  if (search && search.trim() !== "") {
    return (
      await searchStyles({ search, skip, limit, orderBy: orderByOption })
    ).map((style) => Style.fromEntity(style));
  }

  const styles = await getStylesList({
    skip,
    limit,
    orderBy: orderByOption,
  });
  return styles.map((style) => Style.fromEntity(style));
};

//상세조회
export const findStyleService = async (styleId) => {
  const findStyle = await getFindStyle(styleId);
  if (!findStyle) return null; //데이터 없을경우 null 반환

  const updatedEntity = await increaseViewCount(styleId); //DB에서 조회하면 view 1 증가
  return StyleDetail.fromEntity(findStyle); //나중에 큐레이팅 목록 받아오는것도 작성할것
};

// 인기태그
export const getPopularTagsService = async () => {
  return await getPopularTags();
};

// // 스타일 수정 로직
// updateStyle = async (styleId, password, updateData) => {
//   // 1. 해당 스타일 존재 여부 확인
//   const style = await this.styleRepository.findStyleById(styleId);
//   if (!style) {
//     throw new CustomError(404, "존재하지 않는 스타일입니다.");
//   }

//   // 2. 비밀번호 검증 (단순 문자열 비교 예시, 실제 서비스에선 해시 비교 권장)
//   if (style.password !== password) {
//     throw new CustomError(403, "비밀번호가 일치하지 않습니다.");
//   }

//   // 3. 수정 진행
//   const updatedStyle = await this.styleRepository.updateStyle(
//     styleId,
//     updateData
//   );

//   return updatedStyle;
// };

// // 스타일 삭제 로직
// deleteStyle = async (styleId, password) => {
//   // 1. 해당 스타일 존재 여부 확인
//   const style = await this.styleRepository.findStyleById(styleId);
//   if (!style) {
//     throw new CustomError(404, "존재하지 않는 스타일입니다.");
//   }

//   // 2. 비밀번호 검증
//   if (style.password !== password) {
//     throw new CustomError(403, "비밀번호가 일치하지 않습니다.");
//   }

//   // 3. 삭제 진행
//   const deletedStyle = await this.styleRepository.deleteStyle(styleId);

//   return deletedStyle;
// };

// updateStyle = async (styleId, password, updateData) => {
//   /* ... */
// };
// deleteStyle = async (styleId, password) => {
//   /* ... */
// };
