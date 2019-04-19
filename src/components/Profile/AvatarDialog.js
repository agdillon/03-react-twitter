import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadPhoto from './UploadPhoto';

export default class AvatarDialog extends React.Component {
  state = {
    open: false,
    avatarUrl: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onImageLoaded = (image) => {
    this.setState({ avatarUrl: image })
  }

  handleUpdate = () => {
    this.props.changeAvatar(this.state.avatarUrl);
    this.setState({ open: false });

    fetch('api/users/update', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ userId: this.props.userId, avatar: this.state.avatarUrl })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Avatar update successful');
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Change Avatar</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Change Avatar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update your avatar, upload a .jpg or .png.
            </DialogContentText>
             <UploadPhoto
              onImageLoaded={this.onImageLoaded}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
