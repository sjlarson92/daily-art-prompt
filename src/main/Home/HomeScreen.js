import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const HomeScreen = () => {
  const history = useHistory()
  const user = useSelector(state => state.user)
  if (!user.isLoggedIn) {
    history.push('/login')
  }
  const todaysDate = moment().format('YYYY-MM-DD')
  history.push(`/prompt-images/${todaysDate}`)
  return null
}

export default HomeScreen
