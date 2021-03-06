import React from "react";
import "../styles/PostCards.scss";

interface PostCardsProps {
  posts: {
    title: string,
    date: string,
    slug: string,
    excerpt: string,
    timeToRead: number,
  }[]
}

class PostCards extends React.Component<PostCardsProps> {
  render() {
    return (
      <div className="PostCards">
        {this.props.posts.map(post =>
          <a href={post.slug} key={post.slug}>
            <div className="postcard">
              <div>
                <h2>{post.title}</h2>

                <span>{post.date}</span>
                <span>{post.timeToRead} min</span>
              </div>

              <p>{post.excerpt}</p>
            </div>
          </a>
        )}
      </div>
    )
  }
}

export default PostCards;