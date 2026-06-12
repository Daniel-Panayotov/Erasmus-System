export interface NavIcon {
  iconName: string;
  name: string;
  route: string;
  float: 'left' | 'right';
  callback?: () => Promise<void>;
}
