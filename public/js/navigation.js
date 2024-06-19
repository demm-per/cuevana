


const navigator = () => {
    switch(location.hash){
        case "#ultimas":
            console.log('ULTIMAS!!!!');
        break;
        case "#tendencia":
            console.log('TENDENCIA!!!!');    
        break;
        case "#estrenos":
            console.log('ESTRENO!!!!');
        break;
        case "#dia":
            console.log('DIA!!!!');
        break;
        case "#semana":
            console.log('SEMANA!!!!');
        break;
        default:
            console.log('hola');
            break;
    }    
}

window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);