var tmi = require('tmi.js')
var file = 'commands.txt'
var options = require('./auth.js')
var commands = {}
var channel = 'aleksandrns'
var client = new tmi.client(options)
client.connect()
client.on('chat', function (channel, user, message, self) {

  if (message === '!slots') {
    var tmp1 = Math.floor(Math.random() * 8)
    var tmp2 = Math.floor(Math.random() * 8)
    var tmp3 = Math.floor(Math.random() * 8)
    var winning = tmp1 + '|' + tmp2 + '|' + tmp3 + '    '
    if (tmp1 === tmp2 === tmp3) {
      client.say(channel, winning + 'Congrats, ' + user.username + ', you win!')
    }
    else client.say(channel, winning + 'Better luck next time, ' + user.username + '.')
  }
  else if (message.startsWith('!')) {
    if (message.split(' ')[0] === '!commands') {
        if (message.split(' ')[1] === 'add') {
          var commandResponse = ''
          for (var i = 3; i < message.split(' ').length; i++) {
              commandResponse += message.split(' ')[i] + ' '
          }
          commands[message.split(' ')[2]] = commandResponse
          client.say(channel, 'Added command : ' + message.split(' ')[2] + ' ' + commands[message.split(' ')[2]])
        }
        else {
          console.log(commands)
        }
    }
    else {
      var split = message.split(' ')
      if (commands[split[0]]) { client.say(channel, commands[split[0]]) }
      else console.log('Command :' + message + ' does not exist.')
    }
  }
})
