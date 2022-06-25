import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import closeIcon from "../assets/icons/close/close.png";

import { ItemWrapper } from "./ItemWrapper";
import { Task } from "./TasksList";

interface HeaderProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void; 
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: HeaderProps) {
  const [taskEdit, setTaskEdit] = useState(item.title); 
  const [editActive, setEditActive] = useState(false); 

  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(); 

  function handleEditTask(){
    editTask(item.id, taskEdit); 
    setEditActive(false);
  }

  function handleDeleteTask(){
    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?", 
      [
        {
          text: 'Não', 
          onPress: () => {},
        }, 
        {
          text: 'Sim',
          onPress: () => removeTask(item.id),
        }
      ]
    )
  }

  return (
    <ItemWrapper index={index}>
      <View style={styles.taskTitleAndStatus}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
        </TouchableOpacity>

        
          <TextInput
            selectionColor="#666666"
            onChangeText={setTaskEdit}
            value={taskEdit}
            onSubmitEditing={() => handleEditTask()}
            editable={editActive}
            autoFocus={editActive}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
      </View>

      <View style={styles.containerActionsButtons}>
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 0 }}
          onPress={() => {
            if(editActive){
              handleEditTask()
            } else {
              setEditActive(!editActive)
            }
          }}
        >
          <Image source={editActive ? closeIcon : editIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => handleDeleteTask()}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskTitleAndStatus: {
    display: "flex", 
    flexDirection: 'row', 
    alignItems: "center",
  },
  taskButton: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  containerActionsButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
