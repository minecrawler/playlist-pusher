import SpotifyWebApi from "spotify-web-api-node";
import {spotifyClientId} from "../config";

export const api = new SpotifyWebApi({
    redirectUri: window.location.href,
    clientId: spotifyClientId,
});

const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-collaborative',
];

// somehow the method does not exist on the dep, so...
export function createAuthorizeURL(api: SpotifyWebApi, scopes: string[], state: string, showDialog: boolean, responseType: string = 'token'): string {
    const url = new URL('https://accounts.spotify.com/authorize');

    url.searchParams.set('client_id', api.getClientId() ?? '');
    url.searchParams.set('response_type', responseType);
    url.searchParams.set('redirect_uri', api.getRedirectURI() ?? window.location.href);
    scopes.forEach(scope => url.searchParams.append('scope', scope));
    url.searchParams.set('state', state);
    url.searchParams.set('show_dialog', showDialog.toString());

    return url.href;
}

export function isLoggedIn(): boolean {
    const location = new URL(window.location.href);
    // @ts-ignore
    const hash = new Map<string, string>(location.hash.substring(1).split('&').map(kv => kv.split('=')));
    console.log(hash);

    if (hash.get('state') == 'doLogin') {
        localStorage.setItem('access_token', hash.get('access_token')!);
        localStorage.setItem('expires', (Date.now() + parseInt(hash.get('expires_in')!) * 1000).toString());
        window.location.replace(window.location.origin);
    }

    const isLoggedIn = !!localStorage.getItem('access_token') && new Date(parseInt(localStorage.getItem('expires')!)).getTime() > Date.now();

    if (isLoggedIn) {
        api.setAccessToken(localStorage.getItem('access_token')!);
        // todo: token refresh!
        setTimeout(() => logout(), parseInt(localStorage.getItem('expires')!) - Date.now());
    }

    return isLoggedIn;
}

export function login() {
    const authUrl = createAuthorizeURL(api, scopes, 'doLogin', true);
    window.location.assign(authUrl);
}

export function logout() {
    // todo: improve this
    localStorage.clear();
    window.location.replace(window.location.origin);
}
