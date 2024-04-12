const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { db } = require("./src/firebaseinit");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/user/register", async (req, res) => {
  try {
    const {
      name,
      email,
      Phone,
      password,
      Role,
      business_name,
      informal_name,
      address,
      city,
      state,
      zip_code,
      registration_proof,
      business_hours,
      type,
      social_id,
    } = req.body;
    const userSnapshot = await db.collection("users").where("email", "==", email).get();

    if (!userSnapshot.empty) {
      res.status(400).json({
        register: true,
        islogin: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("ye hai", hashedPassword);

    const userData = {
      name,
      email,
      Phone,
      password: hashedPassword,
      Role,
      business_name,
      informal_name,
      address,
      city,
      state,
      zip_code,
      registration_proof,
      business_hours,

      type,
      social_id,
    };
    await db.collection("users").add(userData);
    res.status(201).json({
      username: name,

      islogin: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const userSnapshot = await db.collection("users").where("email", "==", email).get();
    if (userSnapshot.empty) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const userData = userSnapshot.docs[0].data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({
      message: "Login successful",

      islogin: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
