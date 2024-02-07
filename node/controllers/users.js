 
//  const UsersList= [
//         { FirstName: "shani", LastName: "fisher", Id: "326201753", Teacher: 0, phone: "0504108916" },
//         { FirstName: "צביה", LastName: "לוי", Id: "326201759", Teacher: 0, phone: "0548545131" },
//         { FirstName: "אילה", LastName: "צדוק", Id: "326201755", Teacher: 0, phone: "0533143970" },
//         { FirstName: "עדינה", LastName: "שטיינברג", Id: "326201756", Teacher: 1, phone: "0545859569" },
//     ]

    const User = require('../models/users')

    exports.getAllUsers = async (req, res) => {
        try {
          const users = await User.find();
          res.json(users);
        } catch (error) {
          console.error('Failed to get users:', error);
          res.status(500).json({ message: 'Failed to get users' });
        }
      };
      
    exports.deleteUserById=async(req,res)=>
    {
        const {Id}=req.params
        console.log(Id);
        try{
            const deletedUser = await User.findOneAndDelete({ Id: Id });
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json({ message: 'User deleted successfully' });
        }
   
    catch (error)
     {
        console.error('Failed to delete user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
      }
    };

    exports.updateUserById=async(req,res)=>
    {
        const {Id}=req.params;
        const {FirstName,LastName}=req.body


        try {
            const updatedUser = await User.findOneAndUpdate(
              { Id: Id }, // עדכון לפי שדה userId
              { FirstName, LastName },
              { new: true }
            );
        
            if (!updatedUser) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            res.json(updatedUser);
          }
         catch (error) {
            console.error('Failed to update user:', error);
            res.status(500).json({ message: 'Failed to update user' });
          }
       
    };


   
      
    exports.addUser=async(req,res)=>
    {
        const {newUser} = req.body
        const user = await User.create(req.body);
        res.json(user)
    //   if(! UsersList.find(user=>user.Id==newUser.Id))
    //      {    UsersList.push(newUser)
    //          return res.status(200).json({massege:"the user added" ,UsersList:UsersList})
    //      }
    // else
    //      return res.status(404).json({message:"the id is exist usera"})

    };
    // exports.addUser = async(req,res)=>{
    //     console.log(req.body);
    //     const {name} = req.body;
    //     const task = await User.create(req.body);
    //     res.json(task)
        
    // }
    exports.getUserById = async (req, res) => {
      const { Id } = req.params;
    
      try {
        const user = await User.findOne({ Id });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        console.error('Failed to get user:', error);
        res.status(500).json({ message: 'Failed to get user' });
      }
    };
    





    