
/* Created on : Apr 27, 2018, 12:17:03 
 * PM Author : Julio Bill Schvenger */

/* global pageloads, results, KEY_public */

function createAll(qtde_all_rows, qtde_for_page) {
    var pages = Math.ceil(qtde_all_rows / qtde_for_page);
    createDivs(pages);
    for (var i = 0; i < pages; i++) {
        createMainTable((i + 1));
    }
    populaMainTable(1);
    setarLoader(false);
}

function createMainTable(id_page) {

    var table = document.createElement("table");
    table.setAttribute("id", "table-list-personagens");

    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    tr.setAttribute("id", "tr-titulo");

    var th_personagem = document.createElement("th");
    th_personagem.setAttribute("id", "th-personagem");
    th_personagem.innerHTML = 'Personagens';

    var th_series = document.createElement("th");
    th_series.setAttribute("id", "th-series");
    th_series.innerHTML = 'Séries';

    var th_eventos = document.createElement("th");
    th_eventos.setAttribute("id", "th-eventos");
    th_eventos.innerHTML = 'Eventos';

    tr.appendChild(th_personagem);
    tr.appendChild(th_series);
    tr.appendChild(th_eventos);

    thead.appendChild(tr);

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbody-div-child-" + id_page);
    table.appendChild(tbody);

    var div_child = document.querySelector("#div-child-" + id_page);
    div_child.appendChild(table);

}
function populaMainTable(id_page) {

    var offset = (id_page - 1) * 10;
    var limit = 10;

    var IsloadPage = pageIsLoaded(id_page);
    if (!IsloadPage) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var myObjPopTable = JSON.parse(this.responseText);
                var resultsPopTable = myObjPopTable.data.results;
                
                for (var i in resultsPopTable) {

                    var tr = document.createElement("tr");
                    var tbody_name = "#tbody-div-child-" + id_page;
                    var tbody = document.querySelector(tbody_name);

                    tbody.appendChild(tr);

                    tr.setAttribute("onclick", "openDetails(" + String.fromCharCode(39) + resultsPopTable[i].id + String.fromCharCode(39) + "," + 
                                                                String.fromCharCode(39) + escape(resultsPopTable[i].name) + String.fromCharCode(39) + ")");

                    var td1 = document.createElement("td");
                    var path = myObjPopTable.data.results[i].thumbnail.path;
                    path = path.replace("http:", "https:");
                    td1.innerHTML = "<img src=" + path + "." + resultsPopTable[i].thumbnail.extension + ">" + "" + resultsPopTable[i].name + "";
                    
                    var td2 = document.createElement("td");
                    td2.innerHTML = getSeries(resultsPopTable[i].series);
                    var td3 = document.createElement("td");
                    td3.innerHTML = getEvents(resultsPopTable[i].events);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);

                }

                if (resultsPopTable.length !== 0) {
                    setPageLoaded(id_page);
                }
            }

        };

        var timestamp = getTimestamp();
        var hash = getHash(timestamp);
        
        var caminho =
                "https://gateway.marvel.com:443/v1/public/characters?" +
                "ts=" + timestamp +
                "&orderBy=name" +
                "&offset=" + offset +
                "&limit=" + limit +
                "&apikey=" + KEY_public +
                "&hash=" + hash;
        
        xmlhttp.open("GET", caminho, false);
        xmlhttp.send();
    }
}
function populaSeriesDetails(id_characters) {
    try {
        
        var xmlhttp = new XMLHttpRequest();
        var detail_series = document.querySelector("#detail-series");

        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var myObjSeries = JSON.parse(this.responseText);
                var results = myObjSeries.data.results.length;
                var txt = "";
                for (var i = 0; i < results; i++) {
                     txt += "<h4>" + myObjSeries.data.results[i].title + "</h4>" +
                            "Descrição: " + myObjSeries.data.results[i].description + " - " +
                            "<hr>";
                }
                if (txt === "") {
                   txt += "Nenhuma Série"; 
                }
                detail_series.innerHTML = txt;
            }
        };

        var timestamp = getTimestamp();
        var hash = getHash(timestamp);
        var caminho = "https://gateway.marvel.com/v1/public/characters/" + id_characters + "/series?" +
                "ts=" + timestamp +
                "&apikey=" + KEY_public +
                "&hash=" + hash;

        xmlhttp.open("GET", caminho, false);
        xmlhttp.send();

    }
    catch (err) {
        document.getElementById("error").innerHTML = err.message;
    }
    finally {
        
    }

}
function populaEventsDetails(id_characters) {
    try {
        var xmlhttp = new XMLHttpRequest();
        var detail_events = document.getElementById("detail-events");

        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var myObjEvents = JSON.parse(this.responseText);
                var txt = "";
                var results = myObjEvents.data.results.length;
                for (var i = 0; i < results; i++) {
                    txt += "<h4>" + myObjEvents.data.results[i].title + "</h4>" +
                            "Descrição: " + myObjEvents.data.results[i].description + " - ";
                    "<hr>";
                }
                if (txt === "") {
                   txt += "Nenhum Evento"; 
                }
                detail_events.innerHTML = txt;
            }
        };

        var timestamp = getTimestamp();
        var hash = getHash(timestamp);
        var caminho = "https://gateway.marvel.com/v1/public/characters/" + id_characters + "/events?" +
                "ts=" + timestamp +
                "&apikey=" + KEY_public +
                "&hash=" + hash;

        xmlhttp.open("GET", caminho, true);
        xmlhttp.send();

    }
    catch (err) {
        document.getElementById("error").innerHTML = err.message;
    }
    finally {
        
    }

}
function populaTableLookup(id_page, txt_search) {
    try {
        setarLoader(true);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                var length = myObj.data.results.length;
                for (var i = 0; i < length; i++) {

                    var tr = document.createElement("tr");
                    var tbody_name = "#tbody-div-child-" + id_page;
                    var tbody = document.querySelector(tbody_name);

                    tbody.appendChild(tr);

                    tr.setAttribute("onclick", "openDetails(" + String.fromCharCode(39) + myObj.data.results[i].id + String.fromCharCode(39) + "," + String.fromCharCode(39) + myObj.data.results[i].name + String.fromCharCode(39) + ")");
                    tr.setAttribute("id","pesquisado");

                    var td1 = document.createElement("td");
                    td1.innerHTML =
                            "<img src=" + myObj.data.results[i].thumbnail.path + "." + myObj.data.results[i].thumbnail.extension + ">" +
                            "" + myObj.data.results[i].name + "";
                    
                    var td2 = document.createElement("td");
                    td2.innerHTML = getSeries(myObj.data.results[i].series);
                    var td3 = document.createElement("td");
                    td3.innerHTML = getEvents(myObj.data.results[i].events);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);

                }
            }
        };

        var timestamp = getTimestamp();
        var hash = getHash(timestamp);
        var caminho =
                "https://gateway.marvel.com:443/v1/public/characters?" +
                "ts=" + timestamp +
                "&nameStartsWith=" + txt_search +
                "&orderBy=name" +
                "&apikey=" + KEY_public +
                "&hash=" + hash;

        xmlhttp.open("GET", caminho, true);
        xmlhttp.send();
    }
    catch (err) {
        document.getElementById("error").innerHTML = err.message;
    }
    finally {
        setarLoader(false);
    }

}
function getSeries(series) {
    var txtSerie = "";
    if (series.returned > 0) {
        var length = series.items.length;
        for (var i = 0; i < length; i++) {
            if (i < 3) {
                txtSerie += series.items[i].name + "<br>";
            }
            else {
                break;
            }
        }
    }
    return txtSerie;
}
function getEvents(events) {
    var txtEvent = "";
    if (events.returned > 0) {
        var length = events.items.length;
        for (var i = 0; i < length; i++) {
            if (i < 3) {
                txtEvent += events.items[i].name + "<br>";
            }
            else {
                break;
            }
        }
    }
    return txtEvent;
}
function openDetails(id_characters, name_characters) {
    
    setarLoader(true);
    
    var name = unescape(name_characters);
    var dialog = document.querySelector("#myDialog");
    var exists = document.querySelector("#div-dialog");
    
    if (exists === null) {
        var div = document.createElement("div");
    }
    else {
        var div = exists;
    }

    dialog.open = true;

    div.setAttribute("id", "div-dialog");
    var txt = 
            //"<div id="+String.fromCharCode(39) + "loader" + String.fromCharCode(39) + "></div>" +
            "<header> " +
            "  <span onclick=" + String.fromCharCode(39) + "closeDialog()" + String.fromCharCode(39) + ">&times;</span>" +
            "  <h2>" + name + "</h2>" +
            "</header>" +
            "<div>" +
            "  <h3>Séries</h3>" +
            "  <br><div id=" + String.fromCharCode(39) + "detail-series" + String.fromCharCode(39) + "></div>" +
            "  <h3>Eventos</h3>" +
            "  <br><div id=" + String.fromCharCode(39) + "detail-events" + String.fromCharCode(39) + "></div>" +
            "</div>";
    div.innerHTML = txt;
    dialog.appendChild(div);

    populaSeriesDetails(id_characters);
    populaEventsDetails(id_characters);

    setarLoader(false);
        
}
function closeDialog() {
    var dialog = document.querySelector("#myDialog");
    dialog.close();
}
function pageIsLoaded(id_page) {

    var loaded = false;
    var length = length;
    for (var i = 0; i < length; i++) {
        if (pageloads[i] === id_page) {
            loaded = true;
            break;
        }
    }
    return loaded;
}
function setPageLoaded(id_page) {
    try {
        var encontrou = false;
        var length = pageloads.length;
        for (var i = 0; i < length; i++) {
            if (pageloads[i] === id_page) {
                encontrou = true;
                break;
            }
        }
        if (!encontrou) {
            //pageloads.push(parseInt(id_page));
        }        
    }
    catch (e) {
        alert(e);
    }
}
function setarLoader(visible) {
    if (visible) {
        document.getElementById("loader").style.display = '';
    } else {
        document.getElementById("loader").style.display = 'none';
    }
   
}
function removeSearching() {
    var pesquisado = document.querySelectorAll("#pesquisado");
    var length = pesquisado.length;
    for (var i = 0; i < length; i++) {
        pesquisado[i].parentNode.removeChild(pesquisado[i]);
    }
}