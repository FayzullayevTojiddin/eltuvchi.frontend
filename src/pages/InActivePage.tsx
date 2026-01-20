export default function InactivePage() {

    const price = 17200

    const goToBot = () => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.close()
        } else {
            window.location.href = "https://t.me/mEltuvchiBot"
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Hisob faollashtirilmagan
                </h1>

                <p className="text-gray-600 mb-6">
                    Xizmatdan foydalanish uchun obuna faollashtirilishi kerak.
                </p>

                <div className="bg-blue-50 rounded-xl py-4 mb-6">
                    <p className="text-sm text-gray-600">Faollashtirish narxi</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {price.toLocaleString()} so‘m
                    </p>
                </div>

                <button
                    onClick={goToBot}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Bot orqali faollashtirish
                </button>

                <p className="text-xs text-gray-400 mt-4">
                    Faollashtirgandan so‘ng ilovaga qayta kiring
                </p>
            </div>
        </div>
    )
}