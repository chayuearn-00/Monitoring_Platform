const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.get("/test", async (req, res) => {
  const machines = await prisma.machines.findMany();
  res.json(machines);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});