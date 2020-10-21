"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstaBasicDisplay = void 0;
const querystring = require("querystring");
const axios_1 = require("axios");
const INSTAGRAM_OAUTH_BASE_URL = 'https://api.instagram.com/oauth';
const INSTAGRAM_GRAPH_BASE_URL = 'https://graph.instagram.com';
class InstaBasicDisplay {
    constructor() {
        this.axios = axios_1.default;
        this._appId = '624517498225281';
        this._redirectUri = 'https://httpstat.us/200';
        this._appSecret = 'a32d76ae0120dea9ed74909315dc9137';
        this._code = 'IGQVJWR253VHYyeThGdDNpN2x6dlhhNDFjTUt5Q2hJR0p5M2E5Tk12Y0xwZAkMwa2c5N3lReFdXSUhkUmN5QlFQaHlGRjBUa3ZAKQktfTkd0QVBRck5MRS15UkNwUEZAKZAGUwUXVvc2RCRVB6WTk0Sk0wQwZDZD';
        this._codetvnt = 'IGQVJVZAEJ1MWxBNE9USjdEZAFFUaTdBSW9oWFZAqUnlvM1BDendveVpJTU1rTDFTLXN1VEFwbVcyeFp2QkZAjcTZA5QW5FN0JzbDVhcWNWblctdHZAmNTVpVlB5b283cVlmT1J2ZA3RHR1dTLVhsUmNqekllbgZDZD';
        this._authorizationUrl = `${INSTAGRAM_OAUTH_BASE_URL}/authorize?${querystring.stringify({
            client_id: this._appId,
            redirect_uri: this._redirectUri,
            scope: 'user_profile,user_media',
            response_type: 'code'
        })}`;
    }
    get accessToken() {
        return this._codetvnt;
    }
    get authorizationUrl() {
        return this._authorizationUrl;
    }
    getAccessToken(userCode) {
        const requestData = {
            client_id: this._appId,
            client_secret: this._appSecret,
            grant_type: 'authorization_code',
            redirect_uri: this._redirectUri,
            code: userCode
        };
        return axios_1.default
            .post(`${INSTAGRAM_OAUTH_BASE_URL}/access_token`, querystring.stringify(requestData))
            .then((res) => res.data);
    }
    retrieveLongLivedToken(accessToken) {
        const requestData = {
            grant_type: 'ig_exchange_token',
            client_secret: this._appSecret,
            access_token: accessToken
        };
        return axios_1.default
            .get(`${INSTAGRAM_GRAPH_BASE_URL}/access_token?${querystring.stringify(requestData)}`)
            .then((res) => res.data);
    }
    retrieveUserNode(accessToken, fields = 'id,username,account_type,media_count,media') {
        const requestData = {
            fields,
            access_token: accessToken
        };
        return axios_1.default.get(`${INSTAGRAM_GRAPH_BASE_URL}/me?${querystring.stringify(requestData)}`).then((res) => res.data);
    }
    retrieveUserMedia(accessToken, limit = 100, fields = 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username') {
        const requestData = {
            fields,
            limit,
            access_token: accessToken
        };
        return axios_1.default
            .get(`${INSTAGRAM_GRAPH_BASE_URL}/me/media?${querystring.stringify(requestData)}`)
            .then((res) => res.data);
    }
    retrieveMediaData(accessToken, mediaId, fields = 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username') {
        const requestData = {
            fields,
            access_token: accessToken
        };
        return axios_1.default
            .get(`${INSTAGRAM_GRAPH_BASE_URL}/${mediaId}?${querystring.stringify(requestData)}`)
            .then((res) => res.data);
    }
}
exports.InstaBasicDisplay = InstaBasicDisplay;
//# sourceMappingURL=InstaBasicDisplay.js.map