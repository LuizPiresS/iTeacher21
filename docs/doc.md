Valores monetários deverão ser salvos como inteiros

Sistema de avaliação

* Professores
    * Verificados: média + peso 1
    * Não verificados: Média + peso 0
* Alunos
    * Média simples

Usuário

Regras de negócios

* Todos os usuários são alunos como padrão
* Todos os usuários precisam solicitar para se tornarem professores

**Eu usuário preciso me cadastrar na plataforma**

```JSON
{
  "tenantId": "20c7e8f3-8fc2-4e0b-a329-df4f932ccf55",
  "name": "Random Name",
  "email": "random@random.com",
  "password": "P4$sword",
  "confirmPassword": "P4$sword",
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name"
  },
  "cellPhone": "(99)999999999"
}
```

Eu como usuário preciso poder editar meus dados na plataforma

```JSON
{
  "name": "Random Name",
  "email": "random@random.com",
  "password": "P4$sword",
  "confirmPassword": "P4$sword",
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name"
  },
  "cellPhone": "(99)999999999"
}
```

Eu como usuário preciso me conectar na plataforma

```JSON
{
  "email": "random@random.com",
  "password": "P4$sword"
}
```

Eu como usuário preciso que seja possível desativar minha conta (pode reativar quando desejar)

Eu como usuário preciso que seja possível deletar minha conta (irreversível perderá todos os registros associados a esta
conta)

Eu como usuário preciso cadastrar meu profile na plataforma

```JSON
{
  "dateOfBirth": "06/04/1981",
  "bio": "Random bio",
  "website": "random.com",
  "joinDate": "05/08/2022",
  "profileImage": "random.jpg"
}
```

Eu como usuário preciso conseguir atualizar os dados do meu profile

```JSON
{
  "dateOfBirth": "06/04/1981",
  "bio": "Random bio",
  "website": "random.com",
  "joinDate": "05/08/2022",
  "profileImage": "random.jpg"
}
```

Alunos

Regras de negócios

* Os alunos poderão optar por aulas presenciais ou remotas
    * Quando a opção for presencial as recomendações serão por proximidade
    * A plataforma deverá conseguir pegar a localização do usuário
    * https://www.youtube.com/watch?v=2Su-935B6jU
* Os alunos poderão avaliar os professores
* Os alunos poderão buscar por professores usando como filtro:
    * nome
    * disciplina (Matemática)
    * assuntos específicos (Algebra linear)
* Os professores serão listados por proximidade e avaliação (o professor mais próximo e com melhor avaliação)
    * Será criado uma rota entre a casa do aluno e do professor e será mostrado na tela a localização
        * O Aluno poderá selecionar o professor pelo mapa

Professores

Regras de negócios

* As aulas podem ser presenciais ou remotas
    * Para aulas presenciais a recomendação será feita por proximidade e por número de estrelas
    * O professor poderá cadastrar aulas gravadas de amosta (YouTube)
* Existirão dois tipos de professores na plataforma:
    * Professor verificado:
        * Deverá enviar documentação que comprove sua formação e identidade para a análise
    * Professor não verificado:
        * Qualquer usuário poderá ofertar aulas particulares na plataforma, mas a plataforma não se responsabilizará
          pelas informações fornecidas no perfil e seu perfil terá um ranking menor que um professor verificado mesmo se
          o mesmo tiver uma pontuação menor
* Os professores poderão avaliar os alunos
* Os professores poderão cadastrar um perfil publico onde listará suas competências

```JSON
{
  "name": "Random Name",
  "bio": "Random bio",
  "email": "random@random.com",
  "academicEducation": "Random Academic Education",
  "schoolSubject": "Random School Subject",
  "specialty": "Random Specialty",
  "pricePerHour": 1000,
  "documentation": "Random links to documentation",
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name"
  }
}
```

* O professor poderá setar qual a pontuação minima de um aluno para que aceite dar aulas ao mesmo (todos os alunos acima
  desta pontuação serão aceitos automaticamente)
* Os professores poderão cadastrar sua agenda com seus horários livres para a aula
    * A agenda deverá apresentar apenas os horários em que o professor estiver livre. Quando um horário for marcado por
      um aluno o mesmo não deve mais aparecer para outro aluno

```JSON
{
  "dayOfRheWeek": "Mondays",
  "startTime": "14:00",
  "endTime": "15:00",
  "address": {
    "street": "Random Street Name",
    "number": "123",
    "neighborhood": "Random Neighborhood Name"
  },
  "observation": "Random Observation",
  "pricePerHour": 1000
}
```

Administrador Geral

Regras de negócios

Os administradores serão os reponsaveis por cadastrar novas franquias

Analistas de perfil (encontrar nome melhor :)

Regras de negócios

*

Administrador tenant
Regras de negócios

