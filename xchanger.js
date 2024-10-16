// Xchanger tool module
// Allows to exchange data between MK85C and user

// 2024 (c) Bs0Dd

function XCHGTOOL() {
    const xp = document.createElement("div");
    xp.id = "mk85_xchg_int";
    xp.style.marginLeft = "auto";
    xp.style.marginRight = "auto";
    xp.style.textAlign = "center";
    xp.style.display = "none";

    const code = document.createElement("textarea");
    // code.oninput = function() {
    //     updText(xp);
    // }
    code.onfocus = function() {
        panelEditFocus();
    }
    code.onblur = function() {
        panelEditNoFocus();
    }
    code.id = "code";
    code.maxLength = 2300;
    code.style.width = "720px";
    code.style.height = "100px";
    code.style.resize = "none";
    xp.appendChild(code);

    xp.appendChild(document.createElement("br"));
    xp.appendChild(document.createElement("br"));

    const ext = document.createElement("button");
    ext.onclick = function() {
        xp.style.display = "none";
        document.getElementById("mk85_xchg_br").style.display = "none";
    }
    ext.innerText = "Close";

    xp.appendChild(ext);

    const td2d = document.createElement("span");
    td2d.innerHTML = "&nbsp;||&nbsp;"
    xp.appendChild(td2d);

    const snd = document.createElement("button");
    snd.onclick = function() {
        if (RAM[0x87]&1) { // keyboard blocked
            return;
        }

        function kpre(k) {
            uniquesPressed.push(k);
            console.log(uniquesPressed);
        }

        function kupre(k) {
            uniquesPressed.splice(k, 1);
            console.log(uniquesPressed);
        }

        function ramject(cvl, numeric) {
            kupre("zas");
            var stpo = MK85CPU.reg_u16[6]-0x7FF4
            var ead = (((RAM[stpo+1] & 0xFF) << 8) | (RAM[stpo] & 0xFF))-0x8000; // stop-address

            var ptr = MK85CPU.reg_u16[5]-0x8000; // cursor pointer
            cvl = cvl.slice(0, ead - ptr);
            var spos = 0; 
            while (spos < cvl.length) {
                RAM[ptr++] = (numeric) ? (Number(cvl[spos++])) : (koitab.indexOf(cvl[spos++]));
            }
            RAM[ptr] = 0xFF;
            MK85CPU.reg_u16[4] = 0x8000+ptr;
            MK85CPU.reg_u16[5] = MK85CPU.reg_u16[4];
            kpre("mode_f");
            setTimeout(kupre, 100, "mode_f");
            return;
        }

        var c = 0;
        var latf = RAM[0x83]&1; // LAT indicator

        var cvl = xp.CODESTR.value;
        var numeric = false;

        console.log(((RAM[0x7B]&32) == 0) && (RAM[0x7B] != 0), RAM[0x7B], RAM[0x7B]&32);

        if (RAM[0x7B]&64) { // numeric input flag
            cvl = cvl.replace(/\D/g, ''); // only numbers
            numeric = true;
        }
        else {
            // upper case, new lines to spaces, «» to "", — to -, only KOI symbols
            cvl = cvl.toUpperCase().replace(/\n/g, ' ').replaceAll("—", "-").
                  replaceAll("«", "\"").replaceAll("»", "\"").replace(/[^ -[\]…А-ЯЁ█]/g, '');
        }

        if (cvl.length == 0) {
            return;
        }

        if (RAM[0x83]&2) { // UPR indicator (off it)
            setTimeout(kpre, 200*c, "mode");
            setTimeout(kupre, 100+(200*c), "mode");
            c++;
        }

        if (xp.DIRECT.checked && (RAM[0x84]&1 || RAM[0x84]&2 || RAM[0x84]&0x10)) { // only for enc, dec or key change modes
            setTimeout(kpre, 200*c, "zas");
            setTimeout(ramject, 100+(200*c), cvl, numeric);
            return;
        }

        for (let i=0; i<cvl.length; i++) {
            const ch = cvl[i].toLowerCase();
            const cc = ch.charCodeAt();

            if ((cc >= 48) && (cc <= 57)) {
                setTimeout(kpre, 200*c, "n"+ch);
                setTimeout(kupre, 100+(200*c), "n"+ch);
                c++;
            }
            else if (cc == 0x20) {
                setTimeout(kpre, 200*c, "spc");
                setTimeout(kupre, 100+(200*c), "spc");
                c++;
            }
            else if (cc == 0x5b || cc == 0x5d) {
                if (latf) {
                    setTimeout(kpre, 200*c, (cc == 0x5b) ? "sh" : "sha");
                    setTimeout(kupre, 100+(200*c), (cc == 0x5b) ? "sh" : "sha");
                    c++;
                }
                else {
                    setTimeout(kpre, 200*c, "mode");
                    setTimeout(kupre, 100+(200*c), "mode");
                    c++;
                    setTimeout(kpre, 200*c, (cc == 0x5b) ? "g" : "sh");
                    setTimeout(kupre, 100+(200*c), (cc == 0x5b) ? "g" : "sh");
                    c++;
                }
            }
            else if (((cc >= 0x61) && (cc <= 0x7a)) || ch == "@" || ch == "…" ) {
                if (!latf) {
                    setTimeout(kpre, 200*c, "rl");
                    setTimeout(kupre, 100+(200*c), "rl");
                    c++;
                    latf = true;
                }
                setTimeout(kpre, 200*c, kebase[ch]);
                setTimeout(kupre, 100+(200*c), kebase[ch]);
                c++;
            }
            else if ((cc >= 1072) && (cc <= 1103) && !(cc == 1081 || cc == 1098)) {
                if (latf) {
                    setTimeout(kpre, 200*c, "rl");
                    setTimeout(kupre, 100+(200*c), "rl");
                    c++;
                    latf = false;
                }
                setTimeout(kpre, 200*c, kbbase[ch]);
                setTimeout(kupre, 100+(200*c), kbbase[ch]);
                c++;
            }
            else if (ch in kubase) {
                setTimeout(kpre, 200*c, "mode");
                setTimeout(kupre, 100+(200*c), "mode");
                c++;
                setTimeout(kpre, 200*c, kubase[ch]);
                setTimeout(kupre, 100+(200*c), kubase[ch]);
                c++;
            }
        }

    }
    snd.innerText = "Send to MK";

    xp.appendChild(snd);

    const deli = document.createElement("span");
    deli.innerHTML = "&nbsp;"
    xp.appendChild(deli);

    const clab = document.createElement("label");
    clab.htmlFor = "xchgcbox";
    clab.innerHTML = "directly"
    xp.appendChild(clab);

    const cbox = document.createElement("input");
    cbox.id = "xchgcbox";
    cbox.type = "checkbox";
    xp.appendChild(cbox);

    const td3d = document.createElement("span");
    td3d.innerHTML = "&nbsp;||&nbsp;"
    xp.appendChild(td3d);

    const erbtn = document.createElement("button");
    erbtn.onclick = function() {
        if (RAM[0x84]&1 && RAM[0xD4] == 9) { // decoding sym mode
            var blqs = RAM[0xD6]; // blocks size;
            var decd = "";
            var ptr = 0x5E7; // decoded data start
    
            while (RAM[ptr] < 0x80) { // checking value from firmware
                decd+= (RAM[ptr] > 0x5F) ? "~" : koitab[RAM[ptr]];
                ptr++;
            }

            if (decd.length > 0) { // only if there are some data
                xp.CODESTR.value = decd;
            }
        }
        else if (RAM[0x84]&1 && RAM[0xD5] == 0x40) { // decoding num mode
            var blqs = RAM[0xD6]; // blocks size;
            var decd = "";
            var ptr = 0x4DB; // decoded data start
            var bctr = 0;
    
            while (RAM[ptr] < 0x80) { // checking value from firmware
                if (bctr == blqs) {
                    decd+=" ";
                    bctr = 0;
                }
                decd+= RAM[ptr];
                ptr++;
                bctr++;
            }

            if (decd.length > 0) { // only if there are some data
                xp.CODESTR.value = decd;
            }
        }
        else if (RAM[0x84]&2) { //encoding mode
            var blqs = RAM[0xD6]; // blocks size;
            var encd = "";
            var ptr = 0x1AC; // encoded data start
            var bctr = 0;
    
            while (RAM[ptr] < 10) {
                if (bctr == blqs) {
                    encd+=" ";
                    bctr = 0;
                }
                encd+=RAM[ptr];
                ptr++;
                bctr++;
            }
    
            if (encd.length > 11) { // only if there are some data excluding MRK
                xp.CODESTR.value = encd;
            }
        }
    }
    erbtn.innerText = "Get result";
    xp.appendChild(erbtn);

    const delip = document.createElement("span");
    delip.innerHTML = "&nbsp;"
    xp.appendChild(delip);

    const dkbtn = document.createElement("button");
    dkbtn.onclick = function() {
        var encd = "";
        var ptr = 0x98; // DKL start
    
        while (ptr < 0xD4) {
            if (((ptr < 0xCA) && (RAM[ptr] > 99)) || ((ptr >= 0xCA) && (RAM[ptr] > 9))) { // bad DKL, interrupting
                return;
            }
            encd+= (ptr < 0xCA) ? ('0' + RAM[ptr++]).slice(-2) : RAM[ptr++];
        }
    
        xp.CODESTR.value = encd.replace(/(.{5})/g," $1").slice(1);
    }
    dkbtn.innerText = "Get DKL";
    xp.appendChild(dkbtn);

    const td9d = document.createElement("span");
    td9d.innerHTML = "&nbsp;||&nbsp;"
    xp.appendChild(td9d);

    const sndk = document.createElement("button");
    sndk.onclick = function() {
        var kej = new Uint8Array(50);
        var kstr = "";

        for (let i = 0; i < kej.length; i++) {
            kej[i] = Math.random() * 100;
            kstr+= ('0' + kej[i]).slice(-2);
        }

        var ksu = checksum(kej);

        for (let i = 0; i < ksu.length; i++) {
            kstr+= ksu[i];
        }

        kstr = kstr.match(/.{5}/g).join(' ');
        xp.CODESTR.value = kstr;
    }
    sndk.innerText = "New DKL";

    xp.appendChild(sndk);

    const td19d = document.createElement("span");
    td19d.innerHTML = "&nbsp;||&nbsp;"
    xp.appendChild(td19d);

    const cpbtn = document.createElement("button");
    cpbtn.onclick = function() {
        navigator.clipboard.writeText(xp.CODESTR.value);
    }
    cpbtn.innerText = "Copy";
    xp.appendChild(cpbtn);

    const td8d = document.createElement("span");
    td8d.innerHTML = "&nbsp;"
    xp.appendChild(td8d);

    const clbtn = document.createElement("button");
    clbtn.onclick = function() {
        xp.CODESTR.value = "";
        //updText(xp);
    }
    clbtn.innerText = "Clear";
    xp.appendChild(clbtn);

    xp.CODESTR = code;
    xp.DIRECT = cbox;

    return xp;
}

