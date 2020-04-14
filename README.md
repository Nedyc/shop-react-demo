# About the app
This is a shop demo App made with react. The user has a sandbox where he can show, create and delete items from their shop.<br />
I've used the localStorage to save the first api call that gets the name of the store back in order to prevent too many calls to server but
be aware that a real application would use axiom cache instad.
Also, due to the test nature of the app I've preferred to use the localStorage to 'remember' the user login instead of a cookie.
If the items list api call fails due to connections problems it loads a list of test items.

<br />

# How to install
In order to use this app you need to download the latest versions of:<br />
**NodeJS:** [https://nodejs.org/](https://nodejs.org/)<br />
**Git:** [https://git-scm.com/](https://git-scm.com/)<br /><br />

After the installation open gitbash and clone the project running this command:
```
git clone https://github.com/Nedyc/shop-react-demo.git shop-app
```

Then access the folder
```
cd shop-app
```

And install all the dependences with npm
```
npm install
```

Finally you can run the app
```
npm start
```

<br />

# Libraries
This web app is made using:
- React 16.13.1
- Bootstrap 4 
- Fontawesome 5
- Animate css
- chart.js

<br />

# API
The api used in this app are stored on http://us-central1-test-b7665.cloudfunctions.net/api/.

<br />

# Components structure
Components are placed in the **/components** folder and structured in 3 main subfolders: backoffice, frontoffice and common (such as aler, loader, modal...)
<br />

# App sections
This is how the project looks like
## Home
![ScreenShot-1](http://www.shamancake.com/github-2/1.png)
A fake homepage with a countdown components

## Login
![ScreenShot-1](http://www.shamancake.com/github-2/2.png)
The login for the backoffice

## Dashboard
![ScreenShot-1](http://www.shamancake.com/github-2/3.png)
A dashboard with the category polar chart

## Product Page
![ScreenShot-1](http://www.shamancake.com/github-2/4.png)
The page with the product list where the user can search, add or delete each of them
