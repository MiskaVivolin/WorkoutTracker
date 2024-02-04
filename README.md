Full Readme coming soon. Install with npm i in both the frontend and backend folders. Use with npm start in backend and frontend. frontend/node_modules/expo/AppEntry.js might need to be changed to:
```
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import Index from '../../src/Index';

registerRootComponent(Index);
```
Tech Stack: React Native, TypeScript, Nodejs, MongoDB.