// function updText() {

// }

const kbbase = {
    "ц":"c",
    "у":"u",
    "к":"k",
    "е":"e",
    "н":"n",
    "г":"g",
    "ш":"sh",
    "щ":"sha",
    "з":"z",
    "х":"h",
    "ф":"f",
    "ы":"y",
    "в":"w",
    "а":"a",
    "п":"p",
    "р":"r",
    "о":"o",
    "л":"l",
    "д":"d",
    "ж":"zh",
    "э":"ie",
    "я":"ya",
    "ч":"ch",
    "с":"s",
    "м":"m",
    "и":"i",
    "т":"t",
    "ь":"mz",
    "б":"b",
    "ю":"ju"
}

const kebase = {
    "c":"c",
    "u":"u",
    "k":"k",
    "e":"e",
    "n":"n",
    "g":"g",
    "[":"sh",
    "]":"sha",
    "z":"z",
    "h":"h",
    "f":"f",
    "y":"y",
    "w":"w",
    "a":"a",
    "p":"p",
    "r":"r",
    "o":"o",
    "l":"l",
    "d":"d",
    "v":"zh",
    "…":"ie",
    "q":"ya",
    "j":"ch",
    "s":"s",
    "m":"m",
    "i":"i",
    "t":"t",
    "x":"mz",
    "b":"b",
    "@":"ju"
}

