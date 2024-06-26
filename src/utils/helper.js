import { TOKEN, PERMISSIONS, PROFILE } from "./constant";
import * as CryptoJS from 'crypto-js';
import Swal from "sweetalert2";
import moment from 'moment';
export async function customFetch(...args) {
    let [resource, config, multipart, fullUrl] = args;
    const token = await asyncLocalStorage.getItem(TOKEN)
    // const companyID = localStorage.getItem(SELECTED_COMPANY_ID)
    // const merchantID = localStorage.getItem(SELECTED_MERCHANT_ID)

    if (!config) {
        config = {
            headers: {
                authorization: `Bearer ${token ?? null}`
            }
        }
    } else {
        config["headers"] = {
            authorization: `Bearer ${token ?? null}`
        }
    }


    if (!multipart) {
        config["headers"]["Content-Type"] = "application/json"
    }
    // if (companyID) {
    //     config["headers"]["ID-Company"] = companyID
    // }
    // if (merchantID) {
    //     config["headers"]["ID-Merchant"] = merchantID
    // }

    try {
        // request interceptor here
        const response = await fetch(fullUrl ? resource : `${import.meta.env.VITE_API_URL}/${resource}`, config);

        if (response.status !== 200) {
            var respJson = await response.json()
            throw (respJson.message)
        }

        // response interceptor here
        return response;
    } catch (error) {

        if (`${error}`.includes("token is expired")) {
            await clearStorage()
            location.href = "/login"
        }
        return Promise.reject(error)
    }


}



export async function asyncSetStorage({ token, permissions, profile }) {
    await asyncLocalStorage.setItem(TOKEN, token);
    await asyncLocalStorage.setItem(PERMISSIONS, JSON.stringify(permissions));
    await asyncLocalStorage.setItem(PROFILE, JSON.stringify(profile));
}


export async function getStoragePermissions() {
    let permissions = await asyncLocalStorage.getItem(PERMISSIONS)
    if (permissions) return JSON.parse(permissions)
    return []
}
export async function getStorageProfile() {
    let profile = await asyncLocalStorage.getItem(PROFILE)
    if (profile) return JSON.parse(profile)
    return null
}


export async function clearStorage() {
    await asyncLocalStorage.removeItem(TOKEN);
    await asyncLocalStorage.removeItem(PERMISSIONS);
}

export const asyncLocalStorage = {
    async setItem(key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, encrypt(value));
        });
    },
    async getItem(key) {
        return Promise.resolve().then(function () {
            let data = localStorage.getItem(key) || "";
            return decrypt(data) || null;
        });
    },
    async removeItem(key) {
        return Promise.resolve().then(function () {
            return localStorage.removeItem(key);
        });
    }
};


function encrypt(txt) {
    return CryptoJS.AES.encrypt(txt, import.meta.env.VITE_SECRET_KEY).toString();
}

function decrypt(txtToDecrypt) {
    return CryptoJS.AES.decrypt(txtToDecrypt, import.meta.env.VITE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

export function randomStr(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}



export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}



export function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export function numberToDuration(num) {
    let hours = Math.floor(num / 60)
    let minutes = num % 60
    return (hours ? `${hours} Jam` : '') + ' ' + (minutes ? `${minutes} Menit` : '');
}
export function stringHourToNumber(hour) {
    try {
        let split = hour.split(":")
        return (parseInt(split[0]) * 60) + parseInt(split[1])
    } catch (error) {
        return 0
    }


}