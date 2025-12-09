<<<<<<< HEAD
import { Style } from "../models/Style.js";
import {
  getStylesList,
  getFindStyle,
} from "../repositories/style.repository.js";

export const getStylesService = async ({ page, limit, sort }) => {
  const skip = (page - 1) * limit; //페이지네이션

  // 기본 정렬 조건(생성 시간 순)
  let orderByOption = { created_at: "desc" };

  if (sort === "views") {
    orderByOption = { views: "desc" }; // view 오름차순
  } else if (sort === "curatedCount") {
    orderByOption = { curatedCount: "desc" }; // curatedCount 오름차순
  }
  const styles = await getStylesList({
    skip, //몇 페이지
    limit, //한 페이지당 게시글 갯수
    orderBy: orderByOption, // 무슨 기준으로 데이터를 불러올건지
  });

  return styles.map((style) => Style.fromEntity(style));
};

export const findStyleService = async (styleId) => {
  const findStyle = await getFindStyle(styleId);
  if (!findStyle) return null; //데이터 없을경우 null 반환

  return Style.fromEntity(findStyle);
};
=======
// src/services.style.service.js
// 💡 임시 메모리 저장소 및 ID 카운터 (POST 요청만 처리)
let stylesStore = [];
let nextId = 1;

class StyleService {
  static async register(data) {
    // 비밀번호 Mocking 처리
    const hashedPassword = `MOCKED_HASHED_${data.password}`;
    const { styleItems, ...styleData } = data;

    const newStyle = {
      id: BigInt(nextId++),
      ...styleData,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: null,
      style_items: styleItems.map((item, index) => ({
        id: BigInt(index + 1),
        style_id: BigInt(nextId - 1),
        ...item,
      })),
    };

    // 메모리에 저장
    stylesStore.push(newStyle);

    // BigInt 타입을 문자열로 변환하여 반환
    const { password, ...responseStyle } = newStyle;
    return JSON.parse(
      JSON.stringify(responseStyle, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }
}

// class StyleService {
//   /**
//    * 스타일 등록 비즈니스 로직을 처리합니다.
//    * @param {object} data - 등록할 스타일 데이터
//    */
//   static async register(data) {
//     return {
//       id: 1,
//       title: data.title,
//       nickname: data.nickname,
//       tags: data.tags || [],
//     };
//   }
// }

export default StyleService;
>>>>>>> f3f793b (feat: Implement style post creation logic and error handling)
