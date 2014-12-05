# posytif

posytif is a semi­-functional web-­based Music Player interface using HTML5 and JavaScript technologies.

In a nutshell, it's an AngularJS application in front of Firebase and Spotify Web API.

# installing

make sure npm is installed on your system. then:
```
npm install
bower install
```
this will install the dependencies. then, you can start a server with:
```
grunt serve
```
visit `localhost:9000` to use the app.

## don't want to install?

that's understandable. just grab the pre-built app here, and put it on some server that can serve static files.

# directory structure

In the root directory, the following files are present:

* `package.json`: definition of the npm module of this application, and development dependencies
* `bower.json`: declares client-side dependencies
* `Gruntfile.js`: build file

## app

This folder is the home to the application's source files. Also `index.html`, the "entry point" of the app lives here.

### app/scripts

All the JavaScript code resides here. The code is organized into folders according to its nature; controllers live in `controllers`, directives live in `directives` etc.

### app/views

All our views are here. Views are AngularJS views. Also, templates used in directives are found here, under `app/views/templates`

### app/styles

CSS files are found here. Like in `views`, styles used by directives are found here under `app/styles/templates`

## bower_components

Managed client-side libraries are stored here.

## node_modules

Managed npm modules are stored here.

## test

many, many unit tests live here.

## dist

The distributable build of the application can be found here. Generated using `grunt build`.

# General architecture

posytif is an AngularJS Single-Page Application. Pages and fragments are organized into views, who are controlled by controllers, who use services to store data, authenticate, or maintain playback state.

## Data storage

posytif uses Firebase via angularfire to store playlist data. Firebase and angularfire are really easy to use and integrate, and that was the primary reason they were selected. Three-way data binding is *sweet*.

## Authentication

Authentication, too, is provided by Firebase. Facebook, Twitter and Google log-ins via OAuth2 are available.

## Authorization

Authorization is handled by Firebase. A mis-configuration or non-configuration is a security issue. It should be configured, using Firebase console, to grant permission only to owners of playlists, for playlist operations.

## Artist, album and track data

The great Spotify Web API is used. To limit the volume of queries made to Spotify, the built-in cache of $http service is used. 

## Audio playback

No audio playback is implemented. That's because I don't know of any APIs to stream music.

# Detailed description of modules

## posytif

This is the application module. Lists the dependencies and configures the routes used in the application by mapping URL fragments to views and controllers.

The dependencies at the time of writing were:

* `firebase`: to handle communications with firebase
* `ngRoute`: to have routing capabilities required to build a SPA
* `ui.bootstrap`: to have directives such as `tabset` available in templates
* `ngAnimate`: to have angular animation support

This module is defined in `app/scripts/app.js`.

## Controllers

### MainCtrl

This is the main controller of the application. All the other controllers are nested inside this one. This way, common controller behaviour can be shared; such as queuing songs, adding to playlist or responding to login status changes.

This module is defined in `app/scripts/controllers/main.js`.

### NavigationCtrl

This controller is responsible of the left navigation menu, that contains the list of playlists.

This module is defined in `app/scripts/controllers/navigation.js`.

### AlbumCtrl

This controller controls the album page.

This module is defined in `app/scripts/controllers/album.js`.

### AlbumArtCtrl

This controller is responsible for the behaviour of the Album Art section. It holds a reference to the current playing song, allowing display of Title, Artist and Album Art. If no song is currently playing, it helpfully displays a picture of a kitten (via placekitten.com).

This module is defined in `app/scripts/controllers/albumArt.js`.

### ArtistCtrl

This controller controls the artist page.

This module is defined in `app/scripts/controllers/artist.js`.

### ControlsCtrl

This funny named controller defines the behaviour of the playback controls.

This module is defined in `app/scripts/controllers/controls.js`.

### PlaylistCtrl

This controller controls the playlist page.

This module is defined in `app/scripts/controllers/playlist.js`.

### QueueCtrl

This controller is currently not used.

This module is defined in `app/scripts/controllers/queue.js`.

### SearchCtrl

This controller controls the search page.

This module is defined in `app/scripts/controllers/search.js`.

### UserCtrl

This controller defines the authorization behaviour.

This module is defined in `app/scripts/controllers/user.js`.

## Services

### AuthService

This service uses Firebase to authorize users via OAuth2 providers such as Facebook, Twitter and Google. All its methods return promises (provided by the `$q` dependency) to handle the asynchronous operations.

It exposes the following methods:

* thirdPartyLogin
* passwordLogin
* createUserAndLogin
* logout
* getUser
* checkPersistentLoginState
* onLoginStatus

This module is defined in `app/scripts/services/auth.js`.

### PlayerService

