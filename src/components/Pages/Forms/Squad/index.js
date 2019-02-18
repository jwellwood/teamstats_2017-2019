export const image = {
  element: 'file',
  value: '',
  label: true,
  labelText: 'Player Image',
  config: {
    name: 'player_image_input',
    type: 'file',
  },
  validation: { required: false },
  valid: true,
};

export const name = {
  element: 'input',
  value: '',
  label: true,
  labelText: 'Player Details*',
  config: {
    name: 'name_input',
    type: 'text',
    placeholder: 'Name',
  },
  validation: { required: true, minChar: 3 },
  valid: false,
  touched: false,
  validationMessage: '',
};

export const number = {
  element: 'input',
  value: 0,
  label: false,
  labelText: 'Number',
  config: {
    name: 'number_input',
    type: 'number',
    placeholder: 'Number',
  },
  validation: { required: false },
  valid: true,
};

export const position = {
  element: 'select',
  value: 'GK',
  label: true,
  labelText: 'Position',
  config: {
    name: 'position_input',
    options: [
      { val: 'GK', text: 'Goalkeeper' },
      { val: 'DF', text: 'Defender' },
      { val: 'MF', text: 'Midfielder' },
      { val: 'FW', text: 'Forward' },
    ],
  },
  validation: { required: false },
  valid: true,
};

export const captain = {
  element: 'checkbox',
  value: false,
  label: true,
  labelText: 'Captain',
  config: { name: 'captain_input' },
  validation: { required: false },
  valid: true,
};

export const targetApps = {
  element: 'input',
  value: 1,
  label: true,
  labelText: 'Targets',
  config: {
    name: 'targetApps_input',
    type: 'number',
    placeholder: 'Target Apps',
  },
  validation: { required: false },
  valid: true,
};

export const targetGoals = {
  element: 'input',
  value: 1,
  label: false,
  labelText: 'Target Goals',
  config: {
    name: 'targetGoals_input',
    type: 'number',
    placeholder: 'Target Goals',
  },
  validation: { required: false },
  valid: true,
};

export const targetAssists = {
  element: 'input',
  value: 1,
  label: false,
  labelText: 'Target Assists',
  config: {
    name: 'targetAssists_input',
    type: 'number',
    placeholder: 'Target Assists',
  },
  validation: { required: false },
  valid: true,
};

export const goals = {
  element: 'hidden',
  value: 0,
  label: false,
  labelText: 'Goals',
  config: {
    name: 'goals_input',
    type: 'number',
    placeholder: 'Goals',
  },
  validation: { required: false },
  valid: true,
};

export const assists = {
  element: 'hidden',
  value: 0,
  label: false,
  labelText: 'Assists',
  config: {
    name: 'assists_input',
    type: 'number',
    placeholder: 'Assists',
  },
  validation: { required: false },
  valid: true,
};

export const apps = {
  element: 'hidden',
  value: 0,
  label: false,
  labelText: 'Appearances',
  config: {
    name: 'apps_input',
    type: 'number',
    placeholder: 'Apps',
  },
  validation: { required: false },
  valid: true,
};

export const mvp = {
  element: 'hidden',
  value: 0,
  label: false,
  labelText: 'MVP',
  config: {
    name: 'mvp_input',
    type: 'number',
    placeholder: 'MVP',
  },
  validation: { required: false },
  valid: true,
};

export const balance = {
  element: 'input',
  value: 0,
  label: true,
  labelText: 'Money owed',
  config: {
    name: 'balance_input',
    type: 'number',
    placeholder: '$ € £',
  },
  validation: { required: false },
  valid: true,
};
