"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const data_1 = require("./data");
const utils_1 = require("./utils");
const handleCountry_1 = require("./handlers/handleCountry");
const handleShowProducts_1 = require("./handlers/handleShowProducts");
const handleShowProductInformation_1 = require("./handlers/handleShowProductInformation");
const handleBuyProduct_1 = require("./handlers/handleBuyProduct");
const handlePay_1 = require("./handlers/handlePay");
const exploreOtherCountryHandler_1 = require("./handlers/exploreOtherCountryHandler");
const TOKEN = "6857815003:AAGbcsQRmQARFAJsGURBAhplRwlsEbYRVUo";
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
var STATES;
(function (STATES) {
    STATES["MAIN_MENU"] = "main_menu";
    STATES["SELECT_COUNTRY"] = "select_country";
    STATES["EXPLORE_COUPONS"] = "explore_coupons";
    STATES["VIEW_COUPON_DETAILS"] = "view_coupon_details";
})(STATES || (STATES = {}));
const userContexts = {};
bot.onText(/\/start/, (msg) => {
    var _a, _b, _c, _d;
    try {
        const chatId = msg.chat.id;
        const userId = ((_a = msg.from) === null || _a === void 0 ? void 0 : _a.id) || 0;
        if ((0, utils_1.usernameExists)(((_b = msg.from) === null || _b === void 0 ? void 0 : _b.username) || "")) {
            const data = (0, utils_1.getCountry)(((_c = msg.from) === null || _c === void 0 ? void 0 : _c.username) || "");
            const country = data === null || data === void 0 ? void 0 : data.country;
            const keyboard = {
                inline_keyboard: [
                    [{ text: `${country} Products`, callback_data: `SHOW-PRODUCTS_${country}` }],
                    [{ text: 'Explore other country', callback_data: 'EXPLORE-OTHER-COUNTRY_' }],
                ],
            };
            bot.sendMessage(msg.chat.id, `Welcome back, ${(_d = msg.from) === null || _d === void 0 ? void 0 : _d.username}! Your Country is ${country}`, { reply_markup: keyboard });
        }
        else {
            function createInlineKeyboard(countries) {
                const keyboard = [];
                for (let i = 0; i < countries.length; i += 2) {
                    const buttonRow = [];
                    for (let j = i; j < i + 2 && j < countries.length; j++) {
                        const countryName = countries[j].text;
                        const countryFlag = countries[j].emoji;
                        buttonRow.push({
                            text: `${countryFlag} ${countryName}`,
                            callback_data: `CHOOSE-COUNTRY_${countryName.toUpperCase()}`
                        });
                    }
                    keyboard.push(buttonRow);
                }
                return {
                    inline_keyboard: keyboard
                };
            }
            const inlineKeyboard = createInlineKeyboard(data_1.countries);
            bot.sendMessage(msg.chat.id, 'Select a country to see the available products.', { reply_markup: inlineKeyboard });
        }
    }
    catch (err) {
        console.log(err);
    }
});
function fadeOutMessage(chatId, messageId) {
    bot.deleteMessage(chatId, messageId);
}
bot.on('callback_query', (query) => {
    var _a, _b;
    const messageId = (_a = query.message) === null || _a === void 0 ? void 0 : _a.message_id;
    const chatId = (_b = query.message) === null || _b === void 0 ? void 0 : _b.chat.id;
    const username = query.from.username;
    const firstName = query.from.first_name;
    const data = query.data;
    const task = data === null || data === void 0 ? void 0 : data.split("_")[0];
    console.log(task);
    switch (task) {
        case "CHOOSE-COUNTRY":
            fadeOutMessage(chatId, messageId);
            (0, handleCountry_1.handleCountry)(chatId, data, firstName, bot);
            break;
        case "SHOW-PRODUCTS":
            fadeOutMessage(chatId, messageId);
            (0, handleShowProducts_1.handleShowProducts)(chatId, data, username, bot);
            break;
        case "SHOW-PRODUCT-INFORMATION":
            fadeOutMessage(chatId, messageId);
            (0, handleShowProductInformation_1.handleShowProductInformation)(chatId, data, username, bot);
            break;
        case "BUY-PRODUCT":
            fadeOutMessage(chatId, messageId);
            (0, handleBuyProduct_1.handleBuyProduct)(chatId, data, username, bot);
            break;
        case "PAY-WITH":
            fadeOutMessage(chatId, messageId);
            (0, handlePay_1.handlePay)(chatId, data, username, bot);
            break;
        case "EXPLORE-OTHER-COUNTRY":
            fadeOutMessage(chatId, messageId);
            (0, exploreOtherCountryHandler_1.exploreOtherCountry)(chatId, data, username, bot);
            break;
        case "BECOME_AFFILIATOR":
            console.log("affiliator");
            break;
        default:
            break;
    }
    //
    //     users.push({
    //         "username":query.from?.username!,
    //         "country":country!
    //     })
    //    const productsKeyboard ={
    //     inline_keyboard :[
    //         [{text:""}]
    //     ]
    //    }
});
