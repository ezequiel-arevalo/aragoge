import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import planningsReducer from './plannings/planningsSlice';
import categoryReducer from './category/categorySlice';
import professionalReducer from './professional/professionalSlice';
import paymentReducer from './payment/paymentSlice';
import roleReducer from './role/roleSlice';
import specialityReducer from './speciality/specialitySlice';
import subscriptionReducer from './subscription/subscriptionSlice';
import chatReducer from './chat/chatSlice';

const rootReducer = combineReducers({
  user: userReducer,
  plannings: planningsReducer,
  category: categoryReducer,
  professional: professionalReducer,
  payment: paymentReducer,
  role: roleReducer,
  speciality: specialityReducer,
  subscription: subscriptionReducer,
  chat: chatReducer,
});

export default rootReducer;
