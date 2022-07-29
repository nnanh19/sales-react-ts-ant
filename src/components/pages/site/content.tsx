import { Button, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiProduct } from "../../../api";
import { getProducts, setCart, useStore } from "../../../store";
import { IProduct } from "../../../types";
import { FlexColumn, Paragraph, Title } from "../admin/styles";
import {
  ContentProduct,
  ContentProductImg,
  ContentProducts,
  ContentStyle,
} from "./styles";

type Props = {};

const Content = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useStore();
  const { products, myCart } = state;

  const navigate = useNavigate();
  useEffect(() => {
    const callApiGetProducts = () => {
      apiProduct.getProducts().then((product) => {
        if (product.status === 200) {
          dispatch(getProducts(product.data));
        } else {
          navigate("/");
        }
      });
    };
    callApiGetProducts();
  }, []);

  const addCart = (product: IProduct) => {
    setVisible(true);
    const existCart = myCart.find((item: any) => item.id === product.id);
    if (existCart) {
      dispatch(setCart(myCart.map((cart: any) =>
      cart.id === product.id
        ? { ...existCart, quantity: existCart.quantity + 1, amout: (existCart.quantity + 1) * product.price }
        : cart
    )))
    } else {
      dispatch(setCart([...myCart, { ...product, quantity: 1 , amout: product.price}]));
    }
  };
  const onCartChange = ({ product}:any, quantity:any) => {
    console.log('onCartChange');
    const existCart = myCart.find((item: any) => item.id === product.id);
    
    if (existCart) {
      dispatch(
        setCart(
          myCart.map((cart: any) =>
            cart.id === product.id
              ? { ...existCart, quantity: existCart.quantity = +quantity, amout: +quantity * product.price }
              : cart
          )
        )
      )
      existCart.quantity <=1 ?  dispatch(
        setCart(
          myCart.filter((item: any) => item.id !== existCart.id)
        )
      ):dispatch(setCart(
        myCart.map((item : any) => item.id === product.id ? {...existCart, quantity: existCart.quantity - 1 , amout: (existCart.quantity - 1) * product.price } : item
        )
      ))

    } else {
      dispatch(setCart([...myCart, { ...product, quantity: 1, amout: product.price }]));
    }
    
  };
  const onHandleIncreCart = (product :any) => {
    console.log('onHandleIncreCart');
    const existCart = myCart.find((item: any) => item.id === product.id);
    if(existCart){
      dispatch(setCart(
        myCart.map((item : any) => item.id === product.id ? {...existCart, quantity: existCart.quantity + 1 , amout: (existCart.quantity + 1) * product.price } : item
        )
      ));
    }
  }
  const onHandleDecreCart = (product :any) => {
    const existCart = myCart.find((item: any) => item.id === product.id);
    if (existCart.quantity <= 1) {
       dispatch(
        setCart(
          myCart.filter((item: any) => item.id !== existCart.id)
        )
      );
    } else {
      dispatch(setCart(
        myCart.map((item : any) => item.id === product.id ? {...existCart, quantity: existCart.quantity - 1 , amout: (existCart.quantity - 1) * product.price } : item
        )
      ));
    }
  }

  return (
    <ContentStyle>
      <Title level={3}>ĐIỆN THOẠI NỔI BẬT NHẤT</Title>
      <ContentProducts>
        {products?.map((product) => {
          return (
            <ContentProduct key={product.id} direction="column">
              <ContentProductImg src={product.image} />
              <Button
                onClick={() => addCart(product)}
                style={{ background: "orange", border: "red" }}
                type="primary"
                block
              >
                Đặt hàng
              </Button>
            </ContentProduct>
          );
        })}
      </ContentProducts>
      <Modal
        title="Giỏ hàng của bạn"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        {myCart?.map((product: any) => {
          return (
            <ContentProduct
              key={product?.id}
              direction="row"
              justifyContent="space-between"
            >
            <ContentProduct>
                <div>
                  <Title level={5}>{product?.name}</Title>
                  <ContentProductImg src={product?.image} />
                </div>
                <p style={{ margin: "30px" }}>
                  <p>Số lượng</p>
                  <span onClick={() => onHandleDecreCart(product)} style={{width: '10px', border: '1px solid gray', padding: '2px 10px', cursor:'pointer'}}>-</span>
                  <input
                    type="number"
                    value={product?.quantity}
                    onChange={(event) => onCartChange({ product}, event.target.value)}
                  />
                  <span onClick={() => onHandleIncreCart(product)}  style={{width: '10px', border: '1px solid gray', padding: '2px 10px', cursor:'pointer'}}>+</span>
                </p>
              </ContentProduct>
              <div style={{ margin: "50px", fontWeight: "bold" }}>${product?.amout}</div>
            </ContentProduct>
          );
        })}
      </Modal>
    </ContentStyle>
  );
};

export default Content;
