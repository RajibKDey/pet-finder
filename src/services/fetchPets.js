import { BASE_URL } from '../constants'

export const fetchPets = async (params) => {
    const url = new URL(BASE_URL);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    const res = await response.json();
    return res;
}