import ThreadCard from './ThreadCard';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const createStore = (authUser = null) => {
  return mockStore({
    auth: { user: authUser },
  });
};

const defaultThread = {
  id: 'thread-1',
  title: 'Contoh Thread Menarik',
  body: 'Ini adalah konten thread yang sangat menarik untuk dibaca oleh semua orang.',
  category: 'General',
  createdAt: '2024-01-01T00:00:00.000Z',
  owner: {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: [],
  totalComments: 10,
};

const Template = (args) => {
  const store = createStore(args.user);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThreadCard {...args} />
      </BrowserRouter>
    </Provider>
  );
};

export default {
  title: 'Components/ThreadCard',
  component: ThreadCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  render: Template,
  args: {
    thread: defaultThread,
    user: null,
  },
};

export const WithVotes = {
  render: Template,
  args: {
    thread: {
      ...defaultThread,
      upVotesBy: ['user-1', 'user-2', 'user-3'],
      downVotesBy: [],
    },
    user: { id: 'user-1', name: 'John Doe' },
  },
};

export const NoComments = {
  render: Template,
  args: {
    thread: {
      ...defaultThread,
      totalComments: 0,
    },
    user: null,
  },
};

export const WithLongContent = {
  render: Template,
  args: {
    thread: {
      ...defaultThread,
      title: 'Thread dengan Judul yang Sangat Panjang dan Mungkin Melebihi Batas',
      body: 'Ini adalah konten thread yang sangat panjang. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    user: null,
  },
};