This service maintains the playback status, such as the current song or position. As no audio playback actually occurs, playback is merely simulated, using `$interval` service. This service heavily uses the `QueueService`.

It exposes the following methods:

* getCurrent
* play
* pause
* stop
* next
* previous
* getPosition
* getState

This module is defined in `app/scripts/services/player.js`.

### PlaylistService

This service uses Firebase to store playlist data. Thanks to angularfire's `$asObject` and `$asArray` methods, the references returned by this service can be used in three-way data bindings. So, for example, a data change on the firebase console can trigger a view update in a client.

It exposes the following methods:

* getPlaylistsOfUser
* addTrackToPlaylist
* removeTrackFromPlaylist
* deletePlaylist

This module is defined in `app/scripts/services/playlist.js`.

### QueueService

This service maintains a playback queue to be mainly consumed by `PlayerService`. It keeps track of two lists as priority queues, so that the "normal" playback sequence can have "priority" songs inserted in between. The behaviour is very similar, if not identical, to that of Spotify Desktop Client.

It exposes the following methods:

* enqueue
* setQueue
* getNext
* getPrevious
* empty
* getUpcoming

This module is defined in `app/scripts/services/queue.js`.

### SpotifyService

This service makes HTTP calls to Spotify Web API, using `$http` service. All the calls are cached using the native caching capabilities of the `$http` service. This effectively eliminates duplicate HTTP requests. As the responses practically never change (in the lifetime of the application, at least), this is a very suitable caching policy.

It exposes the following functions:

* search
* getTopTracks
* getArtist
* getAlbum
* getAlbumsOfArtist
* getTracksOfAlbum

This module is defined in `app/scripts/services/spotify.js`.

## Constants

### PlayerStates

This module defines 3 constants used throughout the application to represent playback states:

* PLAYING
* PAUSED
* STOPPED

This module is defined in `app/scripts/constants/playerStates.js`.

## Directives

### pstTrack

pstTrack, or `pst-track` defines an element that represents a track. It displays the title, names of artists, name of the album and the duration. In addition to these, it provides the user with the following actions where appropriate:

* add to playlist (if logged in)
* play now
* queue (play next)
* remove from playlist (if in current playlist)

This module is defined in `app/scripts/directives/track.js`.

### confirmClick

This directive allows us to show a confirmation dialog before taking an action, such as deleting a playlist. It also uses the `sweetalert` library to show beautiful modal dialogs.

This module is defined in `app/scripts/directives/confirmClick.js`.

### highlightOnAdd

This directive provides visual feedback to the user when she adds a track to a playlist, by momentarily highlighting that playlist in the navigation bar.

This module is defined in `app/scripts/directives/highlightOnAdd.js`.

## Filters

### joinArtistNames

This filter takes a list of artists and returns their names joined with commas. This comes in handy, because all tracks returned from Spotify have an array for the `artists` property, even if there's a single artist.

This module is defined in `app/scripts/filters/joinArtistNames.js`.

### totalLength

This filter calculates the total length of a set of tracks. It merely sums the `duration_ms` field of Spotify track objects. Comes in handy in the playlist page.

This module is defined in `app/scripts/filters/totalLength.js`.

### trackCount

This filter counts the number of tracks in a playlist. Normally, this filter should have been unnecessary, but the way the playlist data is stored in Firebase prevents us to have an array of track objects in a playlist.

This module is defined in `app/scripts/filters/trackCount.js`.

## Views

### Album Page

The album page shows the album art and the track listing of the album.

This view is defined in `app/views/album.html`.

### Album Art

The album art view shows the album art of the current playing track, along with the title and artist information on top of it.

This view is defined in `app/views/album-art.html`.

### Artist Page

The artist page shows top tracks and albums of an artist.

This view is defined in `app/views/artist.html`.

### Controls

This view consists of playback control buttons, and a slider to represent the current position of the song.

This view is defined in `app/views/controls.html`.

### Navigation

This view defines the left navigation bar. The bar shows the list of playlists of the user, and an input field to allow the user to create new playlists. It expands with the number of playlists, and eventually scrolls inside itself. It also expands and gets `fixed` on scroll down.

This view is defined in `app/views/navigation.html`.

### Playlist Page

This view shows the track listing of a playlist. It also exposes the following actions to the user:

* Play playlist
* Rename playlist
* Delete playist

This view is defined in `app/views/playlist.html`.

### Queue Page

This view is currently not used.

This view is defined in `app/views/queue.html`.

### Search Page

This view, is the main view of the application. It consists of a search bar and search results. The search results are shown in 3 tabs: Tracks, Albums and Artists.

This view is defined in `app/views/search.html`.

### User

This view shows login buttons ot user information depending on the login state.

This view is defined in `app/views/user.html`.



