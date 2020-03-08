import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16' // same version as you added

configure({ adapter: new Adapter() })

process.env = {
  REACT_APP_GATEWAY_URL: 'http://somehost:someport',
}
