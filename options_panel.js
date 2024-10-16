// Options panel module
// Panel with standard functions to configure emulator
// (change RAM size, load ROM/RAM from files, save RAM to disk, change speed parameters and etc.)

// 2024 (c) Bs0Dd

var stopped = false;

var realConsoleLog = console.log;

function PANEL() {

    const pnl = document.createElement("table");
    pnl.id = "mk85_panel_int";

    var dwram = document.createElement('a');
    dwram.id = "dwram";
    dwram.style.display = "none";
    dwram.download = "mk85c_ram.bin";

    pnl.appendChild(dwram);

    var ign = ignoreFreqDiv ? "checked" : "";
    var ignp = ignorePowerOff ? "checked" : "";
    var forc = forceTurbo ? "checked" : "";
    var altd = altDisp ? "checked" : "";

    var dbgm = DEBUG ? "checked" : "";

    var mdl = bmodel ? "С" : "Б";
    var rsi = bmodel ? "4" : "2";

    if (!DEBUG) {
        console.log = function() {};
    }

    var tabcont = [[],[],[]];
    tabcont[0][1] = `<button id="stst" onClick="panelSwState()">Pause</button>
            <button id="rst" onClick="panelDevRestart()">Restart</button>`;

    if (supportsVibrate) {
        var vib = useVibrate ? "checked" : "";

        tabcont[0][1] += `| <label for="vib">Vibro (keys):</label> <input type="checkbox" onChange="panelSwVibro()" id="vib" name="vib" ${vib}>`;
    }

    tabcont[1][1] = `RAM file (<span id="rsi">${rsi}</span>KB): <span id="rfi"></span><br><button onClick="panelSaveRaF()">Save RAM</button>
    <button onClick="panelNewMem()">Clear RAM</button> <button onClick="panelNewMem();ramAutoInit();">Fast init</button><br>
    <button onClick="panelLoadRaF()">Load RAM from file</button>: <input type="file" id="ramf" name="ramf" accept=".bin"><br><br>
    ROM file: <span id="rofi"></span><br>
    <button onClick="panelSwiMod()">Switch to model <span id="bmo">${mdl}</span></button> <button onClick="panelResetRoF()">Reset ROM</button><br>
    <button onClick="panelLoadRoF()">Load ROM from file</button>: <input type="file" id="romf" name="romf" accept=".bin">`;

    tabcont[1][0] = `<button onClick="panelOpenLay()">Keyboard layout</button>
    <button onClick="panelOpenXTool()">Xchanger</button> <button onClick="panelOpenDbg()">Debugger</button><br>
    <button onClick="panelOpenHelp()">Help</button> <button onClick="panelOpenInfo()">About</button><br>
    <label for="itmeg">Use more "meaningful" display:</label> <input type="checkbox" onChange="panelSwMeag()" id="itmeg" name="itmeg" ${altd}><br>
    <label for="iturb">Force turbo (ign. bit 3 in cpuctrl):</label> <input type="checkbox" onChange="panelSwTurIg()" id="iturb" name="iturb" ${forc}><br>
    <label for="ifrdiv">Ignore frq. div. (bit 11 in cpuctrl):</label> <input type="checkbox" onChange="panelSwDivIg()" id="ifrdiv" name="ifrdiv" ${ign}><br>
    <label for="ipoff">Disable soft poff (bit 12 in cpuctrl):</label> <input type="checkbox" onChange="panelSwDivPo()" id="ipoff" name="ifrdiv" ${ignp}><br>
    <label for="dbgm">Show debug messages in console:</label> <input type="checkbox" onChange="panelSWDbgMsg()" id="dbgm" name="dbgm" ${dbgm}>`;

    tabcont[0][0] = `Speed: <span id="speedstat"></span><br>
    Standard: <input type="number" style="width:80px;" min="100" max="1000000" id="norvl"
    onkeydown="panelOnEnter(this, event.keyCode, panelSetNormSP);" onfocus="panelEditFocus()" onblur="panelEditNoFocus()">
    <label for="norvl">Op/s</label>
    <button onClick="panelSetNormSP()">Set</button> <button onClick="panelResetNormSP()">Reset</button><br>
    Turbo: <input type="number" style="width:80px;" min="100" max="1000000" id="turvl"
    onkeydown="panelOnEnter(this, event.keyCode, panelSetTurSP);" onfocus="panelEditFocus()" onblur="panelEditNoFocus()">
    <label for="turvl">Op/s</label>
    <button onClick="panelSetTurSP()">Set</button> <button onClick="panelResetTurSP()">Reset</button><br>
    <button id="cspm" onClick="panelChangeSP()">Change speed mode</button> <button id="rstm" onClick="panelSetTRB()">Restart in turbo mode</button>`;

    for (let i=0; i < 2; i++){
        const row = document.createElement("tr");
        for (let c=0; c < 2; c++) {
            const td = document.createElement("td");
            td.id = `cl${i}-${c}`;
            //td.style.lineHeight = "1.8";

            if (typeof tabcont[i][c] != "undefined") {
                td.innerHTML = tabcont[i][c];
            }

            if (c == 0 && i == 0) {
                td.style.width = "340px";
            }

            row.appendChild(td);
        }
        pnl.appendChild(row);
    }

    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 2;
    td.innerText = `JS85cEMU v${VERVAR}`;
    td.style.textAlign = "center";
    td.style.fontWeight = "bold";
    row.appendChild(td);
    pnl.appendChild(row);

    pnl.panelStart = function(){
        document.getElementById("norvl").value = SPEED_NORMAL * 100;
        document.getElementById("turvl").value = SPEED_TURBO * 100;

        document.getElementById("rfi").innerText = ramname;
        document.getElementById("rofi").innerText = romname;

        panelUpdate();
    
        this.timer = setInterval(panelUpdate, 1000);
    }

    pnl.panelStop = function(){
        clearInterval(this.timer);
        this.timer = null;
    }

    return pnl;
}

