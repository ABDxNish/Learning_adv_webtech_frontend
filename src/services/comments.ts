import api from "./api";
import { Comment, CreateCommentData } from "../types";

export const commentsService = {
  getByBlog: (blogId: number): Promise<{ data: Comment[] }> =>
    api.get(`/blogs/${blogId}/comments`),
  create: (
    blogId: number,
    data: CreateCommentData
  ): Promise<{ data: Comment }> => api.post(`/blogs/${blogId}/comments`, data),
  update: (
    id: number,
    data: Partial<CreateCommentData>,
    blogId: number // Add blogId as a parameter
  ): Promise<{ data: Comment }> =>
    api.patch(`/blogs/${blogId}/comments/${id}`, data),
  delete: (
    id: number,
    blogId: number // Add blogId as a parameter
  ): Promise<void> => api.delete(`/blogs/${blogId}/comments/${id}`),
};
