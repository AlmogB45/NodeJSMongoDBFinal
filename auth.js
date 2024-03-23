const jwt = require('jsonwebtoken');
const User = require("./models/User");

// Authhentication (Webtoken) code

const auth = async (req, res, next) => {
  try {
    const webToken = req.header("Authorization").replace("Holder ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      id: decoded.id,
      "tokens.token": token,
    })

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Failed to Authenticate"})
  }
};

module.exports = auth;