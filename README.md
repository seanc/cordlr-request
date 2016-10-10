# cordlr-request [![NPM version](https://badge.fury.io/js/cordlr-request.svg)](https://npmjs.org/package/cordlr-request) [![Build Status](https://travis-ci.org/seanc/cordlr-request.svg?branch=master)](https://travis-ci.org/seanc/cordlr-request)

> Cordlr request plugin

## Installation

```sh
$ npm install --save cordlr-request
```

Then add it to your config.

```js
{
  "plugins": [
    "cordlr-request"
  ],
  "request": {
    "format": "```{{url}}\n{{list}}```", // How should the reply be formatted
    "listFormat": "\t{{name}}: {{val}}", // How should list items be formatted
    "error": "An error occured while trying to connect to {{url}}" // How should error messages be formatted
  }
}
```

## Usage

```
request <url> [...properties]
```

You can access properties by using dot notation to access object properties,
all properties are the ones provided by the [request](https://www.npmjs.com/package/request) package.

For example,

```
request https://imsean.me statusCode request.uri.protocol
```

should yield

```
https://imsean.me
    statusCode: 200
    request.uri.protocol: https:
```

## License

MIT © [Sean Wilson](https://imsean.me)
