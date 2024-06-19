const menuItermedio = document.querySelector('.menu');

const app = async () =>{
    const peliculas = await peliculaRecienAgregadas();
    crearContenedorPelicula(peliculas);
}

app();


let limite = 5;
let desde = 0;

botonMostrarMasPeliculas.addEventListener('click', async (e) => {
    desde +=5;
    const peliculas = await peliculaRecienAgregadas(desde,limite);
    if(peliculas.length < limite){
        botonMostrarMasPeliculas.classList.add('ocultar');
    }
    crearContenedorPelicula(peliculas);
});

botonVerPelicula.addEventListener('click',(e)=>{
    console.log(e.target.href);
});