import StyleService from "../services/style.service.js";

// 스타일 목록 조회
// 갤러리 상단에 인기 태그가 표시됩니다. 해당 태그를 클릭하면 그 태그에 해당하는 스타일 목록이 표시됩니다.
// 최신순, 조회순, 큐레이팅순(큐레이팅 많은 순)으로 정렬 가능합니다.
// 닉네임, 제목, 상세, 태그로 검색이 가능합니다.
class StyleController {
  getStyles = async (req, res, next) => {
    try {
      // 쿼리 파라미터에서 페이지, 한 페이지당 아이템 수, 정렬기준, 검색어 추출
      const { page = 1, limit = 10, sort = "latest", search } = req.query;

      // 서비스 레이어의 getStylesService 함수 호출
      const styles = await StyleService.getStyles({
        page: Number(page),
        limit: Number(limit),
        sort,
        search,
      });

      // response로 스타일 목록 반환
      return res.status(200).json(styles);
    } catch (e) {
      next(e);
    }
  };

  // 스타일 상세 조회
  // 갤러리, 랭킹에서 스타일을 클릭할 경우 스타일 상세 조회가 가능합니다.
  // 이미지(여러장 가능), 제목, 닉네임, 태그, 스타일 구성, 스타일 설명, 조회수, 큐레이팅수가 표시됩니다.
  // 해당 스타일의 큐레이팅 목록이 표시됩니다.
  findStyle = async (req, res, next) => {
    try {
      // 경로 파라미터에서 스타일 ID 추출
      const styleId = req.params.styleId;

      const findStyle = await StyleService.findStyle(styleId);
      return res.status(200).json(findStyle);
    } catch (e) {
      next(e);
    }
  };

  // POST /style: 새로운 스타일 게시물을 등록합니다.
  postStyle = async (req, res, next) => {
    try {
      // 유효성 검사 미들웨어를 통과한 데이터
      const {
        nickname,
        title,
        content,
        password,
        categories,
        tags,
        imageUrls,
      } = req.body;

      // 인스턴스를 통해 POST 메서드를 호출
      const createdStyle = await StyleService.postStyle({
        nickname,
        title,
        content,
        password,
        categories,
        tags,
        imageUrls,
      });

      // 응답 데이터에서 비밀번호 필드 제거 (보안)
      const { password: _, ...responseStyle } = createdStyle;

      return res.status(201).json(responseStyle);
    } catch (error) {
      next(error);
    }
  };

  // PUT /style: 스타일 게시물을 수정합니다.
  updateStyle = async (req, res, next) => {
    try {
      const styleId = req.params.styleId;
      const { password, ...updateData } = req.body;

      // 서비스 레이어 호출 및 수정 진행
      const updatedStyle = await StyleService.updateStyle(
        styleId,
        password,
        updateData
      );

      // API 응답 스펙에 맞춰 StyleDetail 형식의 수정된 객체 반환
      return res.status(200).json(updatedStyle);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /style: 스타일 게시물을 삭제합니다.
  deleteStyle = async (req, res, next) => {
    try {
      const styleId = req.params.styleId;
      const { password } = req.body;

      const deletedStyle = await StyleService.deleteStyle(styleId, password);

      return res.status(200).json({
        message: "스타일이 성공적으로 삭제되었습니다.",
        id: deletedStyle.id.toString(),
      });
    } catch (error) {
      next(error);
    }
  };
}

// createStyleController 함수 내부 수정
export const createStyleController = async (req, res, next) => {
  try {
    const styleData = req.body;
    // ...
    const newStyle = await createStyleService(styleData);

    // 🚨 새로 생성된 객체의 BigInt (ID)를 JSON 직렬화 가능하도록 변환
    const safeStyle = serializeBigInt(newStyle);

    return res.status(201).json({
      message: "스타일 등록 성공",
      data: safeStyle, // 💡 변환된 객체 사용
    });
  } catch (error) {
    next(error);
  }
};

const StyleController = {
  getStyles: getStylesController,
  findStyle: findStyleController,
  createStyle: createStyleController, // 👈 여기가 'createStyle'로 되어 있는지 확인!
  updateStyle: updateStyleController,
  deleteStyle: deleteStyleController,
};

export default StyleController;
