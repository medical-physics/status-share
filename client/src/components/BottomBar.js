import React, { Component } from 'react'
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
    top: 'auto',
    bottom: 0
  }
}

export class BottomBar extends Component {
  render () {
    const { truncatedAppName } = this.props
    const text = truncatedAppName
      ? (
        <Typography variant='overline'>
          © 2020 BC Cancer: Medical Physics...
        </Typography>
        )
      : (
        <Typography variant='overline'>
          © 2020 BC Cancer: Medical Physics. All rights reserved.
        </Typography>
        )
    return (
      <AppBar sx={styles.appBar} color='inherit' position='fixed'>
        <Toolbar variant='dense'>
          <Grid justify='flex-start' container>
            <Grid item>
              {text}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  };
}

const mapStateToProps = (state) => ({
  truncatedAppName: state.account.truncatedAppName
})

BottomBar.propTypes = {
  truncatedAppName: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(BottomBar)
