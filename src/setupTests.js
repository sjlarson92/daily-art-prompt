import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16' // same version as you added
import { act } from 'react-dom/test-utils'

configure({ adapter: new Adapter() })

process.env = {
  REACT_APP_GATEWAY_URL: 'http://somehost:someport',
}

export const waitForComponentToMount = async wrapper => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
    wrapper.update()
  })
}
