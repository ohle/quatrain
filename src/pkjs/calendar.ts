import secrets = require("./secrets");
import * as req from './requests'

interface AccessToken {
    access_token : string;
    token_type : string;
    expires_in : number;
    refresh_token : string;
}

var currentToken : AccessToken = null;

function acquireInitialToken() {
    req.post(
        'https://accounts.google.com/o/oauth2/token',
        'code=' + secrets.googleCalendarAuthCode + '&client_id=' + secrets.googleClientID + '&client_secret=' + secrets.googleClientSecret
            + '&redirect_uri=urn:ietf:wg:oauth:2.0:oob&grant_type=authorization_code'
    );
    // TODO: Parse to AccessToken and set it
}

function refreshToken() {
    // see http://www.daimto.com/google-3-legged-oauth2-flow/#tc-comment-title
}

function getEvents() {
// ~ curl --header "Authorization: Bearer ya29.Glv2BTksV4GypeLAuX8EC_8njzXxd8GG1nGrKiO6vNq3o9DhhKW7eOZ6X5UFTOY9OoEsOVJ07XOLt3LSllpMEcstjSpbVAmLQPkB9azYwZSo9ARzauBkTdKDgp38" https://www.googleapis.com/calendar/v3/calendars/primary/events&timeMin=2018-07-01
    req.post(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        'timeMin=2018-07-01' // TODO
            + '&showDeleted=false'
            + '&singleEvents=true'
            + '&orderBy=startTime'
            + '&maxResults=10',
        { 'Authorization' : currentToken.token_type + ' ' + currentToken.access_token }
    );
    // TODO: Parse and handle

}


