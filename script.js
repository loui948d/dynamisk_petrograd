window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // læs produktliste - linket er produktlisten fra nettte, det kan også være en direkte JSON fil man selv har oprettet
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

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
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    //rabatprisen udregnes - Math.ceil sætter du rundt om hele beregningen for at runde tallene op til hele tal
    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    // man tilføjer billeder via json med en attributen 'src'
    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    // fjern teksten at produktet er udsolgt på de varer som ikke er udsolgt, og kun vises på dem som er udsolgt
    if (produkt.udsolgt == false) {
        //produktet er ikke udsolgt
        //udsolgttekst fjernes - dette gøres ved at man beder 'forældrene' om at fjerne deres 'barn'
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
        // når en varer er udsolgt, skal prisen streges over
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    // det samme skal gøres ved rabatprisen, hvis en vare ikke har rabat skal prisen ikke vises, || = eller
    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    // append klon til .produkt-liste
    document.querySelector(".produktliste").appendChild(klon);
}
