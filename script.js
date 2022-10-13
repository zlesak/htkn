let skoly = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
let studentiVS = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počty_studentů_krajských_vyšších_odborných_škol/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
let studentiSS = "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počty_žáků_v_oborech_středních_škol_zřizovaných_krajem/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";

let skolyData;

async function getSkoly(){
    await fetch(skoly).then(response => {
        return response.json();
    }).then(dat =>{
        skolyData =  dat.features;
        console.log(skolyData);
    }).catch(e =>{console.log(e)});
    skolyData.forEach(skola => {
        let att = skola.attributes;
        let tr = document.createElement("tr");
        let td1 =  document.createElement("td");td1.innerHTML = att.nazev;
        let td2 = document.createElement("td"); td2.innerHTML = att.ico;
        let td3 = document.createElement("td"); td3.innerHTML = att.zarizeni_druh;
        let td4 = document.createElement("td"); td4.innerHTML = att.nazev_okresu;
        let td5 = document.createElement("td"); td5.innerHTML = att.nazev_obce;
        let td6 = document.createElement("td"); td6.innerHTML = att.nazev_ulice;
        let td7 = document.createElement("td"); td7.innerHTML = att.cislo_domovni;
        let td8 = document.createElement("td"); td8.innerHTML = att.psc;
        let td9 = document.createElement("td"); td9.innerHTML = att.www;
        let td10 = document.createElement("td"); td10.innerHTML = att.x;
        let td11 = document.createElement("td"); td11.innerHTML = att.y;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tr.appendChild(td10);
        tr.appendChild(td11);


        document.getElementById("main").appendChild(tr);
    // tr.appendChild("td").innerHTML = skola.attributes.nazev;
        /*
        <tr v-for="dat in data" :key="dat.attributes.OBJECTID">
            <td>dat.attributes.nazev</td>
            <td>dat.attributes.ico</td>
            <td>dat.attributes.zarizeni_druh</td>
            <td>dat.attributes.nazev_okresu</td>
            <td>dat.attributes.nazev_obce</td>
            <td>dat.attributes.nazev_ulice</td>
            <td>č.p. dat.attributes.cislo_domovni</td>
            <td>dat.attributes.psc</td>
            <td>dat.attributes.www</td>
            <td>dat.attributes.x</td>
            <td>dat.attributes.y</td>
        </tr>
        */
    });
}


function filtrovat(){
    let type = document.getElementById("selectType").value;
    let tytown = document.getElementById("selectTown").value;
    let distance = document.getElementById("selectDistance").value;


    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php.php", true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let odpoved = this.responseText;
            document.getElementById("vystup").innerHTML = odpoved;
        }
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("email=" + email +"&login=" + login);
    document.getElementById("vystup").value = "";
}

getSkoly();