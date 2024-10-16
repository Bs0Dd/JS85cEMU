
// pretty self-explanatory, I think =)

var textSegs = [
	{addr:0x00, bit:0, id:"ext", txt:"EXT",  talt:"ЛАТ",  x:12, y:11+5},
	{addr:0x00, bit:1, id:"sse", txt:"S",    talt:"У",    x:26, y:6+5},
	{addr:0x00, bit:2, id:"ffe", txt:"F",    talt:"F",    x:26, y:16+5},
	{addr:0x08, bit:0, id:"run", txt:"RUN",  talt:"РШФ",  x:45, y:6+5},
	{addr:0x08, bit:1, id:"wrt", txt:"WRT",  talt:"ШИФ",  x:45, y:16+5},
	{addr:0x08, bit:4, id:"deg", txt:"DEG",  talt:"ДКЛ",  x:70, y:11+5},
	{addr:0x18, bit:0, id:"rad", txt:"RAD",  talt:"БЦР",  x:94, y:11+5},
	{addr:0x20, bit:0, id:"gra", txt:"GRA",  talt:"ЦИР",  x:118, y:11+5},
	{addr:0x28, bit:0, id:"tra", txt:"TR",   talt:"БЛК",  x:139, y:11+5},
	{addr:0x58, bit:3, id:"stp", txt:"STOP", talt:"СТОП", x:221, y:11+5},
];

var sevenSegsMapping = [
	{
		a:{addr:0x38, bit:1},
		b:{addr:0x38, bit:0},
		c:{addr:0x30, bit:4},
		d:{addr:0x30, bit:3},
		e:{addr:0x30, bit:2},
		f:{addr:0x30, bit:0},
		g:{addr:0x30, bit:1}
	},{
		a:{addr:0x40, bit:3},
		b:{addr:0x40, bit:2},
		c:{addr:0x40, bit:1},
		d:{addr:0x40, bit:0},
		e:{addr:0x38, bit:4},
		f:{addr:0x38, bit:2},
		g:{addr:0x38, bit:3}
	},{
		a:{addr:0x50, bit:0},
		b:{addr:0x48, bit:4},
		c:{addr:0x48, bit:3},
		d:{addr:0x48, bit:2},
		e:{addr:0x48, bit:1},
		f:{addr:0x40, bit:4},
		g:{addr:0x48, bit:0}
	},{
		a:{addr:0x58, bit:2},
		b:{addr:0x58, bit:1},
		c:{addr:0x58, bit:0},
		d:{addr:0x50, bit:4},
		e:{addr:0x50, bit:3},
		f:{addr:0x50, bit:1},
		g:{addr:0x50, bit:2}
	}
];

var cursorShapes = {
	underscore:{or:[0,0,0,0,0,0,31], and:[0,0,0,0,0,0,31]},
	block:{or:[31,31,31,31,31,31,31], and:[31,31,31,31,31,31,31]},
	none:{or:[0,0,0,0,0,0,0], and:[31,31,31,31,31,31,31]}
};
