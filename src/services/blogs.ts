import api from "./api";
import { Blog, CreateBlogData } from "../types";

export const blogsService = {
  getAll: (): Promise<{ data: Blog[] }> => api.get("/blogs"),

  getById: (id: number): Promise<{ data: Blog }> =>
    api.get(`/blogs/${id}?relations=likes,comments,bookings,author`),

  create: (data: CreateBlogData): Promise<{ data: Blog }> =>
    api.post("/blogs", data),

  update: (
    id: number,
    data: Partial<CreateBlogData>
  ): Promise<{ data: Blog }> => api.patch(`/blogs/${id}`, data),

  delete: (id: number): Promise<void> => api.delete(`/blogs/${id}`),
};
