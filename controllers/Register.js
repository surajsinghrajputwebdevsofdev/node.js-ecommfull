import RegisterModel from "../models/Register.js";

export const saveuser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const images = req.files.map((file) => file.path);

    const newProduct = new RegisterModel({
      firstname,
      lastname,
      email,
      password,
      image: images,
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
