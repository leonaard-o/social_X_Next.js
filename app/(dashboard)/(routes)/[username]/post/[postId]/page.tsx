"use client";
import React from "react";
import usePost from "@/hooks/usePost";
import { Spinner } from "@/components/spinner";
import Header from "../../../../_components/_common/Header";
import PostItem from "../../../../_components/_common/PostItem";
import PostForm from "../../../../_components/_common/PostForm";
import CommentFeed from "../../../../_components/CommentFeed";
import { useParams } from "next/navigation"; // Importación clave

// Eliminamos la interfaz PropType ya que usaremos useParams

const PostView = () => {
  const params = useParams();
  const postId = params.postId as string; // Type assertion para TypeScript
  
  const { data, isLoading } = usePost({ postId: +postId });
  const post: PostType = data?.post ?? {};

  if (isLoading) {
    return (
      <div
        className="flex flex-col 
      h-[25vh] items-center w-full
      justify-center"
      >
        <Spinner size="icon" />
      </div>
    );
  }
  return (
    <>
      <Header label="Post" showBackArrow />
      <PostItem post={post} />
      <PostForm
        placeholder="Post your reply"
        postId={post.id}
        postUsername={post?.user?.username ?? ""}
        isComment
       
      />
      <CommentFeed comments={post?.comments} />
    </>
  );
};

export default PostView;