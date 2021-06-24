import React, { useState } from 'react'
import { Box, Paper, Typography, Container } from '@material-ui/core'
import ReactPlayer from 'react-player'
import { useWatch } from './watch.context'

export default function WatchPlayer() {
  const { course } = useWatch()
  const { lectures, thumbnail } = course

  const [playing, setPlaying] = useState(lectures[0])

  return (
    <Container>
      <Box position="relative" height={0} paddingTop="56.25%">
        <ReactPlayer
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 1,
                playlist: lectures.map((item) => item.url).join(',')
              }
            }
          }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}
          height="100%"
          width="100%"
          url={`https://www.youtube.com/embed/${playing.url}`}
          light={thumbnail}
        />
      </Box>
    </Container>
  )
}
