module.exports = {
  async up(db, client) {
    await db.collection('profiles').updateMany({}, {$set: {business_address: ""}});
    await db.collection('profiles').updateMany({}, {$set: {business_ph_1: ""}});
    await db.collection('profiles').updateMany({}, {$set: {business_ph_2: ""}});
  },

  async down(db, client) {
    await db.collection('profiles').updateMany({}, {$unset: {business_address: ""}});
    await db.collection('profiles').updateMany({}, {$unset: {business_ph_1: ""}});
    await db.collection('profiles').updateMany({}, {$unset: {business_ph_2: ""}});
  }
};
