import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getMilliseconds(),
      title: newTaskTitle, 
      done: false,
    }

    setTasks(prev => [...prev, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const tasksUpdated = tasks.map(task => {
      if(task.id === id){
        task.done = !task.done; 
      }

      return task; 
    });

    setTasks(tasksUpdated);
  }

  function handleRemoveTask(id: number) {
    const tasksKeeped = tasks.filter(task => task.id !== id); 
    setTasks(tasksKeeped); 
  }

  function handleEditTask(id: number, newTitle: string) {
    const tasksUpdated = tasks.map(task => {
      if(task.id === id){
        task.title = newTitle; 
      }

      return task; 
    });
    setTasks(tasksUpdated); 
    console.log(tasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})