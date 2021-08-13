import styled from '@emotion/styled';
import React from 'react';

import { baemin, green, red1 } from '@/static/style/common';

const feature = ['NEW', 'BEST', 'SALE', 'GREEN'];

type LabelProps = {
  quantity: number;
};

const ItemLabel = ({ quantity }: LabelProps) => {
  const getColor = (feature) => {
    switch (feature) {
      case 'NEW':
        return newFeatureColor;

      case 'BEST':
        return bestFeatureColor;

      case 'SALE':
        return saleFeatureColor;

      case 'GREEN':
        return greenFeatureColor;
    }
  };

  const createFeature = () => {
    return feature.map((item, idx) => (
      <Feature color={getColor(item)} key={idx}>
        <span>{item}</span>
      </Feature>
    ));
  };

  return <FeatureContainer>{createFeature()}</FeatureContainer>;
};

const bestFeatureColor = '#000';
const newFeatureColor = baemin;
const saleFeatureColor = red1;
const greenFeatureColor = green;

const FeatureContainer = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  left: 5px;
  top: 5px;
`;

const Feature = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 5px;
  height: 25px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #fff;
`;

export default ItemLabel;