export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  type: QuestionType;
  options?: Option[];
  correctText?: string;
  correctBoolean?: boolean | null;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}
