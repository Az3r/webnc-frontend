import React from 'react'
import PropTypes from 'prop-types'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  Container,
  Link,
  Divider,
  Box,
  Avatar
} from '@material-ui/core'
import useStyles from './category-list.style'
import NextLink from 'next/link'
import { TopicPropTypes } from '@/utils/typing'

export default function CategoryListFeature({ categories }) {
  const styles = useStyles()
  return (
    <Container component="ul">
      {categories.map((category) => (
        <li key={category.name}>
          <Box padding={1} className={styles.category}>
            <Box display="flex" alignItems="center" paddingBottom={2}>
              <Avatar
                src={category.avatar}
                alt={category.label}
                className={styles.category_avatar}
              />
              <Box padding={1} />
              <NextLink href={`/category/${category.name}`} passHref>
                <Link color="textPrimary" className={styles.category_label}>
                  {category.label}
                </Link>
              </NextLink>
            </Box>
            <Grid component="ul" container spacing={2}>
              {category.topics.map((topic) => (
                <Grid item component="li" key={topic.name} xs={6} sm={4} md={3}>
                  <NextLink
                    href={`/category/${category.name}/${topic.name}`}
                    passHref
                  >
                    <ListItem button component="a">
                      <ListItemAvatar>
                        <Avatar
                          src={topic.avatar}
                          alt={topic.label}
                          className={styles.topic_avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={topic.label}
                        primaryTypographyProps={{
                          className: styles.topic_label
                        }}
                      />
                    </ListItem>
                  </NextLink>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider />
        </li>
      ))}
    </Container>
  )
}

CategoryListFeature.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      topics: PropTypes.arrayOf(TopicPropTypes.isRequired).isRequired
    })
  ).isRequired
}
