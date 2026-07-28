const UPPERCASE = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijkmnopqrstuvwxyz';
const NUMBERS = '23456789';
const SYMBOLS = '@#$%&*!?';

const ALL = UPPERCASE + LOWERCASE + NUMBERS + SYMBOLS;

function randomChar(characters) {
  return characters[Math.floor(Math.random() * characters.length)];
}

function generateTemporaryPassword(length = 12) {
  const password = [
    randomChar(UPPERCASE),
    randomChar(LOWERCASE),
    randomChar(NUMBERS),
    randomChar(SYMBOLS),
  ];

  while (password.length < length) {
    password.push(randomChar(ALL));
  }

  return password.sort(() => Math.random() - 0.5).join('');
}

module.exports = {
  generateTemporaryPassword,
};