const kubase = {
    ":":"c",
    "(":"k",
    ",":"n",
    "[":"g",
    "]":"sh",
    "+":"z",
    "-":"a",
    ")":"l",
    "=":"zh",
    "ё":"ie",
    "й":"ch",
    "\"":"s",
    ".":"m",
    "/":"mz",
    "?":"b",
    "ъ":"ju"
}

const koitab = " !\"#$%&'()*+,-./\
0123456789:;<=>?\
@ABCDEFGHIJKLMNO\
PQRSTUVWXYZ[Ъ]…Ё\
ЮАБЦДЕФГХИЙКЛМНО\
ПЯРСТУЖВЬЫЗШЭЩЧ█"


function checksum(key){
    // @371E: 4A380E2109 hex, a magic number...
    var mrk = [0x4A,0x38,0x0E,0x21,0x09];
    var cs_raw = stream(mrk, key, 1);
    
    // @3764
    var cs_mask = [1, 0, 7, 5, 3, 2, 9, 8, 4, 6];

    var cs = new Uint8Array(10);
    for (let i = 0; i < 5; i++){
        cs[i * 2] = Math.floor(10 + cs_raw[i] / 10 - cs_mask[i * 2]) % 10
        cs[i * 2 + 1] = (10 + cs_raw[i] % 10 - cs_mask[i * 2 + 1]) % 10
    }

    return cs;
}


