import padraig from '../assets/img/tutor-video.png'
import sibeal from '../assets/img/tutor-sibeal.png'

/** Photo of each tutor, the background colour behind it, and how it is cropped in the video box (from Figma). */
export const tutorLook = {
  Pádraig: { photo: padraig, bg: '#ecf5e7', crop: { w: 82.75, h: 141.92, left: 8.67, top: 0.16 }, avatarPos: '50% 28%' },
  Sibéal: { photo: sibeal, bg: '#e6f1e2', crop: { w: 72.03, h: 123.54, left: 15.91, top: -0.04 }, avatarPos: '50% 28%' },
} as const

export type TutorName = keyof typeof tutorLook
