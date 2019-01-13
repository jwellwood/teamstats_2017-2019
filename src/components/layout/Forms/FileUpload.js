import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
// Redux
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Spinner from '../Warnings/Spinner';

class FileUpload extends Component {
  state = {
    name: '',
    isUploading: false,
    // fileURL: this.props.defaultImg,
  };

  onUploadStart = () => {
    this.setState({ isUploading: true });
  };

  onUploadError = () => {
    this.setState({ isUploading: false });
  };

  onUploadSuccess = fileName => {
    const { firebase, dir, filename } = this.props;
    this.setState({ name: fileName, isUploading: false });
    firebase
      .storage()
      .ref(dir)
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        this.setState({ fileURL: url, name: fileName });
      });
    filename(fileName);
  };

  render() {
    const { firebase, dir, defaultImg } = this.props;
    const { isUploading, name, fileURL } = this.state;
    return (
      <div>
        <CustomUploadButton
          hidden
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref(dir)}
          onUploadStart={this.onUploadStart}
          onUploadError={this.onUploadError}
          onUploadSuccess={this.onUploadSuccess}
          style={{ color: '#9a0007', cursor: 'pointer' }}
        >
          Click <strong>here</strong> to change image
        </CustomUploadButton>

        <div style={{ marginTop: '10px' }}>
          <img style={{ width: '80px' }} src={fileURL || defaultImg} alt={name} />
        </div>
        {isUploading ? <Spinner /> : null}
      </div>
    );
  }
}

FileUpload.propTypes = {
  dir: PropTypes.string.isRequired,
  firebase: PropTypes.shape({}).isRequired,
  defaultImg: PropTypes.string.isRequired,
  filename: PropTypes.func.isRequired,
};

export default firestoreConnect()(FileUpload);
