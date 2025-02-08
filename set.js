const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFxczQzL1k0OElYei90YmFCekhtZ3oza3pVWFYzVGRLU09xSWxVRlcxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1dNeGxqUEp2dzV1R2tndThuNGxmVm0wMkdaamd4T3lGdmpJeVM3Q1RXTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRFdzbmY2VXJpT3U0Y25URjdwOXZlZXJOalNSbDRqRGg1dnlXRFpkT1dZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHc2grUCt4R0R1ZEtPRFdmRGRFSHlqanBlQUtFWVVreXFoaXdQMzlXVVdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1DeFRnM25QT2NSc2FzRVYrSDRCRzlaNjJpeE9NWTFjSEZXUFZwaHE2VkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxUSTEybklLTU9UWTgrNVpRRi8xbDVlVVhXTXM5NEVLY3FmQWtIZkdmRVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1EWmpVcjVWRDRNY2JuRStxeklOdjE2Mi9MT3JLUG9OYnpraCtIcFNsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGFzNVBDQlJwTnYxaE9WWHlXMVU3VXFVSlZDMzlneDByOWI1Q0I3YVpqYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklBeGxEN3ZSbDVtQU9xWWFsVjQrQlROU3oxVXRMMEVzREZRZXlPTFc4QWl3Ykh1dzJIVDNmMUUzaDhxWVhvbzA0d2cxN0Z6aXRVVSs5WTFkdFBNM2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA3LCJhZHZTZWNyZXRLZXkiOiJUQnhxWlI0ZXVrM1VzUi9hM1BsWHN3WXBUV2tvVVJWOUZRTEF5cXpaZTYwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiWnI4bVRlY1JldTJPbG9veVk4eHFBIiwicGhvbmVJZCI6IjJjZjYzZjBhLTYzMjQtNGIzNC1iMzdlLWY4NzhlNGIwZTUyOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTQzUTJvZ00yeVE1VFdiQ0xjUGVVWllncmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM3Ftek8xdy9CTDNiNXJiVEhHTHNRMU55ODQ4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdGRVE4VkMzIiwibWUiOnsiaWQiOiIyNjM3MTk0OTUwNjc6NzBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5am05NEZFTWZHbkwwR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IittUFdXbDdHSmhQRHBKUEdnQzJTMUV3a0dRSDAzalMxZmFHcnBmNW5DMVk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjdnVU1zM3ZIY2ttTzJGUmduV3Qra1NKVytid0FmMGdyK2lxUmlBTW5BTWRWZGdDZUNZbEpFQlRJVXgzaFlMdklwRUliaktBQ3EwVUlRZHloenNDR0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsWXNPTDJvSExNR3FTR0pQZ1VrYWMveXVEQXRWeTlJSmRKNS81dUptSkhZejEwVnVReXF5WXA3R29PMG5JMXl4MnBBNDNTbWlQVTNpL29QZzJNUitqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxOTQ5NTA2Nzo3MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmcGoxbHBleGlZVHc2U1R4b0F0a3RSTUpCa0I5TjQwdFgyaHE2WCtad3RXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM5MDA2ODA0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpwNiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263719495067",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
