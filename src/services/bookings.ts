import api from "./api";
import { Booking, CreateBookingData } from "../types";

export const bookingsService = {
  create: (blogId: number, data: CreateBookingData): Promise<{ data: Booking }> => 
    api.post(`/blogs/${blogId}/bookings`, data),
  
  getMyBookings: (blogId: number): Promise<{ data: Booking[] }> =>
    api.get(`/blogs/${blogId}/bookings/my`),
};