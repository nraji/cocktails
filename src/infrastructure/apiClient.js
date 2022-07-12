const _get = require("lodash/get");
const axios = require("axios");
const https = require("https");

const maxRetryNumber = 3;

class ApiClient {
    #axios;
    constructor(
    ) {
        axios.defaults.timeout = 60000;
        axios.defaults.httpsAgent = new https.Agent({
            maxSockets: 10,
            keepAlive: true
        });
        axios.interceptors.response.use(
            (response) => { return response; },
            this.#retryInterceptor
        );
        this.#axios = axios;
    }

    async get(url) {
        return await this.#axios.get(url);
    }

    async #retryInterceptor(error) {
        // if we hit the maximum number of retries, stop
        if (_get(error, 'config.__retryNumber', null) === maxRetryNumber) {
            console.log(`Request failed after reaching the maximum number of ${maxRetryNumber} retries`);
            return Promise.reject(error);
        }

        const performRetry = (error.response && error.response.status === 500);

        if (performRetry) {
            let retryNumber = error.config.__retryNumber || 0;
            retryNumber++;
            error.config.__retryNumber = retryNumber;
            console.log(`Retrying this request because of retryable error. This is the ${retryNumber}. of maximum ${maxRetryNumber} retries.`);
            return axios.request(error.config);
        }
        return Promise.reject(error);
    };
}

module.exports.ApiClient = ApiClient;
