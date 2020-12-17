import * as express from "express";
import * as querystring from 'querystring';
import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

const INSTAGRAM_OAUTH_BASE_URL = 'https://api.instagram.com/oauth'
const INSTAGRAM_GRAPH_BASE_URL = 'https://graph.instagram.com'

export class InstaBasicDisplay {
    private axios: AxiosInstance = axios;

    private _appId: string = '624517498225281';
    private _redirectUri: string = 'https://httpstat.us/200';
    private _appSecret: string = 'a32d76ae0120dea9ed74909315dc9137';
    private _code: string = 'IGQVJWR253VHYyeThGdDNpN2x6dlhhNDFjTUt5Q2hJR0p5M2E5Tk12Y0xwZAkMwa2c5N3lReFdXSUhkUmN5QlFQaHlGRjBUa3ZAKQktfTkd0QVBRck5MRS15UkNwUEZAKZAGUwUXVvc2RCRVB6WTk0Sk0wQwZDZD';
    private _codetvntOld: string = 'IGQVJVZAEJ1MWxBNE9USjdEZAFFUaTdBSW9oWFZAqUnlvM1BDendveVpJTU1rTDFTLXN1VEFwbVcyeFp2QkZAjcTZA5QW5FN0JzbDVhcWNWblctdHZAmNTVpVlB5b283cVlmT1J2ZA3RHR1dTLVhsUmNqekllbgZDZD';
    private _codetvnt: string = 'IGQVJWS3NTTDVORmNOMGFOMFpCUzFmYWVuMWdteEpxcVpBdkFTX2ZAfcHZAOXzBFUGpmUnNDQmJWb3ExNmtTTVc0ZA183WkM2OTktMDd5M053OHhQS3dlOG1ocS1UZAE5ZAcnZATc25jZAG94NXJOLUFKeDBJZAgZDZD';
    public get accessToken(): string {
        return this._codetvnt;
    }


    private _authorizationUrl: string;
    get authorizationUrl(): string {
        return this._authorizationUrl
    }

    constructor() {
        this._authorizationUrl = `${INSTAGRAM_OAUTH_BASE_URL}/authorize?${querystring.stringify({
            client_id: this._appId,
            redirect_uri: this._redirectUri,
            scope: 'user_profile,user_media',
            response_type: 'code'
        })}`
    }

    getAccessToken(userCode): Promise<any> {
        const requestData = {
            client_id: this._appId,
            client_secret: this._appSecret,
            grant_type: 'authorization_code',
            redirect_uri: this._redirectUri,
            code: userCode
        }
        return axios
            .post(`${INSTAGRAM_OAUTH_BASE_URL}/access_token`, querystring.stringify(requestData))
            .then((res) => res.data)
    }

    retrieveLongLivedToken(accessToken): Promise<any> {
        const requestData = {
            grant_type: 'ig_exchange_token',
            client_secret: this._appSecret,
            access_token: accessToken
        }

        return axios
            .get(`${INSTAGRAM_GRAPH_BASE_URL}/access_token?${querystring.stringify(requestData)}`)
            .then((res) => res.data)
    }

    retrieveUserNode(accessToken, fields = 'id,username,account_type,media_count,media'): Promise<any> {
        const requestData = {
            fields,
            access_token: accessToken
        }

        return axios.get(`${INSTAGRAM_GRAPH_BASE_URL}/me?${querystring.stringify(requestData)}`).then((res) => res.data)
    }

    retrieveUserMedia(
        accessToken,
        limit = 100,
        fields = 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username'
    ): Promise<any> {
        const requestData = {
            fields,
            limit,
            access_token: accessToken
        }

        return axios
            .get(`${INSTAGRAM_GRAPH_BASE_URL}/me/media?${querystring.stringify(requestData)}`)
            .then((res) => res.data)
    }

    retrieveMediaData(
        accessToken,
        mediaId,
        fields = 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username'
    ): Promise<any> {
        const requestData = {
            fields,
            access_token: accessToken
        }

        return axios
            .get(`${INSTAGRAM_GRAPH_BASE_URL}/${mediaId}?${querystring.stringify(requestData)}`)
            .then((res) => res.data)
    }





}
