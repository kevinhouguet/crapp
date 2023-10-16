import React from "react"
import Menu from '../menu/menu.container';

export interface IHeaderProps {
  title: string;
}

export default class Header extends React.Component<IHeaderProps, IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props)
    this.state = {
      title: props.title || 'Put a title here',
    }
  }

  render() {

    return (
      <>
        <h1>{this.state.title}</h1>
        <Menu />
      </>
    )
  }
}