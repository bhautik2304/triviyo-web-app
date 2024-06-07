import { appRoutes } from '@/constant'
import Link from 'next/link'
import React from 'react'

function Logo({ classHeight, imgClass, ...props }) {
    return (
        <>
            <Link href={appRoutes.home}>
                <img
                    className="light-mode-item navbar-brand-item"
                    src="/img/logo-light.svg"
                    alt="logo"
                    // width={50}
                    height={50}
                />
                <img
                    className="dark-mode-item navbar-brand-item"
                    src="/img/logo-dark.svg"
                    alt="logo"
                    height={50}
                />
            </Link>
        </>
    )
}

export default Logo