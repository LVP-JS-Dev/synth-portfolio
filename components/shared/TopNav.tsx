"use client";

import Link from 'next/link'
import { XStack, Text, styled } from 'tamagui'
import { Menu } from 'lucide-react'

const NavLinkText = styled(Text, {
  color: '$textSecondary',
  fontFamily: '$heading',
  fontSize: 12,
  cursor: 'pointer',
  hoverStyle: {
    color: '$accentCyan',
  },
})

const PillButton = styled(XStack, {
  backgroundColor: '$bgSurface2',
  borderRadius: 999,
  borderWidth: 1,
  borderColor: '#4A3E88',
  paddingHorizontal: 16,
  paddingVertical: 14,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  gap: 8,
  hoverStyle: {
    opacity: 0.8,
  },
})

const PillText = styled(Text, {
  color: '$textPrimary',
  fontWeight: 'bold',
  fontSize: 12,
  fontFamily: '$heading',
})

export function TopNav() {
  return (
    <nav aria-label="Main navigation">
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={8}
        paddingHorizontal={24}
        $sm={{ paddingHorizontal: 16 }}
        width="100%"
      >
        {/* Left side: Desktop */}
        <Text
          color="$accentCyan"
          textShadowColor="$glowSoft"
          textShadowRadius={12}
          fontFamily="$heading"
          fontSize={13}
          fontWeight="700"
          $sm={{ display: 'none' }}
        >
          LEONID PETROV / SENIOR FRONTEND ENGINEER
        </Text>
        
        {/* Left side: Mobile */}
        <Text
          color="$accentCyan"
          textShadowColor="$glowSoft"
          textShadowRadius={12}
          fontFamily="$heading"
          fontSize={13}
          fontWeight="700"
          display="none"
          $sm={{ display: 'flex' }}
        >
          LEONID / FE
        </Text>

        {/* Right side */}
        <XStack gap={16} alignItems="center">
          {/* Desktop Links */}
          <XStack gap={16} alignItems="center" $sm={{ display: 'none' }}>
            <Link href="/#about">
              <NavLinkText>About</NavLinkText>
            </Link>
            <Link href="/#experience">
              <NavLinkText>Experience</NavLinkText>
            </Link>
            <Link href="/projects">
              <NavLinkText>Projects</NavLinkText>
            </Link>
            <Link href="/#quality">
              <NavLinkText>Quality</NavLinkText>
            </Link>
            <Link href="/#contact">
              <NavLinkText>Contact</NavLinkText>
            </Link>
          </XStack>

          {/* Mobile Menu Button */}
          <PillButton display="none" $sm={{ display: 'flex' }} aria-label="Open navigation menu">
            <Menu size={16} color="#FFF9FF" />
            <PillText>MENU</PillText>
          </PillButton>

          {/* Language Switcher */}
          <PillButton aria-label="Switch language">
            <PillText>EN / RU</PillText>
          </PillButton>
        </XStack>
      </XStack>
    </nav>
  )
}
