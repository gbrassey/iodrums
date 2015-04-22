'use strict';

/* This code is PUBLIC DOMAIN, and is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND. See the accompanying
 * LICENSE file.
 */

var Buffer = require('buffer').Buffer,
	dgram = require('dgram'),
	log = require('sys').log,
	CLIENT_GENERATION_GAP = 600, // 10 minutes
	CLIENT_CLEANER_INTERVAL = 1000;

var bus = require('../lib/bus');

function ts() {
  return Math.round(new Date().getTime() / 1000);
}

var clients = {},
	generation = ts(),
	sock = null;

var si = setInterval(function() {
  generation = ts();
  for (var ckey in clients) {
    if (clients.hasOwnProperty(ckey)) {
      var gap = generation - clients[ckey];
      /* No ping from this client in X seconds, assume its dead. */
      if (gap > CLIENT_GENERATION_GAP) {
        delete clients[ckey];
      }
    }
  }
}, CLIENT_CLEANER_INTERVAL);

function updateTimeout(key) {
  clients[key] = ts();
}

function broadcast(buf, key) {
  var c = 0;
  for (var ckey in clients) {
    if (clients.hasOwnProperty(ckey) && ckey !== key) {
      var host = ckey.slice(0, ckey.lastIndexOf(':'));
      var port = parseInt(ckey.slice(ckey.lastIndexOf(':')+1), 10);
      c++;
      sock.send(buf, 0, buf.length, port, host);
    }
  }
  log('UDP Broadcasted to ' + c + ' UDP clients');
}

function processMsg(msg, key) {
  var str = msg.toString();
  str = str.replace(/[\n\r]/g, "");
  if (str.length > 0) {
    var buf = new Buffer(key + "> "+  str);
	  bus.drum(str.toString('utf8'), { udp: key });
  }
}

sock = dgram.createSocket("udp4", function (msg, peer) {
  var key = peer.address + ":" + peer.port;
  updateTimeout(key);
  processMsg(msg, key);
});

sock.on('listening', function() {
  log('UDP listening');
});

bus.on('drum', function(symbol, client) {
	if (symbol) {
		broadcast(new Buffer(symbol.toString()), (client && client.hasOwnProperty('udp')) ? client.udp : '');
	}
});


module.exports = sock;
