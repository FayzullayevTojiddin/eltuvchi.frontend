export default function UnauthorizedPage() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">403</h1>
                <p className="text-muted-foreground">
                    You are not authorized to view this page
                </p>
            </div>
        </div>
    )
}