# Tada Todo
A magical todo list

## Naming
**Tasks**
Tasks are todos. You can check them off to complete them. They represent things thaat the user needs to do.

**Projects**
Projects are groups of tasks. They give multiple tasks a main focus but shouldn't add any extra meaning to the tasks.

**Todo**
Use this word *only* when referring to the whole project. A todo list is a list with projects and tasks.

## Database Structure
```
Projects
┗ aldbjaoisjfkadf
  ┗ user: ori's id
  ┗ tasks
    ┗ balskdfja;sdf
      ┗ title
      ┗ description
      ┗ isDone
      ┗ other values
    ┗ aslkbjhalsdkf
    ┗ alibudhjfglka

Users
┗ aklsjh;ajf;lsakdjf
  ┗ id: ori's id
  ┗ preferences <map>
      theme: dark
      font: whatever
```