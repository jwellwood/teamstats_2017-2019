export const date = {
  element: 'input',
  value: '',
  label: true,
  labelText: 'Date*',
  config: {
    name: 'date_input',
    type: 'date',
    placeholder: '',
  },
  validation: { required: true },
  valid: false,
  touched: false,
  validationMessage: '',
};

export const matchType = {
  element: 'select',
  value: 'League',
  label: true,
  labelText: 'Match Type',
  config: {
    name: 'matchType_input',
    options: [
      { val: 'League', text: 'League' },
      { val: 'Cup', text: 'Cup' },
      { val: 'Tournament', text: 'Tournament' },
      { val: 'Friendly', text: 'Friendly' },
    ],
  },
  validation: { required: false },
  valid: true,
};

export const resultIndicator = {
  element: 'select',
  value: 'W',
  label: true,
  labelText: 'Result',
  config: {
    name: 'resultIndicator_input',
    options: [{ val: 'W', text: 'Win' }, { val: 'D', text: 'Draw' }, { val: 'L', text: 'Lose' }],
  },
  validation: { required: false },
  valid: true,
};

export const forfeitedMatch = {
  element: 'checkbox',
  value: false,
  label: true,
  labelText: 'Forfeit',
  config: { name: 'forfeitedMatch_input' },
  validation: { required: false },
  valid: true,
};

export const homeOrAway = {
  element: 'select',
  value: 'home',
  label: true,
  labelText: 'My Team Details',
  config: {
    name: 'homeOrAway_input',
    options: [{ val: 'home', text: 'Home' }, { val: 'away', text: 'Away' }],
  },
  validation: { required: false },
  valid: true,
};

export const teamScore = {
  element: 'input',
  value: 0,
  label: false,
  labelText: 'Team Score',
  config: {
    name: 'teamScore_input',
    type: 'number',
    placeholder: 'Score',
  },
  validation: { required: true },
  valid: true,
  touched: false,
  validationMessage: '',
};

export const opponentName = {
  element: 'input',
  value: '',
  label: true,
  labelText: 'Opponent Details*',
  config: {
    name: 'opponentName_input',
    type: 'text',
    placeholder: 'Opponent team name',
  },
  validation: { required: true, minChar: 3 },
  valid: false,
  touched: false,
  validationMessage: '',
};

export const opponentScore = {
  element: 'input',
  value: 0,
  label: false,
  labelText: 'Opponent Score',
  config: {
    name: 'opponentScore_input',
    type: 'number',
    placeholder: 'Score',
  },
  validation: { required: true },
  valid: true,
  touched: false,
  validationMessage: '',
};

export const matchNotes = {
  element: 'textarea',
  value: '',
  label: true,
  labelText: 'Match Notes',
  config: {
    name: 'matchNotes_input',
    type: 'text',
  },
  validation: { required: false },
  valid: true,
  touched: false,
  validationMessage: '',
};

export const matchPlayers = {
  element: 'emptyArray',
  value: [],
  label: false,
  labelText: 'Match Players',
  config: {
    name: 'matchPlayers_input',
    type: 'array',
  },
  validation: { required: false },
  valid: true,
  touched: false,
  validationMessage: '',
};
