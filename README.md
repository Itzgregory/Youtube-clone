# LegendaryTube - YouTube Clone

## About the project

Full Stack personal project based on Youtube.

* This Youtube Clone is based on stream technology on Node Js. A stream is an abstract interface for working with streaming data. 
A stream let us to read, broadcast or download data (chunk) by means of a continuous flow.

This allows us to obtain all the information from a process when it is not possible to obtain it atomically and the message needs to be broken down to be retransmitted.

That said, it is the reason why the stream is used in video services such as YouTube, TikTok, among others.
[Stream Node Information](https://nodejs.org/api/stream.html).

+ The server is made developed on NodeJs, using Express, Busboy and MongoDb for data persistence.

+ The client was developed in Next Js, using React-Query for better information interaction.

+ Frontend and Backend have been programmed using TypeScript

We can find 5 sections throughout the project

+ Comments:
The comments section define the Logic used to save and show the comment made in a video.


+ Subscriptions:
Each video has the posibility to subscribe us to the video. This section mannage this posibility as well as views and more.

+ Users:
Although it is not necessary to be registered on the page to see the videos, if you want upload a video, give a like or subscribe to a video you will need a user. 
The users sections is in charge to carry on the logic about the users.

+ Videos:
All activity related with the videos (view, upload, update characteristics about it and more) is inside of this section.

+ Storage:
Here videos, thumbnailds and previews are saved. 

## Server Structure

Server designed with a layered architecture. The passage of information between layers is done by injection of dependencies. In this way each layer doesn't know the provider of the information, making it easier to apply changes if you wish.

This architectural pattern is composed of several separated horizontal layers that function together as a single unit of software.

For data persistence, the Dao pattern and the database provided by MongoDb have been used.

Each Dao has a model asignated. Inside the model you can find a MongoDb Schema, that will be used to exchange information with the database.

The defined Schemas are: 

+ Comments
+ Subscription
+ User
+ Videos

**The defined Dao are:**

+ Comments:
+ Subscription
+ User
+ Videos

Inside of each Dao you can find all functions and the logic used to interact with the database.

The next layer is called the "services layer", which is in charge to manipulate and modify incoming data from the controller, thus delivering clean data to the Dao.

**Service Layared:**
+ Comments:
+ Subscription
+ User
+ Videos

Above the service layer we can find the controller layer, which receives the different requests from the defined routes and proceeds to send the responses obtained from the information flow described before.

**Controller Layared:**

+ Comments:
+ Subscription
+ User
+ Videos

Finally we can find the route layer, which will be in charge of acting as an access point for information between the client and the server.

Also you can find other complementary folders such as:

+ Middleware: This folder contained the bellow folders:
  - User: Middleware that allow upload a video when a user is logged.
  - Passport: Middleware used to register and logged each user.

+ Interface: Inside this folder we can find all the interfaces used.

+ Utils:
  - Logger: Used to output the logs instead of console.log or console.error
  - Nanoid: Used to generate a video, thumbnail and preview name.
  - getElementsvideo: Using ffmpeg package, generate thumbnail and preview elements of each video.

+ Server: All the server configuration is in this folder

+ Config: Folder that containts the logical conections to the database and the enviroment variables. 

**The files inside the folders are not showm in the tree bellow** 

```
Youtube Clone
├─server
│  ├─ config
│  │  ├─ db
│  │  ├─ env
│  │  └─ index.ts
│  ├─ src
│  │  ├─ controllers
│  │  │  ├─ comments
│  │  │  ├─ subscription
│  │  │  ├─ user
│  │  │  ├─ videos
│  │  │  └─ index.ts
│  │  ├─ dal
│  │  │  ├─ dao
│  │  │  │  ├─ comments
│  │  │  │  ├─ subscription
│  │  │  │  ├─ user
│  │  │  │  ├─ videos
│  │  │  │  └─ index.ts
│  │  │  └─ dto
│  │  ├─ interface
│  │  │  ├─ comments
│  │  │  ├─ subscriber
│  │  │  ├─ user
│  │  │  ├─ video
│  │  │  └─ index.ts
│  │  ├─ middleware
│  │  │  ├─ Bcrypt
│  │  │  ├─ index.ts
│  │  │  ├─ passport
│  │  │  └─ user
│  │  ├─ models
│  │  │  ├─ comments
│  │  │  ├─ subscription
│  │  │  ├─ user
│  │  │  ├─ videos
│  │  │  └─ index.ts
│  │  ├─ routes
│  │  │  ├─ comments
│  │  │  ├─ subscription
│  │  │  ├─ user
│  │  │  ├─ videos
│  │  │  └─ index.ts
│  │  ├─ server
│  │  │  ├─ index.ts
│  │  │  └─ server.ts
│  │  ├─ service
│  │  │  ├─ comments
│  │  │  ├─ subscription
│  │  │  ├─ user
│  │  │  ├─ videos
│  │  │  └─ index.ts
│  │  └─ Utils
│  │     ├─ getElementsVideo
│  │     ├─ logger
│  │     ├─ nanoid
│  │     └─ index.ts
│  ├─ storage
│  │  ├─ previews
│  │  ├─ thumbnails
│  │  └─ videos
│  ├─ tsconfig.json
│  ├─ yarn-error.log
│  ├─ yarn.lock
│  ├─ env.d.ts
│  ├─ .env
│  ├─ package-lock.json
│  └─ package.json
└──────────────────────────────────
```

## Client Structure

Client was developed in Next Js, using React-Query and Axios Request to make petitions to the Server.
For the development of the views the mantine.dev library has been used 

[Mantine.dev Information](https://mantine.dev/pages/getting-started/).

[React-Query Information](https://react-query-v3.tanstack.com/overview).

It has a simple but well-defined structure regarding the task defined for each component.

You can find the following folders:
+ API
  - Comments
  - Subscriptions
  - User
  - Videos
Each folder contains the Axios Request from Client to Server.

+ Assets: Here you can find the different photos used in the website.

+ Components: components used inside the pages to help visualized the data. 

+ Context:
  - User
  - subscription

The context are a very common way to pass information between the different components in React.
Here is used to pass information about the user and subscription. 

+ Interface: Inside this folder we can find all the interfaces used.

+ Layout: The layout is the main style of the page. Contain the header, navbar and other attributes that will be repeted in the different pages.

+ Pages: Represent the different sections of the web.

+ Style: Customize style used in the website.

+ Types: React-Query is used to do the different Request to the Server. React-Query need keys to make these request. In this folder you can find all the keys used inside the project.


**The files inside the folders doesn't show bellow**
```
Youtube Clone
├─ client
│  ├─ .next
│  ├─ api
│  │  ├─ comments
│  │  ├─ subscriptions
│  │  ├─ user
│  │  ├─ videos
│  │  └─ index.ts
│  ├─ assets
│  ├─ components
│  │  ├─ Comments
│  │  ├─ LikeVideo
│  │  ├─ MyVideos
│  │  ├─ Subscribme
│  │  ├─ UploadVideo
│  │  ├─ Utils
│  │  ├─ VideoTeaser
│  │  └─ index.ts
│  ├─ context
│  │  ├─ subscription
│  │  ├─ user
│  │  └─ index.ts
│  ├─ interface
│  │  ├─ comment
│  │  ├─ subscription
│  │  ├─ user
│  │  ├─videos
│  │  └─ index.ts
│  ├─ Layout
│  │  └─ Layout.tsx
│  ├─ pages
│  │  ├─ subs
│  │  ├─ videos
│  │  ├─ watch
│  │  ├─ _app.tsx
│  │  ├─ _document.tsx
│  │  └─ index.tsx
│  ├─ public
│  ├─ README.md
│  ├─ styles
│  ├─ tsconfig.json
│  ├─ types
│  ├─ next-env.d.ts
│  ├─ next.config.js
│  ├─ package.json
│  ├─ .env.local
│  ├─ .eslintrc.json
│  └─ yarn.lock
└───────────────────────────
```



## Navegation

### Home

Here you can see all the videos charged on the page and select one. If you run the mouse pointer over the video, a random preview of the video will start playing.

**_SSR was applied in this section._**

### Video section
When a video is clicked, the user is redirected to the video section and the video will play automatically. 

In this section you can also find and make comments, like and subscribe to the video. 

In addition, 1 is added to the number of visits to the video, in this way all users will be able to know how many visits the video has. This information can also be seen by the user who uploaded the video in the "my videos section".

You can also find all the information of the video such as:
- Published date.
- Time since the video was published.
- User who published the video.
- Like button.
- Subscription button.
- Users comments about the video.
Other information related to the video is detailed in this section.

If a user likes the video, 1 is added to like counter. If two users give Like to the video, the counter now will be 2 and it will be the same with subsequent users. This information can be observed at any time and by any user who enters the video.

Also, you can write a comment about the video. 
If you enjoyed the video, please give your comment and apply like it!!


### Login with Google button
To upload videos, give like or subscribe to a video, you must be logged. 

In the navbar you can find a Login with Google button. In a simple step you can login in our page with a google account. 

After the login the button change and in its place an avatar will appear with the photo that you have configurated in your google account. If you click in your photo a little menu will open and you will be able to see the logout option.


### Upload video
When you are logged, in the navbar you can find a upload video button. 

When is clicked a modal window will open and allow you to load the video (You can drag the video here or select a video from a specific folder). 

When the video upload is complete, you can write the information about it such as title, description, decide if you want to publish the video in this moment or not (this attribute could be changed from the my videos section) and choose a custom thumbnail for the video. If a thumbnail is not selected, would be automatically generated from a section of the video. Also a preview video is automatically generated too.


### MyVideos
All the videos upload for you will be inside this sections, including those that you have decided not to publish but have uploaded in your page.

From this section you can find all the information about your video, check the views, likes and comments, change the visibility of your video or delete it if you wish. 
Also you can play any of your own videos.

When a video is deleted, all information about it is ereased too, such us comments and subscriptions. This means that the user subscribed on the video and all comments made about it will be ereased from the database.
Also the video, thumbnail and preview will be deleted too from the server.

## MySubs
All the videos to which you subscribe can be found in this section.

## Dependencies

* Server side:
  * "dependencies": {
    * "@ffmpeg-installer/ffmpeg": "^1.1.0",
    * "@mantine/form": "^5.9.5",
    * "bcrypt": "^5.1.0",
    * "busboy": "^1.6.0",
    * "cloudinary": "^1.33.0",
    * "connect-mongo": "^4.6.0",
    * "cookie-parser": "^1.4.6",
    * "cors": "^2.8.5",
    * "dotenv": "^16.0.3",
    * "express": "^4.18.2",
    * "express-session": "^1.17.3",
    * "fluent-ffmpeg": "^2.1.2",
    * "get-video-duration": "^4.1.0",
    * "helmet": "^6.0.1",
    * "http-status-codes": "^2.2.0",
    * "mongoose": "^6.8.1",
    * "nanoid": "3.3.4",
    * "nodemon": "^2.0.20",
    * "passport": "^0.6.0",
    * "passport-google-oauth20": "^2.0.0",
    * "pino": "^8.8.0"

  * "devDependencies": {
    * "@types/bcrypt": "^5.0.0",
    * "@types/busboy": "^1.5.0",
    * "@types/cookie-parser": "^1.4.3",
    * "@types/cors": "^2.8.13",
    * "@types/express": "^4.17.15",
    * "@types/express-session": "^1.17.5",
    * "@types/fluent-ffmpeg": "^2.1.20",
    * "@types/passport": "^1.0.11",
    * "@types/passport-google-oauth20": "^2.0.11",
    * "pino-pretty": "^9.1.1",
    * "ts-node": "^10.9.1",
    * "typescript": "^4.9.4"
  }


* Client Side: 
  - "@emotion/react": "^11.10.5",
  - "@emotion/server": "^11.10.0",
  - "@mantine/core": "^5.10.0",
  - "@mantine/dropzone": "^5.10.0",
  - "@mantine/form": "^5.10.0",
  - "@mantine/hooks": "^5.10.0",
  - "@mantine/next": "^5.10.0",
  - "@mantine/notifications": "^5.10.0",
  - "@next/font": "13.1.1",
  - "@types/node": "18.11.18",
  - "@types/react": "18.0.26",
  - "@types/react-dom": "18.0.10",
  - "axios": "^1.2.2",
  - "eslint": "8.31.0",
  - "eslint-config-next": "13.1.1",
  - "moment": "^2.29.4",
  - "next": "13.1.1",
  - "react": "18.2.0",
  - "react-dom": "18.2.0",
  - "react-moment": "^1.1.2",
  - "react-query": "^3.39.2",
  - "tabler-icons-react": "^1.56.0",
  - "typescript": "4.9.4"
 



### `Scripts`
- Server
  - "start:dev": "nodemon --exec ts-node src/server/index.ts", --> Start in nodemon mode.
  - "start": "ts-node src/server/index.ts" --> Start the server

- Client 
  - "dev: "next dev",
  - "build": "next build",
  - "start": "next start",
  - "lint": "next lint"


## Bellow you can see some actions in our page.

## View a video without user.
![View a video without user](client/assets/view%20video%20without%20user.gif)

## Login, upload a video, subscribe and like a video.
![Sign in, upload a video, subscribe and like a video](client/assets/login%2C%20upload%20video%2C%20subscribed%20and%20like.gif)

## Upload a video with custom thumbnail.
![Upload a video with custom thumbnail](client/assets/upload%20video%20with%20custom%20thumbnail.gif)

## My subscription section.
![My subscription section](client/assets/my%20subscription%20section.gif)

## My video Section - Changing the visibility of the video.
![My video Section - Changing the visibility of the video.](client/assets/my%20video%20section%20-%20changing%20published.gif)

## Deleting a video.
![Deleting a video](client/assets/deleting%20a%20video.gif)

## Logout User.
![Logout User](client/assets/logout%20user.gif)


## ENV DATA
If you need the .env files to test the project, please let me know.

You can write me an email to oparagregory7@gmail.com

## Next Js Documentation

[Next Js Documentation](https://nextjs.org/docs/getting-started).

[Node Js documentation](https://nodejs.org/en/docs/).

[Typescript documentation](https://www.typescriptlang.org/docs/).

