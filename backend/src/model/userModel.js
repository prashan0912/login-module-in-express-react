import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // automatically creates createdAt and updatedAt
  },
);

userSchema.pre("save", async function () {
  console.log("executing pre save hook");
  console.log(this);
  console.log(this.password);
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  console.log(this);
});

userSchema.methods.comparePassword = async function (password) {
  console.log(this.password)
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
