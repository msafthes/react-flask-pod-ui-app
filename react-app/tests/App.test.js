import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { Provider } from 'react-redux';
import { configureStore, history } from '../src/store';
import { ConnectedRouter } from 'connected-react-router';

import Intro from '../src/pages/Intro/Intro';
import Images from '../src/pages/Images/Images';
import Containers from '../src/pages/Containers/Containers';
import Volumes from '../src/pages/Volumes/Volumes';
import NavigationItems from '../src/components/Navigation/NavigationItems/NavigationItems';
import MenuImages from '../src/components/MaterialCustomized/MenuImages';
import MenuContainers from '../src/components/MaterialCustomized/MenuContainers';
import MenuVolumes from '../src/components/MaterialCustomized/MenuVolumes';


// Setup
const store = configureStore();


// Intro Page
test('renders Intro page heading', () => {
  const { getByText } = render(<Intro />);
  const element = getByText(/Welcome/);
  expect(element).toBeInTheDocument();
});

test('renders Intro page content', () => {
  const { getByText } = render(<Intro />);
  const element = getByText(/The default Podman connection/);
  expect(element).toBeInTheDocument();
});


// Images Page
test('renders Images page heading', () => {
  const { getByText } = render(<Provider store={store}><Images /></Provider>);
  const element = getByText(/Podman Images/);
  expect(element).toBeInTheDocument();
});

test('renders Images page content', () => {
  const { getByText } = render(<Provider store={store}><Images /></Provider>);
  const element = getByText(/Repository/);
  expect(element).toBeInTheDocument();
});

test('clicking on Pull button renders modal', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Images />
      </ConnectedRouter>
    </Provider>
  );

  const elementPull = screen.getByText("Pull");
  userEvent.click(elementPull)
  const elementModal = screen.getByText("Enter the image you want to pull");

  expect(elementModal).toBeInTheDocument();
});

test('clicking on Images Actions button renders dropdown', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MenuImages />
      </ConnectedRouter>
    </Provider>
  );

  const elementActions = screen.getByText("Actions");
  userEvent.click(elementActions)
  const elementDropdown = screen.getByText("Close");

  expect(elementDropdown).toBeInTheDocument();
});



// Containers Page
test('renders Containers page heading', () => {
  const { getByText } = render(<Provider store={store}><Containers /></Provider>);
  const element = getByText(/Podman Containers/);
  expect(element).toBeInTheDocument();
});

test('renders Containers page content', () => {
  const { getByText } = render(<Provider store={store}><Containers /></Provider>);
  const element = getByText(/ID/);
  expect(element).toBeInTheDocument();
});

test('clicking on Run button renders modal', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Containers />
      </ConnectedRouter>
    </Provider>
  );

  const elementRun = screen.getByText("Run");
  userEvent.click(elementRun)
  const elementModal = screen.getByText('Enter the command for "podman run"');

  expect(elementModal).toBeInTheDocument();
});

test('clicking on Containers Actions button renders dropdown', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MenuContainers />
      </ConnectedRouter>
    </Provider>
  );

  const elementActions = screen.getByText("Actions");
  userEvent.click(elementActions)
  const elementDropdown = screen.getByText("Close");

  expect(elementDropdown).toBeInTheDocument();
});



// Volumes Page
test('renders Volumes page heading', () => {
  const { getByText } = render(<Provider store={store}><Volumes /></Provider>);
  const element = getByText(/Podman Volumes/);
  expect(element).toBeInTheDocument();
});

test('renders Volumes page content', () => {
  const { getByText } = render(<Provider store={store}><Volumes /></Provider>);
  const element = getByText(/Name/);
  expect(element).toBeInTheDocument();
});

test('clicking on Create button renders modal', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Volumes />
      </ConnectedRouter>
    </Provider>
  );

  const elementCreate = screen.getByText("Create");
  userEvent.click(elementCreate)
  const elementModal = screen.getByText('Enter the name of volume you want to create');

  expect(elementModal).toBeInTheDocument();
});

test('clicking on Volumes Actions button renders dropdown', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MenuVolumes />
      </ConnectedRouter>
    </Provider>
  );

  const elementActions = screen.getByText("Actions");
  userEvent.click(elementActions)
  const elementDropdown = screen.getByText("Close");

  expect(elementDropdown).toBeInTheDocument();
});



// NavigationItems
test('renders all Navigation Items', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NavigationItems />
      </ConnectedRouter>
    </Provider>
  );
  const elementHome = screen.getByText("Home");
  const elementImages = screen.getByText("Images");
  const elementContainers = screen.getByText("Containers");
  const elementVolumes = screen.getByText("Volumes");
  const elementConnections = screen.getByText("Connections");
  expect(elementHome).toBeInTheDocument();
  expect(elementImages).toBeInTheDocument();
  expect(elementContainers).toBeInTheDocument();
  expect(elementVolumes).toBeInTheDocument();
  expect(elementConnections).toBeInTheDocument();
});

test('clicking on Connections renders dropdown', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NavigationItems />
      </ConnectedRouter>
    </Provider>
  );

  const elementConnections = screen.getByText("Connections");
  userEvent.click(elementConnections)

  const elementAddConnections = screen.getByText("Add Connection");
  expect(elementAddConnections).toBeInTheDocument();
});

test('clicking on Add Connection renders New Connection form', () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NavigationItems />
      </ConnectedRouter>
    </Provider>
  );

  const elementConnections = screen.getByText("Connections");
  userEvent.click(elementConnections)
  const elementAddConnections = screen.getByText("Add Connection");
  userEvent.click(elementAddConnections)

  const elementNewConnection = screen.getByText("New Connection");
  expect(elementNewConnection).toBeInTheDocument();
});
