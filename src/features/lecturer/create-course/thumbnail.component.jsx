import React, { useRef, useState, useEffect } from 'react'
import { Typography, Button, Box, TextField, Grow } from '@material-ui/core'
import useStyles from './thumbnail.style'
import { useCreateCourse } from './create-course.context'
import clsx from 'clsx'

/** @type {Worker} */
let worker
export default function UploadThumbnail() {
  const styles = useStyles()
  const {
    course: { thumbnail },
    update
  } = useCreateCourse()

  const [hover, setHover] = useState(false)
  const [url, setUrl] = useState('')
  const inputFile = useRef(null)

  useEffect(() => {
    worker = new Worker('/workers/dispose.worker.js')
    return () => {
      worker.terminate()
      worker = null
    }
  }, [])

  useEffect(() => {
    const matches =
      url.match(/^https:\/\/.+\.(jpg|jpeg|png|webp|gif)$/) ||
      url.match(/^data:image\/(jpg|jpeg|png|webp|gif)/)
    if (matches) {
      worker?.postMessage(thumbnail)
      update({ thumbnail: url })
    }
  }, [url])

  return (
    <Box
      className={styles.root}
      width="100%"
      paddingTop="56.25%"
      position="relative"
      color="white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input
        onChange={(e) => {
          worker?.postMessage(thumbnail)
          const url = URL.createObjectURL(e.target.files[0])
          update({ thumbnail: url })
        }}
        type="file"
        accept="image/*"
        ref={inputFile}
        style={{ display: 'none' }}
      />
      <Box
        className={clsx(styles.fill, styles.transition, styles.cover, {
          [styles.cover_hover]: hover && thumbnail
        })}
      />
      <Grow in={hover || !thumbnail}>
        <Box
          zIndex={10}
          className={clsx(styles.fill, styles.upload, styles.transition)}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => inputFile.current.click()}
          >
            Upload image
          </Button>
          <Box paddingY={1}>
            <Typography variant="subtitle1">OR</Typography>
          </Box>
          <TextField
            fullWidth
            InputProps={{
              classes: {
                underline: clsx({ [styles.textfield]: hover && thumbnail })
              }
            }}
            value={url}
            placeholder="Paste an url here..."
            onChange={(e) => setUrl(e.target.value)}
          />
        </Box>
      </Grow>
      {thumbnail && (
        <img
          className={clsx(styles.fill, styles.transition, {
            [styles.thumbnail_hover]: hover
          })}
          src={thumbnail}
        />
      )}
    </Box>
  )
}
