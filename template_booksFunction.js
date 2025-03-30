class Livro
{
    constructor(titulo,autor,genero,editora,ano)
    {
        this.Titulo=titulo;
        this.Autor=autor;
        this.Genero=genero;
        this.Editora=editora;
        this.Ano=ano
    }
}

//estrutura para aceder ao livros
var livros = new Array();

//aceder ao local storage
var strlivros = localStorage.getItem("livros");

//quando não existir a chave livro no localstorage
if(strlivros==null)
{
    livros = new Array();
}
else if(strlivros.length==0)
{
    livros = new Array();
}
else
{
    livros = JSON.parse(strlivros);
}