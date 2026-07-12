import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Danger = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Success = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Loading = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
};