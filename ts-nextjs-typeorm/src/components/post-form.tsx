import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";


export default function PostForm(props) {
  const handleSubmit = async (event) => {

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const postData = JSON.stringify({
      title: event.target.title.value,
      author: event.target.author.value,
      content: event.target.content.value,
    })

    await fetch("/api/posts", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: postData,
    })
    props.onSubmit();
  }

  return (
    <Container className="post-form-container">

        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={6}>
            <Grid2 xs={10}><TextField fullWidth id="title" label="Title" required variant="standard"/></Grid2>
            <Grid2 xs={10}><TextField fullWidth id="author" label="Author" required variant="standard"/></Grid2>
            <Grid2 xs={10}><TextField fullWidth multiline id="content" label="Post Content" required variant="outlined"/></Grid2>
            <Grid2 xs={10}><Button type="submit" variant="contained">Submit</Button></Grid2>
          </Grid2>

        </form>

    </Container>
  )
}
