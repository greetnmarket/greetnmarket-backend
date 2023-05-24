module.exports = {
  async up(db, client) {
    await db.collection('profiles').updateMany({}, {$set: {blocked: 0}});
  },

  async down(db, client) {
    await db.collection('profiles').updateMany({},{ $unset: { blocked: "" } });
  }
};
