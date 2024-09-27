import prisma from "../config/PrismaClient.mjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name && !email && !password) {
      return res
        .status(400)
        .send({ error: "please fill in the blanks the correct answer" });
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(userExist);

    if (userExist) {
      return res.status(400).send({ error: "user already exist" });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    console.log("user created");

    req.session.isLoggedIn = true;
    req.session.user = newUser.id;
    res.status(200).send({message: "succesfull"})
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email && !password) {
    return res.status(400).send({ error: "email or password is required" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);

  if (!user) {
    return res.status(400).send({ error: "Invalid Email" });
  }

  if (password != user.password) {
    return res.status(400).send({ error: "Invalid Email" });
  }
  req.session.isLoggedIn = true;
  req.session.user = user.id;
  return res.status(200).send({message: "you are now logged in"})
};

export const userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({message: "session is terminated"});
    }
  });
};
