import React, { Component } from 'react'
import PropTypes from 'prop-types'

// MUI components
import {
  IconButton
} from '@mui/material'
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material'

// Redux stuff
import { connect } from 'react-redux'
import { markPresentAsync, markNotPresentAsync } from '../redux/slices/usersSlice'

/* const styles = {
    checkbox: {
        width: 10,
        height: 10
    }
}; */

export class PresenceButton extends Component {
  render () {
    const { user: { userId, present } } = this.props

    const uncheckButton = () => {
      if (!parseInt(localStorage.viewOnly)) {
        this.props.markNotPresentAsync(userId)
      }
    }

    const checkButton = () => {
      if (!parseInt(localStorage.viewOnly)) {
        this.props.markPresentAsync(userId)
      }
    }

    const presenceButton = present
      ? (
        <IconButton size='small' onClick={uncheckButton}>
          <CheckCircleIcon color='secondary' />
        </IconButton>
        )
      : (
        <IconButton size='small' onClick={checkButton}>
          <RadioButtonUncheckedIcon color='secondary' />
        </IconButton>
        )

    return (
      presenceButton
    )
  };
}

const mapStateToProps = (state) => ({
  users: state.users.users
})

const mapActionsToProps = {
  markNotPresentAsync,
  markPresentAsync
}

PresenceButton.propTypes = {
  markNotPresentAsync: PropTypes.func.isRequired,
  markPresentAsync: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(PresenceButton)
