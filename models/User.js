// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// // User schema
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   passwordHash: {
//     type: String,
//     required: true
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('passwordHash')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
//   next();
// });

// // Compare password
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.passwordHash);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;
