import React from 'react';
// Data to map
let id = 0;
function createData(icon, text, link) {
  id += 1;
  return { id, icon, text, link };
}

const listItems = [
  createData(<i className="fas fa-user-friends" />, 'squad', '/players'),
  createData(<i className="fas fa-futbol" />, 'results', '/results'),
  createData(<i className="fas fa-chart-pie" />, 'stats', '/stats'),
];

export default listItems;
