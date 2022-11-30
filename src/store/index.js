import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { loadState } from "../utility/browser-storage";

import AuthRedux from './AuthRedux';
import VideosRedux from './VideosRedux';
import createVideoData from "./VideoData";
import ProductsRedux from './ProductsRedux';
import PagesRedux from './PagesRedux';
import CategoriesRedux from './CategoriesRedux';
import BrandsRedux from './BrandsRedux';
import InfluencersRedux from './InfluencersRedux';
import HashtagsRedux from './HashtagsRedux';
import PromosRedux from './PromosRedux';
import StoriesRedux from './StoriesRedux';
import UsersRedux from './UsersRedux';

const reducers = combineReducers({
  auth: AuthRedux,
  video: VideosRedux,
  createVideoData: createVideoData,
  product: ProductsRedux,
  pages: PagesRedux,
  categorie: CategoriesRedux,
  brand: BrandsRedux,
  influencer: InfluencersRedux,
  promo: PromosRedux,
  hashtag: HashtagsRedux,
  stories: StoriesRedux,
  users: UsersRedux,
});

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  preloadedState: loadState('redux'),
});