const eamcetCutoffs = require("./eamcet");
const ecetCutoffs = require("./ecet");
const pgecetCutoffs = require("./pgecet");
const polycetCutoffs = require("./polycet");

const cutoffSeed = [
  ...eamcetCutoffs,
  ...ecetCutoffs,
  ...pgecetCutoffs,
  ...polycetCutoffs,
];

module.exports = cutoffSeed;