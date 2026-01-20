import { ReactNode } from 'react'
import UnauthorizedPage from '@/pages/UnauthorizedPage'

type Props = {
    allowed: string[]
    children: ReactNode
}

export default function RequireRole({ allowed, children }: Props) {
    const role = localStorage.getItem('userRole') || 'client'

    if (!allowed.includes(role)) {
        return <UnauthorizedPage />
    }

    return <>{children}</>
}