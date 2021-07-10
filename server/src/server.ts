import { httpServer } from './app'

httpServer.listen(process.env.PORT || 3333, () => console.log('Server Running'))
