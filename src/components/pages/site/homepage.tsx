import Content from './content'
import Footer from './footer'
import Header from './header'

type Props = {}

const Homepage = (props: Props) => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default Homepage