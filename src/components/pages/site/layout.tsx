import { Outlet } from 'react-router-dom'

type Props = {}

const SiteLayout = (props: Props) => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default SiteLayout