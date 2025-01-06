import { model, Schema, Types } from "mongoose";
import {  TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';




const userSchema=new Schema<TUser, UserModel>({
    name:{
        type:String,
        required: [true, 'First Name is required'],
        trim: true,
    },
password:{
        type:String,
        required:[true,"password is required"]
    },
     email:{
        type:String,
        unique:true,
        required:[true,"email is required"],
        trim:true
     }
   
},

{
    timestamps: true,
  },

)


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );

    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  
  userSchema.statics.isUserExistsByCustomId = async function (_id: string) {
    
    return await Users.findOne({_id}).select('+password');
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
   
   userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };
  





export const Users = model<TUser,UserModel>('Users', userSchema);

Users.syncIndexes();
