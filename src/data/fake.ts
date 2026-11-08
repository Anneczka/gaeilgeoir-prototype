// Fake numbers and names for the prototype. Change them here. Never use real people.

export const fake = {
  user: { name: 'Aoife', fullName: 'Aoife Murphy', nickname: 'Aoife M.', email: 'aoife@…', misheard: 'Aoifa', initials: 'AM' },
  streakDays: 3,
  tutor: { name: 'Pádraig', dialect: 'Munster', initial: 'P' },
  course: { lessonsDone: 3, lessonsTotal: 15 },
  leaderboard: {
    rank: 12,
    xpToNextRank: 60,
    xp: 240,
    // Fictional nicknames only (never real people)
    podium: [
      { place: 1, name: 'Ciarán_G', initials: 'CG', xp: 1240 },
      { place: 2, name: 'FionnSpeaks', initials: 'FS', xp: 806 },
      { place: 3, name: 'Niamh.R', initials: 'NR', xp: 657 },
    ],
    top: [
      { rank: 4, name: 'LiamSpeaksIrish', initials: 'L', xp: 473 },
      { rank: 5, name: 'Saoirse_K', initials: 'S', xp: 450 },
      { rank: 6, name: 'Tomás.B', initials: 'T', xp: 402 },
      { rank: 7, name: 'GaeilgeGrace', initials: 'G', xp: 388 },
      { rank: 8, name: 'Oisín99', initials: 'O', xp: 361 },
    ],
    nearAbove: [
      { rank: 10, name: 'Aoife_Learns', initials: 'A', xp: 318 },
      { rank: 11, name: 'DublinDan', initials: 'D', xp: 300 },
    ],
    nearBelow: [
      { rank: 13, name: 'Ruairí', initials: 'R', xp: 231 },
      { rank: 14, name: 'Cáit_M', initials: 'C', xp: 219 },
    ],
  },
  // Words already in "My words" at the start (12 in total). Irish needs checking by David.
  myWords: [
    { w: 'Dia duit', en: 'Hello', status: 'review' },
    { w: 'Go raibh maith agat', en: 'Thank you', status: 'learned' },
    { w: 'uisce', en: 'water', status: 'review' },
    { w: 'Cad is ainm duit?', en: 'What’s your name?', status: 'learned' },
    { w: 'Slán', en: 'Goodbye', status: 'review' },
    { w: 'bainne', en: 'milk', status: 'learned' },
    { w: 'arán', en: 'bread', status: 'review' },
    { w: 'tae', en: 'tea', status: 'learned' },
    { w: 'le do thoil', en: 'please', status: 'learned' },
    { w: 'Dia dhuit ar maidin', en: 'Good morning', status: 'review' },
    { w: 'Oíche mhaith', en: 'Good night', status: 'learned' },
    { w: 'Sláinte', en: 'Cheers', status: 'review' },
  ] as { w: string; en: string; status: 'review' | 'learned' }[],
}
