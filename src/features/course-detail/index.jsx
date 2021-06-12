import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Container,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemIcon
} from '@material-ui/core'
import StudentLayout from '@/components/layout/student'
import useStyles from './course-detail.style'
import { Rating } from '@material-ui/lab'
import {
  ArrowDownward,
  ArrowUpward,
  Create,
  Favorite,
  FavoriteBorder,
  RateReview,
  Shop
} from '@material-ui/icons'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'

export default function CourseDetail({ course }) {
  const styles = useStyles()

  const paperEl = useRef(null)
  const [videoHeight, setVideoHeight] = useState(undefined)
  const [favorited, setFavorited] = useState(false)
  const [more, expand] = useState(false)

  useEffect(() => {
    function onSizeChanged() {
      console.log(paperEl.current.offsetWidth)
      setVideoHeight((paperEl.current.offsetWidth * 9) / 16)
    }
    window.addEventListener('resize', onSizeChanged)
    return () => window.removeEventListener('resize', onSizeChanged)
  }, [])

  return (
    <StudentLayout>
      <Container maxWidth="md" innerRef={paperEl}>
        <ReactPlayer
          width="100%"
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 1
              }
            }
          }}
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          light="https://picsum.photos/320/180"
          height={videoHeight}
        />
        <Box className={styles.content}>
          <Typography variant="h5" className={styles.title}>
            <b>{'course title, unlimited lines'}</b>
          </Typography>
          <ListItem disableGutters>
            <ListItemIcon classes={{ root: styles.rating_icon }}>
              <RateReview />
            </ListItemIcon>
            <ListItemText>
              <Box display="flex" alignItems="flex-end">
                <Typography className={styles.rating_text}>{4.7}</Typography>
                <Rating
                  value={5}
                  precision={0.5}
                  size="medium"
                  readOnly
                  className={styles.star}
                />
                <Typography>
                  with <b>xxxxxxx</b> ratings
                </Typography>
              </Box>
            </ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon classes={{ root: styles.rating_icon }}>
              <Shop />
            </ListItemIcon>
            <ListItemText>
              <Typography>
                <b>xxxxxxx</b> people bought this course
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon classes={{ root: styles.rating_icon }}>
              <Create />
            </ListItemIcon>
            <ListItemText>
              <Typography>
                Last modified <b>22/12/2012</b>
              </Typography>
            </ListItemText>
          </ListItem>
          <Button
            className={styles.favorite_button}
            variant={favorited ? 'contained' : 'outlined'}
            color={favorited ? 'secondary' : 'inherit'}
            startIcon={favorited ? <Favorite /> : <FavoriteBorder />}
            onClick={() => setFavorited((prev) => !prev)}
          >
            {favorited ? 'In watchlist' : 'Add to Watchlist'}
          </Button>
          <Divider />
          <Box paddingTop={1} />
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar src="https://picsum.photos/64" />
            </ListItemAvatar>
            <ListItemText primary="Author name" />
          </ListItem>
          <Typography
            className={clsx(styles.shortdesc, {
              [styles.expand]: more
            })}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </Typography>
          <Box width="100%" display="flex">
            <Box flexGrow={1} />
            <Button
              size="small"
              className={styles.expand_button}
              variant="text"
              onClick={() => expand((prev) => !prev)}
              endIcon={more ? <ArrowUpward /> : <ArrowDownward />}
            >
              {more ? 'Shrink' : 'Expand'}
            </Button>
          </Box>
          <Button
            size="large"
            fullWidth
            className={styles.button_cart}
            variant="contained"
            color="primary"
            startIcon={<Shop />}
          >
            Add to card
          </Button>
        </Box>
      </Container>
    </StudentLayout>
  )
}

CourseDetail.propTypes = {
  course: PropTypes.shape({}).isRequired
}
