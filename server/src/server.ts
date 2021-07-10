import { httpServer } from './app'

import './websocket/user'

httpServer.listen(process.env.PORT || 3333, () => console.log('Server Running'))
