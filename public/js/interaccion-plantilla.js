// Mostrar menú al seleccionar

btnMenu.addEventListener('click',(e)=>{
    menu.classList.toggle('header__contenedor-nav--activar');     
});


const crearGenero = async () => {
    const generos = await obtenerGeneros();
    
    generos.forEach(genero => {
        menu2.innerHTML += `
            <li class="sub-menu__item"><a class="sub__menu-link" href="/genero.html#${genero._id}/${genero.nombre}">${genero.nombre}</a></li>
        `
    });
}


// Reducir el tamaño del encabezado al hacer scroll

// window.addEventListener('scroll',()=>{
//     header.classList.toggle('header__wrapper--scroll',window.scrollY>0);
//     headerContenedorImagen.classList.toggle('header__contenedor-imagen--scroll',window.scrollY>0);    
// });


// Actualizar año del Copyright

const currentYear = new Date().getFullYear();
copyYear.textContent = currentYear;



crearGenero();