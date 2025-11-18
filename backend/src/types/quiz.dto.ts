export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export interface CreateOptionDTO {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionDTO {
  text: string;
  type: QuestionType;
  options?: CreateOptionDTO[];
  correctAnswer?: string;
}

export interface CreateQuizDTO {
  title: string;
  questions: CreateQuestionDTO[];
}
