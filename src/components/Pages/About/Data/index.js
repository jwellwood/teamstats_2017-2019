let id = 0;
function createData(title, text) {
  id += 1;
  return { id, title, text };
}

export const listItemsMain = [
  createData('RESULTS', 'Keep up to date with the latest results'),
  createData('SQUAD', 'Check progress against set targets'),
  createData('STATS', 'Track the player and team stats throughout the season'),
];

export const listItemsAdvanced = [
  createData('MANAGE', 'Add, edit or delete matches or players'),
  createData('SET TARGETS', "Set a player's appearance, goal, and assist targets for the season"),
  createData(
    'REGISTER USERS',
    'Allow other users to create accounts. To do this go to settings and click allow registration',
  ),
];
