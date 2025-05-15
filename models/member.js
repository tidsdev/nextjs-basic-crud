import mongoose,{Schema} from "mongoose";

const memberSchema = new Schema(
  {
    username : String,
    password : String,
    email : String,
  },
  {
    timestamps: true,
  }
)

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;