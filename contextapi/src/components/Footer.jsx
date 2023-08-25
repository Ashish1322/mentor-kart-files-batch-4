import React, {useContext} from 'react'
import FooterContext from '../FooterContext'
import CountContext from '../CountContext'
export default function Footer() {

    const {footerValues} = useContext(FooterContext)

    const {count} = useContext(CountContext)
  return (
    <div >
            All the CopyRights Reserved {footerValues} {count}
    </div>
  )
}
