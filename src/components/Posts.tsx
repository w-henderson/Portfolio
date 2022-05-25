import React from "react";
import "../styles/Posts.scss";

interface PostsProps {
  posts: {
    title: string,
    date: string,
    slug: string,
    excerpt: string,
  }[]
}

class Posts extends React.Component<PostsProps> {
  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post =>
          <a href={post.slug}>
            <div className="postcard">
              <div>
                <h2>{post.title}</h2>
                <span>{post.date}</span>
              </div>

              <p>{post.excerpt}</p>
            </div>
          </a>
        )}

        <div className="end">
          That's all the posts so far!
        </div>
      </div>
    )
  }
}

export default Posts;