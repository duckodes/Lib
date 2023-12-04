const CLIENT_ID = '759707094526-rbodqs1pg8r2a8igkvstf05dnrrp17gb.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBKBn3FbJyLj8z60Qcrdaxgm-HZMAAllVo';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';
let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    startRequest();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
    });
    gisInited = true;
    startRequest();
}

function startRequest() {
    if (gapiInited && gisInited) {
        requestcallback();
    }
}
function requestcallback() {
    if (localStorage.getItem("wantautologin") === "1") {
        tokenClient.requestAccessToken({ prompt: '' });
        const nw = window.open('', '_blank');
        nw.document.write('<html><body>新窗口</body></html>');
        nw.close();
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
        };
    }
}

function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        fileutils.ReadFileText('Resource/Private.Link.net/private=link=all.lock', (token) => {
            window.location.href = token;
            localStorage.setItem("wantautologin", "1");
        });
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        localStorage.removeItem("wantautologin");
    }
}