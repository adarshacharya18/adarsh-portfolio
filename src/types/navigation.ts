export interface NavItem {
  path: string;
  label: string;
}

export interface NavigationConfig {
  logoText: string;
  links: NavItem[];
}
