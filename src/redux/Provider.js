'use client'
/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { store } from './store'
export const Providers = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}
