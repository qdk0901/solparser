
function e() {
	if (f) {
		var a = [],
			b, c;
		b = 0;
		for (c = arguments.length; b < c; b++) a[b] = arguments[b];
		postMessage({
			type: "debug",
			message: a
		})
	}
}
var f = !1;
AMF0 = function() {
	this.readObjectCache = [];
	this._rawData;
	this._data;
	this._amf3
};
AMF0.prototype = {
	NUMBER_TYPE: 0,
	BOOLEAN_TYPE: 1,
	STRING_TYPE: 2,
	OBJECT_TYPE: 3,
	MOVIECLIP_TYPE: 4,
	NULL_TYPE: 5,
	UNDEFINED_TYPE: 6,
	REFERENCE_TYPE: 7,
	ECMA_ARRAY_TYPE: 8,
	OBJECT_END_TYPE: 9,
	STRICT_ARRAY_TYPE: 10,
	DATE_TYPE: 11,
	LONG_STRING_TYPE: 12,
	UNSUPPORTED_TYPE: 13,
	RECORD_SET_TYPE: 14,
	XML_OBJECT_TYPE: 15,
	TYPED_OBJECT_TYPE: 16,
	AVMPLUS_OBJECT_TYPE: 17,
	MAX_STORED_OBJECTS: 1024,
	EMPTY_STRING: "",
	deserialize: function(a) {
		this.reset();
		this._rawData = a;
		this._data = this.readData(this._rawData)
	},
	reset: function() {
		this.readObjectCache = [];
		null != this._amf3 && this._amf3.reset()
	},
	readData: function(a, b) {
		null == b && (b = a.readByte());
		switch (b) {
		case this.NUMBER_TYPE:
			return this.readNumber(a);
		case this.BOOLEAN_TYPE:
			return this.readBoolean(a);
		case this.STRING_TYPE:
			return this.readString(a);
		case this.OBJECT_TYPE:
			return this.readObject(a);
		case this.NULL_TYPE:
			return this.readNull(a);
		case this.UNDEFINED_TYPE:
			return this.readUndefined(a);
		case this.REFERENCE_TYPE:
			return this.getObjectReference(a.readUnsignedShort());
		case this.ECMA_ARRAY_TYPE:
			return this.readECMAArray(a);
		case this.OBJECT_END_TYPE:
			return e("AMF0::readData - Warning : Unexpected object end tag in AMF stream"), this.readNull(a);
		case this.STRICT_ARRAY_TYPE:
			return this.readArray(a);
		case this.DATE_TYPE:
			return this.readDate(a);
		case this.LONG_STRING_TYPE:
			return this.readLongString(a);
		case this.UNSUPPORTED_TYPE:
			return e("AMF0::readData - Warning : Unsupported type found in AMF stream"), this.readNull(a);
		case this.RECORD_SET_TYPE:
			return e("AMF0::readData - Warning : Unexpected recordset in AMF stream"), this.readNull(a);
		case this.XML_OBJECT_TYPE:
			return this.readXML(a);
		case this.TYPED_OBJECT_TYPE:
			return this.readTypedObject(a);
		case this.AVMPLUS_OBJECT_TYPE:
			return null == this._amf3 && (this._amf3 = new AMF3), this._amf3.readData(a);
		default:
			e("AMF0::readData - Error : Undefined AMF0 type encountered '" + b + "'")
		}
	},
	writeData: function(a, b) {
		var c = b.__traits.type;
		b.__traits.hasOwnProperty("origType") && (c = b.__traits.origType);
		e("writeData " + c, b.value);
		switch (c) {
		case "Undefined":
			this.writeUndefined(a);
			break;
		case "Null":
			this.writeNull(a);
			break;
		case "Boolean":
			this.writeBoolean(a, b.value);
			break;
		case "Integer":
		case "Number":
			this.writeNumber(a, b.value);
			break;
		case "String":
			this.writeString(a, b.value);
			break;
		case "LongString":
			this.writeLongString(a, b.value);
			break;
		case "Date":
			this.writeDate(a, b.value);
			break;
		case "Array":
			this.writeArray(a, b.value);
			break;
		case "ECMAArray":
			this.writeECMAArray(a, b.value);
			break;
		case "Object":
			"Object" == b.__traits.class ? this.writeObject(a, b.value, b.__traits) : this.writeTypedObject(a, b.value, b.__traits);
			break;
		case "XML":
			this.writeXML(a, b.value);
			break;
		default:
			throw Error("Undefined AMF0 type encountered '" + c + "'");
		}
	},
	readNumber: function(a) {
		return {
			value: a.readDouble(),
			__traits: {
				type: "Number"
			}
		}
	},
	writeNumber: function(a, b) {
		a.writeByte(this.NUMBER_TYPE);
		a.writeDouble(b)
	},
	readBoolean: function(a) {
		return {
			value: a.readBoolean(),
			__traits: {
				type: "Boolean"
			}
		}
	},
	writeBoolean: function(a, b) {
		a.writeByte(this.BOOLEAN_TYPE);
		a.writeBoolean(b)
	},
	readString: function(a) {
		return {
			value: a.readUTF(),
			__traits: {
				type: "String"
			}
		}
	},
	writeString: function(a, b) {
		65536 > b.length ? (a.writeByte(this.STRING_TYPE), a.writeUTF(b)) : this.writeLongString(a, b)
	},
	readObject: function(a, b) {
		for (var c = {}, d = a.readUTF(), e = a.readByte(); 0 < d.length && e != this.OBJECT_END_TYPE;) c[d] = this.readData(a, e), d = a.readUTF(), e = a.readByte();
		if (b) return c;
		c = {
			value: c,
			__traits: {
				type: "Object"
			}
		};
		this.readObjectCache.push(c);
		return c
	},
	writeObject: function(a, b, c, d) {
		if (d || this.setObjectReference(a, b)) {
			void 0 === d && a.writeByte(this.OBJECT_TYPE);
			for (var e in b) a.writeUTF(e), this.writeData(a, b[e]);
			a.writeUTF(this.EMPTY_STRING);
			a.writeByte(this.OBJECT_END_TYPE)
		}
	},
	readNull: function(a) {
		return {
			value: null,
			__traits: {
				type: "Null"
			}
		}
	},
	writeNull: function(a) {
		a.writeByte(this.NULL_TYPE)
	},
	readUndefined: function(a) {
		return {
			value: null,
			__traits: {
				type: "Undefined"
			}
		}
	},
	writeUndefined: function(a) {
		a.writeByte(this.UNDEFINED_TYPE)
	},
	readECMAArray: function(a) {
		var b = {};
		a.readUnsignedInt();
		for (var c = a.readUTF(), d = a.readByte(); 0 < c.length && d != this.OBJECT_END_TYPE;) b[c] = this.readData(a, d), c = a.readUTF(), d = a.readByte();
		a = {
			value: b,
			__traits: {
				type: "ECMAArray"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeECMAArray: function(a, b) {
		if (this.setObjectReference(a, b)) {
			var c = 0,
				d;
			a.writeByte(this.ECMA_ARRAY_TYPE);
			for (d in b) isNaN(d) || c++;
			a.writeUnsignedInt(c);
			for (d in b) a.writeUTF(d), this.writeData(a, b[d]);
			a.writeByte(0);
			a.writeByte(0);
			a.writeByte(this.OBJECT_END_TYPE)
		}
	},
	readArray: function(a) {
		var b = a.readUnsignedInt(),
			c = Array(b),
			d;
		for (d = 0; d < b; ++d) c[d] = this.readData(a);
		a = {
			value: c,
			__traits: {
				type: "Array",
				strict: !0
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeArray: function(a, b) {
		if (this.setObjectReference(a, b)) {
			var c = b.length,
				d;
			a.writeByte(this.STRICT_ARRAY_TYPE);
			a.writeInt(c);
			for (d = 0; d < c; ++d) this.writeData(a, b[d])
		}
	},
	readDate: function(a) {
		var b = a.readDouble();
		a.readShort();
		return {
			value: new Date(b),
			__traits: {
				type: "Date"
			}
		}
	},
	writeDate: function(a, b) {
		a.writeByte(this.DATE_TYPE);
		b instanceof Date || (b = new Date(b));
		a.writeDouble(b.getTime());
		a.writeShort(b.getTimezoneOffset())
	},
	readLongString: function(a) {
		return {
			value: a.readUTFBytes(a.readUnsignedInt()),
			__traits: {
				type: "LongString"
			}
		}
	},
	writeLongString: function(a, b) {
		65536 > b.length ? this.writeString(a, b) : (a.writeByte(this.LONG_STRING_TYPE), a.writeUnsignedInt(b.length), a.writeUTFBytes(b))
	},
	readXML: function(a) {
		return {
			value: this.readLongString(a).value,
			__traits: {
				type: "XML"
			}
		}
	},
	writeXML: function(a, b) {
		if (this.setObjectReference(a, b)) {
			a.writeByte(this.XML_OBJECT_TYPE);
			var c = b.toString(),
				c = c.replace(/^\s+|\s+$/g, "");
			a.writeUnsignedInt(c.length);
			a.writeUTFBytes(c)
		}
	},
	readTypedObject: function(a) {
		var b = a.readUTF(),
			c;
		try {
			c = this.readObject(a, !0)
		} catch (d) {
			e("AMF0::readTypedObject - Error : Cannot parse custom class")
		}
		a = {
			value: c,
			__traits: {
				type: "Object",
				"class": b
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeTypedObject: function(a, b, c) {
		this.setObjectReference(a, b) && (a.writeByte(this.TYPED_OBJECT_TYPE), a.writeUTF(c.class), this.writeObject(a, b, c, !0))
	},
	getObjectReference: function(a) {
		return a >= this.readObjectCache.length ? (e("AMF0::getObjectReference - Error : Undefined object reference '" + a + "'"), null) : this.readObjectCache[a]
	},
	setObjectReference: function(a, b) {
		var c, d = JSON.stringify(b);
		if (null != this.writeObjectCache && -1 != (c = this.writeObjectCache.indexOf(d))) return a.writeByte(this.REFERENCE_TYPE), this.writeUnsignedShort(a, c), !1;
		null == this.writeObjectCache && (this.writeObjectCache = []);
		this.writeObjectCache.length < this.MAX_STORED_OBJECTS && this.writeObjectCache.push(d);
		return !0
	},
	writeUnsignedShort: function(a, b) {
		var c = b / 256;
		a.writeByte(b % 256);
		a.writeByte(c)
	},
	writeUnsupported: function(a) {
		a.writeByte(this.UNSUPPORTED_TYPE)
	}
}

module.exports = AMF0;