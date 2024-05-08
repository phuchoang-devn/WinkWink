import { countries, languages } from "countries-list";
import { useImmerReducer } from 'use-immer';

const UserInfoChange = {
    RESET: "all values",
    FIRST_NAME: "first name",
    LAST_NAME: "last name",
    AGE: "age",
    SEX: "sex",
    COUNTRY: "country",
    INTERESTS: "interests",
    ADD_LANGUAGE: "add language",
    REMOVE_LANGUAGE: "remove language"
}

const modifyInitialInfo = (info) => {
    return {
        ...info,
        country: countries[info.country]?.name,
        languages: info.languages?.map(l => languages[l].name) ?? []
    };
}

const useUserInfo = (info) => {
    const initialUserInfo = modifyInitialInfo(info);

    const handleChangeValue = (type) => {
        switch (type) {
            case UserInfoChange.REMOVE_LANGUAGE:
                return value => dispatchUserInfo({ type, value });
            case UserInfoChange.RESET:
                return () => dispatchUserInfo({ type });
            default:
                return event =>
                    dispatchUserInfo({
                        type,
                        value: event.target.value
                    });
        }
    }

    const userInfoReducer = (info, action) => {
        switch (action.type) {
            case UserInfoChange.RESET: 
                return initialUserInfo;
    
            case UserInfoChange.FIRST_NAME: {
                info.name.first = action.value;
                break;
            }
            case UserInfoChange.LAST_NAME: {
                info.name.last = action.value;
                break;
            }
            case UserInfoChange.AGE: {
                info.age = action.value;
                break;
            }
            case UserInfoChange.SEX: {
                info.sex = action.value;
                break;
            }
            case UserInfoChange.COUNTRY: {
                info.country = action.value;
                break;
            }
            case UserInfoChange.ADD_LANGUAGE: {
                info.languages = [...info.languages, action.value];
                break;
            }
            case UserInfoChange.REMOVE_LANGUAGE: {
                info.languages = info.languages.filter(language => language !== action.value);
                break;
            }
            case UserInfoChange.INTERESTS:{
                info.interests = action.value;
                break;
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    const [userInfo, dispatchUserInfo] = useImmerReducer(
        userInfoReducer,
        initialUserInfo
    );

    return [userInfo, handleChangeValue];

}

export default useUserInfo;

export { UserInfoChange };