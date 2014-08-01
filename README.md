## Foursquare OSM Alerts

Get a push notification when you check in on Foursquare at a place that's not mapped on OSM.

## Configuration
- This is kind of a pain
- Setup a Pushover account
- Get your Pushover user token
- Login to the [Foursquare Developer Console](https://foursquare.com/developers/apps) and create a new webhook app
- Create a new App
- Give it any 'Welcome' URL
- Enable the Push API and select "Push checkins by this app's users"
- Use the endpoint `https://alerts.pushpinosm.org/user/{YOUR PUSHOVER USER TOKEN}`
- After you've created your app, get the 'Client id' of the app
- Add your own Foursquare account to your own app using OAuth by visiting this URL (make sure to replace your client id in the URL):

`https://foursquare.com/oauth2/authenticate?client_id={YOUR APP CLIENT ID}&response_type=token&redirect_uri=https://github.com/zhm/foursquare-osm-alerts`

- You will be redirected back to this repo, but that's not important.
- Now your foursquare account can trigger the Push API with the app
- Checkin on foursquare to get push notifications
