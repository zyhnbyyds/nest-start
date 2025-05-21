import { Provider } from '@nestjs/common'
import OpenApi from 'openai'

const DeepSeekFactory: Provider = {
  provide: 'DeepSeekInstance',
  useFactory: () => {
    const deepSeek = new OpenApi({
      apiKey: process.env.DEEP_SEEK_APP_KEY,
      baseURL: process.env.DEEP_SEEK_APP_BASE_URL,
    })
    return deepSeek
  },
}

export default DeepSeekFactory
