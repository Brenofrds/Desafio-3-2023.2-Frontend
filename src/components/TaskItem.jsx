import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import styles from "./TaskItem.module.css";
import xImg from "../assets/img/x.png";
import correctImg from "../assets/img/correct.png";

// Componente TaskItem
export default function TaskItem({
  id,
  title,
  assignee,
  deadline,
  description,
  taskState,
  index,
  onTaskUpdate,
  onDeleteTask,
}) {
  // Estados locais
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editableDeadline, setEditableDeadline] = useState(deadline);
  const [editableAssignee, setEditableAssignee] = useState(assignee);

  // Função chamada ao clicar no botão "Delete"
  const handleDelete = () => {
    // Chama a função onDeleteTask passando o ID da tarefa para exclusão
    onDeleteTask(id);
  };

  // Função chamada ao clicar no botão "Confirmar"
  const handleConfirm = () => {
    // Desativa o modo de edição ao definir isEditing como false
    setIsEditing(false);
  };

  // Função chamada quando uma tecla é pressionada
  const onKeyPress = (event) => {
    // Se a tecla pressionada for "Enter"
    if (event.key === "Enter") {
      // Desativa o modo de edição
      setIsEditing(false);
      // Se o título editável estiver vazio, chama a função onDeleteTask para excluir a tarefa
      if (editableTitle.trim().length === 0) {
        onDeleteTask(id);
      }
    }
  };

  // Função para atualizar a tarefa com os dados editáveis
  const updateTask = () => {
    // Chama a função onTaskUpdate passando os dados editáveis da tarefa
    onTaskUpdate(
      id,
      editableTitle,
      editableAssignee,
      editableDeadline,
      editableDescription,
      taskState
    );
  };

  // Efeito para atualizar a tarefa quando qualquer campo é modificado
  useEffect(() => {
    updateTask();
  }, [
    editableTitle,
    editableAssignee,
    editableDeadline,
    editableDescription,
    taskState,
  ]);

  // Função para obter a classe de estilo com base no estado
  const getTaskStateStyle = (taskState) => {
    switch (taskState) {
      case "Pendente":
        return styles.pending;
      case "Fazendo":
        return styles.inProgress;
      case "Feito":
        return styles.completed;
      default:
        return "";
    }
  };

  // Hooks para arrastar e soltar
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: {
      id,
      index,
      title,
      assignee,
      deadline,
      description,
      taskState,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // Define a opacidade do componente com base na condição de arrastar (isDragging)
  const opacity = isDragging ? 0.5 : 1;

  // Renderização condicional com base no modo de edição
  if (isEditing) {
    // Retorna o componente em modo de edição
    return (
      <div
        ref={drag}
        style={{ opacity }}
        className={`${styles.taskItem} ${getTaskStateStyle(taskState)}`}
      >
        {/* Input para editar o título */}
        <div className={styles.title}>
          <input
            type="text"
            value={editableTitle}
            onChange={(event) => setEditableTitle(event.target.value)}
            onKeyPress={onKeyPress}
            style={{ border: "none" }}
          />
        </div>
        {/* Textarea para editar o responsável */}
        <div className={styles.assignee}>
          <textarea
            value={editableAssignee}
            onChange={(event) => setEditableAssignee(event.target.value)}
            onKeyPress={onKeyPress}
            style={{ border: "none" }}
          />
        </div>
        {/* Textarea para editar o prazo */}
        <div className={styles.deadline}>
          <textarea
            value={editableDeadline}
            onChange={(event) => setEditableDeadline(event.target.value)}
            onKeyPress={onKeyPress}
            style={{ border: "none" }}
          />
        </div>
        {/* Textarea para editar a descrição */}
        <div className={styles.description}>
          <textarea
            value={editableDescription}
            onChange={(event) => setEditableDescription(event.target.value)}
            onKeyPress={onKeyPress}
            style={{
              overflowY: "hidden",
              height: "auto",
              minHeight: "70px",
              border: "none",
            }}
          />
        </div>
        {/* Botão para excluir a tarefa */}
        <div className={styles.delete}>
          <button onClick={handleDelete}>
            {/* Ícone de exclusão */}
            <img
              src={xImg}
              alt="Delete"
              style={{
                width: "20px",
                height: "18px",
                background: "transparent",
              }}
            />
          </button>
        </div>
        {/* Botão para confirmar as alterações */}
        <div className={styles.confirm}>
          <button onClick={handleConfirm}>
            {/* Ícone de confirmação */}
            <img
              src={correctImg}
              alt="Correct"
              style={{
                width: "20px",
                height: "15px",
                background: "transparent",
              }}
            />
          </button>
        </div>
      </div>
    );
  } else {
    // Retorna o componente em modo de visualização normal
    return (
      <div
        ref={drag}
        className={`${styles.taskItem} ${getTaskStateStyle(taskState)}`}
        onClick={() => setIsEditing(true)} // Ativa o modo de edição ao clicar no componente
      >
        {/* Visualização do título, responsável, prazo e descrição */}
        <div className={styles.title}>{editableTitle}</div>
        <div className={styles.assignee}>{editableAssignee}</div>
        <div className={styles.deadline}>
          {/* Ícone de calendário e prazo */}
          <i
            style={{
              fontSize: "15px",
              verticalAlign: "middle",
              marginRight: "4px",
              background: "transparent",
            }}
            className="material-icons"
          >
            calendar_today
          </i>
          {editableDeadline}
        </div>
        {/* Visualização da descrição */}
        <div className={styles.description}>{editableDescription}</div>
      </div>
    );
  }
}

// Propriedades obrigatórias e seus tipos
TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