function panelOpenXTool() {
    const hidp = document.getElementById("mk85_xchg_int");
    hidp.style.display = (hidp.style.display == "none") ? "" : "none";
    document.getElementById("mk85_xchg_br").style.display = hidp.style.display;
}

function panelSwMeag() {
    altDisp = !altDisp;
    window.localStorage.setItem('mkc_altdisp', altDisp);

    for(var x = 0; x<textSegs.length; x++) {
        document.getElementById(textSegs[x].id).textContent = (altDisp ? textSegs[x].talt : textSegs[x].txt);
    }
}

function panelOnEnter(th, kc, fun) {
    if (kc == 13) {
        th.blur();
        fun();
    }
}

function panelOpenHelp() {
    window.open(`${BASEPATH}/help/help.html`,'85c_helpWindow', `toolbar=no, location=no, status=no, menubar=no,
        scrollbars=no, resizable=no, width=820, height=660`)
}

function panelOpenDbg() {
    const hidp = document.getElementById("mk85_dbg_int");
    hidp.style.display = (hidp.style.display == "none") ? "" : "none";
    document.getElementById("mk85_dbg_br").style.display = hidp.style.display;
    var active = (!stopped && POWER);
    if (hidp.style.display == "" && active) {
        DBG.debugStart();
    }
    else if (hidp.style.display == "" && !active) {
        debugUpdate();
        debugUpdRegIn();
    }
    else{
        DBG.debugStop();
    }
}


function panelSWDbgMsg(){
    DEBUG = !DEBUG;
    window.localStorage.setItem('mkc_debugmsg', DEBUG);

    if (DEBUG) {
        console.log = realConsoleLog;
    }
    else {
        console.log = function() {};
    }

}

function panelEditFocus() {
    window.removeEventListener('keydown', KBKeyPress, true);
    window.removeEventListener('keyup', KBKeyRelease, true);
} 

function panelEditNoFocus() {
    window.addEventListener('keydown', KBKeyPress, true);
    window.addEventListener('keyup', KBKeyRelease, true);
} 