// @32E4 @347A
// LFSR?
var table_1 = [ 0x06, 0x0E, 0x28, 0x42, 0x56, 0x08, 0x52, 0x55, 0x4D, 0x44,
                0x43, 0x02, 0x1A, 0x17, 0x35, 0x33, 0x61, 0x46, 0x30, 0x39,
                0x3A, 0x25, 0x18, 0x0B, 0x00, 0x4A, 0x10, 0x51, 0x5F, 0x34,
                0x21, 0x2D, 0x2B, 0x5A, 0x57, 0x3E, 0x3F, 0x11, 0x49, 0x63,
                0x09, 0x26, 0x23, 0x07, 0x4E, 0x32, 0x22, 0x2E, 0x48, 0x03,
                0x01, 0x0D, 0x13, 0x0F, 0x3B, 0x59, 0x41, 0x62, 0x2C, 0x36,
                0x40, 0x1F, 0x5B, 0x0C, 0x47, 0x53, 0x3C, 0x20, 0x60, 0x4C,
                0x14, 0x50, 0x1B, 0x04, 0x5E, 0x24, 0x3D, 0x5D, 0x27, 0x0A,
                0x5C, 0x31, 0x2A, 0x58, 0x37, 0x2F, 0x12, 0x4F, 0x1E, 0x29,
                0x05, 0x38, 0x1C, 0x45, 0x16, 0x19, 0x1D, 0x54, 0x15, 0x4B]

var EROUND = 0;

function elementary_round(data, key, offset){
    var R0 = (table_1[EROUND] + key[offset]) % 100; // Range 0 to 99.
    var R2 = data[offset % 10];
    EROUND = (100 + EROUND + R0 - R2) % 100; // Range 0 to 99.
    data[offset % 10] = R0;
        
    return data
}

function full_round(data, key){
    for (let i = 0; i < 50; i++){
        data = elementary_round(data, key, i);
    }

    return data;
}

function sum_digsb(bu) {
    var retv = 0;

    for (let i = 0; i < bu.length; i++) {
        retv+= bu[i];
    }

    return retv;
}

// Get blocks_n pieces of stream, BLOCK_SIZE each.
function stream(mrk, key, blocks_n){
    var buffer = new Uint8Array(10);
    buffer.set(mrk);
    buffer.set(mrk, 5)
    EROUND = sum_digsb(buffer) % 100;

    var temp = new Uint8Array(60);
    
    for (let i = 0; i < 6; i++){
        buffer = full_round(buffer, key);
        temp.set(buffer, i*10);
    }

    var new_key = new Uint8Array(50);
    for (let i = 0; i < 50; i++){
        new_key[i] = (key[i] + temp[i]) % 100;  // Range 0 to 99.
    }

    temp = new Uint8Array(blocks_n*10);
    
    for (let i = 0; i < blocks_n; i++){
        buffer = full_round(buffer, new_key);
        temp.set(buffer, i*10);
    }
    
    return temp;
}