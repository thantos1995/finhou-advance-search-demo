import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export default applyCaseMiddleware(axios.create(
  {
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  },
), {
  caseFunctions: {
    snake: (input) => input,
  },
});
