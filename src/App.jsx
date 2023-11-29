import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import TaskList from "./components/TaskList";

// Variável global para gerar IDs únicos para as tarefas
let idAcc = 0;

// Função para gerar um ID único a cada chamada
const generateId = () => {
  idAcc += 1;
  return idAcc;
};

function App() {
  // Estado da aplicação para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);

  // Função para adicionar uma nova tarefa à lista
  const addTask = (title, assignee, deadline, description, state) => {
    // Cria uma nova tarefa com um ID único gerado pela função generateId
    const newTask = {
      id: generateId(),
      title,
      assignee,
      deadline,
      description,
      state,
    };
    // Atualiza o estado da aplicação adicionando a nova tarefa à lista existente
    setTasks((existingTasks) => [...existingTasks, newTask]);
  };

  // Função para atualizar uma tarefa na lista com base no seu ID e no novo estado
  const updateTask = (id, title, assignee, deadline, description, newState) => {
    // Atualiza o estado da aplicação mapeando as tarefas existentes
    setTasks((existingTasks) =>
      existingTasks.map((task) =>
        // Se o ID da tarefa corresponder ao ID fornecido, atualiza a tarefa com o novo estado
        task.id === id
          ? { ...task, title, assignee, deadline, description, state: newState }
          : task
      )
    );
  };

  // Função para excluir uma tarefa da lista com base no seu ID
  const deleteTask = (id) => {
    // Atualiza o estado da aplicação filtrando as tarefas com IDs diferentes do fornecido
    setTasks((existingTasks) => existingTasks.filter((task) => task.id !== id));
  };

  // Renderização do componente App
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="container">
          {/* Componente TaskList para as tarefas pendentes */}
          <TaskList
            title="Pendente"
            onAddTask={addTask}
            taskState="Pendente"
            tasks={tasks.filter((t) => t.state === "Pendente")}
            onTaskUpdate={updateTask}
            onDeleteTask={deleteTask}
          />
          {/* Componente TaskList para as tarefas em andamento */}
          <TaskList
            title="Fazendo"
            onAddTask={addTask}
            taskState="Fazendo"
            tasks={tasks.filter((t) => t.state === "Fazendo")}
            onTaskUpdate={updateTask}
            onDeleteTask={deleteTask}
          />
          {/* Componente TaskList para as tarefas concluídas */}
          <TaskList
            title="Feito"
            onAddTask={addTask}
            taskState="Feito"
            tasks={tasks.filter((t) => t.state === "Feito")}
            onTaskUpdate={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
