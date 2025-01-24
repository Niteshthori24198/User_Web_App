

export const storeData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
}

export const getData = (key) => {
    return JSON.parse(localStorage.getItem(key)) || null;
}


export const storeTotalTaskCount = (key, value) => {
    localStorage.setItem(key, value);
}


export const getTotalTaskCount = (key) => {
    return JSON.parse(localStorage.getItem(key) || 0);
}