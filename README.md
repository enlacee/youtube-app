# Youtube Scrap
Consumir datos de Google `Google+, Youtube`

## Entorno de Desarrollo
Detener el servicio de apache, ya que la ruta configurada en [google console](https://console.developers.google.com/) se configuro la URL: http://localhost
``` bash
sudo /etc/init.d/apache2 stop
```

Crear servidor con PHP, solo para pruebas
``` shell
sudo php -S localhost:80
```

### 01 Authentication
fuente [authentication google](https://developers.google.com/identity/sign-in/web/reference#googleusergetauthresponse)
Authentication, direccionar a esta URL para autenticar usuario, y permitir
hacer consulta de datos.
``` bash
GET https://accounts.google.com/o/oauth2/auth?client_id=778810842547-qqvoic08gga7plchr8ska7tsr5urj0d3.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost&scope=https://www.googleapis.com/auth/youtube&response_type=token
```

### 02 Get data from current Channel
[01 fuente](https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps)  
[02 auth youtube v3](https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps#Obtaining_Access_Tokens)  

``` bash
# Variable
part				snippet,contentDetails,brandingSettings,invideoPromotion
mine				true
key					''
access_token		'' #_dinamico_
# Example
GET https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,brandingSettings,invideoPromotion&mine=true&key=AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI&access_token=ya29.lgJVK0xoA7Lq_n3mfgGIf4DevEROHXcch_nV1tNtN8cVRIyZqpoxOjH-naUjDuPOuA
```

### 03 Verificar permisos *Auth*
``` bash
# Variable
access_token		''
# Example
GET https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ya29.lgLgeBAq5JBflrEwv4S-9m34nVO-aQ11ZKAMW1O0C0_WS5XHu5657Zm5KGx-68mo09k
```

### 04 Integrating Google Sign-In into your web app
source [link](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin)

### 05 Favorites List
``` bash
# Variable
part			part
playlistId		'FLvPN2SvwQ6Vqfd1HMHYcceA' # example

GET https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=FLvPN2SvwQ6Vqfd1HMHYcceA&key={YOUR_API_KEY}
```

### Get data video
Los videos se clasifican por ditintas categorias la categoria de musica es el numero `10`

``` bash
GET
part			snippet,contentDetails,statistics,status
key				'' # key de tu applicacion youtube
id				'oXGm9Vlfx4w' # id del video de youtube
https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&key=AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI&id=oXGm9Vlfx4w
```

### test YOUTUBE-DL

``` shell
# El formato como se creara el archivo
youtube-dl -o '%(title)s-%(id)s.%(ext)s' "https://www.youtube.com/watch?v=RfkcI8dhfsQ"
# obtener la URL del sonido
youtube-dl -f 249 -g https://www.youtube.com/watch?v=FjNdYp2gXRY
# obtener la URL del video
youtube-dl -f webm -g https://www.youtube.com/watch?v=FjNdYp2gXRY
# Obtener muchos datos basicos en json
youtube-dl --dump-single-json "https://www.youtube.com/watch?v=Ahha3Cqe_fk"
# Descargar thumbnail del video

# Descargar MP3
youtube-dl --extract-audio --audio-format mp3 https://www.youtube.com/watch?v=5D4kSVcELjM
```

### test: hacer busqueda en pyhon youtubeAPI

[api youtube with python](https://developers.google.com/youtube/v3/guides/searching_by_topic?hl=es#Sample_Code)  

https://developers.google.com/youtube/v3/code_samples/#php
