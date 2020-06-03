import React from 'react'
import { Helmet } from 'react-helmet'

export default function Layout({ children }) {
  return (
    <>
      <Helmet defaultTitle="Rebuild Black Businesses" titleTemplate="%s - Rebuild Black Businesses" />
      {children}
    </>
  )
}
