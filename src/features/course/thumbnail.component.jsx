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
    <Container>
      <Box position="relative" height={0} paddingTop="56.25%">
        {previews.length ? (
          <ReactPlayer
            config={{
              youtube: {
                playerVars: {
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
            url={lecture?.url}
            light={thumbnail}
          />
        ) : (
          <img
            src={thumbnail}
            alt={course.title}
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              left: 0,
              top: 0
            }}
          />
        )}
      </Box>
    </Container>
  )
}

export function useCourseThumbnail() {
  return { play }
}

CourseThumbnail.propTypes = CourseDetailPropTypes.isRequired
