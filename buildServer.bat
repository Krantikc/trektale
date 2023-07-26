echo off
cd C:\Workspace\Personal\trektale-server\

if [%1]==[] goto :login && :deploy

if [%1]==[deploy] goto :deploy

:login
echo ****** Login to Heroku ******
heroku login

echo ****** Waiting for Heroku Login ******
pause

:deploy
git add index.js
git commit -am "Server deployment"
git push heroku master
heroku logout