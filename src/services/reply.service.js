<<<<<<< HEAD
import { ReplyRepository } from "../repositories/reply.repository.js";

export class ReplyService {
  replyRepository = new ReplyRepository();

  // ✔ 댓글 생성
  async createReply(curationId, nickname, password, content) {
    const exist = await this.replyRepository.findReplyByCurationId(curationId);
    if (exist) throw new Error("이미 해당 큐레이션에는 댓글이 존재합니다.");

    return await this.replyRepository.createReply(
      curationId,
      nickname,
      password,
      content
    );
  }

  // ✔ 댓글 수정
  async updateReply(replyId, password, content) {
    const reply = await this.replyRepository.findReplyById(replyId);
    if (!reply) throw new Error("댓글이 존재하지 않습니다.");
    if (reply.password !== password) throw new Error("비밀번호가 일치하지 않습니다.");

    return await this.replyRepository.updateReply(replyId, content);
  }

  // ✔ 댓글 삭제
  async deleteReply(replyId, password) {
    const reply = await this.replyRepository.findReplyById(replyId);
    if (!reply) throw new Error("댓글이 존재하지 않습니다.");
    if (reply.password !== password) throw new Error("비밀번호가 일치하지 않습니다.");

    return await this.replyRepository.deleteReply(replyId);
  }
}
=======
import bcrypt from "bcrypt";
import replyRepository from "../repositories/reply.repository.js";
import curationRepository from "../repositories/curation.repository.js";
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../utils/CustomError.js";

const replyService = {
  // 답글 등록 (1개 제한)
  createReply: async ({ curationId, content, password }) => {
    if (!content) throw new ValidationError("답글 내용을 입력해주세요.");
    if (!password) throw new ValidationError("비밀번호를 입력해주세요.");

    // 큐레이션 존재 확인
    const curation = await curationRepository.findById(curationId);
    if (!curation) throw new NotFoundError();

    // 이미 답글이 존재하는지 체크
    const exists = await replyRepository.findByCurationId(curationId);
    if (exists)
      throw new ValidationError("해당 큐레이션에는 이미 답글이 존재합니다.");

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, curation.password);
    if (!isMatch) throw new ForbiddenError("비밀번호가 틀렸습니다.");

    return replyRepository.create({
      content,
      nickname: curation.postNickname, // 답글 닉네임은 큐레이션 작성자
      curationId,
    });
  },

  // 답글 수정
  updateReply: async ({ replyId, content, password }) => {
    if (!password) throw new ValidationError("비밀번호를 입력해주세요.");

    const reply = await replyRepository.findById(replyId);
    if (!reply) throw new NotFoundError();

    const curation = await curationRepository.findById(reply.curationId);
    if (!curation) throw new NotFoundError();

    const isMatch = await bcrypt.compare(password, curation.password);
    if (!isMatch) throw new ForbiddenError();

    return replyRepository.update(replyId, content);
  },

  // 답글 삭제
  deleteReply: async ({ replyId, password }) => {
    if (!password) throw new ValidationError("비밀번호를 입력해주세요.");

    const reply = await replyRepository.findById(replyId);
    if (!reply) throw new NotFoundError();

    const curation = await curationRepository.findById(reply.curationId);

    const isMatch = await bcrypt.compare(password, curation.password);
    if (!isMatch) throw new ForbiddenError();

    return replyRepository.delete(replyId);
  },
};

export default replyService;
<<<<<<< HEAD
>>>>>>> a37799b (댓글기능구현3일차)
=======
//test
>>>>>>> a99cdbc (pull&pr)
