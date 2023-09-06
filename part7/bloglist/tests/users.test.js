const User = require("../models/user");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("New user getting added to database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      name: "root",
      passwordHash: passwordHash,
    });

    await user.save();
  });

  test.skip("New user successfully created", async () => {
    const usersBeginning = await api.get("/api/users");

    const newUser = {
      username: "Hihi",
      name: "Haha",
      password: "hello",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersEnd = await api.get("/api/users");

    expect(usersEnd.body).toHaveLength(usersBeginning.body.length + 1);
  });
});

describe("Adding new users to database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      name: "root",
      passwordHash: passwordHash,
    });

    await user.save();
  });

  test.skip("New user info with repeated username is rejected", async () => {
    const usersBeginning = await api.get("/api/users");

    const newUser = {
      username: "root",
      name: "Ma",
      password: "hiho",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersEnd = await api.get("/api/users");

    expect(usersEnd.body).toEqual(usersBeginning.body);
  });

  test("Reject new user with missing username and password or username and password too short", async () => {
    const userBeginning = await api.get("/api/users");

    const newUser1 = {
      name: "eeee",
      password: "afsqwe",
    };

    const newUser2 = {
      username: "asfs",
      name: "dad",
    };

    const newUser3 = {
      username: "asfxzs",
      name: "dad",
      password: "ee",
    };

    const newUser4 = {
      username: "ds",
      name: "dad",
      password: "dadqw",
    };

    await api.post("/api/users").send(newUser1).expect(400);

    await api.post("/api/users").send(newUser2).expect(400);

    await api.post("/api/users").send(newUser3).expect(400);

    await api.post("/api/users").send(newUser4).expect(400);
  });
});
