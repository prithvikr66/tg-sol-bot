"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAffiliator = void 0;
function handleAffiliator(chatId, data, username, bot) {
    try {
        const affiliateMessage = `🤝 Become a Affiliate

Welcome to the DecentraCard Affiliate Program!
        
📝 How it Works
        
1. Create a unique affiliate link
2. Share it with your friends
3. Earn 80% of profit that the bot makes from their purchases
4. Withdraw your earnings anytime
5. Rinse and repeat!
        
📌 Important Points to Note
        
· You will get wallet address to withdraw your earnings.
· You will receive 80% of their purchases.
· You can withdraw your earnings anytime.
        
🚀 Ready to Get Started?
        
֍ Website: https://decentracard.com/
֍ Twitter: https://twitter.com/DecentraCardETH
֍ Telegram: https://t.me/DecentraCard`;
        const keyboard = {
            inline_keyboard: [
                [{ text: `🔥 Let's Go!`, callback_data: `placeholder` }],
                [{ text: "🔙 Back", callback_data: "placeholder" }],
            ],
        };
        bot.sendMessage(chatId, affiliateMessage, { reply_markup: keyboard });
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.handleAffiliator = handleAffiliator;
