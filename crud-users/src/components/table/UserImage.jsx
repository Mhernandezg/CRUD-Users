import { useState } from 'react';

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

export default UserImage;
