# URL Shortener Microservice

A URL shortener microservice built for the freeCodeCamp APIs and Microservices certificate.

[View live project](https://url-shortener-microservice.gkhynes.repl.co)

![Screenshot of URL Shortener Microservice](https://res.cloudinary.com/gerhynes/image/upload/q_auto/f_auto/v1613767804/Screenshot_2021-02-19_URL_Shortener_Microservice_wmzjlq.png)

### Requirements

- You can POST a URL to `/api/shorturl/new` and get a JSON response with `original_url` and `short_url` properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1}`

- When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.

- If you pass an invalid URL that doesn't follow the valid `<http://www.example.com>` format, the JSON response will contain `{ error: 'invalid url' }`
