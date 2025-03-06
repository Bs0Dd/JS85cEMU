/* Top level script for MK-85 emulator.
 * Trying to keep things simple this time and not cram the entire thing into a single object.
 * Although that would be handy, who knows, maybe I want to run 3 calculators on a single page
 * concurrently =)
 * 
 * 
 */

window.onload = function() {
	document.getElementById("mk85").appendChild(GUI);
	document.getElementById("mk85_panel").appendChild(PAN);
	document.getElementById("mk85_dbg").appendChild(DBG);
	document.getElementById("mk85_xchg").appendChild(XCHG);
	document.getElementById("mkbkeys").setAttributeNS(null, "opacity", (bmodel ? 1 : 0));
	if (((!extram || eramd) && (!extrom || erold))){
		PAN.panelStart();
	}
	//DBG.debugStart();
	pagld = true;
};

var VERVAR = "1.62 - build 06.03.2025";

var supportsVibrate = "vibrate" in navigator;

var useVibrate = window.localStorage.getItem('mkc_vibro');

if(supportsVibrate && (useVibrate == null)) {
	useVibrate = true;
	window.localStorage.setItem('mkc_vibro', useVibrate);
}
else if (supportsVibrate) {
	useVibrate = (useVibrate == "true");
}

//var BASEPATH = "/jsemu/mk85c";
var BASEPATH = "."; // Base path for files!

var GUI = composeGUI();

var altDisp = loadProperty('mkc_altdisp', false, true);
var bmodel = loadProperty('mkc_bmodel', false, true);

var LCD = new MK85_SVG_LCD();
var LCD_ANIMSPEED = 10;

var XCHG = new XCHGTOOL();
var DBG = new DBGTOOL();

var SPEED_NORMAL = loadProperty('mkc_normspeed', 250, false);
var SPEED_TURBO = loadProperty('mkc_turbospeed', 1200, false);

var DEBUG_STEPS = false;
var BREAKPOINT = false;
var SKIPBSTEP = false;

var ignoreFreqDiv = loadProperty('mkc_ignorediv', false, true);
var ignorePowerOff = loadProperty('mkc_ignorepoff', false, true);
var forceTurbo = loadProperty('mkc_forceturbo', false, true);

var DEBUG = loadProperty('mkc_debugmsg', false, true);

var PAN = new PANEL();

GUI.appendChild(LCD.svg);

var MK85CPU = new CPU();

var RAM = null;
var ROM = null;

var POWER = true;
var PAUSE_ON_HID = false;


function extrun() {
	if ((extram || extrom) && pagld) {
		PAN.panelStart();
	}
	startEmu();
}

// Load RAM and ROM contents

function ramlo() {
	if(ram == null) {
		console.log("Creating new RAM memory file");
		RAM = new Uint8Array(bmodel ? 4096 : 2048);
		ramname = "internal";
		ramAutoInit();
	} else if (!extram) {
		console.log("Getting RAM contents from local storage");
	
		if (ramname == null) {
			ramname = "internal";
		}
	
		RAM = new Uint8Array(base64ToArrayBuffer(ram));
	}
}

var ram = window.localStorage.getItem('mkc_ram');
var ramname = window.localStorage.getItem('mkc_ramname');

var urargs = parseURLParams(window.location.href);
var extram = false;
var extrom = false;
var eramd = false;
var erold = false;

var pagld = false;

if (urargs && urargs.ram) {
	var ract = true;
	if (ram != null && !(urargs.fload && urargs.fload=="force")) {
		ract = confirm('You are going to load RAM from the link and the old RAM will be lost. \
If the data in it is important to you, interrupt the load and save the old RAM.')
	}
	
	if (ract) {	
		console.log('Ext RAM load started.');
		extram = true;
		ramname = urargs.ram.toString().split('/').pop();
		loadBinaryHTTP(urargs.ram,
		function (buf) {
			RAM = new Uint8Array(buf);
			RAMbou();
			eramd = true;
			window.localStorage.setItem('mkc_ram', btoa(String.fromCharCode.apply(null, RAM)));
			window.localStorage.setItem('mkc_ramname', ramname);
			if (!extrom || erold) {
				extrun();
			}
		},
		function () {
			extram = false;
			ramname = window.localStorage.getItem('mkc_ramname');
			alert("Failed to load RAM from the link, loading old RAM...");
			ramlo();
			eramd = true;
			if (!extrom || erold) {
				extrun();
			}
		},);
	} else {
		console.log('Ext RAM load interrupted.');
		ramlo();
	}
}
else {
	ramlo();
}



function romlo() {
	if(rom == null) {
		console.log("Loading internal ROM memory file");
		romname = "internal";
	
		ROM = new Uint8Array(ROM_int); // Internal ROM image constant
	} else {
		console.log("Getting ROM contents from local storage");
	
		ROM = new Uint8Array(base64ToArrayBuffer(rom));
	}
}


var rom = window.localStorage.getItem('mkc_rom');
var romname = window.localStorage.getItem('mkc_romname');


if (urargs && urargs.rom) {
	
	console.log('Ext ROM load started.');
	extrom = true;
	romname = urargs.rom.toString().split('/').pop();
	loadBinaryHTTP(urargs.rom,
	function (buf) {
		ROM = new Uint8Array(buf);
		ROMbou();
		erold = true;
		window.localStorage.setItem('mkc_rom', btoa(String.fromCharCode.apply(null, ROM)));
		window.localStorage.setItem('mkc_romname', romname);
		if (!extram || eramd) {
			extrun();
		}
	},
	function () {
		extrom = false;
		romname = window.localStorage.getItem('mkc_romname');
		alert("Failed to load ROM from the link, loading old ROM...");
		romlo();
		erold = true;
		if (!extram || eramd) {
			extrun();
		}
	},);
}
else {
	romlo();
}

if (!extram && !extrom) {
	startEmu();
}


document.addEventListener("visibilitychange", () => {
	if (document.hidden) {
		if (POWER) {
			PAUSE_ON_HID = stopped;
			panelSwState(true);
		}
		// Store RAM in local storage
		window.localStorage.setItem('mkc_ram', btoa(String.fromCharCode.apply(null, RAM)));
	}
	else if (POWER && !PAUSE_ON_HID){
		panelSwState(false);
	}
});
