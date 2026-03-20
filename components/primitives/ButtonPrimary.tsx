"use client";

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Button, styled } from 'tamagui';
import { LucideIcon } from 'lucide-react';

export type ButtonPreset = 'soft' | 'medium' | 'hard';

export interface ButtonPrimaryProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  preset?: ButtonPreset;
  children: ReactNode;
  onPress?: () => void;
  iconRight?: LucideIcon;
}

const StyledButton = styled(Button, {
  name: 'ButtonPrimary',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  paddingHorizontal: '$4',
  paddingVertical: '$3',
  borderRadius: 12,
  cursor: 'pointer',
  // font styling intentionally inherited from Tamagui theme
  outlineWidth: 0,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
});

const tokens = {
  bgSurface2: '#2C2550',
  accentCyan: '#52FFF6',
  accentPink: '#FF4FD8',
  accentYellow: '#FFE86F',
  textPrimary: '#FFF9FF',
  glowSoft: 'rgba(82, 255, 246, 0.4)',
  glowMedium: 'rgba(82, 255, 246, 0.66)',
  glowHard: 'rgba(255, 79, 216, 0.8)',
};

const getPresetStyles = (preset: ButtonPreset) => {
  switch (preset) {
    case 'soft':
      return {
        backgroundColor: tokens.bgSurface2,
        boxShadow: `0px 0px 8px ${tokens.glowSoft}`,
        borderColor: '#4A3E88',
        color: tokens.textPrimary,
        shadowColor: tokens.glowSoft,
      };
    case 'medium':
      return {
        backgroundColor: tokens.accentCyan,
        boxShadow: `0px 0px 14px ${tokens.glowMedium}`,
        borderColor: 'transparent',
        color: '#111226',
        shadowColor: tokens.glowMedium,
      };
    case 'hard':
      return {
        backgroundColor: tokens.accentPink,
        boxShadow: `0px 0px 24px ${tokens.glowHard}`,
        borderColor: 'transparent',
        color: '#130D26',
        shadowColor: tokens.glowHard,
      };
  }
};

const MotionButton = motion.button;

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  preset = 'soft',
  children,
  onPress,
  iconRight: IconRight,
  onClick,
  ...rest
}) => {
  const baseStyles = getPresetStyles(preset);

  const variants = {
    initial: {
      scale: 1,
      backgroundColor: baseStyles.backgroundColor,
      boxShadow: baseStyles.boxShadow,
      borderColor: baseStyles.borderColor,
      color: baseStyles.color,
    },
    hover: {
      scale: 1,
      borderColor: tokens.accentCyan,
      boxShadow: `0px 0px 16px ${baseStyles.shadowColor}`,
      transition: { type: 'spring' as const, stiffness: 420, damping: 20 },
    },
    focus: {
      scale: 1,
      borderColor: 'transparent',
      boxShadow: `0px 0px 0px 2px ${tokens.accentYellow}, 0px 0px 20px ${baseStyles.shadowColor}`,
      transition: { type: 'tween' as const, duration: 0.18, ease: 'easeOut' as const },
    },
    tap: {
      scale: 1,
      backgroundColor: tokens.accentPink,
      borderColor: 'transparent',
      boxShadow: `0px 0px 22px ${baseStyles.shadowColor}`,
      transition: { type: 'tween' as const, duration: 0.12, ease: 'easeOut' as const },
    },
  };

  return (
    <StyledButton asChild>
      <MotionButton
        initial="initial"
        whileHover="hover"
        whileFocus="focus"
        whileTap="tap"
        variants={variants}
        onClick={(e: any) => {
          if (onPress) onPress();
          if (onClick) onClick(e);
        }}
        {...rest}
      >
        {children}
        {IconRight && <IconRight size={16} strokeWidth={2.5} />}
      </MotionButton>
    </StyledButton>
  );
};
