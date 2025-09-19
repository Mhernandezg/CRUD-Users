import { useState } from 'react';
import PropTypes from 'prop-types';

const UserImage = ({ image, altImage, backUpImage }) => {
  const [imgSrc, setImgSrc] = useState(image);
  return (
    <img
      src={imgSrc}
      alt={altImage}
      onError={() => setImgSrc(backUpImage)}
      className="user-avatar"
    />
  );
};

UserImage.propTypes = {
  image: PropTypes.string.isRequired,
  altImage: PropTypes.string,
  backUpImage: PropTypes.string,
};

export default UserImage;
