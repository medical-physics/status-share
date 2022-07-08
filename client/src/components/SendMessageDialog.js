import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material'
import {
  Close as CloseIcon,
  Send as SendIcon,
  AccountBox as AccountBoxIcon,
  AlternateEmail as AlternateEmailIcon
} from '@mui/icons-material'

// Redux stuff
import { connect } from 'react-redux'
import { addMessageAsync } from '../redux/slices/mailboxSlice'

const styles = {
  closeButton: {
    textAlign: 'center',
    position: 'absolute',
    left: '92%',
    marginTop: 7
  },
  icon: {
    margin: '1px 8px auto 8px'
  },
  dialogContent: {
    height: 350
  },
  buttonIcon: {
    margin: 'auto 5px auto auto'
  }
}

export class SendMessageDialog extends Component {
  state = {
    open: false,
    senderName: '',
    senderContact: '',
    subject: '',
    message: ''
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.setState({
      open: false,
      senderName: '',
      senderContact: '',
      subject: '',
      message: ''
    })
    this.props.onClose()
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newMessageData = {
      senderName: this.state.senderName.trim(),
      senderContact: this.state.senderContact.trim(),
      subject: this.state.subject.trim(),
      message: this.state.message.trim()
    }
    this.props.addMessageAsync({ newMessageData, userId: this.props.userId })
    this.handleClose()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { user } = this.props

    return (
      <>
        <Button onClick={this.handleOpen} style={{ color: '#388e3c' }} variant='outlined'>
          <SendIcon sx={styles.buttonIcon} /> message
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
          <IconButton onClick={this.handleClose} sx={styles.closeButton} size='small'>
            <CloseIcon />
          </IconButton>
          <DialogTitle>
            Send message to {user.name}
          </DialogTitle>
          <form>
            <DialogContent sx={styles.dialogContent}>
              <TextField
                id='senderName'
                name='senderName'
                type='senderName'
                label='Sender Name'
                value={this.state.senderName}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                          <AccountBoxIcon style={{ color: '#388e3c' }} />
                        </InputAdornment>
                  )
                }}
              />
              <TextField
                id='senderContact'
                name='senderContact'
                type='senderContact'
                label='Sender Contact'
                value={this.state.senderContact}
                onChange={this.handleChange}
                fullWidth
                style={{ marginTop: '12px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                          <AlternateEmailIcon style={{ color: '#388e3c' }} />
                        </InputAdornment>
                  )
                }}
              />
              <TextField
                id='subject'
                name='subject'
                type='subject'
                label='Subject'
                value={this.state.subject}
                onChange={this.handleChange}
                fullWidth
                style={{ marginTop: '40px' }}
                variant='outlined'
              />
              <TextField
                id='message'
                name='message'
                type='message'
                label='Message'
                variant='filled'
                multiline
                rows='4'
                value={this.state.message}
                onChange={this.handleChange}
                fullWidth
                style={{ marginTop: '9px' }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmit} variant='outlined' style={{ color: '#388e3c' }} type='submit'>
                <SendIcon sx={styles.icon} />send
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  UI: state.UI
})

const mapActionsToProps = {
  addMessageAsync
}

SendMessageDialog.propTypes = {
  addMessageAsync: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(SendMessageDialog)
