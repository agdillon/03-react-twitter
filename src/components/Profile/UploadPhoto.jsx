import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UploadPhoto extends Component {
  handleLoadPhoto = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    let file = event.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.props.onImageLoaded(reader.result);
      }
    }
    else {
      alert('File uploaded is not valid.');
    }
  }

  render() {
    return (
      <div>
        <label
          className="upload-file"
          htmlFor="my-upload-btn"
        >
          <input
            id="my-upload-btn"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={this.handleLoadPhoto}
          />
        </label>
      </div>
    );
  }
}

UploadPhoto.propTypes = {
    onImageLoaded: PropTypes.func.isRequired,
};

export default UploadPhoto;
