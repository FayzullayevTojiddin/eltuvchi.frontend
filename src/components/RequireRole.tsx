import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

type Props = {
    allowed: string[]
    children: ReactNode
}

export default function RequireRole({ allowed, children }: Props) {
    const role = localStorage.getItem('userRole')

    if (!role || !allowed.includes(role)) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}