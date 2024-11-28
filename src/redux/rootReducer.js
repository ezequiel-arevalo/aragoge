import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import planningsReducer from './plannings/planningsSlice';
import categoryReducer from './category/categorySlice';
import professionalReducer from './professional/professionalSlice';
import paymentReducer from './payment/paymentSlice';
import roleReducer from './role/roleSlice';
import specialityReducer from './speciality/specialitySlice';
import subscriptionReducer from './subscription/subscriptionSlice';

const rootReducer = combineReducers({
  user: userReducer,
  plannings: planningsReducer,
  category: categoryReducer,
  professional: professionalReducer,
  payment: paymentReducer,
  role: roleReducer,
  speciality: specialityReducer,
  subscription: subscriptionReducer,
});

export default rootReducer;