function panelResetTurSP(){
    document.getElementById("turvl").value = "120000";
    panelSetTurSP();
}

function panelSetTurSP(){
    var nval = Number(document.getElementById("turvl").value);

    if (nval > 1000000) {
        nval = 1000000;
        document.getElementById("turvl").value = nval;
    }
    else if (nval < 100) {
        nval = 100;
        document.getElementById("turvl").value = nval;
    }

    SPEED_TURBO = nval / 100;
    window.localStorage.setItem('mkc_turbospeed', SPEED_TURBO);
}

function panelResetNormSP(){
    document.getElementById("norvl").value = "25000";
    panelSetNormSP();
}

function panelSetNormSP(){
    var nval = Number(document.getElementById("norvl").value);

    if (nval > 1000000) {
        nval = 1000000;
        document.getElementById("norvl").value = nval;
    }
    else if (nval < 100) {
        nval = 100;
        document.getElementById("norvl").value = nval;
    }

    SPEED_NORMAL = nval / 100;
    window.localStorage.setItem('mkc_normspeed', SPEED_NORMAL);
}


function panelSwDivPo() {
    ignorePowerOff = document.getElementById("ipoff").checked;
    MK85CPU.ignorePowerOff = ignorePowerOff;
    window.localStorage.setItem('mkc_ignorepoff', ignorePowerOff);
}

function panelSwDivIg() {
    ignoreFreqDiv = document.getElementById("ifrdiv").checked;
    MK85CPU.ignoreFreqDiv = ignoreFreqDiv;
    window.localStorage.setItem('mkc_ignorediv', ignoreFreqDiv);
}

function panelSwTurIg() {
    forceTurbo = document.getElementById("iturb").checked;
    MK85CPU.forceTurbo = forceTurbo;
    window.localStorage.setItem('mkc_forceturbo', forceTurbo);
}

function panelChangeSP(){
    MK85CPU.cpuctrl ^= 0x0008;
    panelUpdate();
}

function panelSetTRB(){
    panelDevRestart();

    setTimeout(function () {
		MK85CPU.cpuctrl |= 0x0008;
	  }, 500)
}

function panelOpenInfo() {
    window.open(`${BASEPATH}/about.html`,'85c_aboutWindow', `toolbar=no, location=no, status=no, menubar=no,
        scrollbars=no, resizable=no, width=820, height=570`)
}

function panelOpenLay() {
    window.open(`${BASEPATH}/layout.html`,'85c_layoutWindow', `toolbar=no, location=no, status=no, menubar=no,
        scrollbars=no, resizable=no, width=820, height=340`)
}

function panelSwVibro() {
    useVibrate = !useVibrate;
    document.getElementById("vib").checked = useVibrate;
    window.localStorage.setItem('mkc_vibro', useVibrate);
}

function panelUnStop() {
    PAN.panelStart();
    if (document.getElementById("mk85_dbg_int").style.display == "") {
        DBG.debugStart();
    }
    document.getElementById("stst").innerText="Pause";
    document.getElementById("dstst").innerText="Pause";

    document.getElementById("dbst").disabled = true;
    document.getElementById("dbsts").disabled = true;
    document.getElementById("dbbr").disabled = true;
    document.getElementById("stps").disabled = true;
    document.getElementById("brkp").disabled = true;
    document.getElementById("regist").disabled = true;
    document.getElementById("reged").disabled = true;
    document.getElementById("edreg").disabled = true;
    
    document.getElementById("disu").disabled = true;
    document.getElementById("dispu").disabled = true;
    document.getElementById("disgo").disabled = true;
    document.getElementById("disgob").disabled = true;
    document.getElementById("dispd").disabled = true;
    document.getElementById("disd").disabled = true;
    document.getElementById("disr").disabled = true;
    document.getElementById("dised").disabled = true;
    document.getElementById("diss").disabled = true;
    stopped = false;
}

