import { HeaderStyle, Header__Utils, Header__Image, Header__Search, Header__Utils_FlexColumn, Header__Utils_FlexRown,  } from "./styles";

type Props = {
    
};

const Header = (props: Props) => {
  return (
    <HeaderStyle>
      <Header__Image src="https://www.cryptocurrencyposters.com/shop/dogecoin-logo-stickers/mockup-4742dea5.jpg"></Header__Image>
      <Header__Search placeholder="">
      </Header__Search>
      <Header__Utils>
        <Header__Utils_FlexColumn>
            <span> Gọi mua hàng </span>
            <span> 1900 1009 </span>
        </Header__Utils_FlexColumn>
        <Header__Utils_FlexRown>
            <span>Icon</span>
            <span> Cửa hàng<br/> gần bạn </span>
        </Header__Utils_FlexRown>
        <Header__Utils_FlexRown>
            <span>Icon</span>
            <span> Tra cứu<br/> đơn hàng </span>
        </Header__Utils_FlexRown>
        <Header__Utils_FlexRown>
            <span></span>
            <span> Giỏ<br/> hàng </span>
        </Header__Utils_FlexRown>
      </Header__Utils>
    </HeaderStyle>
  );
};

export default Header;
