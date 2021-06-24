import React, { useState } from 'react'
import { ListItemText, ListItem, Container, Box, List } from '@material-ui/core'
import { CourseDetailPropTypes } from '@/utils/typing'
import ReactPlayer from 'react-player'

export default function WatchFeature({ course }) {
  const { lectures, thumbnail } = course
  const [playing, setPlaying] = useState(lectures[0])
  return (
    <Box width="100%" display="flex">
      <Container>
        <Box position="sticky" top={0} height={0} paddingTop="56.25%">
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
          />
        </Box>
      </Container>
      <Container maxWidth="xs">
        <List>
          {lectures.map((item) => (
            <ListItem
              button
              key={item.section}
              onClick={() => setPlaying(item)}
            >
              <ListItemText
                primary={item.title}
                secondary={formatDuration(item.hour, item.minute, item.second)}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  )
}

WatchFeature.propTypes = {
  course: CourseDetailPropTypes.isRequired
}

function formatDuration(hour = 0, minute = 0, second = 0) {
  const secondStr = ':' + second.toString().padStart(2, '0')
  const minuteStr = minute.toString().padStart(2, '0')
  const hourStr = hour > 0 ? hour.toString().padStart(2, '0') + ':' : ''
  return hourStr + minuteStr + secondStr
}
