// Data to map
let id = 0;
function createData(icon, text, link) {
  id += 1;
  return { id, icon, text, link };
}

const listItems = [
  createData('user-friends', 'squad', '/players'),
  createData('futbol', 'results', '/results'),
  createData('chart-pie', 'stats', '/stats'),
];

export default listItems;
