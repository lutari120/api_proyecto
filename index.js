import express from "express";
import cors from "cors";
import { leerTareas,crearTarea,borrarTarea,editarEstado,editarTarea } from "./db.js";

const servidor = express();

servidor.use(cors());

servidor.use(express.json());

servidor.get("/tareas", async (peticion,respuesta) => {
    try{

        let tareas = await leerTareas();

        respuesta.json(tareas);

    }catch(error){

        respuesta.status(500);

        respuesta.json({ error : "Error en el servidor" });

    }
})

servidor.post("/tareas/nueva",async (peticion,respuesta,siguiente) => {
    let {tarea} = peticion.body;

    if(!tarea || tarea.trim() == ""){
        return siguiente(true);
    }

    try{

        let id = await crearTarea(tarea);

        respuesta.json({id});

    }catch(error){

        respuesta.status(500);

        respuesta.json({ error : "Error en el servidor" });

    }
});

servidor.delete("/tareas/borrar/:id([0-9]+)",async (peticion,respuesta) => {
    try{

        let id = Number(peticion.params.id);

        let count = await borrarTarea(id);

        respuesta.json({ resultado : count ? "Borrado" : "Error al borrar" });

    }catch(error){

        respuesta.status(500);

        respuesta.json({ error : "Error en el servidor" });

    }
});

servidor.put("/tareas/actualizar/:id([0-9]+)/estado",async (peticion,respuesta) => {
    let id = Number(peticion.params.id);

    try{

        let count = await editarEstado(id);

        respuesta.json({ resultado : count ? "Actualizado" : "Error al actualizar" })

    }catch(error){

        respuesta.status(500);

        respuesta.json({ error : "Error en el servidor" });

    }
})

servidor.put("/tareas/actualizar/:id([0-9]+)/tarea",async (peticion,respuesta) => {
    let id = Number(peticion.params.id);
    let {tarea} = peticion.body;

    try{

        let count = await editarTarea(id,tarea);

        respuesta.json({ resultado : count ? "Actualizado" : "Error al actualizar" })

    }catch(error){

        respuesta.status(500);

        respuesta.json({ error : "Error en el servidor" });

    }
});

servidor.use((error,peticion,respuesta,siguiente) => {
    respuesta.status(400);

    respuesta.json({ error : "Error en el servidor" });
})

servidor.use((peticion,respuesta) => {
    respuesta.status(404);

    respuesta.json({ error : "Recurso no encontrado" });
})


servidor.listen(process.env.PORT);