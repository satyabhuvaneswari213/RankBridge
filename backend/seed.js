const mongoose = require("mongoose");
require("dotenv").config();

const College = require("./models/College");
const Cutoff = require("./models/Cutoff");

const collegeSeed = require("./data/colleges/apColleges");
const cutoffSeed = require("./data/cutoffs");

console.log("College seed count:", collegeSeed.length);
console.log("First college:", collegeSeed[0]);
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    // Remove previous demo data
    await Cutoff.deleteMany({});
    await College.deleteMany({});

    console.log("Old demo data cleared ✅");
    console.log("College seed count:", collegeSeed.length);
    console.log("First college:", collegeSeed[0]);
    // Insert colleges
    const colleges = await College.insertMany(collegeSeed);

    console.log(`${colleges.length} colleges inserted ✅`);

    // Create collegeCode -> MongoDB _id mapping
    const collegeMap = {};

    colleges.forEach((college) => {
      collegeMap[college.collegeCode] = college._id;
    });

    // Convert cutoff collegeCode into college ObjectId
    const cutoffDocuments = cutoffSeed.map((cutoff) => {
      const collegeId = collegeMap[cutoff.collegeCode];

      if (!collegeId) {
        throw new Error(
          `College not found for code: ${cutoff.collegeCode}`
        );
      }

      return {
        exam: cutoff.exam,
        college: collegeId,
        year: cutoff.year,
        round: cutoff.round,
        branch: cutoff.branch,
        category: cutoff.category,
        openingRank: cutoff.openingRank,
        closingRank: cutoff.closingRank,

        source: "Demo dataset",
        sourceName: "RankBridge Demo Data",
        verified: false,
        notes: "",
      };
    });

    await Cutoff.insertMany(cutoffDocuments);

    console.log(
      `${cutoffDocuments.length} cutoff records inserted ✅`
    );

    await mongoose.disconnect();

    console.log("MongoDB disconnected ✅");
    console.log("Database seeding completed successfully 🎉");
  } catch (error) {
    console.error("Database seeding failed ❌");
    console.error(error.message);

    process.exit(1);
  }
};

seedDatabase();