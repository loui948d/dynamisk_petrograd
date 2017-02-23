window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // læs produktliste - linket er produktlisten fra nettte, det kan også være en direkte JSON fil man selv har oprettet
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);


    visProdukt();
}

// fortæller at vi vil have en liste af data for hvert produkt - den kører listen igennem et produkt af gangen
function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt);
    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    // indsæt data i klon

    // append klon til .produkt-liste
    document.querySelector(".produktliste").appendChild(klon);
}
