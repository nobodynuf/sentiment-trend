import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://54.152.224.197'
});

export default instance;