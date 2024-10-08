export const RES_ANALYZE_MAP = [
  {
    id: 1,
    title: 'Планомерность',
    res: [
      'Вам может сложно даваться планирование Вашей деятельности и планомерное следование разработанному плану.',
      'Вы в умеренной степени склонны разрабатывать четкие планы и планомерно следовать им при достижении поставленных целей.',
      'Вы достаточно планомерны, предпочитаете последовательно реализовывать поставленные цели, имеете развитые навыки тактического планирования.',
    ],
  },
  {
    id: 2,
    title: 'Целеустремлённость',
    res: [
      'Вы не всегда четко видите свои цели или не склонны ставить перед собой конкретные цели, Вам может быть не свойственно к чему-либо целенаправленно стремиться и прилагать усилия для достижения поставленных целей.',
      'Вы достаточно хорошо видите и понимаете свои цели, способны достигать их, хотя в Вашей жизни могут быть периоды, когда не вся Ваша деятельность направлена на достижение каких-либо ясных для Вас целей.',
      'Вы целеустремленны и целенаправленны, знаете, чего хотите и к чему стремитесь, идете по направлению к своим целям.',
    ],
  },
  {
    id: 3,
    title: 'Настойчивость',
    res: [
      'Вам может быть сложно прикладывать волевые усилия для доведения начатого дела до его логического завершения, Вы склонны отвлекаться на посторонние дела.',
      'Вы достаточно организованны и структурированы, способны на волевые усилия, хотя и можете оставлять начатое дело, переключаясь на более значимые для Вас виды деятельности.',
      'Вас можно охарактеризовать как волевого и организованного человека, способного усилием воли структурировать свою поведенческую активность и завершить начатое дело.',
    ],
  },
  {
    id: 4,
    title: 'Фиксация (фиксация на структурировании деятельности)',
    res: [
      'Вы гибкий человек, легко переключаетесь на новые виды деятельности и отношения. В отдельных ситуациях Вы можете восприниматься недостаточно обязательным и последовательным.',
      'Вы достаточно гибкий человек в планировании своей деятельности и в построении отношений, тем не менее Вы стремитесь выполнять данные Вами обязательства.',
      'Вы исполнительный и обязательный человек, стремитесь всеми возможными способами завершить начатое дело. Возможно, Вы можете быть недостаточно гибкими в планировании своей деятельности и в построении отношений.',
    ],
  },
  {
    id: 5,
    title: 'Самоорганизация',
    res: [
      'Вы не склонны при организации своей деятельности прибегать к помощи внешних средств, помогающих в управлений временем, что может негативно сказываться на Вашем уровне самоорганизации.',
      'При планировании своего рабочего и личного времени Вы можете полагаться как на вспомогательные средства (ежедневники, записные книжки, планнинги), так и на свою природную организованность.',
      'Вы не склонны при организации своей деятельности прибегать к помощи внешних средств, помогающих в управлений временем, что может негативно сказываться на Вашем уровне самоорганизации.',
    ],
  },
  {
    id: 6,
    title: 'Ориентация на настоящее',
    res: [
      'Вы склонны находить более ценным Ваше психологическое прошлое или будущее, нежели происходящее с Вами «здесь-и-сейчас».',
      'Вы способны видеть и ценить свое психологическое прошлое и будущее, наряду с происходящем с Вами в настоящий момент времени.',
      'Вы склонны фиксироваться на происходящем с Вами в настоящий момент времени, для Вас переживания и происходящее «здесь-и-сейчас» имеет особую ценность и значимость.',
    ],
  },
  {
    id: 7,
    title: 'Общий',
    res: [
      'Вы предпочитаете жить спонтанно, не привязывать свою деятельность к жесткой структуре и целям. Ваше будущее для Вас самого достаточно туманно, Вам не свойственно четко планировать свою ежедневную активность и прилагать волевые усилия для завершения начатых дел, однако это позволяет Вам достаточно быстро и гибко переключаться на новые виды активности, не «застревая» на структурировании своей деятельности.',
      'Вы способны сочетать структурированный подход к организации времени своей жизни со спонтанностью и гибкостью, умеете ценить все составляющие Вашего психологического времени и извлекать для себя ценный опыт из многоплановости своей жизни.',
      'Вам свойственно видеть и ставить цели, планировать свою деятельность, в том числе с помощью внешних средств, и, проявляя волевые качества и настойчивость, идти к ее достижению. Возможно, в отдельных видах деятельности Вы можете быть чрезмерно структурированы, организованны и недостаточно гибки. Тем не менее Вы достаточно эффективно можете структурировать свою деятельность.',
    ],
  },
];

export const TEST_ONE_ANS_MAP = [
  {
    id: 1,
    title: 'Планомерность',
    questions: [
      { position: 2, positive: true },
      { position: 4, positive: true },
      { position: 8, positive: true },
      { position: 11, positive: true },
    ],
    max: 28,
    min: 4,
  },
  {
    id: 2,
    title: 'Целеустремлённость',
    questions: [
      { position: 7, positive: true },
      { position: 14, positive: true },
      { position: 18, positive: true },
      { position: 20, positive: true },
      { position: 23, positive: false },
      { position: 25, positive: true },
    ],
    max: 42,
    min: 6,
  },
  {
    id: 3,
    title: 'Настойчивость',
    questions: [
      { position: 1, positive: false },
      { position: 5, positive: false },
      { position: 10, positive: false },
      { position: 15, positive: false },
      { position: 21, positive: false },
    ],
    max: 35,
    min: 5,
  },
  {
    id: 4,
    title: 'Фиксация (фиксация на структурировании деятельности)',
    questions: [
      { position: 3, positive: true },
      { position: 6, positive: true },
      { position: 13, positive: true },
      { position: 17, positive: true },
      { position: 24, positive: true },
    ],
    max: 35,
    min: 5,
  },
  {
    id: 5,
    title: 'Самоорганизация',
    questions: [
      { position: 16, positive: true },
      { position: 19, positive: true },
      { position: 22, positive: true },
    ],
    max: 21,
    min: 3,
  },
  {
    id: 6,
    title: 'Ориентация на настоящее',
    questions: [
      { position: 9, positive: true },
      { position: 12, positive: true },
    ],
    max: 14,
    min: 2,
  },
  {
    id: 7,
    title: 'Общий',
    max: 175,
    min: 25,
    questions: [
      { position: 1, positive: false },
      { position: 2, positive: true },
      { position: 3, positive: true },
      { position: 4, positive: true },
      { position: 5, positive: false },
      { position: 6, positive: true },
      { position: 7, positive: true },
      { position: 8, positive: true },
      { position: 9, positive: true },
      { position: 10, positive: false },
      { position: 11, positive: true },
      { position: 12, positive: true },
      { position: 13, positive: true },
      { position: 14, positive: true },
      { position: 15, positive: false },
      { position: 16, positive: true },
      { position: 17, positive: true },
      { position: 18, positive: true },
      { position: 19, positive: true },
      { position: 20, positive: true },
      { position: 21, positive: false },
      { position: 22, positive: true },
      { position: 23, positive: false },
      { position: 24, positive: true },
      { position: 25, positive: true },
    ],
  },
];
