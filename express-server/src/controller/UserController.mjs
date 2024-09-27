import prisma from "../config/PrismaClient.mjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res
        .status(400)
        .send({ error: "please fill in the blanks the correct answer" });
    }
    const userExist = prisma.user.findUnique({
      where: {
        email: email,
      },
    });

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

    res.session.isLoggedIn = true;
    res.session.user = newUser.id;
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send({ error: "email or password is required" });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).send({ error: "Invalid Email" });
  }

  if (password != user.password) {
    return res.status(400).send({ error: "Invalid Email" });
  }
  res.session.isLoggedIn = true;
  res.session.user = user.id;
};

export const userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
};
