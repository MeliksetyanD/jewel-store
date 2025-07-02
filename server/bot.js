import TelegramApi from 'node-telegram-bot-api'
import dotenv from 'dotenv';

dotenv.config()

// process.removeAllListeners('warning');


const token = process.env.TELEGRAM_TOKEN
const ADMIN_ID = process.env.ADMIN_TG_ID
const bot = new TelegramApi(token, { polling: true })


const userStates = new Map()



const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Start the bot!' },
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const chatID = msg.chat.id


        const currentState = userStates.get(chatID)

        if (chatID.toString() !== ADMIN_ID) {
            return bot.sendMessage(chatID, "⚠️ Access denied.");
        }

        if (text === '/start') {
            const keyboard = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "➕ Add Product", callback_data: 'addProduct' }],
                        [{ text: "📝 Add Blog", callback_data: 'addBlog' }],
                        [{ text: "📦 Get All Products", callback_data: 'getAllProducts' }],
                        [{ text: "✏️ Update Product", callback_data: 'updateProduct' }],
                        [{ text: "🗑️ Delete Product", callback_data: 'deleteProduct' }]
                        
                    ]
                })
            }
            return bot.sendMessage(chatID, "Welcome! Please choose an action:", keyboard);
        }

        
        return bot.sendMessage(chatID, `I didn’t understand that. Please try again!`)
    })



    bot.on('callback_query', async (callbackQuery) => {
        bot.answerCallbackQuery(callbackQuery.id);
        const chatID = callbackQuery.message.chat.id;
        const data = callbackQuery.data;

        if (chatID.toString() !== ADMIN_ID) {
            return bot.sendMessage(chatID, "⚠️ Access denied.");
        }

        if (data === 'start' ) {
            
            
        }

        
    })
}


start()