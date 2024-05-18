import { countries, languages, getCountryCode } from "countries-list"

export const modifiedGetCountryCode = (country) => {
    if (country === "Cocos Islands")
        return "CC"
    if (country === "Myanmar")
        return "MM"
    else return getCountryCode(country)
}

export const getSrcByCountryCode = (countryCode) => {
    return `https://flagcdn.com/${countryCode ? countryCode.toLowerCase() : ""}.svg`
}

export const getSrcByCountryName = (country) => {
    return getSrcByCountryCode(modifiedGetCountryCode(country));
}

export const allCountries = Object.values(countries).map(country => {
    switch (country.name) {
        case "Cocos (Keeling) Islands":
            return ({
                label: "Cocos Islands",
                code: "CC"
            })
        case "Myanmar (Burma)":
            return ({
                label: "Myanmar",
                code: "MM"
            })
        default:
            return ({
                label: country.name,
                code: getCountryCode(country.name)
            })
    }
});

export const allLanguages = Object.values(languages).map(l => l.name);