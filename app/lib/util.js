import axios from "axios";

export const BACKEND_URL = "http://192.168.1.25:8000"

export async function getLastArticles(page) {
    return await axios.get(`${BACKEND_URL}/blog/articles/last/${page}`)
}

export async function getArticle(id) {
    return await axios.get(`${BACKEND_URL}/blog/search/id/${id}`)
}