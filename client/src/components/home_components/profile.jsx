import { useState } from "react";
import { countries, languages } from "countries-list";

import "./styles/profile.css";
import useImage from "../../static/js/hooks/useImage";
import { users } from "../../fakeDB";
import Dropdown from "../universal_components/Dropdown";
import useUserInfo, { UserInfoChange } from "../../static/js/hooks/useUserInfo";
import { ReactComponent as CloseIcon } from "../../static/svg/close-square.svg"

const HomeProfile = (props) => {
    const [isMouseOverImage, setIsMouseOverImage] = useState(false);

    //TODO: disable submit and reset

    // here need to fetch image, when we have backend
    const [image, setImage, profileImageDiv] = useImage(null);

    // here need to fetch user info, when we have backend
    // If no info was created before, initial value -> {}
    const [userInfo, handleChangeValue] = useUserInfo(users[6]);

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

    const handleReset = () => {
        handleChangeValue(UserInfoChange.RESET)();
        setImage(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="my-profile">
            <form className="my-profile__form" onSubmit={handleSubmit}>
                <div className="my-profile__left">
                    <div className="my-profile__image"
                        ref={profileImageDiv}
                        onMouseEnter={handleHoverOnImage}
                        onMouseLeave={handleHoverOnImage}>
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

                    <div className="my-profile__name">
                        <input type="text"
                            placeholder="First Name"
                            value={userInfo.name?.first ?? ""}
                            onChange={handleChangeValue(UserInfoChange.FIRST_NAME)} />
                        <input type="text"
                            placeholder="Last Name"
                            value={userInfo.name?.last ?? ""}
                            onChange={handleChangeValue(UserInfoChange.LAST_NAME)} />
                    </div>

                    <div className="my-profile__button-group">
                        <input type="reset"
                            className="my-profile__reset"
                            onClick={handleReset} />
                        <input className="my-profile__submit" type="submit" />
                    </div>
                </div>

                <div className="my-profile__right">
                    <div className="my-profile__age-and-sex">
                        <div className="my-profile__age">
                            <label>Age</label>
                            <Dropdown
                                className={"my-profile__age-input"}
                                value={userInfo.age ?? null}
                                placeholder={userInfo.age ? null : "Choose your age"}
                                options={Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18)}
                                onSelect={handleChangeValue(UserInfoChange.AGE)} />
                        </div>
                        <div className="my-profile__sex">
                            <label>Sex</label>
                            <Dropdown
                                className={"my-profile__sex-input"}
                                value={userInfo.sex ?? null}
                                placeholder={userInfo.sex ? null : "Choose your sex"}
                                options={["male", "female", "divers"]}
                                onSelect={handleChangeValue(UserInfoChange.SEX)} />
                        </div>

                    </div>

                    <div className="my-profile__country">
                        <label>Country</label>
                        <Dropdown
                            className={"my-profile__country-input"}
                            value={userInfo.country ?? null}
                            placeholder={userInfo.country ? null : "Choose your country"}
                            options={Object.values(countries).map(country => country.name)}
                            onSelect={handleChangeValue(UserInfoChange.COUNTRY)} />
                    </div>

                    <div className="my-profile__languages">
                        <label>Languages</label>
                        <div className="my-profile__languages-container">
                            {
                                userInfo.languages?.map(language => (
                                    <div className="my-profile__choosen-language-and-delete">
                                        <div key={language}
                                            className="my-profile__choosen-language">
                                            {language}
                                        </div>
                                        <CloseIcon className="my-profile__language_delete"
                                            onClick={() => handleChangeValue(UserInfoChange.REMOVE_LANGUAGE)(language)} />
                                    </div>
                                ))
                            }
                            {
                                userInfo.languages.length < 3 ?
                                    <Dropdown
                                        className={"my-profile__language-add"}
                                        placeholder={"ADD LANGUAGE"}
                                        options={Object.values(languages).map(l => l.name).filter(l => !userInfo.languages.includes(l))}
                                        onSelect={handleChangeValue(UserInfoChange.ADD_LANGUAGE)} />
                                    : null
                            }
                        </div>
                    </div>

                    <div className="my-profile__interests">
                        <label>Interests</label>
                        <textarea
                            className="my-profile__interests-input"
                            placeholder="I like..."
                            defaultValue={userInfo.interests}
                            onChange={handleChangeValue(UserInfoChange.INTERESTS)}
                        ></textarea >
                    </div>
                </div>
            </form>

        </div>
    );
}

export default HomeProfile;