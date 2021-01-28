import mongoose from "mongoose";

const UserQuerieSchema = new mongoose.Schema({
  covid_api_id: String,
  covid_confirmed: Number,
  covid_deaths: Number,
  covid_location: String,
  user_location: String,
  consulted_at: Date,
});

const userQuerie = mongoose.model("UserQueries", UserQuerieSchema);

export default userQuerie;
