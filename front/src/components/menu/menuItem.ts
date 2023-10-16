export type MenuItem = {
  displayName: string;
  URL: string;
  classes?: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}