const express = require("express");
const router = express.Router();

const dataModel = require("../models/data");

router.get("/:dbSrc", async (req, res) => {
  const dbSrc = req.params.dbSrc;
  const data = await slow_function(dbSrc);
  res.json(data);
});

router.post("/", async (req, res) => {
  const value = req.body.value;
  const key = req.body.key;
  const data = await cache_store(key, value);
  res.json(data);
});

router.get("/byKey/:key", async (req, res) => {
  const key = req.params.key;
  const data = await cache_retrieve(key);
  res.json(data);
});

const memoize = (fun) => {
  let cache = {};
  return (...args) => {
    let key = args[0];
    if (cache[key]) {
      return cache[key];
    }
    return (cache[key] = fun(...args));
  };
};

// stores data (value) by key
 const cache_store = memoize(async(key, value) => {
  try {
    const verIfExist = await dataModel.findOne({ key }, (dbData) => dbData);
    if (!verIfExist) {
      const data = new dataModel({
        key,
        value,
      });
      const newData = await data.save();
      return newData;
    } else return {message: 'the key already exists'};
  } catch (error) {
    return { error };
  }
})

// retrieves data by key (if it exists)
const cache_retrieve = memoize(async (key) => {
  try {
    const data = await dataModel.findOne({ key }, (dbData) => dbData);
    if (data) return data;
    else return { message: "The data does not exists" };
  } catch (error) {
    return { error };
  }
});

// fetches data from a slow data source
const slow_function = memoize(async (input) => {
  try {
    if (input === "myDataSource") {
      const data = await dataModel.find();
      return data;
    } else return { message: "The data source does not exists" };
  } catch (error) {
    return { error };
  }
});

module.exports = router;