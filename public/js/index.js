// ********************
//      SELECTORES
// ********************

const cardEnlace = document.querySelector('.card__enlace');
const menuItermedio = document.querySelector('.menu');
const menuInferiorLista = document.querySelector('.menu-inferior__lista');
const contenedorMenuInferiorIntermedio = document.querySelector('.menu-inferior-lista__intermedio');
// const menuLateral = document.querySelector('.menu-inferior__lista-lateral');
const templateHeroSkeleton = document.querySelector('.hero__body-contenido').cloneNode(true);

const menuInferiorListaPrimario = document.querySelector('.menu-inferior-lista__primario');

const templateSkeletonA = document.querySelector('.menu-inferior__link');

// *******************
//      VARIABLES
// *******************
let estaActivoTrailer = false;
let idPeliculaTrailerActual = 0;
let desde = 0;
let limite = 10;
let defaultApartadoMenuIntermedio;
let defaultApartadoMenuLateral;

// Scroll
window.addEventListener('scroll', () => {
    const alturaHeader = header.offsetHeight;
    const alturaHero = hero.offsetHeight;
    if ( estaActivoTrailer ) {
        hero.style.top = `${( alturaHeader - 2 )}px`;
        menuItermedio.style.top = `${ alturaHeader + ( alturaHero - 5 )}px`;
        menuLateral.style.top = `${ alturaHeader + ( alturaHero - 5 )}px`;

    } else {
        menuItermedio.style.top = `${ alturaHeader - 5 }px`;
        menuLateral.style.top = `${ alturaHeader - 5 }px`;
    }
});

const ajustarPosicionMenuIntermedio = ( trailer ) => {
    if(trailer){
        menuItermedio.style.top = `${header.offsetHeight + hero.offsetHeight - 5}px`;
        menuLateral.style.top = `${header.offsetHeight + hero.offsetHeight - 5}px`;
    }else{
        menuItermedio.style.top = `${header.offsetHeight}px`;
        menuLateral.style.top = `${header.offsetHeight}px`;
    }
}

document.addEventListener('click', async (e) => {

    if (e.target.classList.contains('card__contenedor-imagen')) {
        e.preventDefault();
        let peliculaId = e.target.dataset?.id;
        await mostrarTrailerPeliculaEnHero(peliculaId);
        ajustarPosicionMenuIntermedio(estaActivoTrailer);
    }

    if (e.target.classList.contains('hero__boton-cerrar')) {
        
        estaActivoTrailer = false;
        
        ocultarVideoTrailer();

        ajustarPosicionHero(estaActivoTrailer);
        
        ajustarPosicionMenuIntermedio(estaActivoTrailer);
    }

    if(e.target.classList.contains('botonMostrarMasPeliculas')) {
        e.preventDefault();
        desde += 10;
        mostrarPeliculasPorApartado(desde)
        // if(numPeliculas < 10){
        //     botonMostrarMasPeliculas.classList.add('ocultar')
        // }
    }
    
});

window.addEventListener('load', () => {
    const video = document.querySelector('.hero__video');
  
    if (!video) {
      console.error('No se encontró el elemento de video');
      return;
    }
  
    video.addEventListener('playing', () => {
      console.log('El video está en reproducción.');
    });
  
    video.addEventListener('waiting', () => {
      console.log('El video se ha detenido, posiblemente por problemas de conexión.');
    });
  
    video.addEventListener('error', (event) => {
      console.error('Error en la reproducción del video:', event);
    });
  
    // For debugging purposes, you can check if the video is ready to play
    video.addEventListener('canplay', () => {
      console.log('El video está listo para ser reproducido.');
      video.play();
    });
  
    video.addEventListener('ended', () => {
        console.log('El video ha terminado de reproducirse.');
        // Puedes agregar aquí cualquier otra acción que quieras tomar cuando el video termine
        // Por ejemplo, ocultar el video o mostrar un mensaje al usuario
        video.classList.add('ocultar');
      });

    // Check the initial state of the video
    if (video.readyState >= 3) {
      console.log('El video ya está listo para ser reproducido.');
    } else {
      console.log('El video no está listo aún.');
    }
  });
  

const activarApartado = ( ) => {

    const apartadosMenuIntermedio = Array.from(document.querySelectorAll(`.apartadoMenuIntermedio`));
    const claseApartadoActivo = 'menu-inferior__link--activo';
    let existeApartado = false;
    let [ id ] = location.hash.slice(1).split('/');    
    
    apartadosMenuIntermedio.forEach( apartado => {
        if ( apartado.dataset.id === id ) {
            apartado.classList.add(claseApartadoActivo);
            existeApartado = true;
        } else {
            apartado.classList.remove(claseApartadoActivo);
        }
    });
        
    if( !existeApartado ) apartadosMenuIntermedio[0].classList.add(claseApartadoActivo);

}

const mostrarPeliculasPorApartado = async ( inicio = 0, fin = 10 ) => {
    try {
        const [id] = location?.hash.slice(1).split('/') || [];
        let peliculas;
        
        peliculas = await obtenerPelicalasPorApartado(
                                ( id ) ? id : defaultApartadoMenuIntermedio, 
                                inicio,
                                fin
                            );    
        
        if( !!peliculas.errors ){
            peliculas = await obtenerPelicalasPorApartado( defaultApartadoMenuIntermedio, inicio, fin );
        }

        if( inicio == 0 ) contenedorPeliculas.innerHTML = '';
        
        crearContenedorPelicula( peliculas );

        activarApartado();
        
    } catch ( error ) {
        console.log( error );
    }
}


// const mostrarPeliculasMenuIntermedio = async () => {

// }



const crearContenedorPeliculaSkeleton = ( n = 10 ) => {
    for (let i = 0; i < n; i++) {
        contenedorPeliculas.append( card.cloneNode(true) );
    }
}

window.addEventListener('hashchange', async (e) => {
    desde = 0;
    contenedorPeliculas.innerHTML = '';
    crearContenedorPeliculaSkeleton();
    
    mostrarPeliculasPorApartado(desde);

    botonMostrarMasPeliculas.classList.remove('ocultar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

const mostrarPeliculas = async (inicio = 0, fin = 10) => {
    
    const peliculas = await obtenerPeliculasPorSeccion(inicio); // Obtiene las nuevas películas
    if( inicio == 0 ){
        contenedorPeliculas.innerHTML="";
    }
    crearContenedorPelicula( peliculas );
    activarApartado();
    return peliculas.length;
}


const mostrarPortada = async () => {
    const pelicula = await obtenerPeliculaPortada();
    await mostrarHero(pelicula,hero);
}

const mostrarMenuIntermedioYlateral = async () =>{
    const [ menuIntermedio, menuLateral ] = await obtenerSecciones();
    crearSeccionMenuIntermedio(contenedorMenuInferiorIntermedio,menuIntermedio.apartado,templateSkeletonA);
    
    defaultApartadoMenuIntermedio = menuIntermedio.apartado[0]._id;
    defaultApartadoMenuLateral = menuLateral.apartado[0]._id;
}

const app = async () =>{
    mostrarPortada();
    await mostrarMenuIntermedioYlateral();
    
    mostrarPeliculasPorApartado(desde);
    hero.querySelector('.hero__contenedor-imagen').style.height = `${hero.offsetHeight}px`;
}

app();


