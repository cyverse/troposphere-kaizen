# troposphere-kaizen
☁️ how you make the cloud do your bidding 

> This application is built using [Lore](http://www.lorejs.org), a convention-driven framework for 
React, built on Redux. For an overview of the project structure and architecture, please refer to the Lore 
documentation. Before beginning development on Troposphere, it's recommended you first complete the 
[Lore Quickstart](http://www.lorejs.org/quickstart/).

> Before developing on Troposphere, you'll also need to install [Node](https://nodejs.org). If you're on a Mac, we 
recommend using [nvm](https://github.com/creationix/nvm) to manage your Node installations. If you're on a Windows
machine, we recommend using [nvm-windows](https://github.com/coreybutler/nvm-windows).


## Getting Start
To get started developing on Troposphere, first clone this repository:

```sh
git clone https://github.com/lenards/troposphere-kaizen.git
```

Next install the package dependencies:.

```
npm install
```

Finally, start the development server:

```
npm start
```

A successful build will produce output similar to this:

```
webpack-dev-server --history-api-fallback --hot --env=development

Project is running at http://localhost:3000/

webpack output is served from /
404s will fallback to /index.html

Build completed in 11.5s

Hash: d4d5293a11f211db7080
Version: webpack 2.4.1
Time: 11504ms

                 Asset   Size       Chunks                    Chunk Names
  favicons/favicon.ico   33.3 kB            [emitted]
 favicon-manifest.json   877 bytes          [emitted]
assets/images/logo.png   27.7 kB            [emitted]
        bundle.main.js   4.9 MB          0  [emitted]  [big]  main
      bundle.vendor.js   1.44 MB         1  [emitted]  [big]  vendor
            index.html   4.88 kB            [emitted]

...

webpack: Compiled successfully.
```

At this point you can open up a web browser and navigate to `localhost:3000` and you should see output similar to this:

![troposphere-start-screen-drop-shadow](https://user-images.githubusercontent.com/2637399/33511669-2c7b0e6c-d6dc-11e7-9644-39377765939c.png)

Click the `Login` button in the top right to log into the application.

> *NOTE*: Before developing, you will first need to [create a CyVerse account](https://user.cyverse.org), otherwise
you won't be able to log in.


## Changing the Port of the Development Server 
The applications runs on port `3000` by default. If you need to change the port, you can do so by modifying 
the `npm start` command to look like this:

```
npm start -- --port=3001
```

That command will instruct the development server to run on port `3001` instead of the default `3000`, and the
application will now be available on `localhost:3001`.
