type EventType = "ready" | "appmessage" | "showConfiguration" | 
    "webviewclosed" | "message" | "postmessageconnected" | 
    "postmessagedisconnected" | "postmessageerror";

interface PostMessageEvent extends Event {
    data : any;
}

interface IPebble {

    on(
        type : "ready" | "showConfiguration" | "webviewclosed", 
        callback : (Event) => void
    );

    on(
        type : "message" | "postmessageconnected" | "postmessagedisconnected" | "postmessageerror", 
        callback : (PostMessageEvent) => void
    )

    off(
        type : "ready" | "showConfiguration" | "webviewclosed", 
        callback : (Event) => void
    );

    off(
        type : "message" | "postmessageconnected" | "postmessagedisconnected" | "postmessageerror", 
        callback : (PostMessageEvent) => void
    );

    /**
     * Show a simple modal notification on the connected watch.
     */
    showSimpleNotificationOnPebble(title : string, body : string);

    /* Sends a message to the Rocky.js component. Please be aware that
     * messages should be kept concise. Each message is queued, so
     * postMessage() can be called multiple times immediately. If there is a
     * momentary loss of connectivity, queued messages may still be
     * delivered, or automatically removed from the queue after a few
     * seconds of failed connectivity. Any transmission failures, or out of
     * memory errors will be raised via the postmessageerror event.
     *
     * Pebble.postMessage({temperature: 30, conditions: 'Sunny'});
     */
    postMessage(data : Object);

    /**
     * Get the user's timeline token for this app. This is a string and is
     * unique per user per app. Note: In order for timeline tokens to be
     * available, the app must be submitted to the Pebble appstore, but does not
     * need to be public. Read more in the 
     * [timeline guides](https://developer.pebble.com/guides/pebble-timeline/timeline-js/).
     */
    getTimelineToken(onSuccess : (token : string) => void, onFailure : () => void);

    /**
     * Subscribe the user to a timeline topic for your app. This can be used to
     * filter the different pins a user could receive according to their
     * preferences, as well as maintain groups of users.
     */
    timelineSubscribe(topic : string, onSuccess : () => void, onFailure : () => void);

    /**
     * Unsubscribe the user from a timeline topic for your app. Once
     * unsubscribed, the user will no longer receive any pins pushed to this
     * topic.
     */    
    timelineUnsubscribe(topic : string, onSuccess : () => void, onFailure : () => void);

    /**
     * Obtain a list of topics that the user is currently subscribed to. The
     * length of the list should be checked to determine whether the user is
     * subscribed to at least one topic.
     *
     * Pebble.timelineSubscriptions(function(topics) { console.log(topics); },
     * function() { console.log('error'); } );
     */
    timelineSubscriptions(onSuccess : (topics : string[]) => void, onFailure : () => void);

    /**
     * Returns a unique account token that is associated with the Pebble account
     * of the current user.
     * Returns
     *
     * @returns A string that is guaranteed to be identical across devices if the user
     * owns several Pebble or several mobile devices. From the developer's
     * perspective, the account token of a user is identical across platforms
     * and across all the developer's watchapps. If the user is not logged in,
     * this function will return an empty string ('').
     */
    getAccountToken() : string;

    /**
     * Returns a a unique token that can be used to identify a Pebble device.
     * Returns
     *
     * @returns A string that is is guaranteed to be identical for each Pebble device for
     * the same app across different mobile devices. The token is unique to your
     * app and cannot be used to track Pebble devices across applications.
     */ 
    getWatchToken() : string;

    /**
     * When an app is marked as configurable, the PebbleKit JS component must
     * implement Pebble.openURL() in the showConfiguration event handler. The
     * Pebble mobile app will launch the supplied URL to allow the user to
     * configure the watchapp or watchface. See the App Configuration guide.
     * Parameters
     *
     * @param url The URL of the static configuration page.
     */
    openUrl(url : string);
}
