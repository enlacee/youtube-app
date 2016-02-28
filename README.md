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

### Authentication
Authentication, direccionar a esta URL para autenticar usuario, y permitir
hacer consulta de datos.
``` bash
GET https://accounts.google.com/o/oauth2/auth?client_id=778810842547-qqvoic08gga7plchr8ska7tsr5urj0d3.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost&scope=https://www.googleapis.com/auth/youtube&response_type=token
```

### Get data from current Channel
``` bash
# Variable
part				snippet,contentDetails,brandingSettings,invideoPromotion
mine				true
key					''
access_token		'' _dinamico_
# Example
GET https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,brandingSettings,invideoPromotion&mine=true&key=AIzaSyAYsa0ljjyuQwSX1LQDwQ1WRlXiBVCwOKI&access_token=ya29.lgJVK0xoA7Lq_n3mfgGIf4DevEROHXcch_nV1tNtN8cVRIyZqpoxOjH-naUjDuPOuA
```
