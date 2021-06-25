import axios from "axios";

export const BACKEND_URL = "https://redaction-citizen.herokuapp.com"

export async function getLastArticles(page) {
    return await axios.get(`${BACKEND_URL}/blog/articles/last/${page}/`)
}

export async function getArticle(id) {
    return await axios.get(`${BACKEND_URL}/blog/search/id/${id}`)
}

export async function search(data, page) {
    return await axios.post(`${BACKEND_URL}/blog/search/${page}/`)
}