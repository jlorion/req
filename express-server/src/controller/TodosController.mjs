import prisma from "../config/PrismaClient.mjs";


//getTodo
export const getTodo = async (req, res)=>{
    const {user}  = req.session;

    if (!user) {
        return res.status(400).send({error: "not logged in"})
    }
    
    const todos = await prisma.todos.findMany({
        where: {
            authorId: user
        }
    })
    console.log(todos)
    return res.status(200).send(todos);
}

//newTodo
export const newTodo = async (req, res)=>{
    const {user}  = req.session;
    const {name, content, done} = req.body;
    console.log(req.body)

    if (!user) {
        return res.status(400).send({error: "not logged in"})
    }

    const todo = await prisma.todos.create({
        data: {
            name: name,
            content: content,
            done: done,
            authorId: user
        }
    });
    console.log("todo created");
    
    return res.status(200).send({message: "todo created"})
}

//updateTodo
export const updateTodo = async (req, res)=>{
    if (!req.session.user) {
        return res.status(400).send({error: "not logged in"})
        
    }
    //update is just fancy post ../..  
    const todoId = req.body.id;
    const getExistingTodo = await prisma.todos.findUnique({
        where: {
            id: todoId
        }
    });
    console.log(getExistingTodo);

    const name = req.body.name? req.body.name: getExistingTodo.name;
    const content = req.body.content? req.body.content: getExistingTodo.content;
    const done = typeof req.body.done === undefined? getExistingTodo.done: req.body.done;

    const updatedTodo = await prisma.todos.update({
        where:{
            id: todoId
        },
        data: {
            name: name,
            content: content,
            done: done,
        }
    });

    console.log(updatedTodo);
    res.status(200).send({message: "successful"});
    
    
}

//deleteTodo
export const removeTodo = async(req, res)=>{
    if (!req.session.user) {
        return res.status(400).send({error: "not logged in"})
        
    }
    const {id} = req.body
    const deleteTodo = await prisma.todos.delete({
        where:{
            id: id
        }
    });
    res.status(200).send({message: "todo is removed"});

    
}