const cardEnlace = document.querySelector('.card__enlace');

let estaActivoTrailer = false;

window.addEventListener('scroll',()=>{
        if(estaActivoTrailer){
            hero.style.top=`${header.offsetHeight}px`;
            menuItermedio.style.top = `${header.offsetHeight + (hero.offsetHeight)}px`;
            menuLateral.style.top = `${header.offsetHeight + (hero.offsetHeight)}px`;
            console.log(menuLateral);
        }else{
            menuItermedio.style.top = `${(header.offsetHeight )}px`;
            menuLateral.style.top = `${(header.offsetHeight )}px`;
            console.log(menuLateral);
        }
        
});

let idPeliculaTráilerActual = 0;

cardEnlace.addEventListener('click', function(event) {
    event.preventDefault(); // Detener la acción predeterminada del enlace
    alert('El enlace ha sido clickeado, pero no se redirigirá a la URL.');
    // Aquí puedes agregar cualquier otra lógica que necesites
});