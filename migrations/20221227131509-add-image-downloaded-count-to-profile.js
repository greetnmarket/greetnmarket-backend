module.exports = {
  async up(db, client) {
    await db.collection('profiles').updateMany({}, {$set: { imageDownCount: 0}});
  },

  async down(db, client) {
    await db.collection('profiles').updateMany({},{ $unset: { imageDownCount: "" } });
  }
};
