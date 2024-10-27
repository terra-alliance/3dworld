let px = 3
let s = 0.15 - remap(window.innerWidth, 1920, 0, 0, 0.07);

function audio () { audiotoggle = !audiotoggle; playSound(); }
function quality () { if (quality < 2) {quality += 1} else {quality = 0}; playSound(); }
function autoclicker () { autoclick = !autoclick; playSound(); }

button(openSans, "Reload", s , point(-px,2,0) , 0xf25346, 0xF5986E, refresh, "left", menuScene );
button(openSans, "Audio", s , point(-px,1,0) , 0xf25346, 0xF5986E, audio, "left", menuScene );
// button(openSans, "Quality", s , point(-px,0,0) , 0xf25346, 0xF5986E, quality, "left", menuScene );
// button(openSans, "Autoclicker", s , point(-px,-1,0) , 0xf25346, 0xF5986E, playSound, "left", menuScene );
// button(openSans, "Donate", s , point(-px,-2,0) , 0xf25346, 0xF5986E, playSound, "left", menuScene );
button(openSans, "Quality", s , point(px,2,0) , 0xf25346, 0xF5986E, quality, "right", menuScene );
button(openSans, "Autoclick", s , point(px,1,0) , 0xf25346, 0xF5986E, autoclicker, "right", menuScene );
// button(openSans, "-", s , point(px,0,0) , 0xf25346, 0xF5986E, playSound, "right", menuScene );
// button(openSans, "-", s , point(px,-1,0) , 0xf25346, 0xF5986E, playSound, "right", menuScene );
// button(openSans, "-", s , point(px,-2,0) , 0xf25346, 0xF5986E, playSound, "none", menuScene );
button(openSans, "Enter", 0.15 , point(0,0,0) , 0xf25346, 0xF5986E, lockControls, "none", menuScene );
