import { storiesOf, action } from '@kadira/storybook';
import { withKnobs, text, boolean, number, select } from '@kadira/storybook-addon-knobs';

import React from 'react';
import Triangulation from '../lib/';

let stories = storiesOf('Triangulation', module);
stories.addDecorator(withKnobs);

const colorsMaterialGrey = [
  '#FAFAFA', '#F6F6F6', '#F2F2F2', '#EEEEEE',
  '#EBEBEB', '#E7E7E7', '#E3E3E3', '#E0E0E0'
];

const colorsMaterialOrange = [
  /*'#FFCCBC', '#FFBEAA',*/ '#FFB199', '#FFA488',
  '#FF9776', '#FF8A65', '#FF7D54', '#FF7043'
];

const colorsMaterialRed = [
  '#EF9A9A', '#EF8D8B', '#F0817D', '#F1746F', '#F16860', '#F25B52'
];

// http://www.colourlovers.com/palette/292482/Terra
const colorsTerra = [
  '#E8DDCB', '#CDB380', '#036564', '#033649', '#031634'
];

// http://www.colourlovers.com/palette/1930/cheer_up_emo_kid
const colorsCheerUp = [
  '#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'
];

// http://www.colourlovers.com/palette/92095/Giant_Goldfish
const colorsGoldfish = [
  '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900'
];

stories.addWithInfo('simple usage', '', () => {
  return (
    <Triangulation
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom size', '', () => {
  return (
    <Triangulation
      width={number('width', 100)}
      height={number('height', 500)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', false)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom density', '', () => {
  return (
    <Triangulation
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 30)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', false)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('seeded', '', () => {
  return (
    <Triangulation
      seed={number('seed', 0xDEADBEEF)}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('animated', '', () => {
  return (
    <Triangulation
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('uniform animation', '', () => {
  return (
    <Triangulation
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', true)}
      animated={boolean('animated?', false)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom colors (grey)', '', () => {
  return (
    <Triangulation
      colors={colorsMaterialGrey}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom colors (orange)', '', () => {
  return (
    <Triangulation
      colors={colorsMaterialOrange}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom colors (red)', '', () => {
  return (
    <Triangulation
      colors={colorsMaterialRed}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom colors (terra)', '', () => {
  return (
    <Triangulation
      colors={colorsTerra}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom colors (cheer up)', '', () => {
  return (
    <Triangulation
      colors={colorsCheerUp}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});

stories.addWithInfo('custom colors (goldfish)', '', () => {
  return (
    <Triangulation
      colors={colorsGoldfish}
      width={number('width', 550)}
      height={number('height', 350)}
      density={number('density', 20)}

      uniform={boolean('uniform?', false)}
      animated={boolean('animated?', true)}

      onTick={action('animation update tick')} />);
});
