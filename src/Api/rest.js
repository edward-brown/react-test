/**
 * Makes a http request
 *
 * @param {String} method Http method
 * @param {String} url Request Url
 * @param {Object} data Request Data
 * @param {Object} headers Request Headers
 */
const httpRequest = async (method, url, data = null, headers = {}) => {
    var result = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    result.data = await result.json();
    return result;
};

/**
 * Makes a http GET request to the given url
 *
 * @param {String} url Request Url
 */
export const get = async (url) => {
    return await httpRequest("GET", url);
};
