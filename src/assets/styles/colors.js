export const colors = {
  win: '#2ECC71',
  draw: '#F39C12',
  lose: '#E74C3C',
};

export const positions = {
  GK: '#F39C12',
  DF: '#A569BD',
  MF: '#42A5F5',
  FW: '#E74C3C',
};

export const matchTypes = {
  league: '#ddd',
  friendly: '#85C1E9',
  cup: '#F4D03F',
  tournament: '#BB8FCE',
};

export const resultColor = result => {
  switch (result) {
    case 'W':
      return colors.win;
    case 'D':
      return colors.draw;
    case 'L':
      return colors.lose;
    default:
      return '#333';
  }
};

export const positionColor = position => {
  switch (position) {
    case 'GK':
      return '#F39C12';
    case 'DF':
      return '#A569BD';
    case 'MF':
      return '#42A5F5';
    case 'FW':
      return '#E74C3C';
    default:
      return '#333';
  }
};
