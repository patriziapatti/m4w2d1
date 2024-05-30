function search() {
       let parolaCercata= document.getElementById("cerca").value //gestisco i valori che prendo dall'utente che digita
       let tipologia= document.getElementById("tipologia").value //   quello che sceglie dal menu a tendina
      // console.log(tipologia)
      let url =""
      let urlFoto ="https://api.pexels.com/v1/search/?page=1&per_page=30&query=" //url foto
      let urlVideo= "https://api.pexels.com/videos/search?per_page=5&query=" //url video spostando query alla fine
      if(tipologia === "foto"){
        url = urlFoto //diventa url delle foto
      }else url =urlVideo //altrimenti dei video
fetch(url + parolaCercata, { //url + la parola cercata alla fine della query
    method: "GET",
    headers:{
        "authorization": "N8mUDMCFovqqZYOp4YpHpVRZ3HKfej6XsJDpR7MX6vY26ZUtjjg0CzLt",
        "content-type": "application/json"
    }
}).then((response) => {
    //console.log(response)
    response.json().then((data)=>{
        console.log(data)
    let container = document.querySelector("#contenitoreImg") //variabile che prende il contenitore div in index
    container.innerHTML="" // lo svuotiamo
    let contenuto="" //inizializziamo il contenuto a vuoto
    if(tipologia==="foto"){ //se la tipologia è foto facciamo il ciclo sulle foto 
        data.photos.forEach(element => {
            // console.log(element)
             contenuto ="<img class='img-fluid' src=' "+ element.src.medium +" ' alt=' "+ element.alt +"'/>" //il contenuto si valorizza con l'immagine 
            // console.log(contenuto)
            container.innerHTML += "<div class='pictures'>"+ contenuto +" </div>" //tra i + mettiamo una stringa splittata. Ossia una stringa, una variabile tra i + e un'altra stringa - inoltre inner.HTML += serve perchè non vogliamo che ad ogni ciclo sostituisca la foto, ma che aggiunga una foto ad ogni ciclo.
         });
    }
    else{
        data.videos.forEach(item => { //se ci troviamo nella parte dei video facciamo un ciclo sui videos 

            contenuto = '<video width="320" height="240" controls><source src="'+ item.video_files[0].link +'" type="video/mp4"></video>' // lo zero è il primo campo (ossia il video HD)
             //console.log(contenuto)
            container.innerHTML += "<div class='pictures'>"+ contenuto +" </div>" //tra i + mettiamo una stringa splittata. Ossia una stringa, una variabile tra i + e un'altra stringa - inoltre inner.HTML += serve perchè non vogliamo che ad ogni ciclo sostituisca la foto, ma che aggiunga una foto ad ogni ciclo.
    })
    }
    })
})
}

