const Users = require("../model/User");

const handleLogout = async (req, res) => {
  // On client (Front-end), also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in DB?
  const foundUser = await Users.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    // Note: Pass the same option it is set with
    // maxAge is one of the parameters that can be left out
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  // At this point there is a refresh token in the database
  // Delete refreshToken in DB
  await Users.findOneAndUpdate(
    { refreshToken: refreshToken },
    { refreshToken: "" }
  );

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
