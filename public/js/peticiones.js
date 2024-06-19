const API_URL = `http://192.168.1.107:8080/api`
const PATHS = {
    // apartado:'/apartado',
    genero:'/genero',
    pelicula:'/pelicula',
    peliculaGenero:`/pelicula/genero`,
    recienAgregadas:'/pelicula/recien/agregadas',
    seccion:'/seccion',
    peliculaApartado:'/pelicula-apartado',
}

const obtenerGeneros = async () => {
    try {
        const generos = await fetch(`${API_URL}${PATHS.genero}`);
        if (!generos.ok) {
            throw new Error('No se pudo obtener la genero');
        }
        return await generos.json();
    } catch (error) {
        console.error('Error al obtener el genero:', error.message);
    }
}

const obtenerGeneroPorId = async (id) => {
    try {
        const genero = await fetch(`${API_URL}${PATHS.genero}/${id}`);
        if (!genero.ok) {
            throw new Error('No se pudo obtener la genero');
        }
        return await genero.json();
    } catch (error) {
        console.error('Error al obtener el genero:', error.message);
    }
}

const obtenerPeliculas = async () => {
    try {
        const obtenerPeliculas = await fetch(`${API_URL}${PATHS.pelicula}`);
        // console.log(obtenerPeliculas);
        if (!obtenerPeliculas.ok) {
            throw new Error('No se pudo obtener la lista de peliculas');
        }
        return await obtenerPeliculas.json();
    } catch (error) {
        console.error('Error al obtener la lista de peliculas:', error.message);
    }
}

const peliculaRecienAgregadas = async (desde=0, limite=10) => {
    try {
        const obtenerPeliculas = await fetch(`${API_URL}${PATHS.recienAgregadas}?desde=${desde}&&limite=${limite}`);
        // console.log(obtenerPeliculas);
        if (!obtenerPeliculas.ok) {
            throw new Error('No se pudo obtener la lista de peliculas');
        }
        return await obtenerPeliculas.json();
    } catch (error) {
        console.error('Error al obtener la lista de peliculas:', error.message);
    }
}

const obtenerPeliculaPorId = async ( id ) => {
    try {
        const pelicula = await fetch(`${API_URL}${PATHS.pelicula}/${id}`);
        // console.log(obtenerPeliculas);
        if (!pelicula.ok) {
            throw new Error('No se pudo obtener la pelicula');
        }
        return await pelicula.json();
    } catch (error) {
        console.error('Error al obtener la lista de peliculas:', error.message);
    }
}

const obtenerPeliculasPorGenero = async ( generos, desde = 0, limite = 10 ) => {
    try {
        const pelicula = await fetch(`${API_URL}${PATHS.peliculaGenero}?desde=${desde}&limite=${limite}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({generos})
        });
        // console.log(obtenerPeliculas);
        if (!pelicula.ok) {
            throw new Error('No se pudo obtener la pelicula');
        }
        return await pelicula.json();
    } catch (error) {
        console.error('Error al obtener la lista de peliculas:', error.message);
    }
}

const obtenerSecciones = async ( ) => {
    try {
        const secciones = await fetch(`${API_URL}${PATHS.seccion}`);
        if (!secciones.ok) {
            throw new Error('No se pudo obtener la pelicula');
        }
        // const prueba = await secciones.json();
        // console.log(await secciones.json());

        return await secciones.json();
    } catch (error) {
        console.error('Error al obtener las secciones:', error.message);
    }
}


const obtenerPelicalasPorApartado = async ( id, desde = 0, limite = 10 ) => {
    try {
        const peliculas = await fetch(`${API_URL}${PATHS.peliculaApartado}/${id}?desde=${desde}&limite=${limite}`);
        if (!peliculas.ok) {
            throw new Error('No se pudo obtener la pelicula');
        }
        return await peliculas.json();
    } catch (error) {
        console.error('Error al obtener las secciones:', error.message);
        return null;
    }
}

const obtenerPeliculaPortada = async ( id = '663ae7cdbb9bae7a53f7ee9b' ) => {
    try {
        const pelicula = await fetch(`${API_URL}${PATHS.pelicula}/${id}`);
        // console.log(obtenerPeliculas);
        if (!pelicula.ok) {
            throw new Error('No se pudo obtener la pelicula');
        }
        return await pelicula.json();
    } catch (error) {
        console.error('Error al obtener la lista de peliculas:', error.message);
    }
}