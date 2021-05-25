class Temporizador {
    constructor() {
        this.tiempo = 0;
    }

    getTiempo() {
        return this.tiempo;
    }

    setTiempo(t){
        this.tiempo = t;
    }

    init() {
        this.intervaloId = setInterval(() => {
            this.tiempo++;
        },1000);
    }
}

export { Temporizador };