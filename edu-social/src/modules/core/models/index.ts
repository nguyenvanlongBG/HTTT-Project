export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}
export interface Answer {
  _id: string;
  description: string;
  is_correct: boolean;
}
export interface Question {
  _id: string;
  content: string;
  type: number; // 1: Tự luận 2: Trắc nghiệm 1 đáp án 3: Chọn nhiều đáp án 4: Điền đáp án
  result: string;
  answers: Answer[];
}
export interface AnswerUser {
  _id: string;
  question_id: string;
  selected_answers: [];
}
