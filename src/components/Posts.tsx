import React from "react";
import "../styles/Posts.scss";

interface PostsProps {
  posts: {
    title: string,
    date: string,
    slug: string,
    excerpt: string,
    timeToRead: number,
  }[]
}

class Posts extends React.Component<PostsProps> {
  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post =>
          <a href={post.slug} key={post.slug}>
            <div className="postcard">
              <div>
                <h2>{post.title}</h2>

                <div>
                  <span>{post.date}</span>
                  <span className="bull">&bull;</span>
                  <span>{post.timeToRead} minute read</span>
                </div>
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