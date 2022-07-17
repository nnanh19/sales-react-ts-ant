import { Outlet } from 'react-router-dom'
import { HeaderStyle, FooterStyle, ContentStyle, LayoutStyle, SidebarStyle } from './styles'

type Props = {}

const Layout = (props: Props) => {
  return (
    <LayoutStyle>
        <HeaderStyle>
          header
        </HeaderStyle>
        <SidebarStyle>
          sidebar
        </SidebarStyle>
        <ContentStyle>
          <Outlet/>
        </ContentStyle>
        <FooterStyle>
footer
        </FooterStyle>
    </LayoutStyle>
  )
}

export default Layout