let functions = require("firebase-functions");
let admin = require("firebase-admin");

admin.initializeApp();

exports.handleBooking = functions.firestore
  .document("bookings/{id}")
  .onUpdate((change, ctx) => {
    let before = change.before.data();
    let after = change.after.data();

    if (before.status !== 'finished' && after.status === 'finished') {
      let name = after.name;
      let amount = after.totalBookingAmount;
      let gst = amount * 0.18;
      let half = gst / 2;

      console.log("Name:", name);
      console.log("Amount:", amount);
      console.log("CGST:", half);
      console.log("SGST:", half);
    }

    return null;
  });
