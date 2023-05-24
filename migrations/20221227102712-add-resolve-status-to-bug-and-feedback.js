module.exports = {
  async up(db, client) {
    await db.collection('reportinfos').updateMany({}, {$set: {resolved: 0}});
  },

  async down(db, client) {
    await db.collection('reportinfos').updateMany({},{ $unset: { resolved: "" } });
  }
};
