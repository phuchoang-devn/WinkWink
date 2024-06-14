import { useState } from "react";

const ProfileImage = ({image, isError, profileImageRef, setImage}) => {
    const [isMouseOverImage, setIsMouseOverImage] = useState(false);

    const handleHoverOnImage = () => {
        setIsMouseOverImage(state => !state);
    };

    const handleUploadedImage = (event) => {
        const { files } = event.target;
        if (files.length === 0) {
            return;
        }

        const file = files[0];
        setImage(file);
    }

    return (
        <div className="my-profile__image"
            ref={profileImageRef}
            onMouseEnter={handleHoverOnImage}
            onMouseLeave={handleHoverOnImage}
            style={isError ? {
                boxShadow:  "0 0 30px var(--colorError)"
            } : null}>
            {
                isMouseOverImage
                && <div className="my-profile__image-input">
                    <label htmlFor="home-profile-file-upload">{
                        !image ? "Upload Image" : "Change Image"
                    }</label>
                    <input id="home-profile-file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleUploadedImage} />
                </div>
            }
        </div>
    )
}

export default ProfileImage;