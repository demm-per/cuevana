const ocultarVideoTrailer = ( ) => {
    hero.querySelector('.hero__contenedor-video').classList.add('ocultar');
    hero.querySelector('.hero__video').src='';
}

const ocultarContenidoEnMovilSiTrailerActivo = () => {
    let obtenerAnchoDePantalla = window.innerWidth;            
    if ( obtenerAnchoDePantalla < 768 ) {
        hero.querySelector('.hero__contenedor-informacion').classList.add('ocultar');
    }
}

const mostrarBotonCerrar = () => {
    heroContenedorBotonCerrar.classList.remove('ocultar');
}

const ajustarPosicionHero = (trailer) => {
    if(trailer){
        
        hero.querySelector('.hero__contenedor-imagen').style.height = `${hero.offsetHeight}px`;
        hero.style.top = `${((header.offsetHeight))}px`;
    }else{
        hero.querySelector('.hero__contenedor-boton-cerrar').classList.add('ocultar');
        hero.style.top = ``;
        hero.querySelector('.hero__contenedor-informacion').classList.remove('ocultar');
    }
}

const configurarInterfazHero = () => {
    ocultarContenidoEnMovilSiTrailerActivo();
    mostrarBotonCerrar();
    ajustarPosicionHero(estaActivoTrailer);
}

const mostrarTrailerPeliculaEnHero = async (peliculaId ) => {
    try {
        if ( peliculaId ) {
            // Verifica si se ha seleccionado la misma película; 
            // en caso verdadero, redirige al usuario a la página.

            if ( peliculaId === idPeliculaTrailerActual && estaActivoTrailer ) {
                window.location.href = `/pelicula.html#${peliculaId}`;
                return;
            }
    
            idPeliculaTrailerActual = peliculaId;
            
            estaActivoTrailer = true;
    
            let pelicula = await obtenerPeliculaPorId(peliculaId);
            
            await mostrarHero(pelicula,hero);
    
            configurarInterfazHero();
    
        }    
    } catch (error) {
        console.log(`Ocurrio un problema al mostrar el trailer de la pelicula`,error);
    }   
}