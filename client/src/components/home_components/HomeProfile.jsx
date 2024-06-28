import "./styles/profile.scss";
import "../../index.scss"
import useImage from "../../static/js/hooks/useImage";
import useUserInfo, { UserInfoChange } from "../../static/js/hooks/useUserInfo";
import useUserInfoValidation from "../../static/js/hooks/useUserInfoValidation";
import QuestionMarkFlag from "../../static/image/profile/flag-question-mark.svg"
import { getSrcByCountryName } from "../../static/js/main/countries-languages";
import {
    PrefSexRadio,
    AgeSlider,
    LanguageSelect,
    CountrySelect,
    Dropdown,
    StyledTextField,
    StyledButton,
    ProfileImage,
    AlertSnackbar
} from "./profile_components";
import { useMemo } from "react";


const HomeProfile = (props) => {
    //TODO: disable submit and reset

    // here need to fetch image, when we have backend
    const [image, setImage, profileImageDiv, isImageChanged] = useImage(null);

    // here need to fetch user info, when we have backend
    // If no info was created before, initial value -> null
    const [userInfo, handleChangeValue, isInfoChanged] = useUserInfo(null);
    const fullName = userInfo.name.first + " " + userInfo.name.last;
    const [validationStatus, validate] = useUserInfoValidation();

    const handleReset = () => {
        handleChangeValue(UserInfoChange.RESET)();
        setImage(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validate(userInfo, image);
    };

    return (
        <div className="my-profile">
        
            <form className="my-profile__form" onSubmit={handleSubmit}>
                <div className="my-profile__left">
                    <div className="my-profile__left-top">
                        <ProfileImage image={image}
                            isError={validationStatus.image === false}
                            profileImageRef={profileImageDiv}
                            setImage={setImage} />
                        <h2 className="my-profile__fullname"><b>{fullName}</b></h2>
                    </div>
                    <div className="my-profile__preferences">
                        <div className="my-profile__preferences-title"><b>I want to find...</b></div>
                        <div className="my-profile__preferences-edit"
                            style={{
                                backgroundColor: validationStatus.prefSex === false ? "var(--colorError)" : null
                            }}>
                            <AgeSlider currentValue={[userInfo.preferences.age.from, userInfo.preferences.age.to]}
                                updateValue={handleChangeValue(UserInfoChange.PREF_AGE)} />
                            <PrefSexRadio currentValue={userInfo.preferences.sex} handleChange={handleChangeValue(UserInfoChange.PREF_SEX)} />
                        </div>
                    </div>
                </div>

                <div className="my-profile__right">
                    <StyledTextField label="First Name"
                        isError={validationStatus.firstname === false}
                        currentValue={userInfo.name?.first ?? ""}
                        handleChange={handleChangeValue(UserInfoChange.FIRST_NAME)} />
                    <StyledTextField label="Last Name"
                        isError={validationStatus.lastname === false}
                        currentValue={userInfo.name?.last ?? ""}
                        handleChange={handleChangeValue(UserInfoChange.LAST_NAME)} />

                    <div className="my-profile__age-and-sex">
                        <Dropdown
                            isError={validationStatus.age === false}
                            currentValue={userInfo.age ?? null}
                            label="Age"
                            options={Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18)}
                            onSelect={handleChangeValue(UserInfoChange.AGE)} />

                        <Dropdown
                            isError={validationStatus.sex === false}
                            currentValue={userInfo.sex ?? null}
                            label="Sex"
                            options={["Male", "Female", "Non-Binary"]}
                            onSelect={handleChangeValue(UserInfoChange.SEX)} />
                    </div>

                    <div className="my-profile__country">
                        {
                            userInfo.country ?
                                <img className="my-profile__country-icon"
                                    alt=""
                                    src={getSrcByCountryName(userInfo.country)} />
                                : <img className="my-profile__country-icon" alt="" src={QuestionMarkFlag} />
                        }
                        <CountrySelect isError={validationStatus.country === false}
                            currentValue={userInfo.country ?? undefined}
                            onSelectCountry={handleChangeValue(UserInfoChange.COUNTRY)} />
                    </div>

                    <LanguageSelect isError={validationStatus.languages === false}
                        currentValue={userInfo.languages}
                        updateValues={handleChangeValue(UserInfoChange.LANGUAGE)} />

                    <StyledTextField label="About me"
                        isAboutMe={true}
                        currentValue={userInfo.interests}
                        handleChange={handleChangeValue(UserInfoChange.INTERESTS)}
                    />

                    <div className="my-profile__button-group">
                        <StyledButton type="reset"
                            onClick={handleReset}
                            ortherProps={{ disabled: !isInfoChanged && !isImageChanged }}
                        >
                            <b>RESET</b>
                        </StyledButton>
                        <StyledButton type="submit"><b>SUBMIT</b></StyledButton>
                    </div>
                </div>
            </form>
            <AlertSnackbar status={useMemo(() => ({
                isOpen: typeof validationStatus.all !== "undefined",
                isSuccess: validationStatus.all
            }), [validationStatus])} />
        </div>
    );
}

export default HomeProfile;