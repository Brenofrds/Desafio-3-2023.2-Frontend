import PropTypes from "prop-types";
import styles from "./TaskList.module.css";
import plusIcon from "../assets/img/+.png";
import TaskItem from "./TaskItem";
import { useDrop } from "react-dnd";

export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  onDeleteTask,
}) {
  // Função para adicionar uma nova tarefa
  const addTask = () => {
    onAddTask(
      "Nova Tarefa",
      "Responsavel",
      "dd/mm/YYYY",
      "Descrição",
      taskState
    );
  };

  // Configuração para permitir a queda de tarefas na lista
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      // Atualiza o estado da tarefa ao soltá-la na lista
      onTaskUpdate(
        item.id,
        item.title,
        item.assignee,
        item.deadline,
        item.description,
        taskState
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Renderização do componente TaskList
  return (
    <div>
      {/* Container para aceitar queda de tarefas */}
      <div ref={drop} className={styles.tasklist}>
        {/* Título da lista */}
        <div className={styles.title}>{title}</div>

        {/* Conteúdo da lista, incluindo tarefas e botão para adicionar */}
        <div className={styles.content}>
          {/* Mapeia e renderiza cada tarefa na lista */}
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              index={index}
              id={task.id}
              title={task.title}
              assignee={task.assignee}
              deadline={task.deadline}
              description={task.description}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              onDeleteTask={onDeleteTask}
            />
          ))}

          {/* Exibe mensagem se a lista estiver vazia */}
          {tasks.length === 0 && (
            <div onClick={addTask} className={styles.emptyList}>Lista Vazia</div>
          )}

          {/* Botão para adicionar nova tarefa */}
          <button onClick={addTask} className={styles.btn}>
            <img src={plusIcon} alt="plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Define as propTypes para o componente TaskList
TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  taskState: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
