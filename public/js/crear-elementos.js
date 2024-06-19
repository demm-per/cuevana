const crearContenedorPelicula = async (peliculas) => {
    peliculas.forEach(pelicula => {

        const li = card.cloneNode(true);       

        li.querySelector(".card__enlace").href = `/pelicula.html#${pelicula._id}`;
        li.querySelector(".card__contenedor-imagen").setAttribute("data-id", pelicula._id);
        li.querySelector(".card__imagen").src=pelicula.poster;
        li.querySelector(".card__imagen").alt=pelicula.titulo;

        contenedorPeliculas.append(li);
    });
}

const crearSeccionMenuIntermedio = async ( contenedor, apartados, template ) => {
    contenedor.innerHTML='';
    
    apartados.forEach( seccion => {
        const elementoA = template.cloneNode(true);
        elementoA.classList.add(seccion.nombre);
        elementoA.href=`#${seccion._id}/${seccion.nombre}`;
        elementoA.textContent = seccion.nombre;
        elementoA.classList.add('apartadoMenuIntermedio');
        elementoA.dataset.id=seccion._id;

        contenedor.append(elementoA);
    });
}

const crearSeccionMenuLateral = async ( seccion ) => { 

}

const crearSecciones = async ( contenedorMenuIntermedio, ContenedorMenuLateral ) => {
    const [ menuIntermedio, menuLateral ] = await obtenerSecciones();
    if( intermedio ){
        crearSeccionMenuIntermedio( contenedorMenuIntermedio, menuIntermedio.apartado );
    }
    if( lateral ){
        crearSeccionMenuLateral( ContenedorMenuLateral, menuLateral.apartado );
    }
}

const obtenerEstructuraHero = async ( pelicula ) => {
    const heroFlex = heroFlexTemplate.cloneNode(true);

    heroFlex.querySelector('.hero__imagen').src = pelicula.fondo;
    heroFlex.querySelector('.hero__titutlo').textContent = pelicula.titulo;
    heroFlex.querySelector('.hero__titutlo').href = `/pelicula.html#${pelicula._id}`;
    heroFlex.querySelector('.dato_calificacion').classList.remove('bloque');
    heroFlex.querySelector('.dato_calificacion').innerHTML=`${pelicula.calificacion}<span class="dato__rango dato__rango--small">/10</span>`;
    heroFlex.querySelector('.dato__duracion').classList.remove('bloque');
    heroFlex.querySelector('.dato__duracion').textContent=`${pelicula.duracion}`;
    heroFlex.querySelector('.dato__year').classList.remove('bloque');
    heroFlex.querySelector('.dato__year').textContent=`${new Date(pelicula.lanzamiento).getFullYear()}`;
    heroFlex.querySelector('.hero__descripcion').classList.remove('bloque');
    heroFlex.querySelector('.hero__descripcion').textContent=`${pelicula.resumenBreve}`;
    heroFlex.querySelector('.boton__ver-pelicula').innerHTML=`<i class="iconify icon--play" data-icon="bi:play-fill" style="color: white;"></i> Ver Pelicula`
    heroFlex.querySelector('.boton__ver-pelicula').classList.remove('skeleton');
    heroFlex.querySelector('.boton__ver-pelicula').href=`/pelicula.html#${pelicula._id}`;
    if(estaActivoTrailer){
        heroFlex.querySelector('.hero__video').src= pelicula.trailer; 
        heroFlex.querySelector('.hero__contenedor-video').classList.remove('ocultar');
        heroFlex.querySelector('.hero__video').classList.remove('ocultar');
        heroFlex.querySelector('.hero__contenedor-boton-cerrar').classList.remove('ocultar');
    }
    return heroFlex;
}

const mostrarHero = async ( pelicula, destino ) =>{
    destino.innerHTML='';
    const estructuraHero = await obtenerEstructuraHero(pelicula);
    destino.append(estructuraHero);
}

const cargarHeroPelicula = async ( pelicula ) => {
    cargarHero(pelicula);
    heroPoster.src=pelicula.poster;
    heroGenero.innerText=pelicula.genero;
    heroActores.innerText=pelicula.actores;
    videoPelicula.src=pelicula.trailer;
}


