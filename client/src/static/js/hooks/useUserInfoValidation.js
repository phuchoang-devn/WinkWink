import { useState } from "react"

const useUserInfoValidation = () => {
    const [ validationStatus, setValidationStatus ] = useState({
        all: undefined
    });

    const validate = (userInfo, currentImage) => {
        let image = currentImage !== undefined;
        let firstname = userInfo.name.first !== "";
        let lastname = userInfo.name.last !== "";
        let age = userInfo.age !== null;
        let sex = userInfo.sex !== "";
        let country = typeof userInfo.country !== "undefined";
        let languages = userInfo.language.length !== 0;
        let prefSex = userInfo.preferences.sex !== "";

        const all = image & firstname && lastname && age && sex && country && languages && prefSex;
    
        setValidationStatus({
            all, image, firstname, lastname, age, sex, country, languages, prefSex
        });

        return all
    }

    return [ validationStatus, validate ];
}

export default useUserInfoValidation;