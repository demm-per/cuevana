// SELECTORES
const heroPelicula = document.querySelector('.hero-pelicula');
const listaGenero = document.querySelector('.lista-genero');
const heroPeliculaContenedorPrincipal = document.querySelector('.hero-pelicula__contenedor-principal');
const video = document.querySelector('.video__pelicula');

const colores = {
    1:'#eb0808',
    2:'#07a3eb',
    3:'#0744eb',
    4:'#d807eb',
    5:'#eb0771',
    6:'#ebe707'
}

const obtenerPelicula = async (idPelicula) => {
    return await obtenerPeliculaPorId(idPelicula);
}

const generarContenidoPelicula = async ( pelicula ) => {
    const div = heroPeliculaContenedorPrincipal.cloneNode(true);
    heroPelicula.innerHTML = ``
    
    div.querySelector('.hero-pelicula__imagen').src=pelicula.fondo;
    div.querySelector('.hero-pelicula__poster').src=pelicula.poster;
    div.querySelector('.hero-pelicula__titulo').textContent = pelicula.titulo;
    div.querySelector('.dato_calificacion').innerHTML=`${pelicula.calificacion}<span class="dato__rango dato__rango--small">/10</span>`;
    div.querySelector('.dato__duracion').textContent=pelicula.duracion;
    div.querySelector('.dato__year').textContent = new Date(pelicula.lanzamiento).getFullYear();
    div.querySelector('.lista-genero').innerHTML='';
    pelicula.genero.forEach(( genero, index ) => {
        div.querySelector('.lista-genero').innerHTML += `
            <div class="genero__contendor" style="background-color: ${colores[index+1]};">
                <a class="genero" href="genero.html#${genero._id}/${genero.nombre}">
                    ${genero.nombre}
                </a>
            </div>
        `
    });

    div.querySelector('.hero-pelicula__descripcion').textContent=pelicula.resumenExtenso;
    div.querySelector('.hero__footer').innerHTML=`<a class="boton boton--altura-pequena boton__ver-pelicula" href="/pelicula.html#663ae7cdbb9bae7a53f7ee9b"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="color: white; vertical-align: -0.125em; transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16" class="iconify icon--play" data-icon="bi:play-fill"><path fill="currentColor" d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"></path></svg>
    Ver Trailer
</a>`;
    video.src=pelicula.trailer;
    heroPelicula.append(div);
}

let desde = 0;
let generosPelicula;
let idPeliculaTrailerActual; 
let estaActivoTrailer; 

document.addEventListener( 'click' , async ( e ) => {
    if (e.target.classList.contains('card__contenedor-imagen')) {
        e.preventDefault();
        let peliculaId = e.target.dataset?.id;
        await mostrarTrailerPeliculaEnHero(peliculaId);
        hero.classList.remove('ocultar');

    }

    if (e.target.classList.contains('hero__boton-cerrar')) {
        
        estaActivoTrailer = false;
        
        ocultarVideoTrailer();

        ajustarPosicionHero(estaActivoTrailer);

    }

    if (e.target.classList.contains('botonMostrarMasPeliculas')) {
        e.preventDefault();
        desde += 10;
        const peliculasSimilares = await obtenerPeliculasPorGenero(generosPelicula, desde);
        crearContenedorPelicula(peliculasSimilares);
        if(peliculasSimilares.length < 10){
            botonMostrarMasPeliculas.classList.add('ocultar')
        }
    }
});

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const heroContenedorInformacion = hero.querySelector('.hero__contenedor-informacion');
    
    if (estaActivoTrailer) {
        switch (true) {
            case width < 600:
                heroContenedorInformacion.classList.add('ocultar');
            break;
            case width >= 600:
                heroContenedorInformacion.classList.remove('ocultar');
            break;
        }
        menuItermedio.style.top = `${header.offsetHeight + (hero.offsetHeight -5 )}px`;
    }
});

const app = async () =>{
    const idPelicula = location.hash.slice(1);
    const pelicula = await obtenerPelicula(idPelicula);
    generarContenidoPelicula(pelicula);
    generosPelicula = pelicula.genero;
    const peliculasSimilares = await obtenerPeliculasPorGenero(generosPelicula);
    contenedorPeliculas.innerHTML='';
    crearContenedorPelicula(peliculasSimilares);
    if(peliculasSimilares.length < 10){
        botonMostrarMasPeliculas.classList.add('ocultar')
    }
    hero.querySelector('.hero__contenedor-imagen').style.height = `${hero.offsetHeight}px`;

}

app();

