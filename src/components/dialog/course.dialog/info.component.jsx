import React from 'react'
import {
  Box,
  Container,
  InputAdornment,
  ListItemIcon,
  makeStyles,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core'
import NextImage from 'next/image'
import { useCreateCourse } from '.'
import { useGetCategory } from '@/utils/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ['& > *']: {
      margin: theme.spacing(2, 0)
    }
  }
}))

const categories = [
  { id: 1, label: 'Web Development', icon: '/images/category/web.webp' },
  { id: 2, label: 'Mobile Development', icon: '/images/category/mobile.webp' }
]
export default function InfoSection() {
  const styles = useStyles()
  const { info, setInfo } = useCreateCourse()
  const { title, price, discount, shortdesc, category, topic } = info

  const { data: topics } = useGetCategory(category)

  const formatter = new Intl.NumberFormat()
  const formattedPrice = formatter.format(price)
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
            <ListItemIcon>
              <NextImage src={item.icon} width={32} height={32} />
            </ListItemIcon>
            <Typography variant="inherit">{item.label}</Typography>
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
            <ListItemIcon>
              <NextImage src={item.avatar} width={32} height={32} />
            </ListItemIcon>
            <Typography variant="inherit">{item.label}</Typography>
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
        <TextField
          required
          name="price"
          value={formattedPrice === 'NaN' ? 0 : formattedPrice}
          onChange={(e) => {
            const number = Number(e.target.value.replace(/[.,-]/, ''))
            setInfo((prev) => ({ ...prev, price: number }))
          }}
          label="Price"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
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