function panelSaveRaF(){
    //PAN.panelStop();

    if (POWER && !stopped) {
        LCD.stopAnimating();
    }

    
    window.localStorage.setItem('mkc_ram', btoa(String.fromCharCode.apply(null, RAM)));

    var dwram = document.getElementById("dwram");
    var blob = new Blob([RAM], {'type':'application/octet-stream'});
    dwram.href = URL.createObjectURL(blob);
    dwram.click();

    //PAN.panelStart();
    if (POWER && !stopped) {
        LCD.animate(LCD_ANIMSPEED);
    }
}

function panelLoadRaF() {
    const ramf = document.getElementById("ramf").files[0];

    if (typeof ramf == "undefined") {
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        //console.log(reader.result)

        //PAN.panelStop();
        if (POWER) {
            LCD.stopAnimating();
            LCD.clearScreen();
            if (stopped) {
                panelUnStop();
            }
        }

        RAM = new Uint8Array(reader.result);

        RAMbou();

        ramname = ramf.name;
        window.localStorage.setItem('mkc_ram', btoa(String.fromCharCode.apply(null, RAM)));
        window.localStorage.setItem('mkc_ramname', ramname);
        document.getElementById("rfi").innerText = ramname;

        if (POWER) {
            MK85CPU = new CPU();
            startEmu();
            panelUpdate();
            if (document.getElementById("mk85_dbg_int").style.display == "") {
                debugUpdate();
            }
        }
        //PAN.panelStart();
    };

    reader.readAsArrayBuffer(ramf);
}

function panelLoadRoF(){
    const romf = document.getElementById("romf").files[0];

    if (typeof romf == "undefined") {
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        //console.log(reader.result)

        //PAN.panelStop();
        if (POWER) {
            LCD.stopAnimating();
            LCD.clearScreen();
            if (stopped) {
                panelUnStop();
            }
        }

        ROM = new Uint8Array(reader.result);

        ROMbou();

        romname = romf.name;
        window.localStorage.setItem('mkc_rom', btoa(String.fromCharCode.apply(null, ROM)));
        window.localStorage.setItem('mkc_romname', romname);
        document.getElementById("rofi").innerText = romname;

        if (POWER) {
            MK85CPU = new CPU();
            startEmu();
            panelUpdate();
            if (document.getElementById("mk85_dbg_int").style.display == "") {
                debugUpdate();
            }
        }
        
        //PAN.panelStart();
    };

    reader.readAsArrayBuffer(romf);
}

function panelLoadRoF(){
    const romf = document.getElementById("romf").files[0];

    if (typeof romf == "undefined") {
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        //console.log(reader.result)

        //PAN.panelStop();
        if (POWER) {
            LCD.stopAnimating();
            LCD.clearScreen();
            if (stopped) {
                panelUnStop();
            }
        }

        ROM = new Uint8Array(reader.result);

        ROMbou();

        romname = romf.name;
        window.localStorage.setItem('mk_rom', btoa(String.fromCharCode.apply(null, ROM)));
        window.localStorage.setItem('mk_romname', romname);
        document.getElementById("rofi").innerText = romname;

        if (POWER) {
            MK85CPU = new CPU();
            startEmu();
            panelUpdate();
            if (document.getElementById("mk85_dbg_int").style.display == "") {
                debugUpdate();
            }
        }
        
        //PAN.panelStart();
    };

    reader.readAsArrayBuffer(romf);
}

function panelDevRestart() {
    //PAN.panelStop();
    LCD.stopAnimating();
    LCD.clearScreen();

    if (stopped) {
        panelUnStop();
    }

    MK85CPU = new CPU();
    startEmu();
    //PAN.panelStart();
}

