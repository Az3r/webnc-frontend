import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, Typography } from '@material-ui/core'
import { useCreateCourse } from '.'
import ConfirmDialog from '../confirm.dialog'

export default function SettingSection() {
  const { onRemoveCourse, statusId, setStatusId } = useCreateCourse()
  const [dialog, setDialog] = useState(false)

  return (
    <Container maxWidth="sm">
      <Typography>
        Mark this lecture as completed{' '}
        <Checkbox
          checked={statusId === 1}
          onChange={(e) => setStatusId(e.target.checked ? 1 : 2)}
        />
      </Typography>

      <Box color="error.main">
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => setDialog(true)}
        >
          Delete this lecture
        </Button>
      </Box>
      <ConfirmDialog
        title="Deleting Course"
        message="Are you sure you want to delete this course, this action is irreversible?"
        open={dialog}
        onClose={() => setDialog(false)}
        onConfirm={onRemoveCourse}
      />
    </Container>
  )
}
