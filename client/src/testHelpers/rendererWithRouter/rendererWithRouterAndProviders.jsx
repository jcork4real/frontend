/* eslint-disable */
import React from 'react';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';
import { Grommet } from 'grommet';
import {
  StateProvider as GlobalProvider,
  StateProvider as SchoolProvider
} from 'react-conflux';
import {
  schoolReducer,
  schoolContext
} from '../../store/reducers/schoolReducer';
import {
  globalReducer,
  globalContext
} from '../../store/reducers/globalReducer';
import { theme } from '../../styles/themes';

const rendererWithRouterAndProviders = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    ...renderer.create(
      <GlobalProvider reducer={globalReducer} stateContext={globalContext}>
        <SchoolProvider reducer={schoolReducer} stateContext={schoolContext}>
          <Grommet theme={theme}>
            <Router history={history}>{ui}</Router>
          </Grommet>
        </SchoolProvider>
      </GlobalProvider>
    ),
    history
  };
};

export default rendererWithRouterAndProviders;
