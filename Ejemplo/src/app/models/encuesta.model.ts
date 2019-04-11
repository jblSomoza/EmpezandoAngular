export class Encuesta{
    constructor(
        public _id: string,
        public titulo: string,
        public descripcion: string,
        public opinion: {
            si: number,
            no: number,
            talvez: number,
            usuariosO: []
        },
        public listaComentarios: [],
        public user: string
    ){}
}