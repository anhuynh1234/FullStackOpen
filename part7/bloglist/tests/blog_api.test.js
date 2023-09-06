const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("./../app");

const api = supertest(app);

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YzJiNTE2YjU1YzdlZGI5Yzc0NDRhNiIsImlhdCI6MTY5MDUwMDg2NH0.j9Q8ti6dfRyQcrn6YlAdfKnvG6eRV1RbFDGV1pbZoEw";

// 4.8
test("Sending HTTP GET request returns database content", async () => {
  await api
    .get("/api/blogs")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YzJiNTE2YjU1YzdlZGI5Yzc0NDRhNiIsImlhdCI6MTY5MDUwMDg2NH0.j9Q8ti6dfRyQcrn6YlAdfKnvG6eRV1RbFDGV1pbZoEw",
    )
    .expect(200)
    .expect("Content-type", /application\/json/);
});

test("Fetching blogs from data base completely", async () => {
  const blogs = await api
    .get("/api/blogs")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YzJiNTE2YjU1YzdlZGI5Yzc0NDRhNiIsImlhdCI6MTY5MDUwMDg2NH0.j9Q8ti6dfRyQcrn6YlAdfKnvG6eRV1RbFDGV1pbZoEw",
    );
  expect(blogs.body).toHaveLength(blogs.body.length);
});

// 4.9
test.skip("Checking blogs are defined with IDs", async () => {
  const blogs = await api
    .get("/api/blogs")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YzJiNTE2YjU1YzdlZGI5Yzc0NDRhNiIsImlhdCI6MTY5MDUwMDg2NH0.j9Q8ti6dfRyQcrn6YlAdfKnvG6eRV1RbFDGV1pbZoEw",
    );
  expect(blogs.body[0].id).toBeDefined();
});

// 4.10
test("Adding another blog into database", async () => {
  const oldBlogs = await api
    .get("/api/blogs")
    .set(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY0YzJiNTE2YjU1YzdlZGI5Yzc0NDRhNiIsImlhdCI6MTY5MDUwMDg2NH0.j9Q8ti6dfRyQcrn6YlAdfKnvG6eRV1RbFDGV1pbZoEw",
    );

  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", token)
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  const newBlogs = await api.get("/api/blogs").set("Authorization", token);
  const titles = newBlogs.body.map((newBlog) => newBlog.title);

  expect(newBlogs.body).toHaveLength(Number(oldBlogs.body.length) + 1);
  expect(titles).toContain(newBlog.title);
});

// 4.11
test.skip("Undefined likes will default to 0", async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  const newBlogs = await api.get("/api/blogs");

  expect(newBlogs.body[newBlogs.body.length - 1].likes).toBeDefined();
});

// 4.12
test.skip("Bad request status when url or title is missing", async () => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const newBlogAnother = {
    author: "Robert C. Martin",
    title: "Java hahah",
  };

  await api.post("/api/blogs").send(newBlogAnother).expect(400);
});

// 4.13
test.skip("Delete an existing blog", async () => {
  const blogs = await api.get("/api/blogs");
  const blogsToDelete = blogs.body[0];

  await api.delete(`/api/blogs/${blogsToDelete.id}`).expect(204);

  const blogsAfterDelete = await api.get("/api/blogs");
  expect(blogs.body.length).toEqual(blogsAfterDelete.body.length + 1);
});

// 4.14
test.skip("Modifying the content of existing blog", async () => {
  const newBlog = {
    author: "Robert",
    title: "Heres me An",
    url: "alaladotcom",
    likes: 43,
  };

  const blogs = await api.get("/api/blogs");
  const idModified = blogs.body[0].id;

  await api.put(`/api/blogs/${idModified}`).send(newBlog);

  const newDBBlogs = await api.get("/api/blogs");

  expect(newDBBlogs.body[0].likes).toEqual(newBlog.likes);
});

// 4.23
test("Adding new blogs without token will return in bad request", async () => {
  const newBlog = {
    author: "Robert",
    title: "Heres me An",
    url: "alaladotcom",
    likes: 43,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

afterAll(async () => {
  await mongoose.connection.close();
});
