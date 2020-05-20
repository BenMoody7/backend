import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pass: { type: String, required: true },
  classes: [
    {
      name: String,
      time: String,
    },
  ],
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  pass: string;
  classes: [
    {
      name: string;
      time: string;
    },
  ];
}
