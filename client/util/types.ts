export type User = {
  id: number;
  username: string;
  createdAt: Date;
  passwordHash: string;
};

export type Survey = {
  id: number;
  userId: number;
  createdAt: Date;
  title: string;
  customSlug: string;
  published: boolean;
};

export type Category = {
  id: number;
  surveyId: number;
  createdAt: Date;
  title: string;
  titleMy: string;
  desc: string;
  descMy: string;
};

export type SubCategory = {
  id: number;
  surveyId: number;
  categoryId: number;
  createdAt: Date;
  title: string;
  titleMy: string;
};

export type Question = {
  id: number;
  surveyId: number;
  categoryId: number;
  subcategoryId: number;
  itemOrder: number;
  questionType: string;
  title: string;
  titleMy: string;
};

export type Response = {
  id: number;
  questionId: number;
  userId: string;
  surveyId: number;
  createdAt: string;
  responseValue: number;
};