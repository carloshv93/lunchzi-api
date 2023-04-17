import Users from "../models/Users";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send({ message: "No token provided" });
  }
  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Invalid token" });
    }
    const { _id } = decoded;
    Users.findById(_id)
      .exec()
      .then((user) => {
        if (!user) {
          res.status(403).send({ message: "Invalid token" });
        }
        req.user = user;
        next();
      });
  });
};

const hasRoles = (roles) => (req, res, next) => {
  if (req.user.role in roles) {
    res
      .status(403)
      .send({ message: "Your role is not authorized to perform this action" });
  }
  next();
};

module.exports = {
  isAuthenticated,
  hasRoles,
};
