export class Comentario{
    constructor(
        public _id: string,
        public comentario: string,
        public encuesta: string,
        public user: string
    ){ }
}