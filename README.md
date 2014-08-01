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

`https://foursquare.com/oauth2/authenticate?client_id={YOUR APP CLIENT ID}&response_type=token&redirect_uri=1`

- You will be redirected to nowhere after authorizing your account, but that's not important.
- Now your foursquare account can trigger the Push API with the app
- Checkin on foursquare to get push notifications

### Running the server (not required, mostly for server deployment reference)
- Make a self-signed SSL cert `make-root-ca-and-certificates.sh 'yourdomain.com'`
- `sudo PUSHOVER_TOKEN={YOUR PUSHOVER APP TOKEN} NODE_ENV=production node index.js > app.log 2>&1`
