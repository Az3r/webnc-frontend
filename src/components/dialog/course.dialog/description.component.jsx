import React, { useState } from 'react'
import { Editor, Presenter } from '@/components/markdown'
import { Grid, makeStyles } from '@material-ui/core'
import { useCreateCourse } from '.'

const useStyles = makeStyles({
  root: {
    height: '100%'
  }
})

export default function DescriptionSection() {
  const { longdesc, setLongdesc } = useCreateCourse()
  const [text] = useState(longdesc)
  const styles = useStyles()
  return (
    <Grid container spacing={2} className={styles.root}>
      <Grid item lg={6} xs={12}>
        <Editor
          height={730}
          defaultValue={text}
          onChange={(text) => setLongdesc(text)}
        />
      </Grid>
      <Grid item lg={6} xs={12}>
        <Presenter value={longdesc} height={730} overflow="scroll" />
      </Grid>
    </Grid>
  )
}
