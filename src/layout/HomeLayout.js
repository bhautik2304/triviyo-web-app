import { HomeFooter, HomeHeader } from '@/components'
import React from 'react'

function HomeLayout({ heder, footer, children,link }) {
    return (
        <>
            {heder && <HomeHeader link={link} />}
            {children}
            {footer && <HomeFooter />}
        </>
    )
}

export default HomeLayout