import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import { exact } from 'prop-types';
import TangoTermsDetail from '../views/dashboard/Energy-Retailer/[id]/tangoterm-detailed';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const UsersPage = Loadable(lazy(() => import('../views/apps/Users')));
const OffersPage = Loadable(lazy(() => import('../views/apps/Offers')));
const EnergyRetailerDash = Loadable(lazy(() => import('../views/dashboard/Energy-Retailer/Energy-retailer')));
const RetailerDetails = Loadable(lazy(() => import('../views/dashboard/Energy-Retailer/[id]/retailers-details')));
const BrandDash = Loadable(lazy(() => import('../views/brands/compare-your-bill/Compare-your-bill')));
const CreateLeadPage = Loadable(lazy(() => import('../views/dashboard/create-leads')));
const SellableLocationPage= Loadable(lazy(() => import('../views/dashboard/Sellable-Location/sellable-location')));


/* ****Apps***** */
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));


// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboards/modern" /> },
      { path: '/dashboards/modern', exact: true, element: <ModernDash /> },
      { path: '/users', exact: true, element: <UsersPage /> },
      { path: '/offers', exact: true, element: <OffersPage /> },
      { path: '/energy-retailers', exact: true, element: <EnergyRetailerDash /> },
      { path: "/energy-retailers/:id", exact: true, element:<RetailerDetails /> },
      { path:"/tango-terms/:scriptId", exact:true , element:<TangoTermsDetail />},
      { path: '/brands/compare-your-bill', exact: true, element: <BrandDash /> },
      { path: '/create-leads', exact: true, element: <CreateLeadPage /> },
      { path: '/sellable-locations', exact: true, element: <SellableLocationPage /> },
      { path: '/apps/followers', element: <Followers /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
