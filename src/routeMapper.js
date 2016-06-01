/* @flow */

import PaletteListContainer from './containers/PaletteListContainer';
import ColorListContainer from './containers/ColorListContainer';
import ColorDetailsContainer from './containers/ColorDetailsContainer';

type Route = {
  name: string;
  props?: Object;
}

type RouteDescription = {
	title?: string;
  appbar?: boolean;
	component: any;
}

export default function(route: Route): RouteDescription {
  switch (route.name) {
  case 'colors':
    return {
      title: route.props ? route.props.title : '…',
      component: ColorListContainer,
    };
  case 'color_details':
    return {
      appbar: false,
      title: route.props ? route.props.color : '…',
      component: ColorDetailsContainer,
    };
  default:
    return {
      title: 'Palettes',
      component: PaletteListContainer,
    };
  }
}
