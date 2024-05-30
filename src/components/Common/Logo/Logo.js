import { appRoutes } from '@/constant'
import Link from 'next/link'
import React from 'react'

function Logo({ classHeight, imgClass, ...props }) {
    return (
        <>
            <Link href={appRoutes.home}>
                <img class={`h-${classHeight || '50'}px ${imgClass}`} src="assets/images/logo-icon.svg" alt="logo" />
            </Link>
        </>
    )
}

export default Logo