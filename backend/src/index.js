const express = require("express");
const { PrismaClient } = require("@prisma/client");
const db = require('./db')

const app = express();
const prisma = new PrismaClient();

module.exports = {
  query: (text, params) => conn.query(text, params),
};

app.get("/test", async (req, res) => {
  const machines = await prisma.machines.findMany();
  res.json(machines);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/data/all", async (req,res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT get_topic_details()::json;
    `;

    // ดึงค่าจริงออกมา
    const data = result[0]?.get_topic_details;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch topic details" });
  }
});

app.get("/data/search", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT get_topic_search()::json;
    `;

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topic details"})
  }
}
)

app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM locations');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});