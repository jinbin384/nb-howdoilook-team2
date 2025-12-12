<<<<<<< HEAD
<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
=======
import prisma from '../../prisma/prisma.js'; 
>>>>>>> 3c3a81a (갈아엎기)

export class ReplyRepository {
  createReply = async (curationId, content, password, nickname) => {
    const createdReply = await prisma.reply.create({
      data: {
        curationId: BigInt(curationId), 
        content,
        password,
        nickname,
      },
    });
    return createdReply;
  };

  findReplyById = async (commentId) => {
    const reply = await prisma.reply.findUnique({
      where: {
        id: BigInt(commentId),
      },
    });
    return reply;
  };

  updateReply = async (commentId, content) => {
    const updatedReply = await prisma.reply.update({
      where: {
        id: BigInt(commentId),
      },
      data: {
        content,
      },
    });
    return updatedReply;
  };

  deleteReply = async (commentId) => {
    const deletedReply = await prisma.reply.delete({
      where: {
        id: BigInt(commentId),
      },
    });
<<<<<<< HEAD
  }

  // ✔ 댓글 id로 조회
  async findReplyById(id) {
    return await prisma.reply.findUnique({
      where: { id },
    });
  }

  // 댓글 수정
  async updateReply(id, content) {
    return await prisma.reply.update({
      where: { id },
      data: { content },
    });
  }

  // 댓글 삭제
  async deleteReply(id) {
    return await prisma.reply.delete({
      where: { id },
    });
  }
}
=======
import prisma from "../../prisma/prisma.js";

export class Reply {
  constructor(id, content, nickname, curationId, createdAt) {
    this.id = id;
    this.content = content;
    this.nickname = nickname;
    this.curationId = curationId;
    this.createdAt = createdAt;
  }
}

const replyRepository = {
  findByCurationId: async (curationId) => {
    return prisma.reply.findFirst({
      where: { curationId },
    });
  },

  create: async ({ content, nickname, curationId }) => {
    return prisma.reply.create({
      data: { content, nickname, curationId },
    });
  },

  update: async (id, content) => {
    return prisma.reply.update({
      where: { id },
      data: { content },
    });
  },

  delete: async (id) => {
    return prisma.reply.delete({
      where: { id },
    });
  },

  findById: async (replyId) => {
    return prisma.reply.findUnique({
      where: { id: replyId },
    });
  },
};

export default replyRepository;
>>>>>>> a37799b (댓글기능구현3일차)
=======
    return deletedReply;
  };
}
>>>>>>> 3c3a81a (갈아엎기)
