var AMF0 = require('./AMF0');
var AMF3 = require('./AMF0');
var ByteArrayString = require('./ByteArrayString');
var fs = require('fs');

var amf0 = new AMF0();
var amf3 = new AMF3();

function parseSOL(data)
{
	// 00 bf
	var sol = new Object();
	var index;
	// length : 4 bytes
	sol.length = data.readUInt32BE(2);
	sol.magic = data.slice(6, 10).toString();
	
	index = 10;
	
	//00 04 00 00 00 00
	index += 6;
	
	var len = data.readUInt16BE(index); // the file name length
	
	index += 2;
	
	sol.name = data.slice(index, index + len).toString();
	
	index += len;
	index += 3; // ignore the 3 bytes padding
	
	sol.amfVersion =  data.readUInt8(index);
	
	index += 1;
	sol.amfData = data.slice(index);
	
	return sol;
}

fs.readFile('YOUKU_FSO_PROXY.sol', function (err, data) {
	var sol = parseSOL(data);
	console.log('file: ', sol.name);
	console.log('amfversion: ', sol.amfVersion);
	
	var ba = new ByteArrayString(sol.amfData.toString(), 'bigEndian');
	
	sol.body = {};
	while(ba.getBytesAvailable() > 1) {
		var varName = "";
		var varVal;
		if (sol.amfVersion == 3) {
			varName = amf3.readString(ba);
			varVal = amf3.readData(ba);
		} else {
			varName = ba.readUTF();
			varVal = amf0.readData(ba);
		}
		ba.readUnsignedByte(); // Ending byte
		sol.body[varName] = varVal;
	}
	
	console.log(sol.body);
});
