import { HomeFooter, HomeHeader } from '@/components'
import React from 'react'

function HomeLayout({ heder, footer, children }) {
    return (
        <>
            {heder && <HomeHeader />}
            {children}
            {footer && <HomeFooter />}
        </>
    )
}

export default HomeLayout