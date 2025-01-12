"use client"

import { requestAllPublishedPosts } from "@/services/api-services/blogService"
import "./PostPage.scss"
import { remark } from "remark"
import html from "remark-html"
import { useEffect, useState } from "react"
import { useTheme } from "@/context/themeContext"

export default function PostPage({ params }: { params: { post: string } }) {
  const [post, setPost] = useState<any>(null)
  const [postContentHtml, setPostContentHtml] = useState<string>("")

  const { theme } = useTheme()

  useEffect(() => {
    requestAllPublishedPosts().then((res) => {
      const post = res.posts.find(
        (post: any) => post.attributes.slug === params.post
      )
      setPost(post)
    })
  }, [])

  useEffect(() => {
    if (!post) return
    remark()
      .use(html)
      .process(post.attributes.content, function (err, file) {
        if (err) throw err
        setPostContentHtml(String(file))
      })
  }, [post])

  if (!post) return null

  return (
    <div className="postpage">
      <div className={`post-wrapper ${theme}`}>
        <h1>{post.attributes.title}</h1>
        <div className="post-info-container">
          <div className="tag-container">
            {post.attributes.tags.data.map((tag: any) => (
              <span
                key={tag.id}
                className="tag"
                style={{ backgroundColor: tag.attributes.color }}
              >
                {tag.attributes.name}
              </span>
            ))}
          </div>
          <div className="post-date">
            {new Date(post.attributes.publishedAt).toLocaleDateString()}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postContentHtml }} />
      </div>
    </div>
  )
}
