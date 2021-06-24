import { Presenter } from '@/components/markdown'
import { CourseDetailPropTypes } from '@/utils/typing'
import {
  Box,
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  CircularProgress,
  Collapse
} from '@material-ui/core'
import { CourseRow } from '@/components/course'
import React, { useRef, useState } from 'react'
import useStyles from './detail.style'
import { routes } from '@/utils/app'
import NextLink from '@/components/nextlink'
import { Rating } from '@material-ui/lab'
import LongParagraph from '@/components/paragraph'
import { KeyboardArrowDown } from '@material-ui/icons'

export default function CourseContent({ course }) {
  const styles = useStyles()
  const { detaildesc, lecturer, topic, populars, category } = course
  const [loading, setLoading] = React.useState(false)
  const [feedbacks, setFeedbacks] = useState(course.feedbacks.slice(0, 10))
  const tracker = useRef({ offset: 0, size: 10 })

  async function onLoadFeedbacks() {
    setLoading(true)
    setTimeout(() => {
      setFeedbacks(course.feedbacks)
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <Typography className={styles.header}>What you will learn</Typography>
      <Box paddingY={1} />
      <Presenter>{detaildesc}</Presenter>
      <Box paddingY={2} />
      <Typography className={styles.header}>
        Most popular courses in{' '}
        <NextLink href={routes.topic(category.name, topic.name)}>
          &quot;{topic.label}&quot;
        </NextLink>
      </Typography>
      <Box paddingY={1} />
      <ul className={styles.ul}>
        {populars.map((item) => (
          <li key={item.id}>
            <CourseRow course={item} />
          </li>
        ))}
      </ul>
      <Box paddingY={1}>
        <Divider />
      </Box>
      <ListItem component="div" disableGutters dense>
        <ListItemAvatar>
          <Avatar src={lecturer.avatar} alt={lecturer.name}>
            {lecturer.name[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={lecturer.name} />
      </ListItem>
      <Box paddingY={1} />
      <Presenter>{lecturer.description}</Presenter>
      <Box paddingY={2} />
      <Typography className={styles.header}>course rating</Typography>
      <ul>
        {feedbacks.map((item) => (
          <li key={item.name}>
            <ListItem component="div" dense disableGutters>
              <ListItemAvatar>
                <Avatar src={item.avatar} alt={item.name}>
                  {item.name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <Rating
                    value={item.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                }
              />
            </ListItem>
            <ListItem component="div" dense disableGutters>
              <ListItemAvatar />
              <LongParagraph line={5}>{item.content}</LongParagraph>
            </ListItem>
          </li>
        ))}
      </ul>
      <Collapse in={loading}>
        <Typography align="center">
          <CircularProgress />
        </Typography>
        <Box paddingY={0.5} />
      </Collapse>
      <Button
        variant="text"
        color="inherit"
        disabled={loading}
        fullWidth
        onClick={onLoadFeedbacks}
      >
        <KeyboardArrowDown color="action" />
        <Typography variant="button" color="textSecondary">
          show more
        </Typography>
        <KeyboardArrowDown color="action" />
      </Button>
    </>
  )
}

CourseContent.propTypes = {
  course: CourseDetailPropTypes.isRequired
}
