export default function BlockedPage() {
    const contactAdmin = () => {
        const botUrl = 'https://t.me/urgumchakbot'

        if (window.Telegram?.WebApp) {
            (window.Telegram.WebApp as any).openTelegramLink(botUrl)
            window.Telegram.WebApp.close()
            return
        }

        window.location.href = botUrl
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Hisob bloklangan
                </h1>

                <p className="text-gray-600 mb-6">
                    Sizning hisobingiz administrator tomonidan vaqtincha bloklangan.
                    Batafsil ma’lumot olish uchun administratorga murojaat qiling.
                </p>

                <div className="bg-red-50 rounded-xl py-4 mb-6">
                    <p className="text-sm text-gray-600">Holat</p>
                    <p className="text-2xl font-bold text-red-600">
                        BLOCKED
                    </p>
                </div>

                <button
                    onClick={contactAdmin}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                    Administratorga yozish
                </button>

                <p className="text-xs text-gray-400 mt-4">
                    Agar xato deb hisoblasangiz, murojaatingiz ko‘rib chiqiladi
                </p>
            </div>
        </div>
    )
}