function panelSwState(stat) {
    if (stat == stopped) {
        return;
    }
    else if (typeof stat == "boolean") {
        stopped = stat
    }
    else {
        stopped = !stopped;
    }

    if (!stopped) {
        PAN.panelStart();
        LCD.animate(LCD_ANIMSPEED);
        document.getElementById("stst").innerText="Pause";
        document.getElementById("dstst").innerText="Pause";
        if (document.getElementById("mk85_dbg_int").style.display == "") {
            DBG.debugStart();
        }
    }
    else {
        PAN.panelStop();
        LCD.stopAnimating();
        document.getElementById("stst").innerText="Resume";
        document.getElementById("dstst").innerText="Resume";
        if (document.getElementById("mk85_dbg_int").style.display == "") {
            DBG.debugStop();
            debugUpdRegIn();
            debugUpdate();
        }
        
    }

    document.getElementById("dbst").disabled = !stopped;
	document.getElementById("dbsts").disabled = !stopped;
	document.getElementById("dbbr").disabled = !stopped;
    document.getElementById("stps").disabled = !stopped;
    document.getElementById("brkp").disabled = !stopped;
    document.getElementById("regist").disabled = !stopped;
    document.getElementById("reged").disabled = !stopped;
    document.getElementById("edreg").disabled = !stopped;

    document.getElementById("disu").disabled = !stopped;
    document.getElementById("dispu").disabled = !stopped;
    document.getElementById("disgo").disabled = !stopped;
    document.getElementById("disgob").disabled = !stopped;
    document.getElementById("dispd").disabled = !stopped;
    document.getElementById("disd").disabled = !stopped;
    document.getElementById("disr").disabled = !stopped;
    document.getElementById("dised").disabled = !stopped;
    document.getElementById("diss").disabled = !stopped;
}

function panelNewMem(){
    //PAN.panelStop();
    if (POWER) {
        LCD.stopAnimating();
        LCD.clearScreen();
        if (stopped) {
            panelUnStop();
        }
    }
    RAM = new Uint8Array(bmodel ? 4096 : 2048);
    window.localStorage.removeItem('mkc_ramname');
    ramname = "internal";
    document.getElementById("rfi").innerText = ramname;


    if (POWER) {
        MK85CPU = new CPU();
        startEmu();
        panelUpdate();
        if (document.getElementById("mk85_dbg_int").style.display == "") {
            debugUpdate();
        }
        
    }
    //PAN.panelStart();
}

function panelResetRoF() {
    //PAN.panelStop();
    if (POWER) {
        LCD.stopAnimating();
        LCD.clearScreen();
        if (stopped) {
            panelUnStop();
        }
    }

    romname = "internal";
    window.localStorage.removeItem('mkc_rom');
    window.localStorage.removeItem('mkc_romname');
    document.getElementById("rofi").innerText = romname;

    ROM = new Uint8Array(ROM_int); // Internal ROM image constant

    if (POWER) {
        MK85CPU = new CPU();
        startEmu();
        panelUpdate();
        if (document.getElementById("mk85_dbg_int").style.display == "") {
            debugUpdate();
        }
    }
    //PAN.panelStart();
}

function panelSwiMod() {
    if (bmodel || confirm('WARNING: ROM for model Б isn\'t available for legal reasons! \
You need to get it somewhere (good luck lol) and load manually. \
For this reason, some functions aren\'t work for model Б.')) {
        bmodel = !bmodel;

        window.localStorage.setItem('mkc_bmodel', bmodel);
        document.getElementById("bmo").innerText = bmodel ? "С" : "Б";
        document.getElementById("rsi").innerText = bmodel ? "4" : "2";
        document.getElementById("mkbkeys").setAttributeNS(null, "opacity", (bmodel ? 1 : 0));
        panelNewMem();
    }
}

function panelUpdate(){
    document.getElementById("speedstat").innerText=
        (((MK85CPU.cpuctrl&0x0008)==0) && !MK85CPU.forceTurbo) ? "Normal" : "Turbo";

    if (((MK85CPU.cpuctrl&0x0800)==0) && !MK85CPU.ignoreFreqDiv) {
        document.getElementById("speedstat").innerText+= " (8x slowed by freq. divider)"
    }

    if ((MK85CPU.cpuctrl&0x0400)==0) {
        document.getElementById("speedstat").innerText+= " (clock stopped)"
    }

    //console.log((MK85CPU.cpuctrl).toString(2));
}