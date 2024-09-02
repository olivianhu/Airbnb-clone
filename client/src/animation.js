export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1, 
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2,
    }
  }
}

export const item = {
  hidden: {y: '30%', opacity: 0.5},
  show: {opacity: 1, y: '0%', transition: {duration: 0.5}}
}