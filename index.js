import express from "express";
import cors from "cors";
import { leerTareas } from "./db.js";

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

servidor.listen(process.env.PORT);