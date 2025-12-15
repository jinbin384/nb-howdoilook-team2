
import { ReplyRepository } from '../repositories/reply.repository.js';
import { ValidationError, ForbiddenError, NotFoundError } from '../utils/CustomError.js';

// Note: 만약 ReplyRepository가 다른 클래스/모듈을 필요로 한다면, 
// 그 import 구문도 파일 상단에 추가해야 합니다.

export class ReplyService {
  replyRepository = new ReplyRepository();

  // 1. 답글 생성 (createReply 함수)
  createReply = async (curationId, content, password, nickname) => {
    if (!content || !password || !nickname) {
      throw new ValidationError("content, password, nickname은 필수 입력 항목입니다.");
    }
    
    const createdReply = await this.replyRepository.createReply(
      curationId,
      content,
      password,
      nickname
    );

    return {
      id: createdReply.id.toString(),
      nickname: createdReply.nickname,
      content: createdReply.content,
      createdAt: createdReply.createdAt.toISOString(), 
    };
  };

  // 2. 답글 수정 (updateReply 함수)
  updateReply = async (commentId, content, password) => {
    if (!content || !password) {
      throw new ValidationError("content와 password는 필수 입력 항목입니다.");
    }

    const reply = await this.replyRepository.findReplyById(commentId);
    if (!reply) {
      throw new NotFoundError("해당 댓글을 찾을 수 없습니다.");
    }

    // 비밀번호 검증 로직 (튀어나왔던 코드를 올바른 위치에 삽입)
    if (reply.password !== password) {
      throw new ForbiddenError("비밀번호가 틀려 댓글 수정 권한이 없습니다.");
    }

    // 답글 수정 로직
    const updatedReply = await this.replyRepository.updateReply(commentId, content);

    // 반환 로직
    return {
      id: updatedReply.id.toString(),
      nickname: updatedReply.nickname,
      content: updatedReply.content,
      createdAt: updatedReply.createdAt.toISOString(),
    };
  }

  // Note: deleteReply 로직은 현재 파일에 명시되어 있지 않습니다.
  // 필요하다면 이 클래스 내부에 추가해야 합니다.
}