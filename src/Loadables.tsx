import * as React from 'react';
import * as Loadable from 'react-loadable'

export const LoadableAdminHome = Loadable({
  loader: () => import(/*webpackChunkName: "admin"*/"./AdminHome"),
  loading: () => <div>Loading...</div>
});

export const LoadableDanceHome = Loadable({
  loader: () => import(/*webpackChunkName: "dance"*/"./DanceHome"),
  loading: () => <div>Loading...</div>
})

export const LoadableMySubmissions = Loadable({
  loader: () => import(/*webpackChunkName: "dance"*/"./DanceAuthorSubmission"),
  loading: () => <div>Loading...</div>
})

export const LoadableCheckin = Loadable({
  loader: () => import(/*webpackChunkName: "checkin"*/"./Checkin"),
  loading: () => <div>Loading...</div>
})
