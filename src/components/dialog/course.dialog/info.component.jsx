import React from 'react'
import {
  Box,
  Container,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField
} from '@material-ui/core'
import NextImage from 'next/image'
import { useCreateCourse } from '.'
import { useGetCategoryV2 } from '@/utils/api'
import PriceTextField from '@/components/inputs/price.input'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ['& > *']: {
      margin: theme.spacing(2, 0)
    }
  }
}))

export default function InfoSection() {
  const styles = useStyles()
  const { info, setInfo } = useCreateCourse()
  const { title, price, discount, shortdesc, category, topic } = info

  const { data: categories } = useGetCategoryV2()
  const topics = categories.find((item) => item.id === category)?.topics || []

  return (
    <Container className={styles.root} maxWidth="md">
      <TextField
        type="range"
        label="Select Category"
        required
        select
        value={category}
        name="category"
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        {categories.map((item) => (
          <MenuItem key={item.label} value={item.id}>
            <ListItem dense disableGutters>
              <ListItemIcon>
                <NextImage src={item.avatar} width={32} height={32} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="range"
        label="Select Topic"
        required
        select
        value={topic}
        name="topic"
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, topic: e.target.value }))
        }
      >
        {topics.map((item) => (
          <MenuItem key={item.name} value={item.id}>
            <ListItem dense disableGutters>
              <ListItemIcon>
                <NextImage src={item.avatar} width={32} height={32} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Enter your Course's title"
        placeholder="My awesome course"
        value={title}
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <Box display="flex">
        <PriceTextField
          required
          name="price"
          value={price}
          onChange={(e, number) =>
            setInfo((prev) => ({ ...prev, price: number }))
          }
          label="Price"
        />
        <TextField
          required
          type="number"
          name="discount"
          value={discount}
          onChange={(e) => {
            const value = Math.min(100, Math.max(0, e.target.valueAsNumber))
            setInfo((prev) => ({ ...prev, discount: value }))
          }}
          inputProps={{ min: 0, max: 100 }}
          label="Discount"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>
          }}
        />
      </Box>
      <TextField
        value={shortdesc}
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, shortdesc: e.target.value }))
        }
        multiline
        rows={5}
        rowsMax={5}
        variant="outlined"
        placeholder="What is your course about?"
      />
    </Container>
  )
}
