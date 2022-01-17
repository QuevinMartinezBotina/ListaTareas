//!Variables globales

const formularioHTML = document.querySelector("#formulario");
const listaActividadesHTML = document.querySelector("#listaActividades");
let arrayActividades = [];

//!funciones

const CrearItem = (actividad) => {
  let item = {
    actividad: actividad,
    estado: 'Pendiente',
  };

  arrayActividades.push(item);

  return item;
};

const GuardraDB = () => {
  localStorage.setItem("rutina", JSON.stringify(arrayActividades));
  recorrerDB();
};

const recorrerDB = () => {
  listaActividadesHTML.innerHTML = "";
  arrayActividades = JSON.parse(localStorage.getItem("rutina"));

  if (arrayActividades === null) {
    arrayActividades = [];
  } else {
    arrayActividades.forEach((element) => {

      if (element.estado === 'Realizado') {
        listaActividadesHTML.innerHTML += `
        <div class="alert alert-success" role="alert">
         <i class="fas fa-dumbbell float-left mx-2"></i>
         <b>${element.actividad}</b> - ${element.estado}
         <span class="float-end">
             <i class="material-icons animation-done ">done</i>
             <i class="material-icons animation-delete">clear</i>
         </span>
        </div>`;
      }else{
          listaActividadesHTML.innerHTML += `
               <div class=" alert alert-danger" role="alert">
                <i class="fas fa-dumbbell float-left mx-2"></i>
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-end">
                    <i class="material-icons animation-done ">done</i> 
                    <i class="material-icons aanimation-delete">clear</i>
                </span>
               </div>`;
      }

    });
  }
};

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    if (elemento.actividad === actividad) {
      indexArray = index;
    }
  });

  arrayActividades.splice(indexArray,1)
  GuardraDB();
};

const EditarDB = (actividad) =>{

    let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

    console.log(arrayActividades[indexArray]);

    arrayActividades[indexArray].estado = 'Realizado';

    GuardraDB();

}
//!EventListener

formularioHTML.addEventListener("submit", (e) => {
  e.preventDefault(); //?no recargar web
  let actividadHTML = document.querySelector("#actividad").value;

  CrearItem(actividadHTML);
  GuardraDB();

  formularioHTML.reset(); //?reset= reinciar form
});

document.addEventListener("DOMContentLoaded", recorrerDB);

listaActividadesHTML.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.innerHTML === "done" || e.target.innerHTML === "clear") {
    let item = e.path[2].childNodes[3].innerHTML;

    if (e.target.innerHTML === "clear") {
      // accion de eliminar
      EliminarDB(item);
    }

    if (e.target.innerHTML === "done") {
        // accion editar
        EditarDB(item);
    }
  }
});
