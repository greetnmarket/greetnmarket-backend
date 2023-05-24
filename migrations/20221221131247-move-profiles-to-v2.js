module.exports = {
  async up(db, client) {
    await db.collection('profiles').updateMany({}, {$set: { last_business_changedAt: new Date()}});
  },

  async down(db, client) {
    await db.collection('profiles').updateMany({},{ $unset: { last_business_changedAt: "" } });
  }
};
