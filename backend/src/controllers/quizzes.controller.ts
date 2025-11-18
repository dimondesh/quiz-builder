import { Request, Response } from "express";
import { prisma } from "../prisma";
import { CreateQuizDTO } from "../types/quiz.dto";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateQuizDTO;

    const quiz = await prisma.quiz.create({
      data: {
        title: body.title,
        questions: {
          create: body.questions.map((q, index) => ({
            text: q.text,
            type: q.type,
            order: index,
            correctAnswer: q.type === "INPUT" ? q.correctAnswer ?? null : null,
            options:
              q.type === "BOOLEAN" || q.type === "CHECKBOX"
                ? {
                    create: q.options?.map((opt) => ({
                      text: opt.text,
                      isCorrect: opt.isCorrect,
                    })),
                  }
                : undefined,
          })),
        },
      },
      include: { questions: { include: { options: true } } },
    });

    res.status(201).json(quiz);
  } catch {
    res.status(500).json({ message: "Failed to create quiz" });
  }
};

export const getQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { _count: { select: { questions: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json(
      quizzes.map((q) => ({
        id: q.id,
        title: q.title,
        questionsCount: q._count.questions,
      }))
    );
  } catch {
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: {
        questions: {
          orderBy: { order: "asc" },
          include: { options: true },
        },
      },
    });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz);
  } catch {
    res.status(500).json({ message: "Failed to fetch quiz" });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    await prisma.quiz.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Failed to delete quiz" });
  }
};
