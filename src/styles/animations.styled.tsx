import { keyframes } from '@emotion/react'

export const slideInLeft = keyframes` 
  0% {
    transform: translateX(-100vw);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

export const slideInRight = keyframes` 
  0% {
    transform: translateX(100vw);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

export const menuEnter = keyframes` 
  0% {
    opacity: 0.45;
  }
  100% {
    opacity: 1;
  }
`

export const makeThicker = keyframes` 
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`

export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
}
  100% {
    transform: rotate(360deg);
  }
`

export const blink = keyframes`
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
  `

export const notificationAppear = keyframes`
  0% {
    transform-origin: center top;
    transform: scaleY(0.2);
    opacity: 0;
    height: 0;
    margin-top: -20%;
    overflow: hidden;
  }
  35% {
    margin-top: -20%;
  }
  100% {
    margin-top: 0;
    height: 100%;
    opacity: 1;
  }
  `
