// const TaskType=[
//         {TaskTypeId:1,TaskTypeName:"homework"},
//     {TaskTypeId:2,TaskTypeName:"learn to test" } ,
//     {TaskTypeId:3,TaskTypeName:"do a project" } ,
//     ]
//  const TasksList=[
//      {TaskId:"1",TaskTypeId:1,TaskName:"homework in react",UserTaskId:"326201753",DeadLine:"12/12/2024"},
//      {TaskId:"2",TaskTypeId:2,TaskName:"learn to test in data structue",UserTaskId:"326201759",DeadLine:"12/12/2024"},
//      {TaskId:"3",TaskTypeId:3,TaskName:"do a project in python ",UserTaskId:"326201753",DeadLine:"12/12/2024"},
//     ]
    const Task = require('../models/Task')
    const TaskType=require('../models/TaskType')
    exports.getAllTaskType=async(req,res) =>
    {
       try{
         
        const tasksType=await TaskType.find();
        res.json(tasksType);
        } catch (error) {
          console.error('Failed to get taskTypeList:', error);
          res.status(500).json({ message: 'Failed to get taskTypeList' });
        }
    }
    
    exports.getAllTaskList=async(req,res)=> 
    {
        try{
            const tasks=await Task.find();
            res.json(tasks);
            } catch (error) {
              console.error('Failed to get tasks:', error);
              res.status(500).json({ message: 'Failed to get tasks' });
            }
    }
    exports.deleteTaskById=async(req,res)=>
    {
        const {TaskId}=req.params
        console.log(TaskId);
        try{
            const deletedTask = await Task.findOneAndDelete({ TaskId: TaskId });
          if (!deletedTask) {
            return res.status(404).json({ message: 'task not found' });
          }
          res.json({ message: 'task deleted successfully' });
        }
        catch (error)
        {
           console.error('Failed to delete task:', error);
           res.status(500).json({ message: 'Failed to delete task' });
         }
    }
    
    exports.addTaskToList=async(req,res)=>
    {
        const {newTask} = req.body;
      const task=await Task.create(req.body)
      res.json(task)

    };
    
    exports.addTaskToTypeList=async(req,res)=>
    {
        const {newTaskType} = req.body
      const taskType=await TaskType.create(req.body)
      res.json(taskType)

    };
    exports.getTaskById = async (req, res) => {
        const { TaskId } = req.params;
      
        try {
          const task = await Task.findOne({ TaskId });
          if (!task) {
            return res.status(404).json({ message: 'Task not found' });
          }
          res.json(task);
        } catch (error) {
          console.error('Failed to get task:', error);
          res.status(500).json({ message: 'Failed to get user' });
        }
      };