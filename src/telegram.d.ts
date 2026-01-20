interface TelegramWebApp {
    close(): void
}

interface Telegram {
    WebApp: TelegramWebApp
}

interface Window {
    Telegram?: Telegram
}