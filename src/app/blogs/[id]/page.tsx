"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  blogsService,
  commentsService,
  likesService,
  bookingsService,
} from "../../../services";
import { Blog, Comment, Like, CreateCommentData } from "../../../types";
import Cookies from "js-cookie";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = Number(params.id);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingDetails, setBookingDetails] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [userLikeId, setUserLikeId] = useState<number | null>(null);
  const [likeError, setLikeError] = useState("");
  const [userRole, setUserRole] = useState<"client" | "agency" | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentText, setEditCommentText] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      // Simplified JWT decoding (replace with jwt-decode in production)
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role || null);
      setUserId(payload.sub || null); // Assuming 'sub' is user ID
    }
    loadBlogData();
  }, [blogId]);
  useEffect(() => {
    if (userId != null && likes.length > 0) {
      const userHasLiked =
        userId !== null &&
        likes.some((like: Like) => {
          console.log("Checking like for user:", userId, like?.user?.id);
          return like?.user?.id === userId;
        });

      setHasLiked(userHasLiked);
      if (userHasLiked) {
        const userLike = likes.find((like: Like) => like.user.id === userId);
        setUserLikeId(userLike?.id || null);
      }
    }
  }, [likes, userId]);

  const loadBlogData = async () => {
    try {
      const [blogRes, commentsRes] = await Promise.all([
        blogsService.getById(blogId),
        commentsService.getByBlog(blogId),
      ]);

      setBlog(blogRes.data);

      // Handle partial comment data
      const commentsData = Array.isArray(commentsRes.data)
        ? commentsRes.data
        : [];
      setComments(
        commentsData.map((c: any) => ({
          id: c.id,
          content: c.content,
          user: {
            id: c.user?.id || null,
            email: c.user?.email || "",
            role: c.user?.role || "client",
          },
          blogId,
          createdAt: c.createdAt || new Date().toISOString(),
        }))
      );

      // Use blog.likes directly
      const likesArray = blogRes?.data?.likes || [];
      console.log("Likes Array:", likesArray);
      console.log("Likes Array:", userId);
      setLikes(likesArray);

      // Check if current user has liked using blog.likes
    } catch (err) {
      console.error("Failed to load blog data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!userId) return;
    try {
      setLikeError("");
      if (hasLiked && userLikeId) {
        await likesService.unlike(blogId);
        setHasLiked(false);
        setUserLikeId(null);
      } else {
        const response = await likesService.like(blogId);
        setHasLiked(true);
        setUserLikeId(response.data.id);
      }
      loadBlogData();
    } catch (err: any) {
      if (err.response?.status === 409) {
        setLikeError("You have already liked this blog");
      } else {
        setLikeError("Failed to like blog");
      }
      console.error("Failed to like:", err);
    }
  };
  const handleUnlike = () => {
    return;
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !userId) return;

    try {
      await commentsService.create(blogId, { content: commentText });
      setCommentText("");
      loadBlogData();
    } catch (err: any) {
      console.error("Failed to comment:", err);
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editCommentText.trim() || !userId) return;

    try {
      await commentsService.update(
        commentId,
        { content: editCommentText },
        blogId
      );
      setEditCommentId(null);
      setEditCommentText("");
      loadBlogData();
    } catch (err: any) {
      console.error("Failed to update comment:", err);
      alert(err.response?.data?.message || "Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!userId) return;
    try {
      await commentsService.delete(commentId, blogId);
      loadBlogData();
    } catch (err: any) {
      console.error("Failed to delete comment:", err);
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingDetails.trim() || !userId) return;

    try {
      await bookingsService.create(blogId, {
        date: bookingDate,
        details: bookingDetails,
      });
      setBookingDate("");
      setBookingDetails("");
      alert("Booking created successfully!");
    } catch (err: any) {
      console.error("Failed to book:", err);
      alert(err.response?.data?.message || "Failed to create booking");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  console.log("User has liked:", hasLiked, userLikeId);
  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">By: {blog.author.email}</p>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-800">{blog.content}</p>
      </div>

      {/* Like Button (Client/Agency) */}
      {(userRole === "client" || userRole === "agency") && (
        <div className="mb-6">
          <button
            onClick={hasLiked ? handleUnlike : handleLike}
            className={`px-4 py-2 rounded ${
              hasLiked ? "bg-gray-500" : "bg-red-500"
            } text-white`}
            disabled={!userId}
          >
            {hasLiked ? "Unlike" : "Like"} ({blog.likes.length})
          </button>
          {likeError && (
            <p className="text-red-500 text-sm mt-2">{likeError}</p>
          )}
        </div>
      )}

      {/* Comments Section */}
      {(userRole === "client" || userRole === "agency") && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Comments ({comments.length})
          </h2>
          <form onSubmit={handleComment} className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded"
              rows={3}
              required
              disabled={!userId}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              disabled={!userId}
            >
              Add Comment
            </button>
          </form>

          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {comment.user.email || "Unknown"}
                    </p>
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    {(userRole === "agency" || comment.user.id === userId) && (
                      <>
                        <button
                          onClick={() => {
                            setEditCommentId(comment.id);
                            setEditCommentText(comment.content);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {editCommentId === comment.id && (
                  <div className="mt-2">
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                    <button
                      onClick={() => handleUpdateComment(comment.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className="bg-gray-500 text-white px-4 py-1 rounded mt-2 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Form (Client/Agency) */}
      {(userRole === "client" || userRole === "agency") && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Book This Trip</h2>
          <form onSubmit={handleBooking}>
            <div className="mb-3">
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={!userId}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Details:</label>
              <textarea
                value={bookingDetails}
                onChange={(e) => setBookingDetails(e.target.value)}
                placeholder="Number of people, special requirements..."
                className="w-full p-2 border rounded"
                rows={3}
                required
                disabled={!userId}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={!userId}
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
