// Note: I think this can be refactored with TypeScript
// Note: Higher order function to be able to pass `allowedRoles`
// Since the return of the callback or verifyRoles will be passed as middleware
// then we can use the return as the anonymous function for the middleware with
// (req, res, next) as its parameters
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    // Note: All we need is to have 1 `true` value
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
