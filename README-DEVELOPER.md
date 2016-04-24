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

Istalar gulp para el desarrollo de la app

#### 02: Intalar `BOWER`

	npm install -g bower
	touch .bowerrc

And fill with this

	{
	  "directory": "app/bower_components"
	}


You have to create the file `.bowerrc` this indicates where installed libraries  
JavaScripr OR Css.
