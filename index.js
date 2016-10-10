const req = require('request');
const pixie = require('pixie');
const valid = require('valid-url').isUri;
const find = require('deep-find');

function request(bot, config) {
  config = config[request.name] || {};
  const format = config.format || '```{{url}}\n{{list}}```';
  const listFormat = config.listFormat || '\t{{name}}: {{val}}';
  const error = config.error || 'An error occured while trying to connect to {{url}}';

  return function run(message, args) {
    if (!args.length) return bot.reply('Invalid arguments provided');

    const url = args[0];
    if (!valid(url)) return bot.reply('Invalid url provided');

    req(url, (err, res, body) => {
      if (err) {
        console.log(err);
        return bot.reply(pixie.render(error, {url}))
      }

      const reply = [];

      if (args.length === 1) {
        [
          'statusCode',
          'statusMessage'
        ].forEach(prop => {
          reply.push(pixie.render(listFormat, {
            name: prop,
            val: res[prop]
          }));
        });
      }

      if (args.length >= 2) {
        for (let i = 1; i < args.length; i++) {
          if (find(res, args[i])) reply.push(pixie.render(listFormat, {
            name: args[i],
            val: find(res, args[i])
          }));
        }
      }

      const render = pixie.render(format, {
        url,
        list: reply.join('\n')
      });

      if (config.code) message.channel.sendCode(null, render)
      else message.channel.sendMessage(render);
    });
  }
}

request.command = 'request';
request.usage = 'request <url> [...properties]';

module.exports = request;
