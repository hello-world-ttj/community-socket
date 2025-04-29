const jwt = require("jsonwebtoken");
const responseHandler = require("../helpers/responseHandler");

const authVerify = async (req, res, next) => {
  // const api_key = req.headers["api-key"];

  // if (!api_key) {
  //   return responseHandler(res, 401, `No API key provided...!`);
  // }

  // if (api_key !== process.env.API_KEY) {
  //   return responseHandler(res, 401, `Invalid API key...!`);
  // }

  const header = req.headers["authorization"];
  const jwtToken = header && header.split(" ")[1];

  if (!jwtToken) {
    return responseHandler(res, 401, `No token provided...!`);
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.roleId = decoded.roleId;
 
    // const User = req.db.model("User")
    // const user = await User.findById(req.userId);

    // if (user) {
    //   req.user = user;
    //   req.role = "user";
    //   return next();
    // }
    const Admin = req.db.model("Admins")
    const admin = await Admin.findById(req.userId);

    if (admin) {
      req.user = admin;
      req.role = "admin";
      return next();
    }

    return responseHandler(res, 401, `Invalid User token...!`);
  } catch (err) {
    return responseHandler(res, 403, `Failed to authenticate token...!`);
  }
};

module.exports = authVerify;
