module.exports = {
  async up(db, client) {
    await db.collection('common-sub-categories').updateMany({}, {$set: {cmn_sub_ctg_list_assoc: []}});
    await db.collection('sub-categories').updateMany({}, {$set: {sub_ctg_list_assoc: []}});
  },

  async down(db, client) {
    await db.collection('common-sub-categories').updateMany({}, {$unset: {cmn_sub_ctg_list_assoc: []}});
    await db.collection('sub-categories').updateMany({}, {$unset: {sub_ctg_list_assoc: []}});
  }
};
