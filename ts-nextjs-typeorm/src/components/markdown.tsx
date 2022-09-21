import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Divider, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function Markdown() {
  const [posts, setPosts] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/posts')
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!posts || posts.length == 0) return <p>No Posts :(</p>

  return (
    <Grid2 container spacing={6}>
      {
        posts.map(post =>
          <Grid2 key={post.id} xs={12}>
            <Paper variant="outlined">
              <div className="post-content">
                <h2>{post.title}</h2>
                <h4>by: {post.author}</h4>
                <Divider/>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </Paper>
          </Grid2>)
      }
    </Grid2>
  )
}
