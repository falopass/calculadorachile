'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar ScrollTrigger inmediatamente después de imports
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }