import axios from 'axios';

const serverURL = "http://54.152.224.197"
const localURL = "http://127.0.0.1:5000"

const instance = axios.create({
    baseURL : serverURL
});

export default instance;