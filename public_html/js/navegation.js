
/* Created on : Apr 27, 2018, 12:17:03 
 * PM Author : Julio Bill Schvenger */

/* global paramConfig */

function createDivs(qtde) {
    var div_list_naveg = document.querySelector("#div-list-navegation");
    var div_navegation = document.querySelector("#div-navegation");

    var new_div_pag = document.createElement("div");
    new_div_pag.setAttribute("class", "pagination-arrow-left");
    new_div_pag.setAttribute("onclick", "clickArrowLeft()");
    div_navegation.appendChild(new_div_pag);

    for (var i = 1; i < qtde + 1; i++) {

        var new_div = document.createElement("div");
        new_div.setAttribute("class", "div-child");
        new_div.setAttribute("id", "div-child-" + i);

        //esconder todas divs menos a primeira
        if ((i == 1)) {
            new_div.style.display = '';
        }
        else {
            new_div.style.display = 'none';
        }

        div_list_naveg.appendChild(new_div);

        var new_div_pag = document.createElement("div");
        //new_div_pag.setAttribute("id", "pagination-circle-"+i);
        new_div_pag.setAttribute("class", "pagination-circle");
        div_navegation.appendChild(new_div_pag);

        var name = i;
        var name_formated = String.fromCharCode(39) + name + String.fromCharCode(39);
        var new_link = document.createElement("a");
        new_link.setAttribute("href", "#" + name);
        new_link.setAttribute("id", "pagination-circle-a-" + i);
        new_link.setAttribute("class", "pagination-circle-a");
        new_link.setAttribute("onclick", "clickCircle(" + name_formated + ")");

        //esconder todos os link's e divPag acima de 6
        if (i <= 6) {
            new_link.style.display = '';
            new_div_pag.style.display = '';
        }
        else {
            new_link.style.display = 'none';
            new_div_pag.style.display = 'none';
        }

        new_link.innerHTML = i;
        new_div_pag.appendChild(new_link);
    }

    var new_div_pag = document.createElement("div");
    new_div_pag.setAttribute("class", "pagination-arrow-right");
    new_div_pag.setAttribute("onclick", "clickArrowRigth()");
    div_navegation.appendChild(new_div_pag);

    marcarPageAtual(1);

}
function escondeAllDivs() {
    var all = document.querySelectorAll(".div-child");
    var length = all.length;
    for (var i = 0; i < length; i++) {
        all.item(i).style.display = 'none';
    }
    paramConfig.pagesLoads = "";
}
function reallocateBottons(side) {

    var qtde_page = 6;
    id_min = Number(((id_atual > qtde_page) ? (id_atual - (qtde_page - 1)) : 1));
    id_max = Number(((id_min > 1) ? (id_min + (qtde_page - 1)) : qtde_page));

    var div_navegation = document.querySelector("#div-navegation");
    var pagination_circle = div_navegation.getElementsByClassName("pagination-circle");

    var length = pagination_circle.length;
    for (var i = 0; i < length; i++) {

        var txt = "#pagination-circle-a-" + (i + 1);
        var link = document.querySelector(txt);

        var mostrar = (((i + 1) >= id_min) && ((i + 1) <= id_max));
        if (mostrar) {
            pagination_circle[i].style.display = '';
            link.style.display = '';
        }
        else {
            pagination_circle[i].style.display = 'none';
            link.style.display = 'none';
        }
    }
}
function marcarPageAtual(id_atual) {
    var all = document.querySelector("#div-navegation");
    var childElementCount = all.childElementCount;
    for (var i = 0; i < childElementCount; i++) {
        all.childNodes[i].classList.remove("pagination-circle-active");
    }
    all.childNodes[id_atual].classList.add("pagination-circle-active");
    paramConfig.pageActive = id_atual;
}
function mostraAtualDiv(id_atual) {
    var div_name = "div-child-" + id_atual;
    var div_atual = document.getElementById(div_name);
    div_atual.style.display = '';
}
function clickCircle(id_atual) {
    processBotton(id_atual);
}
function clickArrowLeft() {
    id_atual = getPageAtualId() - 1;
    if (id_atual == 0) {
        id_atual = 1;
    }
    processBotton(id_atual);
    reallocateBottons(id_atual, 'left');
}
function clickArrowRigth() {
    id_atual = getPageAtualId() + 1;
    var all = document.querySelector("#div-navegation");
    if (id_atual == (all.childElementCount - 1)) {
        id_atual = id_atual - 1;
    }
    processBotton(id_atual);
    reallocateBottons(id_atual, 'rigth');
}
function getPageAtualId() {
    var all = document.querySelector("#div-navegation");
    var id_atual;
    var childElementCount = all.childElementCount;
    for (var i = 0; i < childElementCount; i++) {
        if (all.childNodes[i].classList.contains("pagination-circle-active")) {
            id_atual = i;
            break;
        }
    }
    return id_atual;
}
function processBotton(id_atual) {
    escondeAllDivs();
    mostraAtualDiv(id_atual);
    marcarPageAtual(id_atual);
    populaMainTable(id_atual);    
}