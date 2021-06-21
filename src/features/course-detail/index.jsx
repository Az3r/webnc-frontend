import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Typography,
  Container,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
  List
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
  Shop,
  VideoCall
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
        <Box paddingY={2}>
          <Typography variant="h5" className={styles.title}>
            <b>{'course title, unlimited lines'}</b>
          </Typography>
          <Box marginTop={1} />
          <ListItem disableGutters>
            <ListItemIcon classes={{ root: styles.rating_icon }}>
              <RateReview />
            </ListItemIcon>
            <ListItemText>
              <Box display="flex" alignItems="flex-end">
                <Typography className={styles.rating_text}>{4.7}</Typography>
                <Box paddingX={0.25} />
                <Rating
                  value={5}
                  precision={0.5}
                  size="medium"
                  readOnly
                  className={styles.star}
                />
                <Box paddingX={0.25} />
                <Typography variant="subtitle2">(4567891)</Typography>
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
            variant={favorited ? 'contained' : 'text'}
            color={favorited ? 'secondary' : 'inherit'}
            startIcon={favorited ? <Favorite /> : <FavoriteBorder />}
            onClick={() => setFavorited((prev) => !prev)}
          >
            Watchlist
          </Button>
          <Divider />
          <Box paddingTop={1} />
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar src="https://picsum.photos/64" />
            </ListItemAvatar>
            <ListItemText primary="Author name" />
          </ListItem>
          <LongParagraph>
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
          </LongParagraph>
          <Box paddingY={1} />
          <Box display="flex" alignItems="flex-end">
            <Typography variant="h5">
              <b>$123.45</b>
            </Typography>
            <Box paddingX={0.5} />
            <Typography variant="subtitle1" className={styles.price_origin}>
              <i>$39.44</i>
            </Typography>
            <Box paddingX={0.5} />
            <Typography variant="h5" className={styles.price_discount}>
              <i>-39%</i>
            </Typography>
          </Box>
          <Box paddingY={0.5} />
          <Button
            size="large"
            fullWidth
            className={styles.button_cart}
            variant="contained"
            color="primary"
            startIcon={<Shop />}
          >
            Add to cart
          </Button>
        </Box>
        <Divider />
        <Box paddingTop={1} />
        <Typography className={styles.header}>Course Content</Typography>
        <Paper>
          <List className={styles.preview_list}>
            <ListItem button divider>
              <ListItemIcon>
                <VideoCall />
              </ListItemIcon>
              <ListItemText
                primary="setup"
                primaryTypographyProps={{ className: styles.preview_title }}
              />
              <ListItemSecondaryAction>
                <Typography>3:21</Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VideoCall />
              </ListItemIcon>
              <ListItemText primary="Hello, World!" />
              <ListItemSecondaryAction>
                <Typography>3:21</Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <Box paddingTop={1} />
        <Typography className={styles.header}>What you will learn</Typography>
        <Box paddingTop={1} />
        <Typography className={styles.header}>Related Topics</Typography>
        <Box paddingTop={1} />
        <Typography className={styles.header}>Instructor</Typography>
        <Box display="flex" paddingY={2}>
          <Avatar className={styles.instructor_avatar} />
          <Box paddingX={1}>
            <Typography variant="h6" className={styles.instructor_name}>
              Instructor&apos;s name, 1 line, clickable
            </Typography>
            <Typography className={styles.instructor_work}>
              work, 1 line
            </Typography>
          </Box>
        </Box>
        <LongParagraph>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </LongParagraph>
        <Box paddingTop={1} />
        <Typography className={styles.header}>Reviews</Typography>
        <ul>
          <Box component="li">
            <Box display="flex" paddingY={2} alignItems="center">
              <Avatar className={styles.review_avatar} />
              <Box paddingX={1}>
                <Box display="flex">
                  <Typography
                    variant="subtitle1"
                    className={styles.review_name}
                  >
                    Review&apos;s name
                  </Typography>
                  <Box paddingLeft={1} />
                  <Typography
                    variant="subtitle1"
                    className={styles.review_time}
                  >
                    2 days ago
                  </Typography>
                </Box>
                <Rating value={5} precision={0.5} readOnly />
              </Box>
            </Box>
            <LongParagraph>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </LongParagraph>
            <Box paddingY={1}>
              <Divider />
            </Box>
          </Box>
          <Box component="li">
            <Box display="flex" paddingY={2} alignItems="center">
              <Avatar className={styles.review_avatar} />
              <Box paddingX={1}>
                <Box display="flex">
                  <Typography
                    variant="subtitle1"
                    className={styles.review_name}
                  >
                    Review&apos;s name
                  </Typography>
                  <Box paddingLeft={1} />
                  <Typography
                    variant="subtitle1"
                    className={styles.review_time}
                  >
                    2 days ago
                  </Typography>
                </Box>
                <Rating value={5} precision={0.5} readOnly />
              </Box>
            </Box>
            <LongParagraph>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </LongParagraph>
            <Box paddingY={1}>
              <Divider />
            </Box>
          </Box>
        </ul>
      </Container>
    </StudentLayout>
  )
}

CourseDetail.propTypes = {
  course: PropTypes.shape({}).isRequired
}

function LongParagraph({ children = <></> }) {
  const styles = useStyles()
  const [more, expand] = useState(false)

  return (
    <>
      <Typography
        className={clsx(styles.shortdesc, {
          [styles.expand]: more
        })}
      >
        {children}
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
    </>
  )
}

LongParagraph.propTypes = {
  children: PropTypes.node
}
