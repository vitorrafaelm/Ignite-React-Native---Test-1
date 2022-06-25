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

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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