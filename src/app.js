const express = require("express");
const cors = require("cors");

const { v4: uuidv4} = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  //retornar todos os repositories.
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  //criar os atributos a ser listados no formato de json.
  const repository = {
    id: uuidv4(),
    title, 
    url, 
    techs, 
    likes: 0
  }

  //Acrescentar dentro do 'repository' no array 'repository'.
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  //Buscar 'repositories' o index do repository a ser deletado
  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);


  //Checar se o id existe o não.
  if(findRepositoryIndex === -1) {
    return response.status(400).json({error: 'Repository not found'})
  }

  //Criar um novo objeto
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes
  };


  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  //Buscar 'repositories' o index do repository a ser deletado.
  const findRepositoryIndex = repositories.findIndex( 
    repository => repository.id ===id
    );

    //Deletar o repository á partir da posição findRepositoryIndex.
    if(findRepositoryIndex >= 0){
      repositories.splice(findRepositoryIndex, 1); 
    } else{
      return response.status(400).json({error: 'Repository does not exists.'});
    }
    
    //Quando é um conteúdo vazio é melhor mandar o status "204" (no content)
    return response.status(204).send();
  });

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  //Buscar 'repositories' o index do repository a ser deletado.
  const findRepositoryIndex = repositories.findIndex(repository => repository.id ===id);

  if(findRepositoryIndex === -1) {
    return response.status(400).json({error: 'Repository does not exists.'})
  }

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);

});

module.exports = app;
