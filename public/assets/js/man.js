
const form = document.querySelector("#form")

// Latitude kenglik
// Longitude Uzoqlik
// N: North - Shimol
// S: South -janub
// W: West-G`arb
// E: East - Sharq

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const lat1 = document.querySelector("#lat1").value;
    const lat2 = document.querySelector("#lat2").value;
    const lat3 = document.querySelector("#lat3").value;

    const long1 = document.querySelector("#long1").value;
    const long2 = document.querySelector("#long2").value;
    const long3 = document.querySelector("#long3").value;

    const masshtab = document.querySelector("#masshtab").value;


    const data = {
        latitude: DMSToDD(lat1, lat2, lat3),
        longitude: DMSToDD(long1, long2, long3),
        masshtab
    }
    calculate(data)

})

function calculate(data) {
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            renderHtml(result)
        })
        .catch((error) => {
            console.error(error);
        });
}

function renderHtml(data) {
    let result = document.querySelector("#result")
    let nomenklatura = data.nomenklatura;
    let lat1 = DDToDMS(data.latitude.start)
    let lat2 = DDToDMS(data.latitude.end)
    let long1 = DDToDMS(data.longitude.start)
    let long2 = DDToDMS(data.longitude.end)

    result.innerHTML = `
    <h3 class="card-text"> Aniqlangan ma'umotlar:</h3>
             <p> ${data.masshtab} masshtabli Karta nomenklaturasi: <b>${nomenklatura}</b></p>
             <p>  Karta ramkasi koordinatalari: <br>
             kenglik bo'yicha: ${lat1},  ${lat2} <br>
             kenglik bo'yicha: ${long1},  ${long2}
             </p>
`


}
function DMSToDD(d, m, s) {
    return parseFloat(d) + (parseFloat(m) / 60) + (parseFloat(s) / (60 * 60));
}
function DDToDMS(deg) {
    let d = parseInt(deg);
    let minfloat = Math.abs((deg - d) * 60);
    let m = Math.floor(minfloat);
    let secfloat = (minfloat - m) * 60;
    let s = Math.round(secfloat);
    d = Math.abs(d);

    if (s == 60) { m++; s = 0; }
    if (m == 60) { d++; m = 0; }

    return d + "° " + m + "&apos;  " + s + "&quot; ";
}
