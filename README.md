# mycolofitness
![CircleCI](https://circleci.com/gh/Natasha08/mycolofitness/tree/master.svg?style=shield&circle-token=:circle-token)
[![codecov](https://codecov.io/gh/Natasha08/mycolofitness/branch/master/graph/badge.svg)](https://codecov.io/gh/Natasha08/mycolofitness)

Nutrition and workout app: <br />
   visit <a href = "https://mycolofitness.com/login">the dev server</a> for a live running version, or follow the instructions below to run a copy on your Linux machine.

Node vs. 4.4.7

# Navigation
<ul>
<li><a href ="#clone-repo">Clone Repo</a></li><br />
<li><a href ="#database-access-file-and-schema">Database access file and schema</a></li><br />
<li><a href ="#start-the-app">Start the app</a></li><br />
<li><a href ="#testing">Testing</a></li><br />
<li><a href ="#gulp-commands">Gulp Commands</a></li><br />
</ul>
This app uses node version 4.4.7 and express middleware with angularjs.
Using the curl method to install node:
<br />
<code>$ apt-get install curl</code><br/>
<code>$ sudo-E bash -</code><br/>
<code>$ apt-get install -y nodejs</code><br/>
<p>See https://github.com/nodesource/distributions for more information</p>


# Clone Repo
<a href="#clone-repo"></a>
<code>$ git clone git@github.com:Natasha08/mycolofitness.git</code><br />
<p>#cd & install dependencies</p>
<code>$ cd mycolofitness && npm install</code><br />

This project uses the postgres database
<p>The default database name is etools. See [gist](https://gist.github.com/Natasha08/ad24aafdb437118f1fe27abad8aa817f) for example schema</p>


# Database access file and schema
<a href="#database-access-file-and-schema"></a>

## dev environment
`cp public/application.example.json public/application.json`  

This file will contain your secret info to access the database, typically a psql user you have given privileges to modify the relevant database/associated tables. Place this file in your root directory.
<h5>example</h5>
<em>db_secret.js</em><br />
<code>function db_secret() {</code><br />
	<code>var db = {};</code><br />
	<code>db.user = '';</code><br />
	<code>db.password = '';</code><br />
	<code>db.name = '';</code><br />
  <code>db.host = 'localhost';</code><br />
  <code>db.max = 10;</code><br />
  <code>db.idleTimeoutMillis = 30000;</code><br />
<code></code>
<code>return db;</code><br />
<code>}</code><br />
<code></code>
<code>module.exports = db_secret;</code><br />

## production environment
This app uses heroku postgres:

[Environmental Variables](webpack.prod.config.js)<br>
[Getting Started with Heroku Postgres](https://devcenter.heroku.com/categories/heroku-postgres)

# Start the app
<a href="#start-the-app"></a>

## dev
<code>$ yarn</code><br />

## production
<code>$ yarn start</code><br />

# Testing
<a href="#testing"></a>


### Running the tests:
<br />
<code>$ yarn test</code><br />

### integration tests:
<br />
<code>$ yarn integration-test</code><br />

# Gulp commands
<a href="#gulp-commands"></a>
