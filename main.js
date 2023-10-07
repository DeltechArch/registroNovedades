const formulario = document.querySelector('#formulario');
const listaNovedades = document.querySelector('#lista-novedades');
let novedades = [];

//escucgando eventos
listaEventos();
function listaEventos(){
    formulario.addEventListener('submit',agregarNovedad);

    document.addEventListener('DOMContentLoaded',()=>{
        novedades = JSON.parse(localStorage.getItem('novedades')) || [];

        
        crearHTML();
    })
}

//funcioines

function agregarNovedad(e){
    e.preventDefault();
    const novedad = document.querySelector('#novedad').value;
   
    if(novedad === ''){
        mostrarError('El campo no puede estar vacio');
        return;
    }

     //crear un objeto 
     const novedadObj = {
        id: Date.now(),
        novedad
    }
    // anadir al arreglo de tweets
    novedades = [...novedades,novedadObj];

    //crear el HTML
    crearHTML();   
    formulario.reset(); 
}


function mostrarError(error){
    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;

    //insertar en el article
    const articulo = document.querySelector('#articulo');
    articulo.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 2000);

}


function crearHTML(){
    limpiarHTML();
    novedades.forEach(novedad =>{

        //agregando el boton 
        const btnEliminar = document.createElement('a');
        btnEliminar.innerText = 'X';
        //agregar funcion al boton eliminar

        btnEliminar.onclick = ()=>{
            borrarNovedad(novedad.id);
        }
        const li = document.createElement('li');
        li.innerText = novedad.novedad;

        li.appendChild(btnEliminar);

        listaNovedades.appendChild(li);


    })
    sincornizarStorage();
}

function limpiarHTML(){
    while(listaNovedades.firstChild){
        listaNovedades.removeChild(listaNovedades.firstChild);
    }
}

//agregar al localStorage
function sincornizarStorage(){
    localStorage.setItem('novedades',JSON.stringify(novedades));
}

function borrarNovedad(id){
    // entrando al arreglo 
    novedades = novedades.filter(novedad => novedad.id !== id);
    crearHTML();
}