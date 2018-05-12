
/* Created on : May 02, 2018, 12:17:03 
 * PM Author : Julio Bill Schvenger */

function getTimestamp() {
    return Number(new Date());
}
function getHash(timestamp) {
    return calcMD5(timestamp + KEY_private + KEY_public);
}


