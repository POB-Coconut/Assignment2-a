import React, { Component } from 'react';
import styled from 'styled-components';
import { getStore, isExpired } from '../utils/storage';
import ProductCard from '../components/ProductCard';

export default class RecentList extends Component {
  state = {
    recentFiltered: [],
    brandList: [],
    isUnlike: '',
  };

  componentDidMount() {
    this.setState({
      recentFiltered: getStore('recentViewed'),
      brandList: this.setBrandList(),
      isUnlike: false,
    });
  }

  onCheckUnlike = (e) => {
    const isChecked = e.target.checked;
    this.setUnlikeFilter(isChecked);
  };
  onClickUnlike = (e) => {
    const { isUnlike } = this.state;
    this.setState({ isUnlike: !isUnlike });
    this.setUnlikeFilter(!isUnlike);
  };

  componentDidUpdate() {
    isExpired();
  }

  onClickBrand = (e) => {
    const clickedBrand = e.target.innerText;
    const { brandList } = this.state;
    if (clickedBrand === MSG.ALL_BRAND) {
      brandList.forEach((brand) => {
        if (brand.name === clickedBrand && !brand.isFilter)
          brand.isFilter = true;
        else if (brand.name !== clickedBrand) brand.isFilter = false;
      });
      this.setState({ recentFiltered: getStore('recentViewed') });
    } else {
      brandList.forEach((brand) => {
        if (brand.name === clickedBrand) brand.isFilter = !brand.isFilter;
        if (brand.name === MSG.ALL_BRAND) brand.isFilter = false;
      });
      this.setBrandFilter();
    }
  };

  onClickToProductPage = (e) => {
    const productId = e.currentTarget.id;
    this.setIsRouting(parseInt(productId));
  };

  setIsRouting = (id) => {
    getStore('recentViewed').forEach((product) => {
      if (product.id === id)
        if (product.unlike) alert(MSG.WARNING);
        else this.props.history.push({ pathname: `/product`, state: id });
    });
  };

  setBrandList = () => {
    const brandList = [
      ...new Set(getStore('recentViewed').map((card) => card['brand'])),
    ];
    const brandState = brandList.map((brand) =>
      Object.assign({ name: brand, isFilter: false })
    );
    brandState.unshift({ name: MSG.ALL_BRAND, isFilter: true });
    return brandState;
  };

  setUnlikeFilter = (isChecked) => {
    const { recentFiltered } = this.state;
    if (isChecked) {
      const unlikeFilteredList = recentFiltered.filter(
        (card) => card.unlike === false
      );
      this.setState({ recentFiltered: unlikeFilteredList });
    } else this.setState({ recentFiltered: getStore('recentViewed') });
  };

  setBrandFilter = () => {
    const { brandList } = this.state;

    const filterBrand = brandList
      .filter((brand) => brand.isFilter)
      .map((brand) => brand.name);

    const filteredProducts = getStore('recentViewed').filter((card) =>
      filterBrand.includes(card.brand)
    );

    this.setState({
      recentFiltered:
        filteredProducts.length > 0
          ? filteredProducts
          : getStore('recentViewed'),
    });
  };

  setLowPriceOrder = () => {
    const { recentFiltered } = this.state;
    const lowOrderedList = recentFiltered.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
    this.setState({ recentFiltered: lowOrderedList });
  };

  setHighPriceOrder = () => {
    const { recentFiltered } = this.state;

    const highOrderedList = recentFiltered.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
    this.setState({ recentFiltered: highOrderedList });
  };

  setRecentViewOrder = () => {
    this.setState({ recentFiltered: getStore('recentViewed') });
  };

  render() {
    const { recentFiltered, brandList, isUnlike } = this.state;
    return (
      <RecentListDiv>
        <PageTitle>{MSG.TITLE}</PageTitle>
        <UnlikeDiv>
          <CheckBox onClick={(e) => this.onClickUnlike(e)}>
            <CheckBoxInput />
            <CheckBoxLabel isUnlike={isUnlike}>
              <span>{MSG.UNLIKE}</span>
            </CheckBoxLabel>
          </CheckBox>
        </UnlikeDiv>
        <BrandButtonDiv>
          {brandList.map((brand, idx) => (
            <BrandButton
              key={idx}
              isFilter={brand.isFilter}
              onClick={(e) => this.onClickBrand(e)}
            >
              {brand.name}
            </BrandButton>
          ))}
        </BrandButtonDiv>
        <ViewDiv>
          <ViewLowPriceButton onClick={() => this.setLowPriceOrder()}>
            {MSG.LOW_ORDER}
          </ViewLowPriceButton>
          <ViewHighPriceButton onClick={() => this.setHighPriceOrder()}>
            {MSG.HIGH_ORDER}
          </ViewHighPriceButton>
          <ViewRecentButton onClick={() => this.setRecentViewOrder()}>
            {MSG.RECENT_ORDER}
          </ViewRecentButton>
        </ViewDiv>
        <RecentProductDiv>
          {recentFiltered.map((recentProduct) => {
            const { id } = recentProduct;
            return (
              <ProductCard
                key={id}
                id={id}
                product={recentProduct}
                onClick={(e) => this.onClickToProductPage(e)}
              />
            );
          })}
        </RecentProductDiv>
      </RecentListDiv>
    );
  }
}

const MSG = {
  TITLE: '상품 조회 이력',
  ALL_BRAND: '전체브랜드',
  UNLIKE: '관심없는 상품 숨기기',
  LOW_ORDER: '낮은 가격 순',
  HIGH_ORDER: '높은 가격 순',
  RECENT_ORDER: '최근 조회 순',
  WARNING: '🤭 해당 상품은 "관심없음" 상품입니다.',
};

const RecentListDiv = styled.div`
  padding: 30px;
`;

const PageTitle = styled.div`
  font-size: 30px;
  margin: 20px 0;
`;
const CheckBox = styled.div``;

const CheckBoxInput = styled.input.attrs({
  type: 'checkbox',
})`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  background-color: ${(props) => (props.isUnlike ? '#000 ' : '#fff')};
`;
const CheckBoxLabel = styled.div`
  display: inline-block;
  position: relative;
  padding-left: 26px;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 18px;
    height: 18px;
    border: ${(props) => (props.isUnlike ? 'none' : '1px solid black')};
    background-color: ${(props) => (props.isUnlike ? '#000 ' : '#fff')};
  }
`;
const BrandButtonDiv = styled.div`
  display: flex;
`;

const BrandButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;

const UnlikeDiv = styled.div`
  margin: 20px 0;
  font-size: 20px;
`;

const ViewDiv = styled.div``;
const ViewRecentButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;
const ViewLowPriceButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;
const ViewHighPriceButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;
const RecentProductDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
`;
