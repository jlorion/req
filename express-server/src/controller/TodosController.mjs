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
    const {content, done} = req.body;
    console.log(req.body)

    if (!user) {
        return res.status(400).send({error: "not logged in"})
    }

    const todo = await prisma.todos.create({
        data: {
            content: content,
            done: done,
            authorId: user
        }
    });
    console.log("todo created");
    
    return res.status(200).send({message: "todo created", todoId: todo.id})
}

//updateTodo
export const updateTodo = async (req, res)=>{
    console.log(req.session.user)
    if (!req.session.user) {
        return res.status(400).send({error: "not logged in"})
        
    }
    //update is just fancy post ../..  
    const todoId = req.body.id;
    const getExistingTodo = await prisma.todos.findUnique({
        where: {
            id: todoId
        }
    }).catch(err => console.log(err));

    const content = req.body.content? req.body.content: getExistingTodo.content;
    const done = typeof req.body.done === undefined? getExistingTodo.done: req.body.done;

    const updatedTodo = await prisma.todos.update({
        where:{
            id: todoId
        },
        data: {
            content: content,
            done: done,
        }
    });

    console.log(updatedTodo);
    res.status(200).send({message: "successful"});
    
    
}

//deleteTodo
export const removeTodo = async(req, res)=>{
    console.log(req.params)
    if (!req.session.user) {
        console.log(req.session.user)
        return res.status(400).send({error: "not logged in"})
    }
    try {
        const {id} = req.params
        const deleteTodo = await prisma.todos.delete({
            where:{
                id: parseInt(id)
            }
        });
        console.log(`${id} todo is removed`)
        res.status(200).send({message: "todo is removed"});
        
    } catch (error) {
        console.log(error)
        
    }

    
}