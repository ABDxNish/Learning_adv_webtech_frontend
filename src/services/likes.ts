import api from "./api";
import { Like } from "../types";

export const likesService = {
  like: (blogId: number): Promise<{ data: Like }> =>
    api.post(`/blogs/${blogId}/likes`),

  unlike: (blogId: number): Promise<void> =>
    api.delete(`/blogs/${blogId}/likes`),

  getByBlog: (blogId: number): Promise<{ data: Like[] }> =>
    api.get(`/blogs/${blogId}/likes`).then((res) => ({
      data: Array.isArray(res.data) ? res.data : res.data.likes || [],
    })),

  checkLike: async (blogId: number): Promise<boolean> => {
    try {
      const response = await api.get(`/blogs/${blogId}/likes/check`);
      return response.data.liked;
    } catch (error) {
      return false;
    }
  },
};
