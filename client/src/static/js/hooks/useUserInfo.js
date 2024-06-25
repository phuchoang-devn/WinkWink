import { countries, languages } from "countries-list";
import { useImmerReducer } from 'use-immer';
import { useUser } from "../context_providers/auth_provider";
var _ = require('lodash');

const UserInfoChange = {
    RESET: "reset",
    FIRST_NAME: "first name",
    LAST_NAME: "last name",
    AGE: "age",
    SEX: "sex",
    COUNTRY: "country",
    INTERESTS: "interests",
    LANGUAGE: "language",
    PREF_AGE: "preference of age",
    PREF_SEX: "preference of sex"
}

const modifyInitialInfo = (info) => {
    if (!info) return {
        name: {
            first: "",
            last: ""
        },
        age: null,
        sex: "",
        country: undefined,
        language: [],
        interests: "",
        preferences: {
            age: {
                from: 18,
                to: 100
            },
            sex: ""
        }
    }

    return {
        ...info,
        country: countries[info.country].name,
        language: info.language.map(l => languages[l].name)
    };
}

const useUserInfo = () => {
    const { user } = useUser();
    const initialUserInfo = modifyInitialInfo(user && _.omit(user, ['image']));

    const handleChangeValue = (type) => {
        switch (type) {
            case UserInfoChange.LANGUAGE:
            case UserInfoChange.COUNTRY:
            case UserInfoChange.PREF_AGE:
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
            case UserInfoChange.LANGUAGE: {
                info.language = action.value;
                break;
            }
            case UserInfoChange.INTERESTS: {
                info.interests = action.value;
                break;
            }
            case UserInfoChange.PREF_AGE: {
                info.preferences.age.from = action.value[0];
                info.preferences.age.to = action.value[1];
                break;
            }
            case UserInfoChange.PREF_SEX: {
                info.preferences.sex = action.value;
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

    const isInfoChanged = !_.isEqual(userInfo, initialUserInfo);

    return [userInfo, handleChangeValue, isInfoChanged];

}

export default useUserInfo;

export { UserInfoChange };