'use client'

import '@tamagui/core/reset.css'

import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { useServerInsertedHTML } from 'next/navigation'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'

export const NextTamaguiProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useRootTheme({ fallback: 'dark' })

  useServerInsertedHTML(() => {
    // @ts-expect-error StyleSheet.getSheet() is not in RN types but exists in react-native-web
    const rnwStyle = StyleSheet.getSheet()
    return (
      <>
        <style
          dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          id={rnwStyle.id}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: tamaguiConfig.getNewCSS(),
          }}
        />
      </>
    )
  })

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as 'light' | 'dark')
      }}
    >
      <TamaguiProvider config={tamaguiConfig} disableRootThemeClass defaultTheme={theme || 'dark'}>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  )
}
