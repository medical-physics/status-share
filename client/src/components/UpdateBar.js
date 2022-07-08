import React, { Component } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

// MUI components
import {
  AppBar,
  Toolbar,
  Grid,
  Typography
} from '@mui/material'

// Redux stuff
import { connect } from 'react-redux'

const styles = {
  appBar: {
    top: 42,
    height: 40
  }
}

export class UpdateBar extends Component {
  render () {
    const { updateTime } = this.props
    return (
      <AppBar sx={styles.appBar} color='inherit'>
        <Toolbar variant='dense'>
          <Grid justify='flex-start' alignItems='center' container>
            <Grid item>
              <Typography variant='overline'>
                Last updated at: {dayjs(updateTime).format('h:mm:ss a, MMMM DD')}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  };
}

const mapStateToProps = (state) => ({
  updateTime: state.account.updateTime
})

UpdateBar.propTypes = {
  updateTime: PropTypes.instanceOf(Date)
}

export default connect(mapStateToProps)(UpdateBar)
