import React, { useMemo } from 'react';
import styled from '@emotion/styled';

import ListTable from '../base/ListTable';
import TableItem from '../base/TableItem';

import { normalContainerWidth } from '@/static/style/common';

// api 확정되면 type 지정
type CartContentProps = {
  cartProducts: any;
  selectedProduct: Set<number>;
  onCheck: (id: number) => void;
  onCheckAll: (e) => void;
};

const tableHeader = [
  { id: 'productName', name: '상품명/옵션', width: '70%' },
  { id: 'price', name: '상품금액/수량', width: '10%' },
  { id: 'total', name: '합계', width: '10%' },
  { id: 'delivery', name: '배송비', width: '10%', rowSpan: 6 },
];

const CartContent = ({ cartProducts, onCheck, onCheckAll, selectedProduct }: CartContentProps) => {
  const tableBody = useMemo(() => {
    return cartProducts.map((cartProduct) => {
      return {
        id: cartProduct.productId,
        cells: [
          { c: <TableItem cartProduct={cartProduct} />, colSpan: 3 },
          { c: <div style={{ textAlign: 'center', fontSize: '14px' }}>2,500 원</div> },
        ],
      };
    });
  }, [cartProducts]);

  return (
    <CartContentContainer>
      {cartProducts.length === 0 ? (
        <CartEmptyAlert>장바구니가 비었어요!!</CartEmptyAlert>
      ) : (
        <ListTable
          checkable={true}
          header={tableHeader}
          body={tableBody}
          selectedItems={selectedProduct}
          onCheck={onCheck}
          onCheckAll={onCheckAll}
        />
      )}
    </CartContentContainer>
  );
};

const CartContentContainer = styled.div`
  width: ${normalContainerWidth};
`;

const CartEmptyAlert = styled.div`
  padding: 50px 0px 50px;
  text-align: center;
`;

export default CartContent;