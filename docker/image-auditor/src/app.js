var dgram = require('dgram');
var crypto = require('crypto');
var net = require('net');

const PORT = 2205;
const ADDRESS = '224.0.0.1';
const s = dgram.createSocket('udp4');
var history = new Map();

var instruments = new Map();
instruments.set("ti-ta-ti", "piano");
instruments.set("pouet", "trumpet");
instruments.set("trulu", "flute");
instruments.set("gzi-gzi", "violin");
instruments.set("boum-boum", "drum");

const clearMap = () => {
    for (const [key, value] of history) {
        if(Date.now() - value.activeSince > 5000) {
            history.delete(key);
        }
    }
}

setInterval(clearMap, 1000);

//Start UDP socket
s.bind(PORT, () => {
    s.addMembership(ADDRESS);
});

s.on('message', function (msg, source) {
    var obj = {
        uuid: crypto.createHash('md5').update(source.address).digest('hex'),
        activeSince: Date.now(),
        instrument: instruments.get(JSON.parse(msg.toString()).sound)
    }
    history.set(obj.uuid, obj)
    // console.log(history)
});

// start TCP server
let server = net.createServer((client) => {
    clearMap();
    var musicians = [];
    for (const [key, value] of history) {
        musicians.push(value)
    }
    client.write(JSON.stringify(musicians))
    client.destroy();   
})
server.listen(PORT);


