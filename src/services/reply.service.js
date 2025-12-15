import { ReplyRepository } from "../repositories/reply.repository.js";
import { ReplyRepository } from '../repositories/reply.repository.js';
import { ValidationError, ForbiddenError, NotFoundError } from '../utils/CustomError.js';
export class ReplyService {
  replyRepository = new ReplyRepository();

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

  updateReply = async (commentId, content, password) => {
    if (!content || !password) {
      throw new ValidationError("content와 password는 필수 입력 항목입니다.");
    }

    const reply = await this.replyRepository.findReplyById(commentId);
    if (!reply) {
      throw new NotFoundError("해당 댓글을 찾을 수 없습니다.");
    }

    return await this.replyRepository.deleteReply(replyId);
  }
}

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

    if (reply.password !== password) {
      throw new ForbiddenError("비밀번호가 틀려 댓글 수정 권한이 없습니다.");
    }

    const updatedReply = await this.replyRepository.updateReply(commentId, content);

    return {
      id: updatedReply.id.toString(),
      nickname: updatedReply.nickname,
      content: updatedReply.content,
      createdAt: updatedReply.createdAt.toISOString(),
    };
  };

  