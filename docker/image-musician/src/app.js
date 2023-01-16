const PROTOCOL_PORT = 2205;
const PROTOCOL_MULTICAST_ADDRESS = '224.0.0.1';

const instruments = new Map();
	  instruments.set("piano", "ti-ta-ti");
	  instruments.set("trumpet", "pouet");
	  instruments.set("flute", "trulu");
	  instruments.set("violin", "gzi-gzi");
	  instruments.set("drum", "boum-boum");

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

if (process.argv.length < 3) {
    throw Error("No instrument was specified !");
}

var instrument = process.argv[2];
if (!instruments.has(instrument)) {
    throw Error("The instrument is not valid !");
}

const sound = instruments.get(instrument);

setInterval(sendSound, 1000);

function sendSound() {
    var payload = JSON.stringify({
        sound: sound
    });

    message = Buffer.from(payload);
    socket.send(message, 0, message.length, PROTOCOL_PORT, PROTOCOL_MULTICAST_ADDRESS,
        function(err, bytes) {
            console.log("Sending sound: " + sound);
        }
    );
}
