const UserModel = require("../model/users.model");
const argon = require("argon2");

const registerUserDB = async (body) => {
  try {
    const hashedPassword = await argon.hash(body.password);

    const newUser = await UserModel({ ...body, password: hashedPassword });

    await newUser.save();

    return {
      msg: "Usuario creado correctamente",
      statusCode: 201,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const loginUserDB = async (body) => {
  try {
    const userExists = await UserModel.findOne({
      userEmail: body.userEmail,
    });

    if (!userExists) {
      {
        return {
          msg: "ERROR. El usuario y/o contraseña incorrectas.",
          statusCode: 401,
        };
      }
    }

    if (!userExists.status) {
      return {
        msg: "ERROR. Su cuenta está deshabilitada",
        statusCode: 403,
      };
    }

    const verifyPassword = await argon.verify(
      userExists.password,
      body.password
    );

    if (!verifyPassword) {
      return {
        msg: "ERROR. El usuario y/o contraseña incorrectas.",
        statusCode: 401,
      };
    }

    return {
      msg: "Usuario logueado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error)
    return {
      msg: "No se pudo iniciar sesion",
      statusCode: 500,
    };
  }
};

module.exports = {
  registerUserDB,
  loginUserDB,
};
