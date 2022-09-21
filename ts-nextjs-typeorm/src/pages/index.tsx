import Head from 'next/head'
import Image from 'next/image'
import Markdown from "../components/markdown";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import PostForm from "../components/post-form";


export default function Home() {
  const [shouldShowModal, setShouldShowModal] = useState(false)

  function handleOpen() {
    setShouldShowModal(true);
  }

  function handleClose() {
    setShouldShowModal(false);
  }

  function handleSubmit(): () => void {
    return () => {
      setShouldShowModal(false)
      window.location.reload();
    };
  }

  return (
    <div className="app-root">
      <Head>
        <title>Markdown Blog</title>
        <link rel="icon" href="/favicon.ico"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <main className="main">
        <div className="header">
          <div className="title"><h1>Markdown Blog</h1></div>
          <div className="menu"><Button variant="contained" onClick={handleOpen}>New Post</Button></div>
        </div>
        <div className="content-root">
          <Modal open={shouldShowModal} onClose={handleClose}>
            <div>
              <PostForm onSubmit={handleSubmit}/>
            </div>
          </Modal>
          <Grid2 container>
            <Grid2 xs={2}/>
            <Grid2 xs={8}>
              <Markdown/>
            </Grid2>
            <Grid2 xs={2}/>
          </Grid2>
        </div>
      </main>

      <footer className="footer">
        Powered by Klotho
      </footer>
    </div>
  )
}


