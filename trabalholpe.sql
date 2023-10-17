create table locadoras (
   codigo serial not null primary key, 
   nome varchar (40) not null,
	endereco varchar(100) not null,
	numero varchar(5) not null
);

create table filmes (
   codigo serial not null primary key, 
   nome varchar (100) not null,
   genero text, 
   ativo boolean not null, 
   valor numeric(12,2) not null, 
   check (valor >= 0),
   locadora integer not null, 
   foreign key (locadora) references locadoras (codigo)
);

-- inserindo registros
-- locadoras 
insert into locadoras (nome,endereco, numero) values ('Multiplayer', 'AV. Sete de Setembro', '232') , ('CD & cia', 'Boqueirao', '4665');

-- filmes

insert into filmes (nome, genero, ativo, valor, locadora)
values ('IT - a coisa','terror', true, 60.0,1), 
('Senhor dos Aneis','aventura', true, 120.0,1);


-- consultas

select f.codigo as codigo, f.nome as nome, f.genero as genero, f.ativo as ativo, f.valor as valor,
f.locadora as locadora, l.nome as locadora_nome
from filmes f
join locadoras l on f.locadora = l.codigo
where l.codigo = 1;

select * from locadoras;

select * from filmes;


-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('biancaevangelista.pf380@ifsul.edu.br', '123456', 'A','(54)99999-3333','Bianca Hendy'), 
('bia@gmail.com', '123456', 'U','(54)22222-1111','Bia');