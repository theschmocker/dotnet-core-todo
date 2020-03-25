import authService from './AuthorizeService';

const request = async (endpoint, options = {}) => {
    const token = await authService.getAccessToken();

    const defaultOptions = {
        method: options.method || 'GET',
        body: options.body ? JSON.stringify(options.body) : null,
        headers: !token ? {} : {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    return fetch(endpoint, defaultOptions).then(res => res.json());
}

export default request;