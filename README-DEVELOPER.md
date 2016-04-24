# APP

App for share music and videos

### npm without sudo

[How to use npm without sudo](https://goo.gl/3rf2Kl)

### Desarrollo

Chek if we have installed the next dependencies

	node 4.3.x


#### 01: Crear proyecto `NPM` y `GULP`

	npm init

 Creating the file `package.json` : where we store the dependencies

	npm install --global gulp-cli

Instalar gulp en el servidor CLI

	npm install --save-dev gulp

Install gulp for this project

#### 02: Install `BOWER`

	npm install -g bower
	touch .bowerrc

And fill with this

	{
	  "directory": "app/bower_components"
	}


You have to create the file `.bowerrc` this indicates where installed libraries  
JavaScripr OR Css.

#### 03: Install Virtual Environment `python`

This project use `Flask` as server web

Create Environment

	pyvenv ENV

Enabled Environment

	cd ENV
	souce bin/activate

Create list of packages install there!  
`requirements.txt` store this dependencies

	pip freeze > requirements.txt

Install all dependencies libraries python  
Easy Install

	pip install -r requirements.txt