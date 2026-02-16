const { Schema, model } = require("mongoose");
module.exports = model(
  "welcomer",
  Schema({
    id: {
      type: String,
      required: true,
      unique: true,
    },
    wsize: {
      type: Number,
      default: 500,
    },
    hsize: {
      type: Number,
      default: 300,
    },
    xavatar: {
      type: Number,
      default: 200,
    },
    sxavatar: {
      type: Number,
      default: 100,
    },
    yavatar: {
      type: Number,
      default: 30,
    },
    syavatar: {
      type: Number,
      default: 100,
    },
    xname: {
      type: Number,
      default: 200,
    },
    yname: {
      type: Number,
      default: 150,
    },
    sname: {
      type: Number,
      default: 25,
    },
    ncolor: {
      type: String,
      default: "#ffffff",
    },
    message: {
      type: String,
      default: "null",
    },
    welchat: {
      type: String,
      default: "null",
    },
    welcome: {
      type: Boolean,
      default: false,
    },
    pic: {
      type: String,
      default: "null",
    },
  })
);