module.exports = {
  async up(db, client) {
    await db.collection('profiles').updateMany({}, {$set: { isPaidUser: 0, paymentExpiryDate: new Date()}});
  },

  async down(db, client) {
    await db.collection('profiles').updateMany({},{ $unset: { isPaidUser: "", paymentExpiryDate: ""} });
  }
};
