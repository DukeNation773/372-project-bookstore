const db = require("./db");

function registerUser(user) {
  const info = db
    .prepare(
      `
    INSERT INTO users (name, email, password, user_type, created_at, updated_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `
    )
    .run(
      user.name,
      user.email,
      user.password,
      user.user_type || "shopper"
    );

  return {
    message: "User registered",
    user: {
      id: info.lastInsertRowid,
      ...user,
    },
  };
}

module.exports = {
  registerUser,
};
