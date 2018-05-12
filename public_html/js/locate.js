
/* Created on : Apr 27, 2018, 12:17:33 
 * PM Author : Julio Bill Schvenger */

/* global paramConfig */

document.querySelector("#text-personagem").addEventListener('keyup', function(e){
    locateTable(e);    
});
function locateTable(event) {

    var id_page = paramConfig.pageActive;
    var key = document.getElementById("text-personagem");
    
    if (event.keyCode == '13') {
        if (key.value !== '') {            

            //Muitas requisições nessa consulta estoura o limite 
            populaTableLookup(id_page, key.value);

            var tables = document.querySelectorAll("#table-list-personagens");
            var str_locate = document.querySelector("#text-personagem").value;

            blockBottonsNavegate();
            showAllTables();
            var length = tables.length;
            for (var it = 0; it < length; it++) {

                var rows = tables[it].rows.length;
                var count = 0;
                var qtd_col_search = 1;

                for (var i = 1; i < rows; i++) {
                    count = 0;
                    for (var y = 0; y < qtd_col_search; y++) {
                        var str = new String(tables[it].rows[i].cells[y].innerHTML);

                        if (str.search(str_locate) < 0) {
                            count = count + 1;
                        }
                    }
                    if (count == y) {
                        tables[it].rows[i].style.display = 'none';
                    }
                    else {
                        tables[it].rows[i].style.display = '';
                    }
                }
            }
        }
        else {

            hideAllTables();

        }
    }   
}
function showAllTables() {
    var all = document.querySelectorAll(".div-child");
    var length = length;
    for (var i = 0; i < length; i++) {
        all.item(i).style.display = '';
    }
    hideHeaderAllTables();
}
function hideAllTables() {
    escondeAllDivs();
    mostraAtualDiv(paramConfig.pageActive);
    marcarPageAtual(paramConfig.pageActive);
    populaMainTable(paramConfig.pageActive);
    unlockBottonsNavegate();
    showHeaderAllTables();
    removeSearching();
}
function unlockBottonsNavegate() {
    var navegation = document.querySelector("#div-navegation");
    navegation.style.display = '';
}
function blockBottonsNavegate() {
    var navegation = document.querySelector("#div-navegation");
    navegation.style.display = 'none';
}
function hideHeaderAllTables() {
    var tr_titulo = document.querySelectorAll("#tr-titulo");
    var length = tr_titulo.length;
    for (var i = 1; i < length; i++) {
        tr_titulo[i].style.display = 'none';
    }
}
function showHeaderAllTables() {
    var tr_titulo = document.querySelectorAll("#tr-titulo");
    var length = tr_titulo.length;
    for (var i = 0; i < length; i++) {
        tr_titulo[i].style.display = '';
    }
}