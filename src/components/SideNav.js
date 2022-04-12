import React from 'react';
const SideNav = (props) => {
  console.log(props)
return (
<div className={"collapse" + (props.classname)}>
  <a href='#section'>About</a>
  <a href='#section'>Dog Breeds</a>
  <a href='#section'>Contact</a>

</div>
 );
};
export default SideNav;
