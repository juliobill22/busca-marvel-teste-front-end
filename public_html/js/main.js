//const KEY_private = '2daab94a11d5a191fbdb76d8b9dca01e3e7b9c9b';
//const KEY_public = '26ece94cad3642a378062e4ef3d652db';

const KEY_private ='914c997bc747143269bdbe08530fff12343dc4ef';
const KEY_public = '8165d4066afb26d34456ff3d6b5ba169';

var paramConfig = {
    pageActive: "1", 
    qtdeRowsPage: 10,
    pagesLoads: [ ]
};

/* Created on : Apr 27, 2018, 12:17:03 
 * PM Author : Julio Bill Schvenger */

window.onload = function () {
    var qtde_for_page = 10;
    createAllPages(qtde_for_page);
};

function createAllPages(qtde_for_page) {
    var qtde_all_rows;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            qtde_all_rows = myObj.data.total;
            callback(qtde_all_rows);
        }
    };
    var timestamp = getTimestamp();
    var hash = getHash(timestamp);
    var caminho = 
            "https://gateway.marvel.com:443/v1/public/characters?"+
            "ts=" + timestamp + 
            "&apikey=" + KEY_public + 
            "&hash=" + hash;
    
    xmlhttp.open("GET", caminho, true);
    xmlhttp.send();

    function callback(qtde_all_rows) {
        createAll(qtde_all_rows, qtde_for_page);
    }

}