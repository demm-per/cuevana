
const optenerPeliculasPorGenero = async (generoId) =>{
    
    return await obtenerPeliculasPorGenero([generoId]);
    // console.log(peliculas);
}

const app = async () =>{
    const [id,nombreGenero] = location.hash.split('/');
    const generoId = id.slice(1);
    const peliculas = await optenerPeliculasPorGenero(generoId);
    const {nombre} = await obtenerGeneroPorId(generoId)
    document.querySelector('.peliculas__titulo').innerHTML=`Películas de <span style="color:rgb(237, 183, 9);font-size:3rem">${nombre}</span>`;
    contenedorPeliculas.innerHTML='';
    console.log(peliculas);
    crearContenedorPelicula(peliculas);
    cargarHero(peliculas[0])
    if(peliculas.length < 10){
        botonMostrarMasPeliculas.classList.add('ocultar')
    }

} 

app();