
function r() {
	if (m) {
		for (var a = [], b = 0, c = arguments.length; b < c; b++) a[b] = arguments[b];
		postMessage({
			type: "debug",
			message: a
		})
	}
}
function n() {
	if (m) {
		for (var a = [], b = 0, c = arguments.length; b < c; b++) a[b] = arguments[b];
		postMessage({
			type: "warning",
			message: a
		})
	}
}
function q() {
	if (m) {
		for (var a = [], b = 0, c = arguments.length; b < c; b++) a[b] = arguments[b];
		postMessage({
			type: "alert",
			message: a
		})
	}
}
var m = !1;
AMF3 = function() {
	this._data = this._rawData = null;
	this.readObjectCache = [];
	this.readStringCache = [];
	this.readTraitsCache = [];
	this.writeStringCache = [];
	this.writeObjectCache = [];
	this.writeTraitsCache = []
};
AMF3.prototype = {
	UNDEFINED_TYPE: 0,
	NULL_TYPE: 1,
	FALSE_TYPE: 2,
	TRUE_TYPE: 3,
	INTEGER_TYPE: 4,
	DOUBLE_TYPE: 5,
	STRING_TYPE: 6,
	XML_DOC_TYPE: 7,
	DATE_TYPE: 8,
	ARRAY_TYPE: 9,
	OBJECT_TYPE: 10,
	XML_TYPE: 11,
	BYTE_ARRAY_TYPE: 12,
	VECTOR_INT_TYPE: 13,
	VECTOR_UINT_TYPE: 14,
	VECTOR_DOUBLE_TYPE: 15,
	VECTOR_OBJECT_TYPE: 16,
	DICTIONARY_TYPE: 17,
	INT28_MAX_VALUE: 268435455,
	INT28_MIN_VALUE: -268435456,
	EMPTY_STRING: "",
	UINT29_MASK: 536870911,
	CLASS_ALIAS_REGISTRY: {
		DSK: "flex.messaging.messages.AcknowledgeMessageExt",
		DSA: "flex.messaging.messages.AsyncMessageExt",
		DSC: "flex.messaging.messages.CommandMessageExt"
	},
	type2Name: function(a) {
		switch (a) {
		case this.UNDEFINED_TYPE:
			return "UNDEFINED_TYPE";
		case this.NULL_TYPE:
			return "NULL_TYPE";
		case this.FALSE_TYPE:
			return "FALSE_TYPE";
		case this.TRUE_TYPE:
			return "TRUE_TYPE";
		case this.INTEGER_TYPE:
			return "INTEGER_TYPE";
		case this.DOUBLE_TYPE:
			return "DOUBLE_TYPE";
		case this.STRING_TYPE:
			return "STRING_TYPE";
		case this.XML_DOC_TYPE:
			return "XML_DOC_TYPE";
		case this.DATE_TYPE:
			return "DATE_TYPE";
		case this.ARRAY_TYPE:
			return "ARRAY_TYPE";
		case this.OBJECT_TYPE:
			return "OBJECT_TYPE";
		case this.XML_TYPE:
			return "XML_TYPE";
		case this.BYTE_ARRAY_TYPE:
			return "BYTE_ARRAY_TYPE";
		case this.VECTOR_INT_TYPE:
			return "VECTOR_INT_TYPE";
		case this.VECTOR_UINT_TYPE:
			return "VECTOR_UINT_TYPE";
		case this.VECTOR_DOUBLE_TYPE:
			return "VECTOR_DOUBLE_TYPE";
		case this.VECTOR_OBJECT_TYPE:
			return "VECTOR_OBJECT_TYPE";
		case this.DICTIONARY_TYPE:
			return "DICTIONARY_TYPE";
		default:
			return "?"
		}
	},
	deserialize: function(a) {
		this.reset();
		this._rawData = a;
		this._data = this.readData(this._rawData)
	},
	reset: function() {
		this.readObjectCache = [];
		this.readStringCache = [];
		this.readTraitsCache = [];
		this.writeStringCache = [];
		this.writeObjectCache = [];
		this.writeTraitsCache = []
	},
	readData: function(a, b) {
		var c = a.readByte();
		r("readData: " + c + " : " + this.type2Name(c));
		switch (c) {
		case this.UNDEFINED_TYPE:
			return this.readUndefined();
		case this.NULL_TYPE:
			return this.readNull();
		case this.FALSE_TYPE:
			return this.readBoolean(!1);
		case this.TRUE_TYPE:
			return this.readBoolean(!0);
		case this.INTEGER_TYPE:
			return this.readInt(a);
		case this.DOUBLE_TYPE:
			return this.readDouble(a);
		case this.STRING_TYPE:
			return this.readString(a);
		case this.XML_DOC_TYPE:
			return this.readXMLDoc(a);
		case this.DATE_TYPE:
			return this.readDate(a);
		case this.ARRAY_TYPE:
			return this.readArray(a);
		case this.OBJECT_TYPE:
			return this.readObject(a, b);
		case this.XML_TYPE:
			return this.readXML(a);
		case this.BYTE_ARRAY_TYPE:
			return this.readByteArray(a);
		case this.VECTOR_INT_TYPE:
			return this.readVectorInt(a);
		case this.VECTOR_UINT_TYPE:
			return this.readVectorUInt(a);
		case this.VECTOR_DOUBLE_TYPE:
			return this.readVectorDouble(a);
		case this.VECTOR_OBJECT_TYPE:
			return this.readVectorObject(a);
		case this.DICTIONARY_TYPE:
			return this.readDictionary(a);
		default:
			throw Error("Undefined AMF3 type encountered '" + c + "'");
		}
	},
	writeData: function(a, b) {
		var c = b.__traits.type;
		b.__traits.hasOwnProperty("origType") && (c = b.__traits.origType);
		switch (c) {
		case "Undefined":
			this.writeUndefined(a);
			break;
		case "Null":
			this.writeNull(a);
			break;
		case "False":
			this.writeBoolean(a, !1);
			break;
		case "True":
			this.writeBoolean(a, !0);
			break;
		case "Integer":
			this.writeInt(a, b.value);
			break;
		case "Number":
			this.writeDouble(a, b.value);
			break;
		case "String":
			a.writeByte(this.STRING_TYPE);
			this.writeString(a, b.value);
			break;
		case "XMLDocument":
			this.writeXMLDoc(a, b.value);
			break;
		case "Date":
			this.writeDate(a, b.value);
			break;
		case "Array":
			this.writeArray(a, b.value);
			break;
		case "Object":
			this.writeObject(a, b.value, b.__traits);
			break;
		case "XML":
			this.writeXML(a, b.value);
			break;
		case "ByteArray":
			this.writeByteArray(a, b.value);
			break;
		case "Vector.<int>":
			this.writeVectorInt(a, b.value, b.__traits);
			break;
		case "Vector.<uint>":
			this.writeVectorUInt(a, b.value, b.__traits);
			break;
		case "Vector.<Number>":
			this.writeVectorDouble(a, b.value, b.__traits);
			break;
		case "Vector.<Object>":
			this.writeVectorObject(a, b.value, b.__traits);
			break;
		case "Dictionary":
			this.writeDictionary(a, b.value, b.__traits);
			break;
		default:
			throw Error("Undefined AMF3 type encountered '" + c + "'");
		}
	},
	readUInt29: function(a) {
		var b = 0,
			c = a.readUnsignedByte();
		if (128 > c) return c;
		b = (c & 127) << 7;
		c = a.readUnsignedByte();
		if (128 > c) return b | c;
		b = (b | c & 127) << 7;
		c = a.readUnsignedByte();
		if (128 > c) return b | c;
		b = (b | c & 127) << 8;
		c = a.readUnsignedByte();
		return b | c
	},
	writeUInt29: function(a, b) {
		if (128 > b) a.writeByte(b);
		else if (16384 > b) a.writeByte(b >> 7 & 127 | 128), a.writeByte(b & 127);
		else if (2097152 > b) a.writeByte(b >> 14 & 127 | 128), a.writeByte(b >> 7 & 127 | 128), a.writeByte(b & 127);
		else if (1073741824 > b) a.writeByte(b >> 22 & 127 | 128), a.writeByte(b >> 15 & 127 | 128), a.writeByte(b >> 8 & 127 | 128), a.writeByte(b & 255);
		else throw Error("Integer out of range: " + b);
	},
	readUndefined: function() {
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
	readNull: function() {
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
	readBoolean: function(a) {
		return {
			value: a ? 1 : 0,
			__traits: {
				type: a ? "True" : "False"
			}
		}
	},
	writeBoolean: function(a, b) {
		a.writeByte(b ? this.TRUE_TYPE : this.FALSE_TYPE)
	},
	readInt: function(a) {
		return {
			value: this.readUInt29(a) << 3 >> 3,
			__traits: {
				type: "Integer"
			}
		}
	},
	writeInt: function(a, b) {
		b >= this.INT28_MIN_VALUE && b <= this.INT28_MAX_VALUE && 0 == b % 1 ? (b &= this.UINT29_MASK, a.writeByte(this.INTEGER_TYPE), this.writeUInt29(a, b)) : this.writeDouble(a, b)
	},
	readDouble: function(a) {
		return {
			value: a.readDouble(),
			__traits: {
				type: "Number"
			}
		}
	},
	writeDouble: function(a, b) {
		a.writeByte(this.DOUBLE_TYPE);
		a.writeDouble(b)
	},
	readString: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getStringReference(b >> 1);
		var b = b >> 1,
			c = {
				value: "",
				__traits: {
					type: "String"
				}
			};
		0 < b && (c.value = a.readUTFBytes(b), this.readStringCache.push(c));
		return c
	},
	writeString: function(a, b, c) {
		void 0 === c && (c = !0);
		if ("" == b) a.writeByte(1);
		else {
			var d = new ByteArray;
			d.writeUTFBytes(b);
			d = d.length;
			c ? this.setStringReference(a, b) && (this.writeUInt29(a, d << 1 | 1), a.writeUTFBytes(b)) : (this.writeUInt29(a, d << 1 | 1), a.writeUTFBytes(b))
		}
	},
	readXMLDoc: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		a = {
			value: a.readUTFBytes(b >> 1),
			__traits: {
				type: "XMLDocument"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeXMLDoc: function(a, b) {
		a.writeByte(this.XML_DOC_TYPE);
		if (this.setObjectReference(a, b)) {
			var c = b.toString(),
				c = c.replace(/^\s+|\s+$/g, ""),
				c = c.replace(/\>(\n|\r|\r\n| |\t)*\</g, "><");
			this.writeString(a, c, !1)
		}
	},
	readDate: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		a = {
			value: new Date(a.readDouble()),
			__traits: {
				type: "Date"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeDate: function(a, b) {
		a.writeByte(this.DATE_TYPE);
		b instanceof Date || (b = new Date(b));
		this.setObjectReference(a, b) && (this.writeUInt29(a, 1), a.writeDouble(b.getTime()))
	},
	readArray: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		for (var b = b >> 1, c = Array(b), d = !0, e = this.readString(a).value;
		"" != e;) c[e] = this.readData(a), e = this.readString(a).value, d = !1;
		for (e = 0; e < b; e++) c[e] = this.readData(a);
		a = {
			value: c,
			__traits: {
				type: "Array",
				strict: d
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeArray: function(a, b) {
		var c = [],
			d = {},
			e = b.length,
			f = 0,
			g, l = !1,
			h = !1,
			h = 0;
		for (g in b) f++, !isNaN(g) && 0 <= g ? c[g] = b[g] : (d[g] = b[g], h++);
		l = Boolean(f < e);
		h = Boolean(0 < h);
		a.writeByte(this.ARRAY_TYPE);
		if (this.setObjectReference(a, b)) if (h || l) {
			this.writeUInt29(a, 1);
			for (g in b) this.writeString(a, g), this.writeData(a, b[g]);
			this.writeString(a, this.EMPTY_STRING)
		} else {
			e = c.length;
			this.writeUInt29(a, e << 1 | 1);
			for (g in d) this.writeString(a, g), this.writeData(a, d[g]);
			this.writeString(a, this.EMPTY_STRING);
			for (d = 0; d < e; d++) this.writeData(a, c[d])
		}
	},
	readObject: function(a, b) {
		var c = this.readUInt29(a);
		if (0 == (c & 1)) return this.getObjectReference(c >> 1);
		var d;
		if (1 == (c & 3)) d = this.getTraitReference(c >> 2);
		else {
			d = 4 == (c & 4);
			for (var e = 8 == (c & 8), f = this.readString(a).value, c = c >> 4, g = Array(c), l = 0; l < c; ++l) g[l] = this.readString(a).value;
			0 == f.length && (f = "Object");
			d = {
				type: "Object",
				"class": f,
				members: g,
				count: c,
				externalizable: d,
				dynamic: e
			};
			this.readTraitsCache.push(d)
		}
		e = this.CLASS_ALIAS_REGISTRY[d.class];
		null != e && (d.class = e);
		e = {};
		if (d.externalizable) try {
			if (0 == d.class.indexOf("flex.")) var h = d.class.split("."),
				k = h[h.length - 1],
				e = k && AMF3.Flex[k] ? (new AMF3.Flex[k]).readExternal(a, this) : this.readData(a);
			else e["??? Warning: Externalized ???"] = this.readData(a), q("Externalized object (" + d.class + ") encountered. Any data parsed after object will most likely be incorrect.<br>Saving this file after opening will most generate a corrupted file.")
		} catch (m) {
			q("Unable to read externalizable data type '" + d.class + "'  |  " + m), e["??? Warning: Externalized ???"] = {
				value: "Unable to read externalizable data type '" + d.class + "'",
				__type: "String"
			}
		} else {
			k = d.members.length;
			for (f = 0; f < k; ++f) c = this.readData(a), h = d.members[f], e[h] = c;
			if (d.dynamic) for (h = this.readString(a).value;
			"" != h;) k = this.readData(a), e[h] = k, h = this.readString(a).value
		}
		if (b) return e;
		c = {};
		c.__traits = d;
		c.value = e;
		this.readObjectCache.push(c);
		return c
	},
	writeObject: function(a, b, c) {
		a.writeByte(this.OBJECT_TYPE);
		var d;
		if (this.setTraitReference(a, c) && (this.writeUInt29(a, 3 | (c.externalizable ? 4 : 0) | (c.dynamic ? 8 : 0) | c.count << 4), "Object" != c.class ? this.writeString(a, c.class) : this.writeString(a, ""), !c.externalizable && 0 < c.count)) for (d in c.members) this.writeString(a, c.members[d]);
		if (c.externalizable) try {
			if (0 == c.class.indexOf("flex.")) {
				var e = c.class.split("."),
					f = e[e.length - 1];
				f && flex[f] ? (new flex[f]).writeExternal(a, this, b) : this.writeData(a, b)
			}
		} catch (g) {
			throw Error("AMF3::writeObject - Error : Unable to write externalizable data type '" + c.class + "' | " + g);
		} else {
			if (this.setObjectReference(a, b)) if ("Object" != c.class || !1 == c.dynamic) for (d in c.members) this.writeData(a, b[c.members[d]]);
			else for (d in b) this.writeString(a, d), this.writeData(a, b[d]);
			c.dynamic && a.writeByte(1)
		}
	},
	readXML: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		a = {
			value: a.readUTFBytes(b >> 1),
			__traits: {
				type: "XML"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeXML: function(a, b) {
		a.writeByte(this.XML_TYPE);
		if (this.setObjectReference(a, b)) {
			var c;
			c = b.replace(/^\s+|\s+$/g, "");
			this.writeString(a, c, !1)
		}
	},
	readByteArray: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		for (var b = b >> 1, c = Array(b), d = 0; d < b; ++d) {
			var e = a.readUnsignedByte();
			c[d] = e
		}
		a = {
			value: c,
			__traits: {
				type: "ByteArray"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeByteArray: function(a, b) {
		a.writeByte(this.BYTE_ARRAY_TYPE);
		this.setObjectReference(a, b) && (this.writeUInt29(a, b.length << 1 | 1), a.writeBytes(b))
	},
	readVectorInt: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		for (var b = b >> 1, c = Array(b), d = Boolean(a.readBoolean()), e = 0; e < b; e++) c[e] = {
			value: a.readInt(),
			__traits: {
				type: "Integer"
			}
		};
		a = {
			value: c,
			__traits: {
				fixed: d,
				type: "Vector.<int>",
				"class": "int"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeVectorInt: function(a, b, c) {
		a.writeByte(this.VECTOR_INT_TYPE);
		if (this.setObjectReference(a, b)) {
			this.writeUInt29(a, b.length << 1 | 1);
			a.writeBoolean(c.fixed ? 1 : 0);
			c = 0;
			for (var d = b.length; c < d; c++) a.writeInt(b[c].value)
		}
	},
	readVectorUInt: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		for (var b = b >> 1, c = Array(b), d = Boolean(a.readBoolean()), e = 0; e < b; e++) c[e] = {
			value: a.readUnsignedInt(),
			__traits: {
				type: "Integer"
			}
		};
		a = {
			value: c,
			__traits: {
				fixed: d,
				type: "Vector.<uint>",
				"class": "uint"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeVectorUInt: function(a, b, c) {
		a.writeByte(this.VECTOR_UINT_TYPE);
		if (this.setObjectReference(a, b)) {
			this.writeUInt29(a, b.length << 1 | 1);
			a.writeBoolean(c.fixed ? 1 : 0);
			c = 0;
			for (var d = b.length; c < d; c++) a.writeUnsignedInt(b[c].value)
		}
	},
	readVectorDouble: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		for (var b = b >> 1, c = Array(b), d = Boolean(a.readBoolean()), e = 0; e < b; e++) c[e] = {
			value: a.readDouble(),
			__traits: {
				type: "Number"
			}
		};
		a = {
			value: c,
			__traits: {
				fixed: d,
				type: "Vector.<Number>",
				"class": "Number"
			}
		};
		this.readObjectCache.push(a);
		return a
	},
	writeVectorDouble: function(a, b, c) {
		a.writeByte(this.VECTOR_DOUBLE_TYPE);
		if (this.setObjectReference(a, b)) {
			this.writeUInt29(a, b.length << 1 | 1);
			a.writeBoolean(c.fixed ? 1 : 0);
			c = 0;
			for (var d = b.length; c < d; c++) a.writeDouble(b[c].value)
		}
	},
	readVectorObject: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		var b = b >> 1,
			c = Array(b),
			d = Boolean(a.readBoolean()),
			e = this.readString(a).value;
		0 == e.length && (e = "Object");
		d = {
			type: "Vector.<" + e + ">",
			fixed: d,
			"class": e
		};
		e = this.CLASS_ALIAS_REGISTRY[d.class];
		null != e && (d.class = e);
		for (e = 0; e < b; e++) c[e] = this.readData(a);
		a = {
			value: c,
			__traits: d
		};
		this.readObjectCache.push(a);
		return a
	},
	writeVectorObject: function(a, b, c) {
		a.writeByte(this.VECTOR_OBJECT_TYPE);
		if (this.setObjectReference(a, b)) {
			this.writeUInt29(a, b.length << 1 | 1);
			a.writeBoolean(c.fixed ? 1 : 0);
			c = c.class;
			"Object" == c ? this.writeString(a, "") : this.writeString(a, c);
			c = 0;
			for (var d = b.length; c < d; c++) this.writeData(a, b[c])
		}
	},
	readDictionary: function(a) {
		var b = this.readUInt29(a);
		if (0 == (b & 1)) return this.getObjectReference(b >> 1);
		for (var c = b >> 1, b = Array(c), d = Boolean(a.readBoolean()), e = 0; e < c; e++) b[e] = {
			key: this.readData(a),
			value: this.readData(a),
			__traits: {
				type: "DictionaryItem"
			}
		};
		a = {
			value: b,
			__traits: {
				weakKeys: d,
				type: "Dictionary"
			}
		};
		this.readObjectCache.push(b);
		return a
	},
	writeDictionary: function(a, b, c) {
		a.writeByte(this.DICTIONARY_TYPE);
		if (this.setObjectReference(a, b)) {
			var d = b.length;
			this.writeUInt29(a, d << 1 | 1);
			a.writeBoolean(c.weakKeys);
			for (c = 0; c < d; c++) this.writeData(a, b[c].value.Key), this.writeData(a, b[c].value.Value)
		}
	},
	getStringReference: function(a) {
		return a >= this.readStringCache.length ? (n("Warning: Undefined string reference '" + a + "'"), {
			value: "??? Error: Str Ref #" + a + " ???",
			__traits: {
				type: "String",
				missingRef: a
			}
		}) : this.readStringCache[a]
	},
	setStringReference: function(a, b) {
		var c;
		if (null != this.writeStringCache && -1 != (c = this.writeStringCache.indexOf(b))) return this.writeUInt29(a, c << 1), !1;
		null == this.writeStringCache && (this.writeStringCache = []);
		this.writeStringCache.push(b);
		return !0
	},
	getTraitReference: function(a) {
		return a >= this.readTraitsCache.length ? (n("Warning: Undefined trait reference '" + a + "'"), {
			value: "??? Error: Trait Ref #" + a + " ???",
			__traits: {
				type: "String",
				missingRef: a
			}
		}) : this.readTraitsCache[a]
	},
	setTraitReference: function(a, b) {
		var c, d = JSON.stringify(b);
		if (null != this.writeTraitsCache && -1 != (c = this.writeTraitsCache.indexOf(d))) return this.writeUInt29(a, c << 2 | 1), !1;
		null == this.writeTraitsCache && (this.writeTraitsCache = []);
		this.writeTraitsCache.push(d);
		return !0
	},
	getObjectReference: function(a) {
		return a >= this.readObjectCache.length ? (n("Warning: Undefined object reference '" + a + "'"), {
			value: "??? Error: Obj Ref #" + a + " ???",
			__traits: {
				type: "String",
				missingRef: a
			}
		}) : this.readObjectCache[a]
	},
	setObjectReference: function(a, b) {
		var c, d = this.cleanObject(b, {});
		if (null != this.writeObjectCache && -1 != (c = this.cacheIndexOf(this.writeObjectCache, d))) return this.writeUInt29(a, c << 1), !1;
		null == this.writeObjectCache && (this.writeObjectCache = []);
		this.writeObjectCache.push(d);
		return !0
	},
	cacheIndexOf: function(a, b) {
		for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
		return -1
	},
	cleanObject: function(a, b) {
		for (var c in a) {
			var d = a[c].value;
			"string" == typeof d || "number" == typeof d || "boolean" == typeof d ? b[c] = d : Array.isArray(d) ? b[c] = this.cleanObject(a[c].value, []) : b[c] = this.cleanObject(a[c].value, {})
		}
		return b
	}
};
AMF3.Flex = {};
var p = {
	UPPER_DIGITS: "0123456789ABCDEF".split(""),
	fromByteArray: function(a) {
		if (null != a && 16 == a.length) {
			for (var b = "", c = 0; 16 > c; c++) {
				if (4 == c || 6 == c || 8 == c || 10 == c) b += "-";
				b += this.UPPER_DIGITS[(+a[c] & 240) >>> 4];
				b += this.UPPER_DIGITS[+a[c] & 15]
			}
			return b
		}
		return null
	}
};
AMF3.Flex.AbstractMessage = function() {
	this.body = this.headers = this.timeToLive = this.timestamp = this.messageId = this.destination = this.clientId = null
};
AMF3.Flex.AbstractMessage.prototype = {
	HAS_NEXT_FLAG: 128,
	BODY_FLAG: 1,
	CLIENT_ID_FLAG: 2,
	DESTINATION_FLAG: 4,
	HEADERS_FLAG: 8,
	MESSAGE_ID_FLAG: 16,
	TIMESTAMP_FLAG: 32,
	TIME_TO_LIVE_FLAG: 64,
	CLIENT_ID_BYTES_FLAG: 1,
	MESSAGE_ID_BYTES_FLAG: 2,
	CORRELATION_ID_FLAG: 1,
	CORRELATION_ID_BYTES_FLAG: 2,
	OPERATION_FLAG: 1,
	readExternal: function(a, b) {
		for (var c = this.readFlags(a), d = 0; d < c.length; d++) {
			var e = c[d],
				f = 0;
			0 == d ? (0 != (e & this.BODY_FLAG) && this.readExternalBody(a, b), 0 != (e & this.CLIENT_ID_FLAG) && (this.clientId = b.readData(a)), 0 != (e & this.DESTINATION_FLAG) && (this.destination = b.readData(a)), 0 != (e & this.HEADERS_FLAG) && (this.headers = b.readData(a)), 0 != (e & this.MESSAGE_ID_FLAG) && (this.messageId = b.readData(a)), 0 != (e & this.TIMESTAMP_FLAG) && (this.timestamp = b.readData(a)), 0 != (e & this.TIME_TO_LIVE_FLAG) && (this.timeToLive = b.readData(a)), f = 7) : 1 == d && (0 != (e & this.CLIENT_ID_BYTES_FLAG) && (f = b.readData(a), this.clientId = p.fromByteArray(f)), 0 != (e & this.MESSAGE_ID_BYTES_FLAG) && (f = b.readData(a), this.messageId = p.fromByteArray(f)), f = 2);
			if (0 != e >> f) for (; 6 > f; f++) 0 != (e >> f & 1) && b.readData(a)
		}
		return this
	},
	readExternalBody: function(a, b) {
		this.body = b.readData(a)
	},
	readFlags: function(a) {
		for (var b = !0, c = [], d = 0; b;) b = a.readUnsignedByte(), c[d] = b, b = 0 != (b & this.HAS_NEXT_FLAG) ? !0 : !1, d++;
		return c
	}
};
AMF3.Flex.AsyncMessage = function() {
	this.correlationId = null
};
AMF3.Flex.AsyncMessage.prototype = new AMF3.Flex.AbstractMessage;
AMF3.Flex.AsyncMessage.constructor = AMF3.Flex.AsyncMessage;
AMF3.Flex.AsyncMessage.prototype.readExternal = function(a, b) {
	AMF3.Flex.AbstractMessage.prototype.readExternal.call(this, a, b);
	for (var c = this.readFlags(a), d = 0; d < c.length; d++) {
		var e = c[d],
			f = 0;
		0 == d && (0 != (e & this.CORRELATION_ID_FLAG) && (this.correlationId = b.readData(a)), 0 != (e & this.CORRELATION_ID_BYTES_FLAG) && (f = b.readData(a), this.correlationId = p.fromByteArray(f)), f = 2);
		if (0 != e >> f) for (; 6 > f; ++f) 0 != (e >> f & 1) && b.readData(a)
	}
	return this
};
AMF3.Flex.AsyncMessageExt = function() {};
AMF3.Flex.AsyncMessageExt.prototype = new AMF3.Flex.AsyncMessage;
AMF3.Flex.AsyncMessageExt.constructor = AMF3.Flex.AsyncMessageExt;
AMF3.Flex.AcknowledgeMessage = function() {};
AMF3.Flex.AcknowledgeMessage.prototype = new AMF3.Flex.AsyncMessage;
AMF3.Flex.AcknowledgeMessage.constructor = AMF3.Flex.AcknowledgeMessage;
AMF3.Flex.AcknowledgeMessage.prototype.readExternal = function(a, b) {
	AMF3.Flex.AsyncMessage.prototype.readExternal.call(this, a, b);
	for (var c = this.readFlags(a), d = 0; d < c.length; ++d) {
		var e = c[d];
		if (0 != e >> 0) for (var f = 0; 6 > f; ++f) 0 != (e >> f & 1) && b.readData(a)
	}
	return this
};
AMF3.Flex.AcknowledgeMessageExt = function() {};
AMF3.Flex.AcknowledgeMessageExt.prototype = new AMF3.Flex.AcknowledgeMessage;
AMF3.Flex.AcknowledgeMessageExt.constructor = AMF3.Flex.AcknowledgeMessageExt;
AMF3.Flex.CommandMessage = function() {
	this.operation = 1E3;
	this.operationName = "unknown"
};
AMF3.Flex.CommandMessage.prototype = new AMF3.Flex.AsyncMessage;
AMF3.Flex.CommandMessage.constructor = AMF3.Flex.CommandMessage;
AMF3.Flex.CommandMessage.prototype.readExternal = function(a, b) {
	AMF3.Flex.AsyncMessage.prototype.readExternal.call(this, a, b);
	for (var c = this.readFlags(a), d = 0; d < c.length; ++d) {
		var e = c[d],
			f = 0,
			g = "subscribe unsubscribe poll unused3 client_sync client_ping unused6 cluster_request login logout subscription_invalidate multi_subscribe disconnect trigger_connect".split(" ");
		0 == d && (0 != (e & this.OPERATION_FLAG) && (this.operation = b.readData(a), this.operationName = 0 > this.operation || this.operation >= g.length ? "invalid." + operation + "" : g[operation]), f = 1);
		if (0 != e >> f) for (; 6 > f; ++f) 0 != (e >> f & 1) && b.readData(a)
	}
	return this
};
AMF3.Flex.CommandMessageExt = function() {};
AMF3.Flex.CommandMessageExt.prototype = new AMF3.Flex.CommandMessage;
AMF3.Flex.CommandMessageExt.constructor = AMF3.Flex.CommandMessageExt;
AMF3.Flex.ErrorMessage = function() {};
AMF3.Flex.ErrorMessage.prototype = new AMF3.Flex.AcknowledgeMessage;
AMF3.Flex.ErrorMessage.constructor = AMF3.Flex.ErrorMessage;
AMF3.Flex.ArrayCollection = function() {
	this.source = null
};
AMF3.Flex.ArrayCollection.prototype.readExternal = function(a, b) {
	this.source = b.readData(a);
	return this
};
AMF3.Flex.ArrayList = function() {};
AMF3.Flex.ArrayList.prototype = new AMF3.Flex.ArrayCollection;
AMF3.Flex.ArrayList.constructor = AMF3.Flex.ArrayList;
AMF3.Flex.ObjectProxy = function() {};
AMF3.Flex.ObjectProxy.prototype.readExternal = function(a, b) {
	var c = b.readData(a, !0),
		d;
	for (d in c) this[d] = c[d];
	return this
};
AMF3.Flex.ManagedObjectProxy = function() {};
AMF3.Flex.ManagedObjectProxy.prototype = new AMF3.Flex.ObjectProxy;
AMF3.Flex.ManagedObjectProxy.constructor = AMF3.Flex.ManagedObjectProxy;
AMF3.Flex.SerializationProxy = function() {
	this.defaultInstance = null
};
AMF3.Flex.SerializationProxy.prototype.readExternal = function(a, b) {
	this.defaultInstance = b.readData(a);
	return this
}

module.exports = AMF3;