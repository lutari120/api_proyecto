import dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";

function conectar(){
    return postgres({
        host : process.env.DB_HOST,
        database : process.env.DB_NAME,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD
    })
}


export function leerTareas(){
    return new Promise (async (ok,ko) => {
        let conexion = conectar();

        try{

            let tareas = await conexion`SELECT * FROM lista ORDER BY id`;

            ok(tareas);

        }catch(error){

            ko({ error : "Error en la base de datos" });

        }finally{

            conexion.end();

        }
    });
}

export function crearTarea(tarea){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let [{id}] = await conexion`INSERT INTO lista (tarea) VALUES (${tarea}) RETURNING id`;

            ok(id);

        }catch(error){

            console.error(error); // Muestra el error en la consola para depuración
            ko({ error: error.message || "Error en la base de datos" });

        }finally{

            conexion.end();

        }
    });
}

export function borrarTarea(id){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let {count} = await conexion`DELETE FROM lista WHERE id = ${id}`;

            ok(count);

        }catch(error){

            ko({ error : "Error en la base de datos" });

        }finally{

            conexion.end();

        }
    });
}

export function editarTarea(id,texto){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let {count} = await conexion`UPDATE lista SET tarea = ${texto} WHERE id = ${id}`;

            ok(count);

        }catch(error){

            ko({ error : "Error en la base datos" });

        }finally{

            conexion.end();

        }
    });
}

export function editarEstado(id){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let {count} = await conexion`UPDATE lista SET estado = NOT estado WHERE id = ${id}`;

            ok(count);

        }catch(error){

            ko({ error : "Error en la base de datos" });

        }finally{

            conexion.end();

        }
    });
}

/*
editarEstado(2)
.then(x => console.log(x))
.catch(x => console.log(x));
*/

/*editarTarea(2,"barrer")
.then(x => console.log(x))
.catch(x => console.log(x));
*/

/*
borrarTarea(1)
.then(x => console.log(x))
.catch(x => console.log(x));
*/

/*
crearTarea("Limpiar")
.then(x => console.log(x))
.catch(x => console.log(x));
*/


/*
leerTareas()
.then(x => console.log(x))
.catch(x => console.log(x));
*/


