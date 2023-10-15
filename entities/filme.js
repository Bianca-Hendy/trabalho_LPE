class Filme {
    constructor(codigo, nome, genero, ativo, 
        valor, locadora, locadora_nome) {
        this.codigo = codigo;
        this.nome = nome;
        this.genero = genero;
        this.ativo = ativo;
        this.valor = valor;
        this.locadora = locadora;
        this.locadora_nome = locadora_nome;
    }
}

module.exports = Filme;