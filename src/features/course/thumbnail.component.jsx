import React from 'react'
import { Box, Container } from '@material-ui/core'
import ReactPlayer from 'react-player'
import { CourseDetailPropTypes } from '@/utils/typing'

let play
export default function CourseThumbnail({ course }) {
  const { thumbnail, lectures } = course

  const previews = lectures.filter((item) => item.preview)
  const [lecture, setPlayingLecture] = React.useState(previews[0])
  play = setPlayingLecture

  return (
    <Box bgcolor="#000">
      <Container>
        <Box position="relative" height={0} paddingTop="56.25%">
          <ReactPlayer
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  playlist: previews.map((item) => item.url).join(',')
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
            url={`https://www.youtube.com/embed/${lecture.url}`}
            light={thumbnail}
          />
        </Box>
      </Container>
    </Box>
  )
}

export function useCourseThumbnail() {
  return { play }
}

CourseThumbnail.propTypes = CourseDetailPropTypes.isRequired
